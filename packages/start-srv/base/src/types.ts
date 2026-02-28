/**
 * Universo Platformo | Start Backend – Types
 */

export interface OnboardingItem {
    id: string
    name: string
    description?: string
    isSelected: boolean
}

export interface OnboardingItems {
    projects: OnboardingItem[]
    campaigns: OnboardingItem[]
    clusters: OnboardingItem[]
    onboardingCompleted: boolean
}

export interface JoinItemsRequest {
    projectIds: string[]
    campaignIds: string[]
    clusterIds: string[]
}

export interface JoinItemsResponse {
    success: boolean
    added: {
        projects: number
        campaigns: number
        clusters: number
    }
    removed: {
        projects: number
        campaigns: number
        clusters: number
    }
    onboardingCompleted: boolean
}
