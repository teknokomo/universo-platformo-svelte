/**
 * Universo Platformo | Auth Backend – Session Management
 *
 * Utilities for managing auth sessions via HTTP cookies.
 * Session data is stored in a signed cookie containing the Supabase access token.
 */

import type { SessionCookieData } from './types.js'

export const SESSION_COOKIE_NAME = 'up_session'
export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days in seconds

/**
 * Serialize session data to a JSON string for storage in a cookie
 */
export function serializeSession(data: SessionCookieData): string {
    return Buffer.from(JSON.stringify(data)).toString('base64')
}

/**
 * Deserialize session data from a cookie value
 */
export function deserializeSession(cookieValue: string): SessionCookieData | null {
    try {
        const json = Buffer.from(cookieValue, 'base64').toString('utf-8')
        const data = JSON.parse(json) as SessionCookieData

        // Validate required fields
        if (!data.userId || !data.email || !data.accessToken) {
            return null
        }

        // Check expiry if present
        if (data.expiresAt && data.expiresAt * 1000 < Date.now()) {
            return null
        }

        return data
    } catch {
        return null
    }
}

/**
 * Create cookie options for the session cookie
 */
export function getSessionCookieOptions(secure: boolean = true): {
    httpOnly: boolean
    secure: boolean
    sameSite: 'strict' | 'lax' | 'none'
    maxAge: number
    path: string
} {
    return {
        httpOnly: true,
        secure,
        sameSite: 'lax',
        maxAge: SESSION_COOKIE_MAX_AGE,
        path: '/'
    }
}
