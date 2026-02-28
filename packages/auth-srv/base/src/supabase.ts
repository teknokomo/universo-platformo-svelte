/**
 * Universo Platformo | Auth Backend – Supabase Client
 *
 * Creates Supabase clients for server-side auth operations.
 * Uses the service-role key for admin operations and anon key for user auth.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Create a Supabase client with service-role key (admin operations)
 */
export function createSupabaseAdminClient(supabaseUrl: string, serviceRoleKey: string): SupabaseClient {
    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
}

/**
 * Create a Supabase client with anon key (user-level auth)
 */
export function createSupabaseAnonClient(supabaseUrl: string, anonKey: string): SupabaseClient {
    return createClient(supabaseUrl, anonKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
}
