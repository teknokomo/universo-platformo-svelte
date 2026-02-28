// @ts-nocheck
/**
 * Auth page server-side load function.
 * Redirects authenticated users to the home page.
 */

import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
    if (locals.user) {
        throw redirect(302, '/')
    }

    return {}
}
