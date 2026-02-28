<script lang="ts">
    /**
     * Auth page – Login and registration forms.
     *
     * - Handles login via /api/auth/login
     * - Handles registration via /api/auth/register
     * - Redirects to / on successful login
     */
    import { goto } from '$app/navigation'
    import { auth } from '$lib/stores/auth'

    let mode: 'login' | 'register' = 'login'
    let email = ''
    let password = ''
    let confirmPassword = ''
    let error: string | null = null
    let success: string | null = null
    let loading = false

    async function handleLogin(e: Event) {
        e.preventDefault()
        error = null
        loading = true
        try {
            await auth.login(email, password)
            await goto('/')
        } catch (err) {
            error = err instanceof Error ? err.message : 'Login failed'
        } finally {
            loading = false
        }
    }

    async function handleRegister(e: Event) {
        e.preventDefault()
        error = null
        success = null

        if (password !== confirmPassword) {
            error = 'Passwords do not match'
            return
        }

        loading = true
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, termsAccepted: true, privacyAccepted: true })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message ?? 'Registration failed')
            success = data.message ?? 'Registration successful! Check your email to confirm.'
            mode = 'login'
        } catch (err) {
            error = err instanceof Error ? err.message : 'Registration failed'
        } finally {
            loading = false
        }
    }
</script>

<svelte:head>
    <title>Sign in – Universo Platformo</title>
</svelte:head>

<div class="auth-page">
    <div class="auth-card">
        <div class="auth-logo">
            <span class="logo-symbol">🌌</span>
            <span class="logo-text">Universo Platformo</span>
        </div>

        <h1 class="auth-title">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h1>

        <p class="auth-subtitle">
            {mode === 'login'
                ? 'Sign in to your account to continue'
                : 'Join and explore all worlds'}
        </p>

        {#if success}
            <div class="alert alert-success" role="status">{success}</div>
        {/if}

        {#if error}
            <div class="alert alert-error" role="alert">{error}</div>
        {/if}

        {#if mode === 'login'}
            <form class="auth-form" on:submit={handleLogin} novalidate>
                <div class="field">
                    <label for="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        bind:value={email}
                        required
                        autocomplete="email"
                        placeholder="you@example.com"
                        disabled={loading}
                    />
                </div>

                <div class="field">
                    <label for="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        bind:value={password}
                        required
                        autocomplete="current-password"
                        placeholder="••••••••"
                        disabled={loading}
                    />
                </div>

                <button type="submit" class="btn btn-primary btn-full" disabled={loading}>
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>
            </form>
        {:else}
            <form class="auth-form" on:submit={handleRegister} novalidate>
                <div class="field">
                    <label for="reg-email">Email</label>
                    <input
                        id="reg-email"
                        type="email"
                        bind:value={email}
                        required
                        autocomplete="email"
                        placeholder="you@example.com"
                        disabled={loading}
                    />
                </div>

                <div class="field">
                    <label for="reg-password">Password</label>
                    <input
                        id="reg-password"
                        type="password"
                        bind:value={password}
                        required
                        autocomplete="new-password"
                        placeholder="••••••••"
                        minlength="8"
                        disabled={loading}
                    />
                </div>

                <div class="field">
                    <label for="confirm-password">Confirm password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        bind:value={confirmPassword}
                        required
                        autocomplete="new-password"
                        placeholder="••••••••"
                        disabled={loading}
                    />
                </div>

                <button type="submit" class="btn btn-primary btn-full" disabled={loading}>
                    {loading ? 'Creating account…' : 'Create account'}
                </button>
            </form>
        {/if}

        <div class="auth-switch">
            {#if mode === 'login'}
                <span>Don't have an account?</span>
                <button class="link-btn" on:click={() => { mode = 'register'; error = null; success = null }}>
                    Sign up
                </button>
            {:else}
                <span>Already have an account?</span>
                <button class="link-btn" on:click={() => { mode = 'login'; error = null; success = null }}>
                    Sign in
                </button>
            {/if}
        </div>
    </div>
</div>

<style>
    .auth-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
        padding: 1.5rem;
    }

    .auth-card {
        background: #ffffff;
        border-radius: 12px;
        padding: 2.5rem;
        width: 100%;
        max-width: 400px;
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
    }

    .auth-logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .logo-symbol {
        font-size: 1.5rem;
    }

    .logo-text {
        font-weight: 700;
        font-size: 1rem;
        color: #0f172a;
    }

    .auth-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 0.5rem;
    }

    .auth-subtitle {
        font-size: 0.9rem;
        color: #64748b;
        margin-bottom: 1.5rem;
    }

    .alert {
        padding: 0.75rem 1rem;
        border-radius: 6px;
        font-size: 0.875rem;
        margin-bottom: 1rem;
    }

    .alert-success {
        background: #dcfce7;
        color: #166534;
        border: 1px solid #bbf7d0;
    }

    .alert-error {
        background: #fee2e2;
        color: #991b1b;
        border: 1px solid #fecaca;
    }

    .auth-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .field {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }

    .field label {
        font-size: 0.85rem;
        font-weight: 600;
        color: #374151;
    }

    .field input {
        padding: 0.625rem 0.875rem;
        border: 1.5px solid #d1d5db;
        border-radius: 6px;
        font-size: 0.95rem;
        color: #0f172a;
        background: #f9fafb;
        transition: border-color 0.2s, box-shadow 0.2s;
        outline: none;
    }

    .field input:focus {
        border-color: #1976d2;
        box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.12);
        background: #ffffff;
    }

    .field input:disabled {
        opacity: 0.65;
        cursor: not-allowed;
    }

    .btn {
        padding: 0.75rem 1.5rem;
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

    .btn-full {
        width: 100%;
        margin-top: 0.5rem;
    }

    .auth-switch {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        margin-top: 1.5rem;
        font-size: 0.875rem;
        color: #64748b;
    }

    .link-btn {
        background: none;
        border: none;
        color: #1976d2;
        font-weight: 600;
        font-size: 0.875rem;
        cursor: pointer;
        padding: 0;
        text-decoration: underline;
    }

    .link-btn:hover {
        color: #1565c0;
    }
</style>
