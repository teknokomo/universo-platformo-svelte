<script lang="ts">
    /**
     * CompletionStep – Shown when onboarding is already completed
     */
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher<{ startOver: void }>()
</script>

<div class="completion">
    <div class="completion-icon" aria-hidden="true">🎉</div>
    <h2>You're all set!</h2>
    <p>Your Universo Platformo profile is ready. Start exploring worlds, projects, and communities.</p>
    <div class="completion-actions">
        <a href="/" class="btn btn-primary">Go to dashboard</a>
        <button class="btn btn-secondary" on:click={() => dispatch('startOver')}>
            Update preferences
        </button>
    </div>
</div>

<style>
    .completion {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        text-align: center;
        padding: 3rem 2rem;
    }

    .completion-icon {
        font-size: 3.5rem;
        line-height: 1;
    }

    .completion h2 {
        font-size: 1.75rem;
        margin: 0;
        color: #0f172a;
    }

    .completion p {
        color: #475569;
        max-width: 480px;
        line-height: 1.6;
        margin: 0;
    }

    .completion-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
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
        text-decoration: none;
    }

    .btn-primary {
        background: #1976d2;
        color: #ffffff;
    }

    .btn-primary:hover {
        background: #1565c0;
    }

    .btn-secondary {
        background: #e2e8f0;
        color: #0f172a;
    }

    .btn-secondary:hover {
        background: #cbd5e1;
    }
</style>
