/**
 * Root layout server-side load function.
 * Passes user authentication data from server locals to the page.
 */

import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
    return {
        user: locals.user
    }
}
