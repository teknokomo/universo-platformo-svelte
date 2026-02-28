// @ts-nocheck
/**
 * Root layout client-side load function.
 * Initialises the auth store from server-provided data.
 */

import type { LayoutLoad } from './$types'

export const load = async ({ data }: Parameters<LayoutLoad>[0]) => {
    return {
        user: data.user
    }
}
