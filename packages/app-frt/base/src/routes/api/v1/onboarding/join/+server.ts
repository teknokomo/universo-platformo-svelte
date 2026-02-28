/**
 * POST /api/v1/onboarding/join
 *
 * Saves the user's onboarding selections and marks onboarding as completed.
 * Requires authentication.
 */

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getOnboardingService } from '$lib/server/onboarding'

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user) {
        return json({ message: 'Not authenticated' }, { status: 401 })
    }

    let body: {
        projectIds?: string[]
        campaignIds?: string[]
        clusterIds?: string[]
    }

    try {
        body = await request.json()
    } catch {
        return json({ message: 'Invalid request body' }, { status: 400 })
    }

    const { projectIds = [], campaignIds = [], clusterIds = [] } = body

    try {
        const onboardingService = getOnboardingService()
        const result = await onboardingService.joinItems(locals.user.id, {
            projectIds,
            campaignIds,
            clusterIds
        })
        return json(result)
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to save onboarding selections'
        return json({ message }, { status: 500 })
    }
}
