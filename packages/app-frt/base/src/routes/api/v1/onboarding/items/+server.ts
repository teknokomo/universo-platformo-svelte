/**
 * GET /api/v1/onboarding/items
 *
 * Returns onboarding items for the authenticated user.
 * Requires authentication.
 */

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getOnboardingService } from '$lib/server/onboarding'

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) {
        return json({ message: 'Not authenticated' }, { status: 401 })
    }

    try {
        const onboardingService = getOnboardingService()
        const items = await onboardingService.getOnboardingItems(locals.user.id)
        return json(items)
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load onboarding items'
        return json({ message }, { status: 500 })
    }
}
