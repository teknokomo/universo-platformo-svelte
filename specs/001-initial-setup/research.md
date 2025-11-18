# Research: Initial Setup and Architecture

**Feature**: 001-initial-setup  
**Date**: 2025-11-17  
**Last Updated**: 2025-11-17 (Web Search & Context7 Validation)  
**Status**: Complete + Validated

## Overview

This research phase resolves all technical unknowns and establishes best practices for the Universo Platformo Svelte monorepo setup. All decisions are informed by current best practices in Svelte, TypeScript, and monorepo architectures.

**Validation Round 2**: Conducted comprehensive web search and Context7 documentation review to validate initial findings against 2024-2025 industry best practices and official documentation.

## Research Findings

### 1. Material UI for Svelte Selection

**Decision**: Use Svelte Material UI (SMUI) with Skeleton UI as fallback

**Research Conducted**:
- **SMUI Status**: Active maintenance (last commit within 6 months), comprehensive component library
- **GitHub**: https://github.com/hperrin/svelte-material-ui
- **Documentation**: https://sveltematerialui.com/
- **Component Coverage**: Buttons, Cards, Dialogs, Forms, Navigation, Data Tables, etc.
- **Maturity**: Version 7.x for Svelte 4, actively maintained

**Alternatives Evaluated**:
1. **Skeleton UI** (Tailwind-based)
   - Pros: Modern, well-maintained, Tailwind integration
   - Cons: Not true Material Design, different design language
   
2. **Carbon Components Svelte** (IBM Design)
   - Pros: Enterprise-ready, IBM backing
   - Cons: Carbon Design System, not Material Design

3. **Custom Material Implementation**
   - Pros: Full control
   - Cons: High maintenance burden, reinventing wheel

**Rationale**: SMUI provides comprehensive Material Design implementation specifically for Svelte with active maintenance. If SMUI proves problematic during implementation, Skeleton UI provides a modern alternative with strong Tailwind integration.

**Implementation Notes**:
- SMUI packages: `@smui/button`, `@smui/card`, `@smui/dialog`, etc.
- Theme customization via CSS variables
- Icon integration: Material Design Icons or custom icon sets

---

### 2. PNPM Workspace and Catalog Configuration

**Decision**: Use PNPM 8.0+ with catalog feature for dependency management

**Research Conducted**:
- **Catalog Feature**: Available in PNPM 8.0+, centralizes dependency versions
- **Workspace Protocol**: `workspace:*` for internal package references
- **Monorepo Patterns**: Based on PNPM documentation and community best practices
- **Version Management**: Catalog provides single source of truth for versions

**Best Practices**:
```yaml
# pnpm-workspace.yaml structure
packages:
  - 'packages/*'
  - 'packages/*/base'

catalog:
  typescript: ^5.8.3
  svelte: ^4.2.0
  '@sveltejs/kit': ^2.0.0
  vite: ^5.4.19
  vitest: ^2.1.8
  zod: ^3.25.76
  # ... other dependencies
```

**Rationale**: Catalog feature eliminates version drift across packages while maintaining flexibility for package-specific needs. Workspace protocol ensures proper local package linking during development.

**Implementation Notes**:
- All packages reference catalog with `"dependency": "catalog:"`
- Catalog updates propagate to all packages automatically
- Package-specific overrides still possible when needed

---

### 3. Build Tooling: tsdown vs Vite vs Turborepo

**Decision**: 
- **tsdown** for library packages (types, utils, api-client, i18n)
- **Vite** for application packages (future frontend apps)
- **Turborepo** (optional) for build orchestration

**Research Conducted**:

**tsdown** (for libraries):
- Lightweight TypeScript bundler
- Generates both ESM and CJS outputs
- Automatic TypeScript declaration generation
- Fast builds with minimal configuration
- Good for shared library packages

**Vite** (for applications):
- Full-featured development server with HMR
- Optimized production builds
- Native Svelte support via plugins
- Best for frontend applications

**Turborepo** (for orchestration):
- Intelligent build caching
- Parallel task execution
- Dependency graph awareness
- Optional but recommended for monorepos >10 packages

**Alternatives Evaluated**:
1. **esbuild**: Fast but less TypeScript declaration support
2. **tsup**: Similar to tsdown, slightly different API
3. **Nx**: More complex than needed for this project
4. **Lerna**: Older tool, less active development

**Rationale**: tsdown provides optimal balance of simplicity and features for library packages. Vite is the standard for Svelte applications. Turborepo adds intelligent caching for faster builds in large monorepos.

**Implementation Configuration**:
```typescript
// tsdown.config.ts (for library packages)
export default defineConfig({
  entry: { index: './src/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  platform: 'node', // or 'browser' for frontend
  clean: true,
  outDir: 'dist',
  exports: false, // Manual control of package.json exports
  treeshake: true,
  minify: false, // Keep unminified for debugging
  sourcemap: true,
  external: ['@universo/*', 'svelte', 'react'] // Don't bundle workspace or peer deps
});
```

---

### 4. Passport.js Supabase Integration

**Decision**: Implement custom Passport.js strategy for Supabase

**Research Conducted**:
- **Existing Connectors**: No official Passport.js Supabase strategy
- **Supabase Auth**: Provides JWT-based authentication
- **Custom Strategy**: Implement using `passport-custom` or extend `Strategy` class
- **Session Management**: Server-side session storage with Supabase JWTs

**Implementation Approach**:
```typescript
// Custom Supabase strategy
import { Strategy } from 'passport-strategy';
import { createClient } from '@supabase/supabase-js';

export class SupabaseStrategy extends Strategy {
  constructor(options) {
    super();
    this.name = 'supabase';
    this.supabase = createClient(options.url, options.key);
  }
  
  async authenticate(req) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { data, error } = await this.supabase.auth.getUser(token);
    
    if (error) return this.fail(error);
    this.success(data.user);
  }
}
```

**Rationale**: Custom strategy provides full control over Supabase integration while maintaining Passport.js patterns. This approach is documented and reusable.

**Implementation Notes**:
- Strategy validates JWT tokens from Supabase
- Middleware extracts user from validated token
- Session storage uses server-side mechanism
- Token refresh handled by middleware

---

### 5. TypeScript Configuration Strategy

**Decision**: Shared base configuration with package-specific extensions

**Research Conducted**:
- **Strict Mode**: Recommended for new projects, prevents common errors
- **Module Resolution**: Use `bundler` for frontend, `node16` for backend
- **Path Mappings**: Centralized in base config, inherited by packages
- **Declaration Generation**: Required for library packages

**Base Configuration**:
```json
// tsconfig.base.json
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true,
    "paths": {
      "@universo/*": ["packages/*/base/src"]
    }
  }
}
```

**Package-Specific Overrides**:
- Frontend: `"moduleResolution": "bundler"`, `"lib": ["ES2020", "DOM"]`
- Backend: `"moduleResolution": "node16"`, `"module": "Node16"`
- Libraries: Output to `dist/`, generate declarations

**Rationale**: Shared base prevents configuration drift while allowing necessary package-specific overrides. Strict mode catches errors early.

---

### 6. Shared Package Architecture Patterns

**Decision**: Four core shared packages with conditional exports

**Research Conducted**:

**@universo/types**: Pure TypeScript types + Zod schemas
- No runtime dependencies (except Zod)
- Consumed by both frontend and backend
- Exports both types and validation schemas

**@universo/utils**: Server and browser utilities
- Conditional exports: separate browser and server bundles
- Prevents server code from bundling in frontend
- Optional peer dependencies (e.g., express)

**@universo/api-client**: Type-safe API client
- Depends on @universo/types for contracts
- Uses Zod for runtime validation
- Integrates with data fetching libraries

**@universo/i18n**: Centralized i18n instance
- Singleton pattern prevents multiple i18next instances
- Namespace registry for dynamic loading
- Type-safe translation keys

**Conditional Exports Pattern**:
```json
{
  "name": "@universo/utils",
  "exports": {
    ".": {
      "browser": {
        "import": "./dist/index.browser.mjs",
        "types": "./dist/index.browser.d.ts"
      },
      "import": "./dist/index.mjs",
      "types": "./dist/index.d.ts"
    }
  }
}
```

**Rationale**: Shared packages eliminate duplication across 20+ feature packages while maintaining clear boundaries between server and browser code.

---

### 7. Documentation Line Count Validation

**Decision**: Automated validation script with pre-commit hooks

**Research Conducted**:
- **Line Count Tools**: Basic `wc -l` command sufficient
- **Git Hooks**: Use simple pre-commit hook with validation script
- **CI Integration**: Run validation in GitHub Actions

**Implementation**:
```bash
#!/bin/bash
# scripts/validate-bilingual-docs.sh
for readme in $(find packages -name "README.md"); do
  readme_ru="${readme%.md}-RU.md"
  if [ -f "$readme_ru" ]; then
    lines_en=$(wc -l < "$readme")
    lines_ru=$(wc -l < "$readme_ru")
    if [ "$lines_en" -ne "$lines_ru" ]; then
      echo "ERROR: Line count mismatch: $readme ($lines_en) vs $readme_ru ($lines_ru)"
      exit 1
    fi
  else
    echo "ERROR: Missing Russian translation: $readme_ru"
    exit 1
  fi
done
```

**Rationale**: Simple, effective validation ensures documentation parity. Pre-commit hooks catch issues early, CI provides final verification.

---

### 8. Development Workflow and Scripts

**Decision**: Consistent npm scripts across all packages

**Research Conducted**:
- **Standard Scripts**: `build`, `dev`, `test`, `lint`, `type-check`
- **PNPM Filters**: Target specific packages or patterns
- **Parallel Execution**: Use `--parallel` for independent tasks

**Root Scripts**:
```json
{
  "scripts": {
    "build": "pnpm -r --filter './packages/*' run build",
    "build:frt": "pnpm -r --filter './packages/*-frt' run build",
    "build:srv": "pnpm -r --filter './packages/*-srv' run build",
    "dev": "pnpm -r --parallel --filter './packages/*' run dev",
    "test": "pnpm -r --filter './packages/*' run test",
    "lint": "pnpm -r --filter './packages/*' run lint",
    "type-check": "pnpm -r --filter './packages/*' run type-check",
    "validate": "bash scripts/validate-bilingual-docs.sh && bash scripts/validate-package-structure.sh"
  }
}
```

**Rationale**: Consistent scripts enable efficient development workflow. PNPM filters provide flexible targeting of packages.

---

### 9. Environment Configuration Management

**Decision**: Centralized configuration package with environment validation

**Research Conducted**:
- **Environment Variables**: Use `.env` files (git-ignored)
- **Validation**: Zod schemas for environment variable validation
- **Type Safety**: Generate TypeScript types from schemas

**Implementation Pattern**:
```typescript
// packages/core-config/base/src/env.config.ts
import { z } from 'zod';

const envSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development')
});

export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
```

**Rationale**: Zod validation catches configuration errors at startup. Centralized configuration ensures consistency across packages.

---

### 10. Database Abstraction Layer Design

**Decision**: Interface-based abstraction with Supabase implementation

**Research Conducted**:
- **Abstraction Level**: High-level interface for common operations
- **Supabase Features**: Leverage Supabase-specific features in implementation
- **Future Extension**: Interface allows swapping implementations

**Interface Design**:
```typescript
interface IDatabaseAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T>(sql: string, params?: any[]): Promise<T[]>;
  transaction<T>(callback: () => Promise<T>): Promise<T>;
}

class SupabaseAdapter implements IDatabaseAdapter {
  // Supabase-specific implementation
}
```

**Rationale**: Abstraction enables future database system support without changing business logic. Current focus on Supabase implementation.

---

## Summary of Resolutions

All technical unknowns from the Technical Context have been resolved:

✅ **Material UI Library**: SMUI selected with Skeleton UI fallback  
✅ **PNPM Configuration**: Workspace + catalog pattern established  
✅ **Build Tooling**: tsdown for libraries, Vite for apps, optional Turborepo  
✅ **Passport.js Integration**: Custom strategy pattern documented  
✅ **TypeScript Setup**: Base config with package-specific extensions  
✅ **Shared Packages**: Four core packages with conditional exports  
✅ **Documentation Validation**: Automated scripts with pre-commit hooks  
✅ **Development Scripts**: Consistent pattern across packages  
✅ **Environment Config**: Zod-based validation with type safety  
✅ **Database Abstraction**: Interface pattern with Supabase implementation

---

## Validation Round 2: Web Search & Context7 Documentation Review

### Research Sources Consulted

**Web Search (2024-2025 Best Practices)**:
- Complete Monorepo Guide: pnpm + Workspace + Changesets (2025) - jsdev.space
- SvelteKit in Production: Monorepo Excellence - oestechnology.co.uk
- Mastering pnpm Workspaces: Complete Guide - blog.glen-thomas.com
- How to Share Code with SvelteKit Monorepo - ryanschiang.com
- SvelteKit with TypeScript: Full-Stack Tutorial - krython.com
- Configuring Turborepo for SvelteKit Monorepo - maier.tech
- Modular Architecture for Scalable Frontend Development - dev.to
- Structuring larger SvelteKit apps - GitHub discussions

**Context7 Documentation**:
- SvelteKit Official Docs (`/sveltejs/kit`) - 357 code snippets, Benchmark 90.1
- Svelte Official Docs (`/sveltejs/svelte`) - 487 code snippets, Benchmark 93.4
- SvelteKit (llmstxt) (`/llmstxt/svelte_dev_kit_llms_txt`) - 9828 code snippets
- PNPM Workspace Documentation - workspace protocol and best practices

### Key Validation Findings

#### 1. Monorepo Structure ✅ VALIDATED
**Status**: Our approach is **fully aligned** with 2024-2025 best practices

**Industry Standard Pattern Confirmed**:
```
root/
├── packages/           # ALL functionality (libraries + features)
│   ├── *-frt/         # Frontend packages
│   ├── *-srv/         # Backend packages
│   └── universo-*/    # Shared utility packages
├── pnpm-workspace.yaml # Workspace configuration
├── turbo.json          # Turborepo config (optional)
├── tsconfig.base.json  # Shared TypeScript config
└── package.json        # Root workspace config (build scripts only)
```

**Critical Architectural Decisions Validated**:
- ✅ **ALL functionality in packages/** - Confirmed as best practice for future package extraction
- ✅ **base/ directory pattern** - Enables future alternative implementations without breaking changes
- ✅ **Frontend/backend separation** - Standard pattern for microservices-ready architecture
- ✅ PNPM workspace protocol (`workspace:*`) for internal references
- ✅ Turborepo for build orchestration (recommended for 10+ packages)
- ✅ Centralized TypeScript configuration with package-specific extensions

**Additional Insights from Web Search**:
- Svelte.dev official site itself uses PNPM workspace monorepo
- Industry trend (2024-2025): Prefer packages/ over apps/ when all code is modular
- Package-first architecture (no code outside packages/) becoming standard for extractable modules

**Additional Insight from Context7**:
- SvelteKit official repo demonstrates package-based structure
- `pnpm.overrides` can link local packages for testing without publishing
- SvelteKit enforces server/client separation via `src/lib/server/` pattern

#### 2. PNPM Catalog Feature ✅ ENHANCED
**Status**: Additional capabilities discovered beyond initial research

**New Findings from Web Search & Context7**:

**Automatic Migration Tool**:
```bash
# Migrate existing workspace to catalogs automatically
pnpx codemod pnpm/catalog
```

**Named Catalogs Pattern** (not yet in our docs):
```yaml
# pnpm-workspace.yaml
catalogs:
  # Default catalog (catalog: or catalog:default)
  default:
    typescript: ^5.8.3
    svelte: ^4.2.0
  
  # Named catalog for React 18 (catalog:react18)
  react18:
    react: ^18.2.0
    react-dom: ^18.2.0
  
  # Named catalog for testing tools (catalog:testing)
  testing:
    vitest: ^2.1.8
    '@testing-library/svelte': ^4.0.5
```

**Workspace Protocol Transformation**:
When publishing, `workspace:*` automatically transforms to semver:
```json
// Development
"dependencies": { "foo": "workspace:*" }

// Published package
"dependencies": { "foo": "1.5.0" }
```

**Recommendation**: Document named catalogs pattern for future extension (e.g., different Svelte versions).

#### 3. Material UI for Svelte ✅ VALIDATED + ALTERNATIVES
**Status**: SMUI remains valid; comprehensive alternatives identified

**2025 UI Library Landscape**:

| Library | Style System | TypeScript | SSR | Maintenance | Use Case |
|---------|-------------|------------|-----|-------------|----------|
| **SMUI** | Material Design | ✅ Excellent | ✅ Yes | 🟢 Active | Material Design projects |
| **Skeleton** | Tailwind CSS | ✅ Excellent | ✅ Yes | 🟢 Very Active | Modern, utility-first design |
| **Melt UI** | Headless | ✅ Excellent | ✅ Yes | 🟢 Active | Custom design systems |
| **Flowbite Svelte** | Tailwind CSS | ✅ Good | ✅ Yes | 🟢 Active | Rapid development |
| **Carbon Components** | IBM Carbon | ✅ Good | ✅ Yes | 🟢 Active | Enterprise apps |
| **SvelteUI** | Flexible | ✅ Good | ✅ Yes | 🟡 Moderate | All-in-one solution |

**Updated Recommendation**:
- **Primary**: SMUI (as decided) - best Material Design implementation
- **Fallback Option 1**: Skeleton UI - if Material Design not required
- **Fallback Option 2**: Melt UI - for maximum design flexibility

**Implementation Note**: All options support SvelteKit SSR and TypeScript.

#### 4. SvelteKit Patterns ✅ VALIDATED + ENHANCED
**Status**: Official patterns documented from Context7

**File-Based Routing Best Practices** (from Context7):

**Layout Pattern**:
```svelte
<!-- src/routes/+layout.svelte -->
<script>
  let { data, children } = $props();
</script>

<nav><!-- Navigation --></nav>

{@render children()}
```

**Nested Layouts**:
```svelte
<!-- src/routes/dashboard/+layout.svelte -->
<script>
  import { page } from '$app/state';
  
  let { data, children } = $props();
</script>

<aside>
  <a href="/dashboard" class:active={page.url.pathname === '/dashboard'}>
    Overview
  </a>
</aside>

<main>{@render children()}</main>
```

**Error Handling with Rest Parameters**:
```
src/routes/
├── [...path]/           # Catches all unhandled routes
│   └── +error.svelte
└── +error.svelte        # Root error handler
```

**Server Endpoints**:
```typescript
// src/routes/api/data/+server.ts
export async function GET({ params, url }) {
  return new Response(JSON.stringify({ data }));
}
```

**Key Insights**:
- Use `$props()` for component props (Svelte 5 pattern)
- `page` store from `$app/state` for current route info
- Rest parameters `[...path]` for catch-all routes
- `+server.ts` for API endpoints alongside pages

#### 5. TypeScript Configuration ✅ VALIDATED + OFFICIAL PATTERNS
**Status**: Best practices confirmed from official Svelte docs

**Official TypeScript Setup** (from Context7):

**For Type-Only Features** (interfaces, type annotations):
```typescript
// svelte.config.js
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess()
};
```

**For Full TypeScript** (enums, experimental features):
```typescript
// svelte.config.js
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess({ script: true })
};
```

**Component Props Typing** (Svelte 5):
```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  
  interface Props {
    requiredProp: number;
    optionalProp?: boolean;
    snippet: Snippet<[string]>;
    eventHandler: (arg: string) => void;
    [key: string]: unknown; // Allow additional props
  }
  
  let { requiredProp, optionalProp, snippet, eventHandler, ...rest }: Props = $props();
</script>
```

**Store Type Definition**:
```typescript
type Store<T> = {
  subscribe: (subscription: (value: T) => void) => () => void;
  set?: (value: T) => void;
};
```

**Key Insights**:
- `vitePreprocess()` is default for SvelteKit projects
- Use `vitePreprocess({ script: true })` for full TS features
- Svelte 5 uses `$props()` instead of `export let`
- Official `Snippet` type for render props pattern

#### 6. Build Tooling ✅ VALIDATED
**Status**: Current choices align with community recommendations

**Confirmed Best Practices**:
- **tsdown**: Optimal for library packages (ESM + CJS output)
- **Vite**: Standard for SvelteKit applications
- **Turborepo**: Recommended for 10+ package monorepos

**Turborepo Configuration Example** (from web search):
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

**Benefits Confirmed**:
- Intelligent caching reduces build times by 40-60%
- Parallel execution across packages
- Dependency-aware build order

### Recommendations for Documentation Updates

#### Minimal Updates Needed
Our architecture is **sound and well-aligned** with industry standards. Only documentation enhancements needed:

1. **Add PNPM Catalog Migration Tool**:
   ```bash
   # Add to quickstart.md
   pnpx codemod pnpm/catalog  # Auto-migrate to catalogs
   ```

2. **Document Named Catalogs Pattern**:
   - Add example of multiple catalog definitions
   - Explain use case for version testing

3. **Add SvelteKit Adapter Reference**:
   - Document adapter flexibility for deployment
   - Examples: Node, Vercel, Netlify, Static

4. **Enhance TypeScript Section**:
   - Add `vitePreprocess({ script: true })` for full TS
   - Document Svelte 5 `$props()` pattern
   - Include official `Snippet` type reference

5. **Update UI Library Section**:
   - Add 2025 comparison table
   - Clarify fallback options: Skeleton → Melt UI
   - Note all options support SSR + TypeScript

#### No Architecture Changes Required
✅ All major decisions remain valid  
✅ Current technology stack is optimal for 2024-2025  
✅ Monorepo structure follows industry best practices  
✅ Build tooling choices are sound  
✅ PNPM catalog feature is correctly specified

### Conclusion

**Validation Result**: ✅ **APPROVED - No Breaking Changes**

All architectural decisions made in the initial research phase are **validated and aligned** with current industry best practices and official documentation. The project is built on a solid foundation.

**Minor enhancements identified** are purely documentary in nature and do not require refactoring. The existing specifications provide an excellent blueprint for implementation.

---

## 11. Best Practices from universo-platformo-react

**Decision**: Adopt proven patterns from React repository, adapting appropriately for Svelte

**Analysis Conducted**: Deep examination of universo-platformo-react repository structure

### Verified Patterns from React Repository

#### Package Structure ✅ ADOPTED

**React Repository Pattern**:
- ALL functionality in `packages/` directory
- Frontend/backend separation: `*-frt` and `*-srv` suffixes
- `base/` subdirectory in every package
- Shared utility packages with `@universo/` scope

**Svelte Implementation**: IDENTICAL
- Same package naming conventions
- Same directory structure
- Same separation principles
- Documented in Constitution Principle I and plan.md

#### Shared Package Architecture ✅ ADOPTED

**React Repository Shared Packages**:
- `@universo/types` - TypeScript types and Zod schemas
- `@universo/utils` - Browser/server separated utilities
- `@universo/api-client` - Type-safe API client
- `@universo/i18n` - Centralized i18next instance

**Svelte Implementation**: IDENTICAL NAMES AND PURPOSES
- Same package names and responsibilities
- Conditional exports for browser/server separation
- Type safety across frontend/backend boundary
- Documented in Constitution Principle VIII and plan.md

#### PNPM Workspace Configuration ✅ ADOPTED

**React Repository Pattern**:
```yaml
packages:
  - 'packages/*'
  - 'packages/*/base'

catalog:
  typescript: ^5.8.3
  # ... centralized versions
```

**Svelte Implementation**: IDENTICAL
- Same workspace configuration
- Same catalog approach for version management
- Same workspace protocol usage
- Documented in research.md Section 2 and plan.md

#### Build Tooling Strategy ✅ ADAPTED

**React Repository**:
- tsdown for library packages
- Vite for React applications
- Turborepo for orchestration

**Svelte Adaptation**: APPROPRIATELY ADAPTED
- tsdown for library packages (SAME - framework agnostic)
- Vite for SvelteKit applications (ADAPTED - Svelte uses Vite natively)
- Turborepo optional (SAME approach)
- Documented in research.md Section 3

**Rationale**: Library build tools are framework-agnostic. Application build tools adapted for SvelteKit's native Vite integration.

#### TypeScript Configuration ✅ ADAPTED

**React Repository**:
- Shared base tsconfig.json
- Package-specific extensions
- Strict mode enabled
- Path mappings for @universo/* packages

**Svelte Adaptation**: APPROPRIATELY ADAPTED
- Shared tsconfig.base.json (SAME)
- Package-specific extensions (SAME)
- Strict mode enabled (SAME)
- Module resolution: "bundler" for SvelteKit (ADAPTED for Svelte requirements)
- Documented in research.md Section 5

#### Authentication Architecture ✅ ADAPTED

**React Repository**:
- `@universo/auth-frt` - React auth components
- `@universo/auth-srv` - Passport.js + Supabase backend

**Svelte Adaptation**: BACKEND IDENTICAL, FRONTEND ADAPTED
- `@universo/auth-srv` - IDENTICAL backend (framework-agnostic)
- Frontend will use Svelte components (ADAPTED for Svelte)
- Same Passport.js strategy pattern
- Documented in research.md Section 4

**Rationale**: Backend authentication is framework-agnostic. Frontend authentication uses framework-native components.

#### Package Extraction Strategy ✅ ADOPTED

**React Repository Principle**:
- Packages designed for future extraction to separate repositories
- Monorepo as temporary organizational structure
- Each package independent and extractable

**Svelte Implementation**: IDENTICAL
- Constitution Principle I documents extraction strategy
- FR-006a requires extractable package design
- Plan.md explains temporary monorepo nature
- Each package designed as independent module

#### Bilingual Documentation ✅ ADOPTED

**React Repository Pattern**:
- README.md (English) and README-RU.md (Russian)
- Identical structure and line count
- Automated validation

**Svelte Implementation**: IDENTICAL
- Constitution Principle V mandates bilingual docs (NON-NEGOTIABLE)
- Same structure requirements
- Automated validation scripts
- Documented in research.md Section 7

#### Development Workflow Scripts ✅ ADOPTED

**React Repository Pattern**:
```json
{
  "scripts": {
    "build": "pnpm -r --filter './packages/*' run build",
    "dev": "pnpm -r --parallel --filter './packages/*' run dev",
    "test": "pnpm -r --filter './packages/*' run test"
  }
}
```

**Svelte Implementation**: IDENTICAL
- Same PNPM filter patterns
- Same parallel execution approach
- Same root script organization
- Documented in research.md Section 8

### Technology Stack Adaptations

#### State Management

**React Approach**:
- Redux Toolkit for global state
- React Context for component state
- React hooks for local state

**Svelte Approach**: APPROPRIATELY ADAPTED
- Svelte writable/readable stores for global state (more aligned with Svelte)
- Svelte component state with $state runes (Svelte 5)
- Svelte derived stores for computed values
- Lighter weight and simpler API

**Rationale**: Svelte's built-in reactivity system provides equivalent functionality with less boilerplate and better integration with Svelte's compiler.

#### UI Component Library

**React Approach**:
- Material-UI (MUI) for React

**Svelte Approach**: APPROPRIATELY ADAPTED
- Svelte Material UI (SMUI) - Material Design for Svelte
- Skeleton UI as fallback option
- Same design language, Svelte-native implementation

**Rationale**: SMUI provides Material Design patterns specifically optimized for Svelte's compilation model.

#### Testing Strategy

**React Approach**:
- React Testing Library for component tests
- Vitest for unit tests

**Svelte Approach**: APPROPRIATELY ADAPTED
- Testing Library Svelte for component tests (same philosophy)
- Vitest for unit tests (SAME - framework agnostic)
- Constitution specifies exact versions

**Rationale**: Testing Library philosophy applies across frameworks. Vitest works identically for both.

### Summary of Adoptions

**100% Adoption** (10/10 structural patterns):
1. ✅ Package-only architecture (ALL code in packages/)
2. ✅ Frontend/backend separation (-frt/-srv suffixes)
3. ✅ base/ directory pattern
4. ✅ Shared package concept and naming
5. ✅ PNPM workspace + catalog
6. ✅ Package extraction strategy
7. ✅ Bilingual documentation
8. ✅ Development workflow scripts
9. ✅ TypeScript base configuration
10. ✅ Authentication backend architecture

**Appropriate Adaptations** (6/6 framework-specific):
1. ✅ SvelteKit/Vite instead of React/Vite (Svelte integration)
2. ✅ SMUI instead of MUI (Svelte-native Material Design)
3. ✅ Svelte stores instead of Redux (Svelte-native state)
4. ✅ Testing Library Svelte (Svelte-specific testing)
5. ✅ Svelte components for auth frontend (Svelte-specific UI)
6. ✅ TypeScript module resolution for SvelteKit (bundler mode)

**Result**: Complete alignment with React repository's proven architecture, with appropriate and well-justified adaptations for Svelte ecosystem.

---

## Next Steps

Proceed to Phase 1: Design & Contracts
- Generate data-model.md for core entities
- Create API contracts in /contracts/
- Generate quickstart.md for developers
- Update agent context via script
