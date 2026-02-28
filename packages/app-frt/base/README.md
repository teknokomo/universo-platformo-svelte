# app-frt

Main SvelteKit application for Universo Platformo (Svelte stack).

## Overview

The `app-frt` package is the primary SvelteKit application that:

1. **Hosts the frontend** – Imports Svelte components from `@universo/start-frt`
2. **Provides backend API routes** – Auth and onboarding endpoints served by SvelteKit
3. **Manages sessions** – Cookie-based session verification via server hooks

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Start page (guest or authenticated view based on session) |
| `/auth` | Login and registration page (redirects to `/` if already authenticated) |
| `GET /api/auth/me` | Returns current user from session |
| `POST /api/auth/login` | Login with email/password via Supabase |
| `POST /api/auth/logout` | Clear session cookie |
| `POST /api/auth/register` | Register new user via Supabase |
| `GET /api/auth/csrf` | Returns a CSRF token |
| `GET /api/v1/onboarding/items` | Get onboarding items (auth required) |
| `POST /api/v1/onboarding/join` | Save onboarding selections (auth required) |

## Development

```bash
# Copy environment file
cp ../../../.env.example .env
# Edit .env with your Supabase credentials

# Start development server
pnpm dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `SESSION_SECRET` | Secret for session signing (min 32 chars) |
| `PUBLIC_APP_URL` | Public application URL |

## Architecture

```
src/
├── routes/
│   ├── +layout.server.ts     # Pass user session to all pages
│   ├── +layout.ts            # Client-side layout load
│   ├── +layout.svelte        # Root layout (init auth store)
│   ├── +page.svelte          # Root page → StartPage component
│   ├── auth/
│   │   ├── +page.server.ts   # Redirect authenticated users
│   │   └── +page.svelte      # Login/register form
│   └── api/
│       ├── auth/             # Auth endpoints
│       └── v1/onboarding/    # Onboarding endpoints
├── lib/
│   ├── server/
│   │   ├── supabase.ts       # AuthService singleton
│   │   └── onboarding.ts     # OnboardingService singleton
│   └── stores/
│       └── auth.ts           # Client-side auth store
└── hooks.server.ts           # Session middleware
```
