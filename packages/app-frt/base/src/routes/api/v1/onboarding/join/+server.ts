/**
 * POST /api/v1/onboarding/join
 *
 * Saves the user's onboarding selections and marks onboarding as completed.
 * Requires authentication.
 */

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getOnboardingService } from '$lib/server/onboarding'

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((v) => typeof v === 'string')
}

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user) {
        return json({ message: 'Not authenticated' }, { status: 401 })
    }

    let body: Record<string, unknown>

    try {
        body = await request.json()
    } catch {
        return json({ message: 'Invalid request body' }, { status: 400 })
    }

    const projectIds = body.projectIds ?? []
    const campaignIds = body.campaignIds ?? []
    const clusterIds = body.clusterIds ?? []

    if (!isStringArray(projectIds) || !isStringArray(campaignIds) || !isStringArray(clusterIds)) {
        return json({ message: 'projectIds, campaignIds, and clusterIds must be arrays of strings' }, { status: 400 })
    }

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
