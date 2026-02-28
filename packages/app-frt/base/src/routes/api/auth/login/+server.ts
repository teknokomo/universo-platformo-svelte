/**
 * POST /api/auth/login
 *
 * Authenticates a user with email and password via Supabase.
 * Sets an HMAC-signed HTTP-only session cookie on success.
 */

import { json } from '@sveltejs/kit'
import { dev } from '$app/environment'
import type { RequestHandler } from './$types'
import { getAuthService } from '$lib/server/supabase'
import { getSessionSecret } from '$lib/server/session'
import { isValidEmail } from '$lib/server/validation'
import { serializeSession, SESSION_COOKIE_NAME, getSessionCookieOptions } from '@universo/auth-srv'

export const POST: RequestHandler = async ({ request, cookies }) => {
    let body: { email?: string; password?: string }

    try {
        body = await request.json()
    } catch {
        return json({ message: 'Invalid request body' }, { status: 400 })
    }

    const { email, password } = body

    if (!email || !password) {
        return json({ message: 'Email and password are required' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
        return json({ message: 'Invalid email address' }, { status: 400 })
    }

    let authService
    let secret: string
    try {
        authService = getAuthService()
        secret = getSessionSecret()
    } catch (err) {
        console.error('[login] Server configuration error:', err)
        return json({ message: 'Internal server error' }, { status: 500 })
    }

    try {
        const result = await authService.login({ email, password })

        if (!result.session) {
            return json({ message: 'Login failed: no session returned' }, { status: 401 })
        }

        const sessionData = {
            userId: result.session.userId,
            email: result.session.email,
            accessToken: result.session.accessToken,
            refreshToken: result.session.refreshToken,
            expiresAt: result.session.expiresAt
        }

        cookies.set(SESSION_COOKIE_NAME, serializeSession(sessionData, secret), {
            ...getSessionCookieOptions(!dev),
            path: '/'
        })

        return json({ user: result.user })
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed'
        return json({ message }, { status: 401 })
    }
}
