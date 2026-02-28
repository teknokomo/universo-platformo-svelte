/**
 * GET /api/auth/me
 *
 * Returns the current authenticated user from the session.
 * Returns 401 if not authenticated.
 */

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) {
        return json({ message: 'Not authenticated' }, { status: 401 })
    }

    return json({
        id: locals.user.id,
        email: locals.user.email
    })
}
