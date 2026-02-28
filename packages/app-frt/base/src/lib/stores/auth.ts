/**
 * Universo Platformo | App Frontend – Auth Store
 *
 * Client-side auth state store.
 * Initialized from server-side page.data (passed via +layout.ts).
 */
import { writable, derived } from 'svelte/store'

export interface AuthUser {
    id: string
    email: string
}

export interface AuthState {
    user: AuthUser | null
    loading: boolean
}

function createAuthStore() {
    const { subscribe, set, update } = writable<AuthState>({
        user: null,
        loading: true
    })

    return {
        subscribe,

        /** Set the auth state after server response */
        setUser: (user: AuthUser | null) => {
            update((state) => ({ ...state, user, loading: false }))
        },

        /** Mark auth as no longer loading */
        setLoaded: () => {
            update((state) => ({ ...state, loading: false }))
        },

        /** Login via the backend API */
        login: async (email: string, password: string): Promise<void> => {
            update((state) => ({ ...state, loading: true }))
            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                })

                if (!res.ok) {
                    const err = await res.json().catch(() => ({ message: 'Login failed' }))
                    throw new Error(err.message ?? 'Login failed')
                }

                const data = await res.json()
                update(() => ({ user: data.user, loading: false }))
            } catch (err) {
                update((state) => ({ ...state, loading: false }))
                throw err
            }
        },

        /** Logout via the backend API */
        logout: async (): Promise<void> => {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })
            set({ user: null, loading: false })
        },

        /** Refresh session from backend */
        refresh: async (): Promise<AuthUser | null> => {
            update((state) => ({ ...state, loading: true }))
            try {
                const res = await fetch('/api/auth/me', { credentials: 'include' })
                if (!res.ok) {
                    set({ user: null, loading: false })
                    return null
                }
                const user = await res.json()
                set({ user, loading: false })
                return user
            } catch {
                set({ user: null, loading: false })
                return null
            }
        }
    }
}

export const auth = createAuthStore()

export const isAuthenticated = derived(auth, ($auth) => !!$auth.user)
export const currentUser = derived(auth, ($auth) => $auth.user)
export const authLoading = derived(auth, ($auth) => $auth.loading)
