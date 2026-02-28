/**
 * Universo Platformo | Auth Backend – Session Management
 *
 * Utilities for managing auth sessions via HTTP cookies.
 * Session data is stored in an HMAC-signed cookie so that:
 *   1. The payload cannot be tampered with (integrity).
 *   2. The server can trust the contents without a round-trip to Supabase on
 *      every request – only a fast local crypto check is needed.
 *
 * Cookie format: <base64url_payload>.<base64url_hmac_sha256_signature>
 */

import { createHmac, timingSafeEqual } from 'node:crypto'
import type { SessionCookieData } from './types.js'

export const SESSION_COOKIE_NAME = 'up_session'
export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days in seconds

/**
 * Serialize session data and sign with HMAC-SHA256 using the provided secret.
 *
 * @param data    Session payload to store in the cookie.
 * @param secret  Server-side secret (SESSION_SECRET env var).  Must be at
 *                least 32 characters long.
 */
export function serializeSession(data: SessionCookieData, secret: string): string {
    if (secret.length < 32) {
        throw new Error('Session secret must be at least 32 characters long')
    }
    const payload = Buffer.from(JSON.stringify(data)).toString('base64url')
    const sig = createHmac('sha256', secret).update(payload).digest('base64url')
    return `${payload}.${sig}`
}

/**
 * Split a cookie value into its payload and decode it, after verifying the
 * HMAC-SHA256 signature with constant-time comparison.
 *
 * Returns the raw parsed object on success, or `null` on any failure.
 * Does NOT check token expiry – callers decide whether expiry matters.
 */
function verifyCookieSignature(cookieValue: string, secret: string): SessionCookieData | null {
    try {
        const dotIndex = cookieValue.lastIndexOf('.')
        if (dotIndex === -1) return null

        const payload = cookieValue.slice(0, dotIndex)
        const sig = cookieValue.slice(dotIndex + 1)

        if (!payload || !sig) return null

        // Constant-time comparison prevents timing-oracle attacks
        const expectedSig = createHmac('sha256', secret).update(payload).digest('base64url')
        const sigBuf = Buffer.from(sig)
        const expectedBuf = Buffer.from(expectedSig)

        if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
            return null
        }

        const json = Buffer.from(payload, 'base64url').toString('utf-8')
        const data = JSON.parse(json) as SessionCookieData

        if (!data.userId || !data.email || !data.accessToken) {
            return null
        }

        return data
    } catch {
        return null
    }
}

/**
 * Verify the HMAC signature and deserialize session data from a cookie value.
 *
 * Returns `null` when:
 *  - The cookie is malformed or the signature does not match (tampered).
 *  - Required fields are missing.
 *  - The token is already expired (expiresAt in the past).
 *
 * @param cookieValue  Raw cookie string value.
 * @param secret       Same secret used to sign the session.
 */
export function deserializeSession(cookieValue: string, secret: string): SessionCookieData | null {
    const data = verifyCookieSignature(cookieValue, secret)
    if (!data) return null

    // Reject expired tokens
    if (data.expiresAt && data.expiresAt * 1000 < Date.now()) {
        return null
    }

    return data
}

/**
 * Like `deserializeSession` but also returns expired sessions so the caller
 * can attempt a token refresh before giving up.
 */
export function deserializeSessionAllowExpired(cookieValue: string, secret: string): SessionCookieData | null {
    // Verify signature but ignore expiry
    return verifyCookieSignature(cookieValue, secret)
}

/**
 * Create cookie options for the session cookie.
 *
 * @param secure  Set to `true` in production (HTTPS-only).
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
