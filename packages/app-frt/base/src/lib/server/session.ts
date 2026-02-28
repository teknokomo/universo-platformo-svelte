/**
 * Universo Platformo | App Frontend – Session Secret
 *
 * Returns the SESSION_SECRET from environment variables.
 * The secret is used to sign and verify session cookies with HMAC-SHA256.
 */

import { env } from '$env/dynamic/private'

let _sessionSecret: string | null = null

/**
 * Returns the validated SESSION_SECRET.
 * Throws if the variable is missing or too short (< 32 chars).
 */
export function getSessionSecret(): string {
    if (!_sessionSecret) {
        const secret = env.SESSION_SECRET

        if (!secret || secret.length < 32) {
            throw new Error(
                'SESSION_SECRET environment variable is missing or too short. ' +
                    'It must be at least 32 characters. Set it in your .env file.'
            )
        }

        _sessionSecret = secret
    }

    return _sessionSecret
}
