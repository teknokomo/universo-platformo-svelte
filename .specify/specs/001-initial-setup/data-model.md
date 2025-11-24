# Data Model: Initial Setup and Architecture

**Feature**: 001-initial-setup  
**Date**: 2025-11-17  
**Status**: Complete

## Overview

This data model defines the core entities and relationships for the initial repository setup. Since this is infrastructure setup rather than feature implementation, the focus is on configuration entities and package metadata rather than business domain entities.

## Core Entities

### 1. Package Entity

**Description**: Represents a package in the monorepo workspace

**Fields**:
- `name` (string, required): Package name with `@universo/` scope
- `type` (enum, required): Package type - `'frontend' | 'backend' | 'shared' | 'config'`
- `suffix` (string, optional): Package suffix (`-frt` or `-srv` for feature packages)
- `version` (semver, required): Package version following semantic versioning
- `dependencies` (object): Package dependencies with version specifications
- `peerDependencies` (object, optional): Peer dependencies
- `exports` (object, optional): Package exports configuration for Node.js
- `scripts` (object, required): npm scripts (build, dev, test, lint, type-check)
- `hasBase` (boolean, required): Whether package has `base/` directory
- `path` (string, required): Relative path from repository root

**Validation Rules**:
- Package name MUST start with `@universo/`
- Frontend feature packages MUST end with `-frt` suffix
- Backend feature packages MUST end with `-srv` suffix
- Shared packages MUST NOT have suffix
- All packages MUST have `base/` directory in their root
- Version MUST follow semantic versioning (major.minor.patch)
- Required scripts MUST be present: `build`, `dev`, `test`, `lint`

**State Transitions**:
- Created → Not Built → Built → Published (future)
- Dependencies Updated → Rebuild Required → Built

**Example**:
```typescript
{
  name: "@universo/types",
  type: "shared",
  version: "0.1.0",
  dependencies: {
    "zod": "catalog:"
  },
  scripts: {
    "build": "tsdown",
    "dev": "tsdown --watch",
    "test": "vitest",
    "lint": "eslint src"
  },
  hasBase: true,
  path: "packages/universo-types"
}
```

---

### 2. Workspace Configuration Entity

**Description**: Represents PNPM workspace configuration and dependency catalog

**Fields**:
- `packages` (array of strings, required): Glob patterns for workspace packages
- `catalog` (object, required): Centralized dependency version catalog
- `packageManager` (string, required): Package manager with version (e.g., "pnpm@8.0.0")

**Validation Rules**:
- Packages array MUST include `'packages/*'` and `'packages/*/base'`
- Catalog MUST define versions for all shared dependencies
- PackageManager MUST specify PNPM version 8.0.0 or higher

**Example**:
```yaml
packages:
  - 'packages/*'
  - 'packages/*/base'

catalog:
  typescript: ^5.8.3
  svelte: ^4.2.0
  '@sveltejs/kit': ^2.0.0
  zod: ^3.25.76
```

---

### 3. Configuration Entity

**Description**: Represents environment and application configuration

**Fields**:
- `environment` (enum, required): `'development' | 'staging' | 'production'`
- `supabase` (object, required):
  - `url` (string, URL, required): Supabase project URL
  - `anonKey` (string, required): Supabase anonymous key
  - `serviceRoleKey` (string, optional): Service role key (server-only)
- `authentication` (object, required):
  - `sessionSecret` (string, required): Session secret for encryption
  - `sessionMaxAge` (number, required): Session duration in milliseconds
  - `tokenRefreshThreshold` (number, required): Token refresh threshold in seconds
- `theme` (object, optional):
  - `primaryColor` (string, hex color): Primary theme color
  - `secondaryColor` (string, hex color): Secondary theme color
  - `darkMode` (boolean): Dark mode enabled

**Validation Rules**:
- Environment MUST be one of allowed values
- Supabase URL MUST be valid URL format
- Keys MUST NOT be empty strings
- Session secret MUST be at least 32 characters
- Session max age MUST be positive number
- Colors MUST be valid hex format (#RRGGBB)

**Security Requirements**:
- All secrets MUST be loaded from environment variables
- Configuration files MUST NOT contain hardcoded secrets
- `.env` files MUST be git-ignored

**Example**:
```typescript
{
  environment: "development",
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY
  },
  authentication: {
    sessionSecret: process.env.SESSION_SECRET,
    sessionMaxAge: 86400000, // 24 hours
    tokenRefreshThreshold: 300 // 5 minutes
  }
}
```

---

### 4. Documentation Entity

**Description**: Represents bilingual documentation files

**Fields**:
- `path` (string, required): Path to English documentation file
- `pathRu` (string, required): Path to Russian documentation file
- `type` (enum, required): `'readme' | 'guide' | 'api' | 'specification'`
- `lineCount` (number, required): Number of lines in English version
- `lineCountRu` (number, required): Number of lines in Russian version
- `lastModified` (datetime, required): Last modification timestamp
- `validated` (boolean, required): Whether line counts match

**Validation Rules**:
- English path MUST end with `.md`
- Russian path MUST be identical to English with `-RU.md` suffix
- Line counts MUST be identical
- Both files MUST exist
- Both files MUST have same directory structure

**State Transitions**:
- Created → Translated → Validated → Published
- Modified → Requires Retranslation → Translated → Validated

**Example**:
```typescript
{
  path: "packages/universo-types/README.md",
  pathRu: "packages/universo-types/README-RU.md",
  type: "readme",
  lineCount: 120,
  lineCountRu: 120,
  lastModified: "2025-11-17T09:00:00Z",
  validated: true
}
```

---

### 5. Build Configuration Entity

**Description**: Represents build tool configuration for packages

**Fields**:
- `packageName` (string, required): Name of package this config belongs to
- `tool` (enum, required): `'tsdown' | 'vite' | 'tsc'`
- `entry` (object, required): Entry points for build
- `format` (array, required): Output formats - `['esm', 'cjs']`
- `platform` (enum, required): `'node' | 'browser' | 'neutral'`
- `dts` (boolean, required): Generate TypeScript declarations
- `outDir` (string, required): Output directory path
- `external` (array of strings): External dependencies (not bundled)
- `sourceMap` (boolean, required): Generate source maps

**Validation Rules**:
- Tool MUST be one of supported tools
- Entry MUST define at least one entry point
- Format MUST include at least one output format
- Platform MUST match package type (node for backend, browser for frontend)
- OutDir MUST be relative path

**Example**:
```typescript
{
  packageName: "@universo/types",
  tool: "tsdown",
  entry: { index: "./src/index.ts" },
  format: ["esm", "cjs"],
  platform: "neutral",
  dts: true,
  outDir: "dist",
  external: ["zod"],
  sourceMap: true
}
```

---

## Entity Relationships

```
Workspace Configuration (1)
    │
    └── contains ──→ Package (*)
            │
            ├── has ──→ Build Configuration (1)
            ├── has ──→ Documentation (1-2) [English + Russian]
            └── depends on ──→ Package (*) [other packages]

Configuration (1)
    │
    └── used by ──→ Package (*)
```

**Relationship Details**:

1. **Workspace → Package** (1:N)
   - One workspace configuration contains many packages
   - Packages defined by glob patterns in workspace config
   - Cascade: Removing workspace config conceptually removes all packages

2. **Package → Build Configuration** (1:1)
   - Each package has exactly one build configuration
   - Configuration determines how package is compiled
   - Cascade: Deleting package deletes its build configuration

3. **Package → Documentation** (1:2)
   - Each package has two documentation files (English + Russian)
   - Documentation files must maintain parity (same line count)
   - Cascade: Deleting package deletes its documentation

4. **Package → Package** (N:N - Dependencies)
   - Packages can depend on other workspace packages
   - Dependencies use `workspace:*` protocol
   - No cascade: Dependency references must be updated manually

5. **Configuration → Package** (1:N - Usage)
   - One configuration instance used by many packages
   - Packages import configuration as needed
   - No cascade: Configuration changes don't delete packages

---

## Database Schema

**Note**: This feature does not require database tables since it's infrastructure setup. However, future features will use Supabase with the following pattern:

```sql
-- Example pattern for future entities (not used in this feature)
CREATE TABLE entity_name (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  CONSTRAINT entity_name_unique UNIQUE(name)
);

-- Indexes for common queries
CREATE INDEX idx_entity_created_at ON entity_name(created_at DESC);
CREATE INDEX idx_entity_created_by ON entity_name(created_by);

-- RLS policies for security
ALTER TABLE entity_name ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own entities" ON entity_name
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can create entities" ON entity_name
  FOR INSERT WITH CHECK (auth.uid() = created_by);
```

---

## Validation Schemas (Zod)

```typescript
// packages/universo-types/base/src/common/package.ts
import { z } from 'zod';

export const PackageTypeSchema = z.enum(['frontend', 'backend', 'shared', 'config']);

export const PackageSchema = z.object({
  name: z.string().regex(/^@universo\/[a-z0-9-]+$/),
  type: PackageTypeSchema,
  suffix: z.string().optional(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  dependencies: z.record(z.string()),
  peerDependencies: z.record(z.string()).optional(),
  exports: z.record(z.any()).optional(),
  scripts: z.object({
    build: z.string(),
    dev: z.string(),
    test: z.string(),
    lint: z.string(),
  }),
  hasBase: z.boolean(),
  path: z.string(),
});

export type Package = z.infer<typeof PackageSchema>;

// Configuration validation
export const ConfigurationSchema = z.object({
  environment: z.enum(['development', 'staging', 'production']),
  supabase: z.object({
    url: z.string().url(),
    anonKey: z.string().min(1),
    serviceRoleKey: z.string().optional(),
  }),
  authentication: z.object({
    sessionSecret: z.string().min(32),
    sessionMaxAge: z.number().positive(),
    tokenRefreshThreshold: z.number().positive(),
  }),
  theme: z.object({
    primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    darkMode: z.boolean(),
  }).optional(),
});

export type Configuration = z.infer<typeof ConfigurationSchema>;

// Documentation validation
export const DocumentationSchema = z.object({
  path: z.string().endsWith('.md'),
  pathRu: z.string().endsWith('-RU.md'),
  type: z.enum(['readme', 'guide', 'api', 'specification']),
  lineCount: z.number().int().positive(),
  lineCountRu: z.number().int().positive(),
  lastModified: z.string().datetime(),
  validated: z.boolean(),
}).refine(
  (data) => data.lineCount === data.lineCountRu,
  { message: "English and Russian line counts must match" }
);

export type Documentation = z.infer<typeof DocumentationSchema>;
```

---

## Type Definitions

```typescript
// packages/universo-types/base/src/common/index.ts

// Re-export schemas and types
export * from './package';
export * from './configuration';
export * from './documentation';

// Common utility types
export type UUID = string;
export type ISODateTime = string;
export type SemVer = string;

// Pagination types (for future use)
export interface PaginationParams {
  page: number;
  perPage: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

// API response types
export interface SuccessResponse<T = void> {
  success: true;
  data: T;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T = void> = SuccessResponse<T> | ErrorResponse;
```

---

## Summary

This data model establishes the foundational types and schemas for:

✅ Package metadata and workspace configuration  
✅ Environment and application configuration  
✅ Bilingual documentation management  
✅ Build configuration for different package types  
✅ Type-safe validation with Zod schemas  
✅ Common utility types for future features

These entities are primarily configuration and metadata rather than business domain entities. Future features (Clusters, Metaverses, etc.) will build upon these foundational types and add their own domain-specific entities with database backing.
