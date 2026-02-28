/**
 * Auth page server-side load function.
 * Redirects authenticated users to the home page.
 */

import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(302, '/')
    }

    return {}
}
