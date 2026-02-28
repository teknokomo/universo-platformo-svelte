<script lang="ts">
    /**
     * OnboardingWizard – Multi-step wizard for new authenticated users
     *
     * Guides users through selecting:
     * - Projects (Global Goals)
     * - Campaigns (Personal Interests)
     * - Clusters (Platform Features)
     *
     * Dispatches 'complete' event when the user finishes.
     */
    import { createEventDispatcher } from 'svelte'

    export let apiBase: string = '/api/v1'

    const dispatch = createEventDispatcher<{ complete: void }>()

    let step = 0
    let loading = false
    let error: string | null = null

    const steps = ['Welcome', 'Projects', 'Campaigns', 'Clusters', 'Complete']

    let selectedProjects: string[] = []
    let selectedCampaigns: string[] = []
    let selectedClusters: string[] = []

    let projects: Array<{ id: string; name: string; description?: string; isSelected: boolean }> = []
    let campaigns: Array<{ id: string; name: string; description?: string; isSelected: boolean }> = []
    let clusters: Array<{ id: string; name: string; description?: string; isSelected: boolean }> = []

    let itemsLoaded = false

    async function loadItems() {
        loading = true
        error = null
        try {
            const res = await fetch(`${apiBase}/onboarding/items`, { credentials: 'include' })
            if (!res.ok) throw new Error('Failed to load onboarding items')
            const data = await res.json()
            projects = data.projects ?? []
            campaigns = data.campaigns ?? []
            clusters = data.clusters ?? []
            selectedProjects = projects.filter((p) => p.isSelected).map((p) => p.id)
            selectedCampaigns = campaigns.filter((c) => c.isSelected).map((c) => c.id)
            selectedClusters = clusters.filter((c) => c.isSelected).map((c) => c.id)
        } catch (err) {
            error = err instanceof Error ? err.message : 'Failed to load items'
        } finally {
            loading = false
            itemsLoaded = true
        }
    }

    async function handleComplete() {
        loading = true
        error = null
        try {
            const res = await fetch(`${apiBase}/onboarding/join`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectIds: selectedProjects,
                    campaignIds: selectedCampaigns,
                    clusterIds: selectedClusters
                })
            })
            if (!res.ok) throw new Error('Failed to save selections')
            dispatch('complete')
        } catch (err) {
            error = err instanceof Error ? err.message : 'Failed to complete onboarding'
        } finally {
            loading = false
        }
    }

    function toggleItem(list: string[], id: string): string[] {
        return list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    }

    $: if (step === 1 && !itemsLoaded && !loading) {
        loadItems()
    }
</script>

<div class="wizard">
    <div class="wizard-header">
        <h2 class="wizard-title">Welcome to Universo Platformo</h2>
        <p class="wizard-subtitle">Let's personalise your experience in a few steps</p>
        <div class="wizard-steps">
            {#each steps as label, i}
                <div class="step-dot" class:active={i === step} class:done={i < step}>
                    <span>{i < step ? '✓' : i + 1}</span>
                </div>
            {/each}
        </div>
    </div>

    <div class="wizard-body">
        {#if step === 0}
            <!-- Welcome step -->
            <div class="wizard-step">
                <h3>Hello, explorer! 👋</h3>
                <p>
                    We'll quickly help you choose the Projects, Campaigns, and Clusters that interest you most.
                    This takes only a minute.
                </p>
                <button class="btn btn-primary" on:click={() => (step = 1)} disabled={loading}>
                    Let's start
                </button>
            </div>

        {:else if step === 1}
            <!-- Projects step -->
            <div class="wizard-step">
                <h3>Global Goals (Projects)</h3>
                <p>Select the global projects you'd like to contribute to:</p>
                {#if loading}
                    <div class="spinner" aria-label="Loading…"></div>
                {:else if projects.length === 0}
                    <p class="empty-hint">No projects available yet. You can continue.</p>
                {:else}
                    <div class="items-grid">
                        {#each projects as item}
                            <button
                                class="item-card"
                                class:selected={selectedProjects.includes(item.id)}
                                on:click={() => (selectedProjects = toggleItem(selectedProjects, item.id))}
                            >
                                <span class="item-name">{item.name}</span>
                                {#if item.description}<span class="item-desc">{item.description}</span>{/if}
                            </button>
                        {/each}
                    </div>
                {/if}
                <div class="wizard-nav">
                    <button class="btn btn-secondary" on:click={() => (step = 0)}>Back</button>
                    <button class="btn btn-primary" on:click={() => (step = 2)} disabled={loading}>Next</button>
                </div>
            </div>

        {:else if step === 2}
            <!-- Campaigns step -->
            <div class="wizard-step">
                <h3>Personal Interests (Campaigns)</h3>
                <p>Choose campaigns that match your interests:</p>
                {#if campaigns.length === 0}
                    <p class="empty-hint">No campaigns available yet. You can continue.</p>
                {:else}
                    <div class="items-grid">
                        {#each campaigns as item}
                            <button
                                class="item-card"
                                class:selected={selectedCampaigns.includes(item.id)}
                                on:click={() => (selectedCampaigns = toggleItem(selectedCampaigns, item.id))}
                            >
                                <span class="item-name">{item.name}</span>
                                {#if item.description}<span class="item-desc">{item.description}</span>{/if}
                            </button>
                        {/each}
                    </div>
                {/if}
                <div class="wizard-nav">
                    <button class="btn btn-secondary" on:click={() => (step = 1)}>Back</button>
                    <button class="btn btn-primary" on:click={() => (step = 3)}>Next</button>
                </div>
            </div>

        {:else if step === 3}
            <!-- Clusters step -->
            <div class="wizard-step">
                <h3>Platform Features (Clusters)</h3>
                <p>Select the platform feature areas you'd like to explore:</p>
                {#if clusters.length === 0}
                    <p class="empty-hint">No clusters available yet. You can continue.</p>
                {:else}
                    <div class="items-grid">
                        {#each clusters as item}
                            <button
                                class="item-card"
                                class:selected={selectedClusters.includes(item.id)}
                                on:click={() => (selectedClusters = toggleItem(selectedClusters, item.id))}
                            >
                                <span class="item-name">{item.name}</span>
                                {#if item.description}<span class="item-desc">{item.description}</span>{/if}
                            </button>
                        {/each}
                    </div>
                {/if}
                <div class="wizard-nav">
                    <button class="btn btn-secondary" on:click={() => (step = 2)}>Back</button>
                    <button class="btn btn-primary" on:click={handleComplete} disabled={loading}>
                        {loading ? 'Saving…' : 'Complete setup'}
                    </button>
                </div>
            </div>
        {/if}

        {#if error}
            <p class="error-msg" role="alert">{error}</p>
        {/if}
    </div>
</div>

<style>
    .wizard {
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        max-width: 640px;
        margin: 2rem auto;
    }

    .wizard-header {
        background: linear-gradient(135deg, #1976d2, #0288d1);
        color: #fff;
        padding: 2rem;
        text-align: center;
    }

    .wizard-title {
        font-size: 1.5rem;
        margin: 0 0 0.5rem;
    }

    .wizard-subtitle {
        margin: 0 0 1.5rem;
        opacity: 0.85;
    }

    .wizard-steps {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
    }

    .step-dot {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: 600;
        transition: background 0.2s;
    }

    .step-dot.active {
        background: #ffffff;
        color: #1976d2;
    }

    .step-dot.done {
        background: rgba(255, 255, 255, 0.6);
    }

    .wizard-body {
        padding: 2rem;
    }

    .wizard-step {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .wizard-step h3 {
        font-size: 1.15rem;
        margin: 0;
        color: #0f172a;
    }

    .wizard-step p {
        color: #475569;
        margin: 0;
        line-height: 1.6;
    }

    .empty-hint {
        color: #94a3b8 !important;
        font-style: italic;
    }

    .items-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 0.75rem;
    }

    .item-card {
        padding: 0.75rem;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        background: #f8fafc;
        cursor: pointer;
        text-align: left;
        transition: border-color 0.2s, background 0.2s;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .item-card:hover {
        border-color: #1976d2;
        background: #eff6ff;
    }

    .item-card.selected {
        border-color: #1976d2;
        background: #dbeafe;
    }

    .item-name {
        font-weight: 600;
        font-size: 0.9rem;
        color: #0f172a;
    }

    .item-desc {
        font-size: 0.8rem;
        color: #64748b;
    }

    .wizard-nav {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        padding-top: 0.5rem;
    }

    .btn {
        padding: 0.625rem 1.5rem;
        border-radius: 6px;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition: background 0.2s;
    }

    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .btn-primary {
        background: #1976d2;
        color: #ffffff;
    }

    .btn-primary:hover:not(:disabled) {
        background: #1565c0;
    }

    .btn-secondary {
        background: #e2e8f0;
        color: #0f172a;
    }

    .btn-secondary:hover {
        background: #cbd5e1;
    }

    .spinner {
        width: 2rem;
        height: 2rem;
        border: 3px solid #e2e8f0;
        border-top-color: #1976d2;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin: 1rem auto;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .error-msg {
        color: #dc2626;
        font-size: 0.85rem;
        margin-top: 0.5rem;
    }
</style>
