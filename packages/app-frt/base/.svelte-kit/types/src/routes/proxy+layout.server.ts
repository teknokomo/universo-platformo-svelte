// @ts-nocheck
/**
 * Root layout server-side load function.
 * Passes user authentication data from server locals to the page.
 */

import type { LayoutServerLoad } from './$types'

export const load = async ({ locals }: Parameters<LayoutServerLoad>[0]) => {
    return {
        user: locals.user
    }
}
