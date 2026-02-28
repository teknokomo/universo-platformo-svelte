/**
 * Universo Platformo | App Frontend – Supabase Server Client
 *
 * Creates server-side Supabase clients using environment variables.
 * Never expose service role key to the client.
 */

import { env } from '$env/dynamic/private'
import { createAuthService } from '@universo/auth-srv'

let _authService: ReturnType<typeof createAuthService> | null = null

export function getAuthService() {
    if (!_authService) {
        const supabaseUrl = env.SUPABASE_URL
        const supabaseAnonKey = env.SUPABASE_ANON_KEY
        const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
            throw new Error(
                'Missing Supabase environment variables. ' +
                    'Ensure SUPABASE_URL, SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY are set.'
            )
        }

        _authService = createAuthService({
            supabaseUrl,
            supabaseAnonKey,
            supabaseServiceRoleKey
        })
    }
    return _authService
}
