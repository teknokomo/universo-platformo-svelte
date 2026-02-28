/**
 * Universo Platformo | App Frontend – Server Validation Helpers
 *
 * Shared utilities for validating user input in API route handlers.
 */

/**
 * Basic server-side email format check.
 * Full validation (domain existence, MX records, etc.) is delegated to Supabase.
 */
export function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
