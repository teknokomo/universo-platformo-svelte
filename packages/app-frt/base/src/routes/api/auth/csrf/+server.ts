/**
 * GET /api/auth/csrf
 *
 * Returns a CSRF token for the current session.
 * SvelteKit has built-in CSRF protection; this endpoint exists for
 * compatibility with the React auth-frontend client library pattern.
 */

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import crypto from 'node:crypto'

export const GET: RequestHandler = async () => {
    // Generate a simple CSRF token – in production this should be tied to the session
    const csrfToken = crypto.randomBytes(32).toString('hex')
    return json({ csrfToken })
}
