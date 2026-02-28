/**
 * Universo Platformo | App Frontend – Onboarding Service (Server)
 *
 * Provides the onboarding service instance for server-side use.
 */

import { env } from '$env/dynamic/private'
import { createOnboardingService } from '@universo/start-srv'

let _onboardingService: ReturnType<typeof createOnboardingService> | null = null

export function getOnboardingService() {
    if (!_onboardingService) {
        const supabaseUrl = env.SUPABASE_URL
        const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceRoleKey) {
            throw new Error(
                'Missing Supabase environment variables. ' +
                    'Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.'
            )
        }

        _onboardingService = createOnboardingService({
            supabaseUrl,
            supabaseServiceRoleKey
        })
    }
    return _onboardingService
}
