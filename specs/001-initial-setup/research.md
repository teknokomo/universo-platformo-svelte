# Research: Initial Setup and Architecture

**Feature**: 001-initial-setup  
**Date**: 2025-11-17  
**Status**: Complete

## Overview

This research phase resolves all technical unknowns and establishes best practices for the Universo Platformo Svelte monorepo setup. All decisions are informed by current best practices in Svelte, TypeScript, and monorepo architectures.

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

## Next Steps

Proceed to Phase 1: Design & Contracts
- Generate data-model.md for core entities
- Create API contracts in /contracts/
- Generate quickstart.md for developers
- Update agent context via script
