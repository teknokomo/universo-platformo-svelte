<script lang="ts">
    /**
     * Root page – Shows StartPage (guest or authenticated view based on auth state).
     */
    import { StartPage } from '@universo/start-frt'
    import { isAuthenticated, authLoading } from '$lib/stores/auth'
</script>

<StartPage
    isAuthenticated={$isAuthenticated}
    loading={$authLoading}
    authPath="/auth"
    apiBase="/api/v1"
/>
