/**
 * POST /api/auth/register
 *
 * Registers a new user via Supabase.
 * Returns 201 on success; session cookie is NOT set (email confirmation may be required).
 */

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getAuthService } from '$lib/server/supabase'

export const POST: RequestHandler = async ({ request }) => {
    let body: {
        email?: string
        password?: string
        termsAccepted?: boolean
        privacyAccepted?: boolean
    }

    try {
        body = await request.json()
    } catch {
        return json({ message: 'Invalid request body' }, { status: 400 })
    }

    const { email, password, termsAccepted, privacyAccepted } = body

    if (!email || !password) {
        return json({ message: 'Email and password are required' }, { status: 400 })
    }

    try {
        const authService = getAuthService()
        const result = await authService.register({ email, password, termsAccepted, privacyAccepted })

        return json({ user: result.user, message: 'Registration successful. Check your email to confirm.' }, { status: 201 })
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Registration failed'
        return json({ message }, { status: 400 })
    }
}
