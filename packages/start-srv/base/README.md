# @universo/start-srv

Start page backend library for Universo Platformo (Svelte stack).

## Overview

Provides onboarding service logic for the start page of Universo Platformo.
Uses Supabase as the data store. No framework coupling.

## Features

- Get onboarding items (Projects, Campaigns, Clusters) for a user
- Save user's onboarding selections and mark onboarding as completed
- Checks onboarding status from Supabase user metadata

## Usage

```typescript
import { createOnboardingService } from '@universo/start-srv'

const onboardingService = createOnboardingService({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
})

// Get items
const items = await onboardingService.getOnboardingItems(userId)

// Join items
const result = await onboardingService.joinItems(userId, {
    projectIds: ['...'],
    campaignIds: ['...'],
    clusterIds: ['...']
})
```

## Architecture

- `src/types.ts` — Onboarding type definitions
- `src/onboarding.service.ts` — `OnboardingService` class

## Notes

The initial implementation stores onboarding state in Supabase user metadata.
In production, Projects, Campaigns, and Clusters would be fetched from dedicated tables.
