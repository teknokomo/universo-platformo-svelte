# Implementation Plan: Initial Setup and Architecture of Universo Platformo Svelte

**Branch**: `001-initial-setup` | **Date**: 2025-11-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/.specify/specs/001-initial-setup/spec.md`

## Summary

Establish the foundational monorepo architecture for Universo Platformo Svelte with PNPM workspace management, comprehensive package structure for modular functionality, Supabase database integration, Passport.js authentication, and Svelte Material UI. All functionality MUST be implemented as packages in the `packages/` directory, with frontend/backend separation and future repository extraction capability. The initial setup creates shared utility packages (@universo/types, @universo/utils, @universo/api-client, @universo/i18n) and establishes patterns for all future feature development.

## Technical Context

**Language/Version**: TypeScript 5.8.3, Svelte 4.2.0, Node.js 18+  
**Primary Dependencies**: SvelteKit 2.0, PNPM 8.0+, Svelte Material UI (SMUI), Supabase, Passport.js  
**Storage**: Supabase (PostgreSQL), designed for future database system extensibility  
**Testing**: Vitest 2.1.8, Testing Library Svelte 4.0.5  
**Target Platform**: Web (browser + Node.js server)  
**Project Type**: Monorepo with multiple packages (frontend + backend separation)  
**Performance Goals**: <2s HMR, <2min full build, <3s authentication  
**Constraints**: Strict modular architecture (NO code outside packages/), bilingual documentation, future package extraction  
**Scale/Scope**: 20+ packages anticipated, foundation for enterprise platform

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **Principle I - Monorepo Architecture**: Compliant - All functionality in packages/ with explicit prohibition of non-package code  
✅ **Principle II - Svelte + TypeScript**: Compliant - Full stack uses Svelte with TypeScript strict mode  
✅ **Principle III - Database/Auth Standards**: Compliant - Supabase + Passport.js with extensibility design  
✅ **Principle IV - Material UI**: Compliant - SMUI (Svelte Material UI) integration  
✅ **Principle V - Bilingual Documentation**: Compliant - All docs created in English and Russian  
✅ **Principle VI - Issue-First Workflow**: Compliant - Issue created before implementation  
✅ **Principle VII - Pattern-Based Development**: Compliant - Establishes base patterns first  
✅ **Principle VIII - Shared Packages**: Compliant - Creates @universo/types, utils, api-client, i18n  

**Gate Status**: ✅ PASSED - No constitutional violations

## Project Structure

### Documentation (this feature)

```text
.specify/specs/001-initial-setup/
├── plan.md              # This file
├── research.md          # Completed - Technical decisions documented
├── data-model.md        # Completed - Core entities defined
├── quickstart.md        # Completed - Getting started guide
├── contracts/           # API contracts directory
│   └── api-contracts.md # Completed - API specifications
└── checklists/          # Verification checklists
    ├── project-review.md
    └── requirements.md
```

### Source Code (repository root)

**CRITICAL**: ALL functionality MUST be in packages/. NO feature code in root src/, lib/, or app/ directories.

```text
/
├── .github/                      # GitHub configuration (workflows, instructions)
├── .specify/                     # Spec Kit configuration and templates
├── packages/                     # ALL FUNCTIONALITY RESIDES HERE
│   │
│   ├── universo-types/          # @universo/types - Shared TypeScript types
│   │   ├── base/
│   │   │   ├── src/
│   │   │   │   ├── common/      # Common types (IDs, timestamps, pagination)
│   │   │   │   ├── ecs/         # Entity Component System types
│   │   │   │   ├── errors/      # Error types and codes
│   │   │   │   ├── protocol/    # Network protocol types
│   │   │   │   ├── updl/        # UPDL types
│   │   │   │   ├── validation/  # Zod schemas
│   │   │   │   └── index.ts
│   │   │   ├── package.json
│   │   │   ├── tsconfig.json
│   │   │   ├── tsdown.config.ts
│   │   │   ├── README.md
│   │   │   └── README-RU.md
│   │   └── README.md
│   │
│   ├── universo-utils/          # @universo/utils - Shared utilities
│   │   ├── base/
│   │   │   ├── src/
│   │   │   │   ├── api/         # API utilities
│   │   │   │   ├── delta/       # Delta compression
│   │   │   │   ├── env/         # Environment validation
│   │   │   │   ├── math/        # Math utilities
│   │   │   │   ├── net/         # Network utilities
│   │   │   │   ├── rate-limiting/ # Rate limiting
│   │   │   │   ├── serialization/ # Serialization
│   │   │   │   ├── ui-utils/    # UI utilities
│   │   │   │   ├── validation/  # Validation helpers
│   │   │   │   ├── index.ts     # Server exports
│   │   │   │   └── index.browser.ts # Browser exports
│   │   │   ├── package.json
│   │   │   ├── tsconfig.json
│   │   │   ├── tsdown.config.ts
│   │   │   ├── README.md
│   │   │   └── README-RU.md
│   │   └── README.md
│   │
│   ├── universo-api-client/     # @universo/api-client - Type-safe API client
│   │   ├── base/
│   │   │   ├── src/
│   │   │   │   ├── clients/     # API client classes
│   │   │   │   ├── hooks/       # Data fetching hooks
│   │   │   │   ├── types/       # Request/response types
│   │   │   │   └── index.ts
│   │   │   ├── package.json
│   │   │   ├── tsconfig.json
│   │   │   ├── tsdown.config.ts
│   │   │   ├── README.md
│   │   │   └── README-RU.md
│   │   └── README.md
│   │
│   ├── universo-i18n/           # @universo/i18n - i18n singleton
│   │   ├── base/
│   │   │   ├── src/
│   │   │   │   ├── instance.ts  # i18next instance
│   │   │   │   ├── registry.ts  # Namespace registry
│   │   │   │   ├── types.ts     # i18n types
│   │   │   │   └── index.ts
│   │   │   ├── package.json
│   │   │   ├── tsconfig.json
│   │   │   ├── tsdown.config.ts
│   │   │   ├── README.md
│   │   │   └── README-RU.md
│   │   └── README.md
│   │
│   ├── core-config/             # @universo/core-config - Centralized config
│   │   ├── base/
│   │   │   ├── src/
│   │   │   │   ├── database.config.ts
│   │   │   │   ├── auth.config.ts
│   │   │   │   ├── theme.config.ts
│   │   │   │   ├── env.config.ts
│   │   │   │   └── index.ts
│   │   │   ├── package.json
│   │   │   ├── tsconfig.json
│   │   │   ├── README.md
│   │   │   └── README-RU.md
│   │   └── README.md
│   │
│   ├── auth-srv/                # @universo/auth-srv - Authentication backend
│   │   ├── base/
│   │   │   ├── src/
│   │   │   │   ├── strategies/
│   │   │   │   │   └── supabase.strategy.ts
│   │   │   │   ├── middleware/
│   │   │   │   │   ├── authenticate.ts
│   │   │   │   │   └── authorize.ts
│   │   │   │   ├── services/
│   │   │   │   │   ├── session.service.ts
│   │   │   │   │   └── token.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── package.json
│   │   │   ├── tsconfig.json
│   │   │   ├── README.md
│   │   │   └── README-RU.md
│   │   └── README.md
│   │
│   └── ui-theme/                # @universo/ui-theme - SMUI theme config
│       ├── base/
│       │   ├── src/
│       │   │   ├── theme.config.ts
│       │   │   ├── components/  # Base UI components
│       │   │   └── index.ts
│       │   ├── package.json
│       │   ├── tsconfig.json
│       │   ├── README.md
│       │   └── README-RU.md
│       └── README.md
│
├── package.json                 # Root workspace config (ONLY build/launch)
├── pnpm-workspace.yaml          # PNPM workspace + catalog
├── pnpm-lock.yaml               # Dependency lock file
├── turbo.json                   # Turborepo config (optional)
├── tsconfig.base.json           # Base TypeScript config
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── README.md                    # English documentation
├── README-RU.md                 # Russian documentation
└── specs/                       # Feature specifications
```

**Structure Decision**: Monorepo with PNPM workspaces. ALL functionality implemented as packages in `packages/` directory. Root level contains ONLY configuration files, build orchestration, and package manager files. NO feature code, business logic, or UI components outside packages/. Each package has `base/` subdirectory for primary implementation, enabling future alternative implementations. Frontend/backend separation enforced by `-frt`/`-srv` suffixes (future feature packages). Shared packages (@universo/types, @universo/utils, @universo/api-client, @universo/i18n) eliminate code duplication. Each package designed as independent, extractable module for future migration to standalone repositories.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No Violations**: All constitutional principles are satisfied. No complexity tracking required.
