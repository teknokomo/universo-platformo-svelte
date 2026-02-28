/**
 * Universo Platformo | Auth Backend – Types
 *
 * Shared type definitions for authentication.
 */

export interface AuthUser {
    id: string
    email: string
}

export interface AuthSession {
    userId: string
    email: string
    accessToken: string
    refreshToken?: string
    expiresAt?: number
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterCredentials {
    email: string
    password: string
    termsAccepted?: boolean
    privacyAccepted?: boolean
}

export interface AuthResult {
    user: AuthUser
    session: AuthSession
}

export interface SessionCookieData {
    userId: string
    email: string
    accessToken: string
    refreshToken?: string
    expiresAt?: number
}
