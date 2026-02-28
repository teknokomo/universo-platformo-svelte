# @universo/start-frt

Start page frontend component library for Universo Platformo (Svelte).

## Overview

A Svelte component library that provides the start page experience:
- **GuestStartPage** – Landing page for non-authenticated visitors
- **AuthenticatedStartPage** – Onboarding wizard for new authenticated users
- **StartPage** – Smart wrapper that shows the correct page based on auth state

Mirrors the architecture of `@universo/start-frontend` from the React stack.

## Components

### Views

| Component | Description |
|-----------|-------------|
| `StartPage` | Conditional page (guest vs authenticated) based on `isAuthenticated` prop |
| `GuestStartPage` | Hero + Testimonials + Footer for non-authenticated users |
| `AuthenticatedStartPage` | Onboarding wizard for new users; completion screen for returning users |

### Sub-components (Views)

| Component | Description |
|-----------|-------------|
| `Hero` | Main hero section with "Enter all worlds" heading and CTA button |
| `Testimonials` | 4-card testimonials grid |

### Shared Components

| Component | Description |
|-----------|-------------|
| `StartFooter` | Footer with branding and links (two variants: `landing`, `internal`) |
| `OnboardingWizard` | Multi-step wizard for selecting Projects, Campaigns, Clusters |
| `CompletionStep` | Shown when onboarding has already been completed |

## Usage (from SvelteKit app)

```svelte
<script>
    import { StartPage } from '@universo/start-frt'
    import { isAuthenticated, authLoading } from '$lib/stores/auth'
</script>

<StartPage
    isAuthenticated={$isAuthenticated}
    loading={$authLoading}
    authPath="/auth"
    apiBase="/api/v1"
/>
```

## API Endpoints Expected

The `AuthenticatedStartPage` and `OnboardingWizard` components call:

- `GET /api/v1/onboarding/items` — Returns onboarding items and completion status
- `POST /api/v1/onboarding/join` — Saves selections and marks onboarding complete
