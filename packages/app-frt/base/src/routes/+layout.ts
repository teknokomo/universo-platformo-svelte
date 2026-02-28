/**
 * Root layout client-side load function.
 * Initialises the auth store from server-provided data.
 */

import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ data }) => {
    return {
        user: data.user
    }
}
