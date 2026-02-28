/**
 * Universo Platformo | App Frontend – Server Hooks
 *
 * Handles session verification on every request.
 * Reads the session cookie and populates `locals.user`.
 */

import { type Handle } from '@sveltejs/kit'
import { deserializeSession, SESSION_COOKIE_NAME } from '@universo/auth-srv'
import { getAuthService } from '$lib/server/supabase'

export const handle: Handle = async ({ event, resolve }) => {
    const cookieValue = event.cookies.get(SESSION_COOKIE_NAME)

    if (cookieValue) {
        const sessionData = deserializeSession(cookieValue)

        if (sessionData) {
            try {
                // Verify the token is still valid with Supabase
                const authService = getAuthService()
                const user = await authService.verifyToken(sessionData.accessToken)

                if (user) {
                    event.locals.user = user
                } else {
                    // Token invalid – clear the stale cookie
                    event.cookies.delete(SESSION_COOKIE_NAME, { path: '/' })
                    event.locals.user = null
                }
            } catch (err) {
                console.error('[hooks.server] Failed to verify token:', err)
                event.locals.user = null
            }
        } else {
            // Malformed or expired session data in cookie
            event.cookies.delete(SESSION_COOKIE_NAME, { path: '/' })
            event.locals.user = null
        }
    } else {
        event.locals.user = null
    }

    return resolve(event)
}
