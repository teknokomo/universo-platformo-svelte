/**
 * POST /api/auth/logout
 *
 * Clears the session cookie.
 */

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { SESSION_COOKIE_NAME } from '@universo/auth-srv'

export const POST: RequestHandler = async ({ cookies }) => {
    cookies.delete(SESSION_COOKIE_NAME, { path: '/' })
    return json({ success: true })
}
