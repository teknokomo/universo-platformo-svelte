/**
 * Universo Platformo | Start Backend – Onboarding Service
 *
 * Handles onboarding logic with Supabase as the data store.
 * For initial setup, returns empty onboarding items (no projects/campaigns/clusters yet).
 * This mirrors the React version but uses Supabase directly instead of TypeORM.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { OnboardingItems, JoinItemsRequest, JoinItemsResponse } from './types.js'

export interface OnboardingServiceConfig {
    supabaseUrl: string
    supabaseServiceRoleKey: string
}

export class OnboardingService {
    private readonly _client: SupabaseClient

    constructor(config: OnboardingServiceConfig) {
        // Create the Supabase admin client once and reuse it across all method calls
        this._client = createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        })
    }

    /**
     * Get all available onboarding items for a user.
     * Returns Projects (Global Goals), Campaigns (Personal Interests), Clusters (Platform Features).
     *
     * For the initial implementation, checks if the user has completed onboarding
     * via a user_metadata field in Supabase.
     */
    async getOnboardingItems(userId: string): Promise<OnboardingItems> {
        try {
            // Check if user has completed onboarding via user metadata
            const { data: userData, error } = await this._client.auth.admin.getUserById(userId)

            if (error) {
                console.error('[OnboardingService] getUserById error:', error.message)
                throw error
            }

            const onboardingCompleted = userData?.user?.user_metadata?.onboarding_completed === true

            // Return empty lists for now — in production, these would come from
            // Projects, Campaigns, Clusters tables managed by system admin
            return {
                projects: [],
                campaigns: [],
                clusters: [],
                onboardingCompleted
            }
        } catch (error) {
            console.error('[OnboardingService] Failed to get onboarding items:', error)
            throw new Error('Failed to retrieve onboarding items')
        }
    }

    /**
     * Join selected onboarding items and mark onboarding as completed.
     */
    async joinItems(userId: string, data: JoinItemsRequest): Promise<JoinItemsResponse> {
        try {
            // Mark onboarding as completed in user metadata
            const { error } = await this._client.auth.admin.updateUserById(userId, {
                user_metadata: {
                    onboarding_completed: true
                }
            })

            if (error) {
                console.error('[OnboardingService] updateUserById error:', error.message)
                throw error
            }

            return {
                success: true,
                added: {
                    projects: data.projectIds.length,
                    campaigns: data.campaignIds.length,
                    clusters: data.clusterIds.length
                },
                removed: {
                    projects: 0,
                    campaigns: 0,
                    clusters: 0
                },
                onboardingCompleted: true
            }
        } catch (error) {
            console.error('[OnboardingService] Failed to join items:', error)
            throw new Error('Failed to save onboarding selections')
        }
    }
}

export function createOnboardingService(config: OnboardingServiceConfig): OnboardingService {
    return new OnboardingService(config)
}
