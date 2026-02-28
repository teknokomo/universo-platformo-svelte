# Universo Platformo – Svelte

Implementation of **Universo Platformo / Universo MMOOMM / Universo Kiberplano** built on SvelteKit and a TypeScript technology stack.

## Overview

Universo Platformo is an open platform for creating immersive multi-world experiences.
This repository is the **Svelte/SvelteKit** implementation and mirrors the architecture of
[universo-platformo-react](https://github.com/teknokomo/universo-platformo-react).

The project is structured as a **PNPM monorepo** where every feature lives in its own package under `packages/`.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend framework | [SvelteKit 2](https://kit.svelte.dev/) (SSR + client routing) |
| Language | TypeScript 5 |
| Package manager | PNPM 8 (workspaces) |
| Identity / Auth | [Supabase](https://supabase.com/) (server-side only) |
| Session security | HMAC-SHA256 signed HTTP-only cookies |
| Build tool | Vite 5 |
| Node adapter | `@sveltejs/adapter-node` |

> **Security principle:** the browser **never** contacts Supabase directly.
> All identity operations go through the SvelteKit backend.

---

## Monorepo Structure

```
packages/
├── auth-srv/base/       # Auth backend library (Supabase operations, signed session cookies)
├── start-srv/base/      # Start page backend library (onboarding service)
├── start-frt/base/      # Svelte component library (landing and onboarding UI)
└── app-frt/base/        # Main SvelteKit application (routes, server hooks, API endpoints)
```

---

## Packages

### `@universo/auth-srv`

Server-side authentication library. Framework-agnostic; works with any Node.js server.

- Login / Registration via Supabase email + password
- Token verification with Supabase Admin API
- Silent session refresh via Supabase refresh tokens
- HMAC-SHA256 signed session cookies (integrity without round-trips to Supabase)

### `@universo/start-srv`

Onboarding backend library. Stores and reads onboarding state from Supabase user metadata.

- `getOnboardingItems(userId)` – returns available Projects, Campaigns, Clusters
- `joinItems(userId, data)` – saves selections and marks onboarding as completed

### `@universo/start-frt`

Svelte component library for the start page experience.

| Component | Description |
|---|---|
| `StartPage` | Smart wrapper – shows guest or authenticated view |
| `GuestStartPage` | Landing page: hero, testimonials, footer |
| `AuthenticatedStartPage` | Onboarding wizard or completion screen |
| `Hero` | "Enter all worlds" hero section with CTA |
| `Testimonials` | Four-card testimonials grid |
| `OnboardingWizard` | Multi-step wizard (Projects → Campaigns → Clusters) |
| `CompletionStep` | Shown when onboarding is already completed |
| `StartFooter` | Footer with branding and links |

### `app-frt`

Main SvelteKit application. Consumes all packages above.

**Pages**

| Route | Description |
|---|---|
| `/` | Start page (guest or authenticated based on session) |
| `/auth` | Login and registration page (redirects to `/` if authenticated) |

**API Routes**

| Method + Path | Description |
|---|---|
| `POST /api/auth/login` | Authenticate with email and password; sets session cookie |
| `POST /api/auth/logout` | Clear session cookie |
| `GET /api/auth/me` | Return current user from session |
| `POST /api/auth/register` | Register a new user |
| `GET /api/auth/csrf` | CSRF token endpoint |
| `GET /api/v1/onboarding/items` | Get onboarding items (auth required) |
| `POST /api/v1/onboarding/join` | Save onboarding selections (auth required) |

---

## Authentication Flow

```
Browser                      SvelteKit backend               Supabase
   │                                │                            │
   │  POST /api/auth/login          │                            │
   │ ──────────────────────────────>│                            │
   │                                │  signInWithPassword()      │
   │                                │ ──────────────────────────>│
   │                                │<── { user, session }───────│
   │                                │                            │
   │  Set-Cookie: up_session        │                            │
   │  (HMAC-signed, httpOnly)       │                            │
   │<───────────────────────────────│                            │
   │                                │                            │
   │  GET / (any page)              │                            │
   │ ──────────────────────────────>│                            │
   │                                │  verify HMAC locally       │
   │                                │  (no Supabase call needed) │
   │<── locals.user populated ──────│                            │
```

Session cookies are **HMAC-SHA256 signed** with `SESSION_SECRET`.
The server verifies the signature locally on every request — no Supabase round-trip needed for valid sessions.
When a token expires, the server attempts a silent refresh via the stored refresh token.

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- PNPM ≥ 8 (`npm install -g pnpm`)
- A [Supabase](https://supabase.com/) project

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
cp .env.example packages/app-frt/base/.env
# Edit the .env file and fill in your Supabase credentials and SESSION_SECRET

# 3. Start the development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables

Copy `.env.example` to `packages/app-frt/base/.env` and fill in the values:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SESSION_SECRET=your-session-secret-min-32-chars
PUBLIC_APP_URL=http://localhost:5173
```

> `SESSION_SECRET` must be **at least 32 characters** long.
> It is used to sign session cookies with HMAC-SHA256.

### Build for Production

```bash
pnpm build
```

---

## Project Conventions

- All source packages live under `packages/<name>/base/`
- Backend libraries (`*-srv`) are framework-agnostic TypeScript
- Frontend libraries (`*-frt`) are Svelte component packages
- The `app-frt` package is the single deployable SvelteKit application
- English and Russian documentation are maintained in parallel (`README.md` / `README-RU.md`)

---

## License

Omsk Open License – see individual package files for details.
