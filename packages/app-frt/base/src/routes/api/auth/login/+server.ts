/**
 * POST /api/auth/login
 *
 * Authenticates a user with email and password via Supabase.
 * Sets an HTTP-only session cookie on success.
 */

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getAuthService } from '$lib/server/supabase'
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

    try {
        const authService = getAuthService()
        const result = await authService.login({ email, password })

        // Store session in HTTP-only cookie
        const sessionData = {
            userId: result.session.userId,
            email: result.session.email,
            accessToken: result.session.accessToken,
            refreshToken: result.session.refreshToken,
            expiresAt: result.session.expiresAt
        }

        const isProduction = process.env.NODE_ENV === 'production'
        cookies.set(SESSION_COOKIE_NAME, serializeSession(sessionData), {
            ...getSessionCookieOptions(isProduction),
            path: '/'
        })

        return json({ user: result.user })
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed'
        return json({ message }, { status: 401 })
    }
}
