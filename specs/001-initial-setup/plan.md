# Implementation Plan: Initial Setup and Architecture

**Branch**: `001-initial-setup` | **Date**: 2025-11-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-initial-setup/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Establish foundational repository infrastructure for Universo Platformo Svelte as a monorepo with PNPM workspace management, package structure patterns, Supabase integration, Passport.js authentication, and Material UI. This includes creating shared utility packages, setting up build tooling with TypeScript, and establishing bilingual documentation standards.

## Technical Context

**Language/Version**: TypeScript 5.8.3, Svelte 4.2.0+, SvelteKit 2.0.0+  
**Primary Dependencies**: 
- Frontend: Svelte, SvelteKit, Material UI for Svelte (SMUI or equivalent)
- Backend: Node.js, Passport.js, Supabase client
- Monorepo: PNPM 8.0.0+ with workspace and catalog features
- Build: tsdown for libraries, Vite 5.4.19+ for applications, optionally Turborepo
- Validation: Zod 3.25.76
- i18n: i18next 23.16.8, react-i18next 15.5.3 or Svelte equivalent

**Storage**: Supabase (PostgreSQL) - primary database with future extensibility for other DBMS  
**Testing**: Vitest 2.1.8+, @testing-library/svelte 4.0.5+, happy-dom 16.14.2+  
**Target Platform**: Web (fullstack - browser frontend + Node.js backend)  
**Project Type**: Web monorepo - multiple frontend and backend packages  
**Performance Goals**: 
- Development server hot reload <2s
- Build time <2 minutes for typical changes
- Authentication flow <3s

**Constraints**: 
- All documentation MUST be bilingual (English + Russian, identical structure)
- Package naming MUST follow `-frt`/`-srv` suffix convention
- All packages MUST have `base/` directory for future implementations
- No legacy code from React version
- Issue-first development workflow

**Scale/Scope**: 
- 20+ feature packages anticipated
- 4 shared utility packages (@universo/types, utils, api-client, i18n)
- Multiple hierarchical entity patterns (Clusters, Metaverses, Uniks, etc.)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Constitutional Principles Compliance

#### ✅ I. Monorepo Architecture with PNPM
- Repository will be organized as PNPM monorepo with packages in `packages/` directory
- Feature packages split into `-frt` and `-srv` for frontend/backend separation
- All packages will have root-level `base/` directory for future implementations
- **Status**: COMPLIANT - This is the core feature being implemented

#### ✅ II. Svelte Fullstack with TypeScript
- All code will use Svelte with TypeScript
- Strict TypeScript configuration enabled
- Frontend uses Svelte components, backend uses SvelteKit server capabilities
- **Status**: COMPLIANT - TypeScript strict mode enforced throughout

#### ✅ III. Database and Authentication Standards
- Supabase as primary database
- Passport.js for authentication with Supabase connector
- Database abstraction layer for future DBMS support
- **Status**: COMPLIANT - Architecture designed for extensibility

#### ✅ IV. Material UI Implementation
- Material UI library for Svelte (SMUI) to be evaluated
- Centralized theme configuration in shared package
- Alternative libraries documented if SMUI not viable
- **Status**: COMPLIANT - MUI integration planned with fallback options

#### ✅ V. Bilingual Documentation (NON-NEGOTIABLE)
- All README files in English (README.md) and Russian (README-RU.md)
- Identical structure and line count enforced by validation scripts
- English created first, Russian as exact translation
- **Status**: COMPLIANT - Validation scripts included in implementation

#### ✅ VI. Issue-First Development Workflow
- GitHub issue created before implementation (requirement in spec)
- Labels follow `.github/instructions/github-labels.md`
- PR follows `.github/instructions/github-pr.md`
- **Status**: COMPLIANT - Workflow established in this feature

#### ✅ VII. Pattern-Based Incremental Development
- Base infrastructure implemented first (this feature)
- Clusters pattern to be implemented next as reference
- Reusable patterns documented for future features
- **Status**: COMPLIANT - Foundation-first approach

#### ✅ VIII. Shared Package Architecture and Dependency Management
- Four shared packages: @universo/types, utils, api-client, i18n
- PNPM catalog for centralized dependency version management
- Organization scope prefix `@universo/` for all internal packages
- **Status**: COMPLIANT - Shared packages are core part of this implementation

### Gate Decision: ✅ PASS
All constitutional principles are satisfied. No violations require justification. Proceeding to Phase 0 research.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Monorepo structure
packages/
├── universo-types/              # Shared TypeScript types and Zod schemas
│   └── base/
│       ├── src/
│       │   ├── common/          # Common types (IDs, pagination)
│       │   ├── ecs/             # Entity Component System types
│       │   ├── errors/          # Error types
│       │   ├── protocol/        # Network protocol types
│       │   ├── updl/            # UPDL types
│       │   ├── validation/      # Zod validation schemas
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsdown.config.ts
│       ├── README.md
│       └── README-RU.md
│
├── universo-utils/              # Shared utilities
│   └── base/
│       ├── src/
│       │   ├── api/             # API utilities
│       │   ├── delta/           # Delta compression
│       │   ├── env/             # Environment validation
│       │   ├── math/            # Math utilities
│       │   ├── net/             # Network utilities
│       │   ├── rate-limiting/   # Rate limiting
│       │   ├── serialization/   # Serialization
│       │   ├── ui-utils/        # UI helpers
│       │   ├── validation/      # Validation helpers
│       │   ├── index.ts         # Server exports
│       │   └── index.browser.ts # Browser exports
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsdown.config.ts
│       ├── README.md
│       └── README-RU.md
│
├── universo-api-client/         # Type-safe API client
│   └── base/
│       ├── src/
│       │   ├── clients/         # API client classes
│       │   ├── hooks/           # Data fetching hooks
│       │   ├── types/           # Request/response types
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsdown.config.ts
│       ├── README.md
│       └── README-RU.md
│
├── universo-i18n/               # Centralized i18n instance
│   └── base/
│       ├── src/
│       │   ├── instance.ts      # i18next singleton
│       │   ├── registry.ts      # Namespace registry
│       │   ├── types.ts         # i18n types
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsdown.config.ts
│       ├── README.md
│       └── README-RU.md
│
├── core-config/                 # Centralized configuration
│   └── base/
│       ├── src/
│       │   ├── database.config.ts
│       │   ├── auth.config.ts
│       │   ├── theme.config.ts
│       │   ├── env.config.ts
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       ├── README.md
│       └── README-RU.md
│
├── auth-srv/                    # Authentication service (backend)
│   └── base/
│       ├── src/
│       │   ├── strategies/
│       │   │   └── supabase.strategy.ts
│       │   ├── middleware/
│       │   │   ├── authenticate.ts
│       │   │   └── authorize.ts
│       │   ├── services/
│       │   │   ├── session.service.ts
│       │   │   └── token.service.ts
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       ├── README.md
│       └── README-RU.md
│
└── ui-theme/                    # UI theme configuration (frontend)
    └── base/
        ├── src/
        │   ├── theme.config.ts
        │   ├── components/      # Theme-aware components
        │   └── index.ts
        ├── package.json
        ├── tsconfig.json
        ├── README.md
        └── README-RU.md

# Root configuration files
pnpm-workspace.yaml              # Workspace config + dependency catalog
package.json                     # Root package with workspace scripts
tsconfig.base.json              # Shared TypeScript configuration
.gitignore                       # Git ignore rules
README.md                        # English documentation
README-RU.md                     # Russian documentation
.eslintrc.js                     # ESLint configuration
.prettierrc                      # Prettier configuration
.editorconfig                    # Editor settings
turbo.json                       # Optional: Turborepo configuration

# Validation scripts
scripts/
├── validate-bilingual-docs.sh   # Line count validation
├── validate-package-structure.sh # Structure compliance
└── validate-workspace-deps.sh   # Dependency audit

# Documentation
.github/
└── instructions/
    ├── github-issues.md
    ├── github-labels.md
    ├── github-pr.md
    └── i18n-docs.md
```

**Structure Decision**: Web monorepo structure selected (not single project or mobile). The project requires both frontend and backend packages with clear separation, shared utility packages for code reuse, and centralized configuration. This structure supports the anticipated 20+ feature packages while maintaining consistency through shared packages and build tooling.

## Complexity Tracking

No constitutional violations. This section is not needed.
