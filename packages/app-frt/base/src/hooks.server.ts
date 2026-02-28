/**
 * Universo Platformo | App Frontend – Server Hooks
 *
 * Handles session verification on every request.
 * Reads the HMAC-signed session cookie and populates `locals.user`.
 *
 * Security model:
 *  - The session cookie is signed with HMAC-SHA256 (SESSION_SECRET).
 *  - On every request the signature is verified locally – no Supabase
 *    network call needed for fresh, valid sessions.
 *  - If the Supabase access token has expired but a refresh token is
 *    present, a silent token refresh is attempted.  On success the
 *    cookie is re-issued with the new tokens.
 */

import { type Handle } from '@sveltejs/kit'
import {
    deserializeSession,
    deserializeSessionAllowExpired,
    serializeSession,
    SESSION_COOKIE_NAME,
    getSessionCookieOptions
} from '@universo/auth-srv'
import { getAuthService } from '$lib/server/supabase'
import { getSessionSecret } from '$lib/server/session'
import { dev } from '$app/environment'

export const handle: Handle = async ({ event, resolve }) => {
    const cookieValue = event.cookies.get(SESSION_COOKIE_NAME)

    if (cookieValue) {
        let secret: string
        try {
            secret = getSessionSecret()
        } catch (err) {
            console.error('[hooks.server] SESSION_SECRET unavailable:', err)
            event.locals.user = null
            return resolve(event)
        }

        // Fast path: verify HMAC and check expiry locally
        const sessionData = deserializeSession(cookieValue, secret)

        if (sessionData) {
            // Cookie is valid and the token has not expired – no Supabase call needed
            event.locals.user = { id: sessionData.userId, email: sessionData.email }
        } else {
            // Signature may still be valid; the token might just be expired
            const expiredData = deserializeSessionAllowExpired(cookieValue, secret)

            if (expiredData?.refreshToken) {
                // Attempt silent token refresh
                try {
                    const authService = getAuthService()
                    const refreshed = await authService.refreshSession(expiredData.refreshToken)

                    if (refreshed) {
                        // Re-issue cookie with new tokens
                        const newSessionData = {
                            userId: refreshed.session.userId,
                            email: refreshed.session.email,
                            accessToken: refreshed.session.accessToken,
                            refreshToken: refreshed.session.refreshToken,
                            expiresAt: refreshed.session.expiresAt
                        }
                        event.cookies.set(
                            SESSION_COOKIE_NAME,
                            serializeSession(newSessionData, secret),
                            { ...getSessionCookieOptions(!dev), path: '/' }
                        )
                        event.locals.user = { id: refreshed.user.id, email: refreshed.user.email }
                    } else {
                        event.cookies.delete(SESSION_COOKIE_NAME, { path: '/' })
                        event.locals.user = null
                    }
                } catch (err) {
                    console.error('[hooks.server] Token refresh failed:', err)
                    event.cookies.delete(SESSION_COOKIE_NAME, { path: '/' })
                    event.locals.user = null
                }
            } else {
                // Malformed, tampered, or expired with no refresh token
                event.cookies.delete(SESSION_COOKIE_NAME, { path: '/' })
                event.locals.user = null
            }
        }
    } else {
        event.locals.user = null
    }

    return resolve(event)
}
