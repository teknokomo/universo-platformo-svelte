/**
 * Universo Platformo | Auth Backend – Auth Service
 *
 * Authentication operations via Supabase.
 * All auth operations go through the backend (not direct Supabase client in browser).
 */

import { createSupabaseAnonClient, createSupabaseAdminClient } from './supabase.js'
import type { AuthUser, AuthSession, LoginCredentials, RegisterCredentials, AuthResult } from './types.js'

export interface AuthServiceConfig {
    supabaseUrl: string
    supabaseAnonKey: string
    supabaseServiceRoleKey: string
}

export class AuthService {
    private readonly supabaseUrl: string
    private readonly supabaseAnonKey: string
    private readonly supabaseServiceRoleKey: string

    constructor(config: AuthServiceConfig) {
        this.supabaseUrl = config.supabaseUrl
        this.supabaseAnonKey = config.supabaseAnonKey
        this.supabaseServiceRoleKey = config.supabaseServiceRoleKey
    }

    /**
     * Login with email and password via Supabase
     */
    async login(credentials: LoginCredentials): Promise<AuthResult> {
        const client = createSupabaseAnonClient(this.supabaseUrl, this.supabaseAnonKey)

        const { data, error } = await client.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password
        })

        if (error) {
            throw new Error(error.message)
        }

        if (!data.user || !data.session) {
            throw new Error('Login failed: no user data returned')
        }

        const user: AuthUser = {
            id: data.user.id,
            email: data.user.email ?? credentials.email
        }

        const session: AuthSession = {
            userId: data.user.id,
            email: user.email,
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            expiresAt: data.session.expires_at
        }

        return { user, session }
    }

    /**
     * Register a new user via Supabase
     */
    async register(credentials: RegisterCredentials): Promise<AuthResult> {
        const client = createSupabaseAnonClient(this.supabaseUrl, this.supabaseAnonKey)

        const { data, error } = await client.auth.signUp({
            email: credentials.email,
            password: credentials.password
        })

        if (error) {
            throw new Error(error.message)
        }

        if (!data.user) {
            throw new Error('Registration failed: no user data returned')
        }

        const user: AuthUser = {
            id: data.user.id,
            email: data.user.email ?? credentials.email
        }

        // Session may be null if email confirmation is required
        const session: AuthSession | null = data.session
            ? {
                  userId: data.user.id,
                  email: user.email,
                  accessToken: data.session.access_token,
                  refreshToken: data.session.refresh_token,
                  expiresAt: data.session.expires_at
              }
            : null

        return { user, session }
    }

    /**
     * Verify an access token and return the user
     */
    async verifyToken(accessToken: string): Promise<AuthUser | null> {
        try {
            const adminClient = createSupabaseAdminClient(this.supabaseUrl, this.supabaseServiceRoleKey)
            const { data, error } = await adminClient.auth.getUser(accessToken)

            if (error || !data.user) {
                return null
            }

            return {
                id: data.user.id,
                email: data.user.email ?? ''
            }
        } catch {
            return null
        }
    }

    /**
     * Refresh a session using the refresh token
     */
    async refreshSession(refreshToken: string): Promise<AuthResult | null> {
        try {
            const client = createSupabaseAnonClient(this.supabaseUrl, this.supabaseAnonKey)

            const { data, error } = await client.auth.refreshSession({ refresh_token: refreshToken })

            if (error || !data.user || !data.session) {
                return null
            }

            const user: AuthUser = {
                id: data.user.id,
                email: data.user.email ?? ''
            }

            const session: AuthSession = {
                userId: data.user.id,
                email: user.email,
                accessToken: data.session.access_token,
                refreshToken: data.session.refresh_token,
                expiresAt: data.session.expires_at
            }

            return { user, session }
        } catch {
            return null
        }
    }
}

/**
 * Create an AuthService instance from environment variables
 */
export function createAuthService(config: AuthServiceConfig): AuthService {
    return new AuthService(config)
}
