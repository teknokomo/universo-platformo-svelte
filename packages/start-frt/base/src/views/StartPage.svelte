<script lang="ts">
    /**
     * StartPage – Conditional start page based on authentication status
     *
     * Shows:
     * - GuestStartPage for non-authenticated users (landing with testimonials)
     * - AuthenticatedStartPage for authenticated users (onboarding wizard)
     *
     * Determines auth state from the `isAuthenticated` prop passed by the SvelteKit layout.
     */
    import GuestStartPage from './GuestStartPage.svelte'
    import AuthenticatedStartPage from './AuthenticatedStartPage.svelte'

    export let isAuthenticated: boolean = false
    export let loading: boolean = false
    export let authPath: string = '/auth'
    export let apiBase: string = '/api/v1'
</script>

{#if loading}
    <div class="loader" role="status" aria-label="Checking authentication…">
        <div class="spinner"></div>
    </div>
{:else if isAuthenticated}
    <AuthenticatedStartPage {apiBase} />
{:else}
    <GuestStartPage {authPath} />
{/if}

<style>
    .loader {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
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
</style>
