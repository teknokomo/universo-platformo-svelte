# @universo/auth-srv

Authentication backend library for Universo Platformo (Svelte stack).

## Overview

Provides server-side authentication operations using Supabase as the identity provider.
No framework coupling — works with SvelteKit, Express, or any Node.js server.

## Features

- Login / Register with email and password via Supabase
- JWT token verification using Supabase Admin API
- Session refresh with Supabase refresh tokens
- HTTP-only cookie session management helpers

## Usage

```typescript
import { createAuthService, serializeSession, SESSION_COOKIE_NAME, getSessionCookieOptions } from '@universo/auth-srv'

const authService = createAuthService({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
})

// Login
const { user, session } = await authService.login({ email, password })

// Verify token
const user = await authService.verifyToken(accessToken)
```

## Architecture

- `src/types.ts` — Shared auth type definitions
- `src/supabase.ts` — Supabase client factory functions
- `src/auth.service.ts` — `AuthService` class with login/register/verify methods
- `src/session.ts` — Session cookie serialization helpers

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous key (for user auth) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (for admin operations) |
