<script lang="ts">
    /**
     * AuthenticatedStartPage – Onboarding wizard for new authenticated users
     *
     * Displays a multi-step wizard to help users select their interests:
     * - Projects (Global Goals)
     * - Campaigns (Personal Interests)
     * - Clusters (Platform Features)
     *
     * If onboarding is already completed, shows the CompletionStep directly.
     * Footer with contact information is shown at the bottom.
     */
    import { onMount } from 'svelte'
    import OnboardingWizard from '../components/OnboardingWizard.svelte'
    import CompletionStep from '../components/CompletionStep.svelte'
    import StartFooter from '../components/StartFooter.svelte'

    export let apiBase: string = '/api/v1'

    let isReady = false
    let onboardingCompleted: boolean | null = null
    let error: string | null = null

    onMount(async () => {
        try {
            const res = await fetch(`${apiBase}/onboarding/items`, { credentials: 'include' })
            if (!res.ok) throw new Error('Failed to fetch onboarding status')
            const data = await res.json()
            onboardingCompleted = data.onboardingCompleted ?? false
        } catch (err) {
            console.error('[AuthenticatedStartPage] Failed to check onboarding status:', err)
            // Default to showing wizard on error (intentional UX fallback)
            onboardingCompleted = false
        } finally {
            isReady = true
        }
    })

    function handleComplete() {
        onboardingCompleted = true
    }

    function handleStartOver() {
        onboardingCompleted = false
    }
</script>

<div class="authenticated-page">
    <div class="page-content">
        {#if !isReady}
            <!-- Loading state -->
            <div class="loader-wrapper" role="status" aria-label="Loading…">
                <div class="spinner"></div>
            </div>
        {:else if onboardingCompleted}
            <!-- Already onboarded -->
            <div class="container">
                <CompletionStep on:startOver={handleStartOver} />
            </div>
        {:else}
            <!-- Show wizard -->
            <div class="container">
                <OnboardingWizard {apiBase} on:complete={handleComplete} />
            </div>
        {/if}

        {#if error}
            <p class="error-msg" role="alert">{error}</p>
        {/if}
    </div>

    <StartFooter variant="internal" />
</div>

<style>
    .authenticated-page {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .page-content {
        flex: 1;
        padding: 2rem 1rem;
    }

    .container {
        max-width: 800px;
        margin: 0 auto;
        padding-top: 2rem;
    }

    .loader-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 50vh;
    }

    .spinner {
        width: 3rem;
        height: 3rem;
        border: 4px solid #e2e8f0;
        border-top-color: #1976d2;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .error-msg {
        color: #dc2626;
        text-align: center;
        margin-top: 1rem;
    }
</style>
