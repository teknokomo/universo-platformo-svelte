<script lang="ts">
    /**
     * Root layout – Initialises auth store from server data and provides app shell.
     */
    import { onMount } from 'svelte'
    import { auth } from '$lib/stores/auth'
    import type { LayoutData } from './$types'

    export let data: LayoutData

    // Initialise auth store from server-side session data
    $: auth.setUser(data.user ?? null)
</script>

<slot />

<style>
    :global(*) {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    :global(body) {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
            'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
