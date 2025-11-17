# universo-platformo-svelte Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-11-17

## Active Technologies

- TypeScript 5.8.3, Svelte 4.2.0+, SvelteKit 2.0.0+ (001-initial-setup)
- PNPM 8.0+ with workspace and catalog features (001-initial-setup)
- Build Tools: tsdown (libraries), Vite 5.4.19+ (applications), Turborepo (optional) (001-initial-setup)
- Shared Packages: @universo/types, @universo/utils, @universo/api-client, @universo/i18n (001-initial-setup)
- Supabase (PostgreSQL) - primary database (001-initial-setup)
- Passport.js with Supabase connector for authentication (001-initial-setup)
- Material UI for Svelte (SMUI or equivalent) (001-initial-setup)
- Testing: Vitest 2.1.8+, @testing-library/svelte 4.0.5+, happy-dom 16.14.2+ (001-initial-setup)
- Validation: Zod 3.25.76 (001-initial-setup)

## Project Structure

```text
packages/
├── universo-types/              # Shared TypeScript types and Zod schemas
├── universo-utils/              # Shared utilities (browser/server separation)
├── universo-api-client/         # Type-safe API client
├── universo-i18n/               # Centralized i18n instance
├── core-config/                 # Centralized configuration
├── auth-srv/                    # Authentication service (backend)
├── ui-theme/                    # UI theme configuration (frontend)
└── [feature]-frt/               # Feature frontend packages
    └── base/
        └── src/
└── [feature]-srv/               # Feature backend packages
    └── base/
        └── src/
specs/                           # Feature specifications
scripts/                         # Validation scripts
```

## Commands

pnpm install && pnpm build && pnpm test && pnpm lint

## Code Style

- TypeScript 5.8.3: Strict mode enabled, no implicit any
- Svelte 4.2.0+: Follow Svelte best practices and reactive paradigm
- SvelteKit 2.0.0+: Use SvelteKit server-side capabilities and routing
- Package naming: Feature packages use `-frt` (frontend) or `-srv` (backend) suffixes
- All packages MUST have `base/` directory for future implementations
- All internal packages use `@universo/` organization scope prefix
- Dependencies: Use `workspace:*` for internal packages, `catalog:` for external dependencies
- Documentation: Bilingual (English + Russian) with identical line counts (NON-NEGOTIABLE)

## Architectural Patterns

### Shared Package Architecture
- `@universo/types`: TypeScript types and Zod validation schemas
- `@universo/utils`: Utilities with conditional exports for browser/server separation
- `@universo/api-client`: Type-safe API client with runtime validation
- `@universo/i18n`: Centralized i18next instance to prevent multiple instance conflicts

### PNPM Catalog Pattern
- Dependency versions centralized in `pnpm-workspace.yaml` catalog section
- Single source of truth for dependency versions across all packages
- Use `"dependency": "catalog:"` in package.json

### Build Configuration
- **tsdown**: For library packages with dual ESM/CJS output
- **Vite**: For full SvelteKit applications
- **Turborepo** (optional): For build orchestration and caching

### Conditional Exports
- Separate browser and server code using package.json conditional exports
- Prevents server-only code from bundling in browser
- Enables tree-shaking optimization

### TypeScript Path Aliases
- Configure in both tsconfig.json and svelte.config.js
- Use aliases like `@/*`, `@types/*`, `@utils/*`, `@components/*`
- Cleaner imports without `../../../` relative paths

## Recent Changes

- 001-initial-setup: Added TypeScript 5.8.3, Svelte 4.2.0+, SvelteKit 2.0.0+
- 001-initial-setup: Added shared package architecture (@universo/types, @universo/utils, @universo/api-client, @universo/i18n)
- 001-initial-setup: Added PNPM catalog for centralized dependency management
- 001-initial-setup: Added tsdown build tooling for libraries
- 001-initial-setup: Added conditional exports pattern for browser/server separation
- 001-initial-setup: Added TypeScript path aliases configuration

## Constitutional Principles

**Principle VIII: Shared Package Architecture and Dependency Management** (v1.1.0)
- Required shared packages: @universo/types, @universo/utils, @universo/api-client, @universo/i18n
- All packages MUST use `@universo/` organization scope prefix
- Dependency versions MUST be managed through PNPM catalog
- Feature packages MUST import from shared packages rather than duplicate code

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
