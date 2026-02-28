/**
 * Universo Platformo | Auth Backend
 *
 * Authentication backend library using Supabase.
 * Provides server-side auth operations without framework coupling.
 */

export type { AuthUser, AuthSession, LoginCredentials, RegisterCredentials, AuthResult, SessionCookieData } from './types.js'

export { createSupabaseAdminClient, createSupabaseAnonClient } from './supabase.js'

export { AuthService, createAuthService } from './auth.service.js'
export type { AuthServiceConfig } from './auth.service.js'

export {
    SESSION_COOKIE_NAME,
    SESSION_COOKIE_MAX_AGE,
    serializeSession,
    deserializeSession,
    getSessionCookieOptions
} from './session.js'
