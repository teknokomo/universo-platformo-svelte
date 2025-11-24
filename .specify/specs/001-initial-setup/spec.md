# Feature Specification: Initial Setup and Architecture of Universo Platformo Svelte

**Feature Branch**: `001-initial-setup`  
**Created**: 2025-11-15  
**Status**: Draft  
**Input**: User description: "Initial setup and architecture of Universo Platformo Svelte project as a monorepo with PNPM, package structure, Supabase integration, and Passport.js authentication"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer Sets Up Local Development Environment (Priority: P1)

A developer clones the repository and wants to set up their local development environment to start contributing to the Universo Platformo Svelte project.

**Why this priority**: This is the foundation for all development work. Without a working development environment, no other features can be developed or tested. This is the absolute minimum viable setup.

**Independent Test**: Can be fully tested by cloning the repository, running setup commands, and verifying that the development server starts successfully with no errors.

**Acceptance Scenarios**:

1. **Given** a fresh clone of the repository, **When** developer runs `pnpm install`, **Then** all dependencies are installed successfully without errors
2. **Given** dependencies are installed, **When** developer runs the development server, **Then** the application starts and is accessible in the browser
3. **Given** the monorepo structure, **When** developer navigates to any package directory, **Then** package dependencies are properly linked via workspace protocol

---

### User Story 2 - Developer Creates New Package Following Structure (Priority: P2)

A developer needs to add new functionality by creating a new package that follows the established monorepo structure with separate frontend and backend concerns.

**Why this priority**: Establishes the package creation pattern that will be replicated throughout the project. This enables parallel development of multiple features while maintaining consistency.

**Independent Test**: Can be tested by creating a new package following the structure guidelines, verifying proper workspace linking, and confirming the package can be imported and used by other packages.

**Acceptance Scenarios**:

1. **Given** the established package structure, **When** developer creates a new package with `-frt` suffix, **Then** the frontend package is properly structured with a `base/` directory
2. **Given** the established package structure, **When** developer creates a new package with `-srv` suffix, **Then** the backend package is properly structured with a `base/` directory
3. **Given** a new package is created, **When** developer adds dependencies, **Then** workspace packages are properly linked
4. **Given** frontend and backend packages exist, **When** developer runs the application, **Then** both packages work together seamlessly

---

### User Story 3 - Developer Authenticates Users via Supabase (Priority: P3)

A developer implements user authentication in a new feature using the established Passport.js and Supabase integration pattern.

**Why this priority**: Authentication is needed for secure features but not required for the initial repository setup. This priority allows core infrastructure to be established first.

**Independent Test**: Can be tested by implementing a login flow, verifying successful authentication with Supabase, and confirming that authenticated user data is accessible throughout the application.

**Acceptance Scenarios**:

1. **Given** Supabase credentials are configured, **When** user submits login credentials, **Then** Passport.js authenticates against Supabase successfully
2. **Given** a user is authenticated, **When** user navigates to protected routes, **Then** user session is maintained
3. **Given** authentication configuration, **When** developer reviews the code, **Then** authentication logic is reusable across different packages

---

### User Story 4 - Team Member Creates Bilingual Documentation (Priority: P4)

A team member needs to document a new feature or component with both English and Russian versions following the project's i18n documentation standards.

**Why this priority**: Documentation is important for long-term maintainability but can follow after the core technical infrastructure is established.

**Independent Test**: Can be tested by creating a README file in English, generating the Russian version following the template structure, and verifying both versions have identical structure and line counts.

**Acceptance Scenarios**:

1. **Given** a new package or feature, **When** team member creates a README.md in English, **Then** the documentation follows the established template
2. **Given** an English README exists, **When** team member creates README.ru.md, **Then** the Russian version has identical structure and line count
3. **Given** both language versions exist, **When** content is updated, **Then** both versions remain synchronized

---

### User Story 5 - Developer Works with Material UI Components (Priority: P5)

A developer builds user interfaces using the Material UI component library integrated into the Svelte project.

**Why this priority**: UI components are needed for specific features but not for the initial repository setup and architecture. This can be implemented incrementally as features are built.

**Independent Test**: Can be tested by creating a simple page with MUI components, verifying proper styling and theming, and confirming components work correctly in the Svelte environment.

**Acceptance Scenarios**:

1. **Given** MUI is configured, **When** developer imports a Material UI component, **Then** component renders correctly in Svelte
2. **Given** MUI theme is configured, **When** developer applies theme colors, **Then** styling is consistent across components
3. **Given** various MUI components, **When** user interacts with them, **Then** components respond correctly following Material Design principles

---

### Edge Cases

- What happens when a developer tries to create a package without following the naming convention (missing `-frt` or `-srv` suffix)?
  - **Handling**: Build validation scripts MUST detect non-compliant package names and provide clear error messages indicating the correct naming pattern
  - **Validation**: Automated checks in CI/CD pipeline MUST enforce naming conventions before merge
  
- How does the system handle when Supabase credentials are missing or invalid during development?
  - **Handling**: Application MUST fail gracefully at startup with clear error message indicating which credentials are missing
  - **Validation**: Environment validation script MUST check for required credentials before starting development server
  - **Fallback**: Development mode MUST support optional mock authentication for frontend-only development
  
- What happens when workspace dependencies have version conflicts?
  - **Handling**: PNPM MUST report version conflicts during installation with clear resolution suggestions
  - **Validation**: Lock file (pnpm-lock.yaml) MUST be committed to ensure reproducible builds
  - **Resolution**: Project MUST maintain dependency version consistency through workspace constraints
  
- How does the build process handle when a package is missing its `base/` directory?
  - **Handling**: Build scripts MUST verify presence of base/ directory in each package before compilation
  - **Validation**: Package structure validation script MUST run during pre-build phase
  - **Error**: Clear error message MUST indicate which package is missing required structure
  
- What happens when documentation updates are made to only one language version?
  - **Handling**: Pre-commit hooks MUST detect line count mismatches between README.md and README-RU.md
  - **Validation**: Automated line count comparison script MUST run during CI checks
  - **Prevention**: Documentation update checklist MUST remind developers to update both versions
  
- How does the authentication system handle expired or invalid tokens?
  - **Handling**: Middleware MUST intercept expired tokens and redirect to login with appropriate message
  - **Validation**: Token refresh mechanism MUST attempt renewal before expiration
  - **Fallback**: Session cleanup MUST occur on authentication failure
  
- What happens when PNPM workspace protocol references a non-existent package?
  - **Handling**: PNPM MUST fail installation with clear error indicating missing workspace dependency
  - **Validation**: Package dependency audit script MUST verify all workspace references exist
  - **Prevention**: Package creation template MUST include validation checklist

## Requirements *(mandatory)*

### Functional Requirements

#### Repository Setup
- **FR-001**: Repository MUST be initialized as a monorepo using PNPM workspaces for package management
- **FR-002**: Repository MUST include a root `package.json` with workspace configuration pointing to `packages/*`
- **FR-003**: Repository MUST include bilingual README files (README.md in English and README-RU.md in Russian) with identical structure and line count
- **FR-004**: Repository MUST include a `.gitignore` file appropriate for Node.js, Svelte, and TypeScript projects
- **FR-005**: Repository MUST include issue labels following the guidelines in `.github/instructions/github-labels.md`

#### Package Structure
- **FR-006**: ALL functionality MUST be implemented as packages residing in the `packages/` directory. NO feature code, business logic, UI components, or API routes may exist outside packages/. The ONLY exceptions are root-level build configuration files, package manager files (package.json, pnpm-workspace.yaml, pnpm-lock.yaml), and application entry points
- **FR-006a**: Packages MUST be designed as independent, extractable modules that can eventually be moved to separate repositories without significant refactoring
- **FR-007**: Packages requiring both frontend and backend MUST be split into separate packages with `-frt` (frontend) and `-srv` (backend) suffixes
- **FR-008**: Each package MUST contain a root `base/` directory to support future multiple implementations
- **FR-009**: Frontend packages MUST be structured for Svelte with TypeScript
- **FR-010**: Backend packages MUST be structured for Node.js with TypeScript
- **FR-011**: Each package MUST have its own `package.json` with proper dependencies and workspace references
- **FR-011a**: Shared utility packages MUST be created to avoid code duplication across feature packages (e.g., `universo-types`, `universo-utils`, `universo-api-client`, `universo-i18n`)
- **FR-011b**: Package naming MUST use organization scope `@universo/` prefix for all internal packages

#### Development Environment
- **FR-012**: Project MUST use TypeScript for both frontend and backend code
- **FR-013**: Project MUST use Svelte for frontend development
- **FR-014**: Project MUST include proper TypeScript configuration files (`tsconfig.json`)
- **FR-015**: Development environment MUST support hot module replacement for efficient development
- **FR-016**: Project MUST include build scripts that work across all packages
- **FR-016a**: Project MUST use PNPM catalog feature for centralized dependency version management to ensure version consistency across all packages
- **FR-016b**: Project SHOULD consider Turborepo or similar build orchestration tool for optimized monorepo build caching and parallelization
- **FR-016c**: Build tooling MUST use modern bundlers (e.g., tsdown, Vite) that support both ESM and CJS output formats for maximum compatibility

#### Database Integration
- **FR-017**: System MUST integrate with Supabase as the primary database solution
- **FR-018**: Database connection configuration MUST be centralized and reusable across packages
- **FR-019**: System architecture MUST support future extension to other database systems without major refactoring

#### Authentication
- **FR-020**: Authentication MUST be implemented using Passport.js
- **FR-021**: Passport.js MUST be configured with Supabase connector for authentication
- **FR-022**: Authentication logic MUST be reusable across different packages
- **FR-023**: System MUST support user session management

#### UI Framework
- **FR-024**: Frontend MUST use Material UI design system
- **FR-025**: Project MUST integrate an appropriate Material UI library compatible with Svelte
- **FR-026**: UI theme configuration MUST be centralized for consistency across packages

#### Documentation Standards
- **FR-027**: All documentation MUST follow bilingual format with English as primary and Russian as complete translation
- **FR-028**: Russian documentation MUST maintain identical structure and line count to English version
- **FR-029**: Documentation spoilers in issues/PRs MUST use exact format: `<summary>In Russian</summary>`

#### Best Practices
- **FR-030**: Code MUST follow Svelte and TypeScript best practices
- **FR-031**: Project structure MUST NOT include legacy code or incomplete implementations from reference project
- **FR-032**: Project MUST NOT include separate `docs/` directory (documentation will be external)
- **FR-033**: Project MUST NOT include pre-created AI agent rules (user will create as needed)
- **FR-033a**: Feature implementations MUST NOT be placed in root-level directories like `src/`, `lib/`, or `app/`. All features MUST be implemented as packages in `packages/` directory

#### Development Process
- **FR-034**: Development team MUST conduct step-by-step analysis of Universo Platformo React repository (https://github.com/teknokomo/universo-platformo-react) structure before implementing each major feature component to understand architectural patterns and requirements
- **FR-035**: Before implementing any feature from a specification, a GitHub Issue MUST be created following `.github/instructions/github-issues.md` guidelines and linked to the corresponding Pull Request

### Key Entities

- **Package**: A self-contained module in the monorepo; has dependencies, scripts, and source code; can be frontend (`-frt` suffix) or backend (`-srv` suffix); contains a `base/` directory for implementation variants; designed to eventually become a standalone repository
- **Shared Package**: Utility package without feature-specific UI or backend logic; provides common types, utilities, API clients, or internationalization; consumed by multiple feature packages; examples: `@universo/types`, `@universo/utils`, `@universo/api-client`, `@universo/i18n`; designed to be published as independent npm packages
- **Workspace**: PNPM workspace configuration that links packages together; enables packages to reference each other using workspace protocol; manages dependencies across the monorepo; temporary organizational structure before packages become independent repositories
- **User**: Individual accessing the system; requires authentication; has session state; credentials stored in Supabase
- **Authentication Session**: Managed by Passport.js; linked to Supabase user; persists across requests; provides user context to application
- **Configuration**: Environment-specific settings; includes Supabase credentials; includes authentication settings; shared across packages where appropriate
- **Dependency Catalog**: Centralized version manifest in pnpm-workspace.yaml that defines canonical versions for shared dependencies; ensures version consistency; simplifies dependency updates across monorepo

## Technical Standards and Patterns *(mandatory)*

### Package Structure Pattern

Each package in the monorepo MUST follow this standardized directory structure:

```
packages/
├── [feature-name]-frt/          # Frontend package
│   ├── base/                     # Base implementation directory
│   │   ├── src/                  # Source code
│   │   │   ├── components/       # Svelte components
│   │   │   ├── stores/           # Svelte stores
│   │   │   ├── utils/            # Utility functions
│   │   │   └── index.ts          # Package entry point
│   │   ├── package.json          # Package dependencies
│   │   ├── tsconfig.json         # TypeScript configuration
│   │   └── README.md             # Package documentation
│   └── README.md                 # Package overview
│
└── [feature-name]-srv/          # Backend package
    ├── base/                     # Base implementation directory
    │   ├── src/                  # Source code
    │   │   ├── routes/           # API routes
    │   │   ├── services/         # Business logic
    │   │   ├── models/           # Data models
    │   │   ├── middleware/       # Express middleware
    │   │   └── index.ts          # Package entry point
    │   ├── package.json          # Package dependencies
    │   ├── tsconfig.json         # TypeScript configuration
    │   └── README.md             # Package documentation
    └── README.md                 # Package overview
```

**Naming Conventions**:
- Package names MUST use kebab-case: `feature-name-frt`, `feature-name-srv`
- Frontend packages MUST end with `-frt` suffix
- Backend packages MUST end with `-srv` suffix
- Package names MUST be descriptive and reflect the feature domain

**base/ Directory Rationale**:
The `base/` directory enables future support for multiple implementations of the same functionality using different technology stacks or approaches, while maintaining consistent package naming and structure at the parent level.

### PNPM Workspace Configuration

**Workspace Protocol Usage**:
```json
{
  "dependencies": {
    "@universo/clusters-frt": "workspace:*",
    "@universo/clusters-srv": "workspace:*"
  }
}
```

**Key Requirements**:
- All internal package references MUST use `workspace:*` protocol
- External dependencies MUST specify explicit version ranges
- Package names MUST include organization scope: `@universo/package-name`
- Root workspace configuration MUST define `packages/*` pattern

**Example Root package.json**:
```json
{
  "name": "@universo/platformo-svelte",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "packageManager": "pnpm@8.0.0"
}
```

### Centralized Configuration Pattern

**Configuration Structure**:
```
packages/
└── core-config/
    ├── base/
    │   ├── src/
    │   │   ├── database.config.ts      # Database connections
    │   │   ├── auth.config.ts          # Authentication settings
    │   │   ├── theme.config.ts         # UI theme configuration
    │   │   ├── env.config.ts           # Environment variables
    │   │   └── index.ts                # Unified config exports
    │   └── package.json
```

**Configuration Access Pattern**:
```typescript
// In any package
import { databaseConfig, authConfig, themeConfig } from '@universo/core-config';

// Use centralized configuration
const supabase = createClient(
  databaseConfig.url,
  databaseConfig.anonKey
);
```

**Configuration Requirements**:
- Environment variables MUST be loaded from `.env` files (not committed)
- Configuration MUST support multiple environments (development, staging, production)
- Secrets MUST NEVER be hardcoded in configuration files
- Configuration types MUST be defined with TypeScript interfaces

### Authentication Architecture Pattern

**Reusable Authentication Structure**:
```
packages/
└── auth-srv/
    ├── base/
    │   ├── src/
    │   │   ├── strategies/
    │   │   │   └── supabase.strategy.ts   # Passport Supabase strategy
    │   │   ├── middleware/
    │   │   │   ├── authenticate.ts        # Auth middleware
    │   │   │   └── authorize.ts           # Authorization middleware
    │   │   ├── services/
    │   │   │   ├── session.service.ts     # Session management
    │   │   │   └── token.service.ts       # Token operations
    │   │   └── index.ts
```

**Authentication Pattern Requirements**:
- Authentication logic MUST be centralized in `auth-srv` package
- All packages requiring authentication MUST import from `@universo/auth-srv`
- Session management MUST use server-side storage (not client-only)
- Token refresh MUST be handled automatically by middleware
- Authentication state MUST be shared via Svelte stores in frontend

### Build Scripts Pattern

**Cross-Package Build Configuration**:

Root `package.json` scripts:
```json
{
  "scripts": {
    "build": "pnpm -r --filter './packages/*' run build",
    "build:frt": "pnpm -r --filter './packages/*-frt' run build",
    "build:srv": "pnpm -r --filter './packages/*-srv' run build",
    "dev": "pnpm -r --parallel --filter './packages/*' run dev",
    "test": "pnpm -r --filter './packages/*' run test",
    "lint": "pnpm -r --filter './packages/*' run lint",
    "type-check": "pnpm -r --filter './packages/*' run type-check"
  }
}
```

**Build Requirements**:
- Each package MUST have `build`, `dev`, `test`, and `lint` scripts
- Build order MUST respect dependency graph (backend before frontend for shared types)
- Build artifacts MUST be output to package-specific `dist/` directories
- Build process MUST include TypeScript compilation and type checking
- Failed builds in any package MUST stop the entire build process

### TypeScript and Code Quality Standards

**TypeScript Configuration**:
- `strict: true` MUST be enabled in all tsconfig.json files
- `noImplicitAny: true` MUST be enforced
- `esModuleInterop: true` for better module compatibility
- Shared base configuration MUST be extended from root tsconfig.base.json

**Linting Standards**:
- ESLint MUST be configured with Svelte and TypeScript support
- Prettier MUST be used for code formatting
- Pre-commit hooks MUST run linting and formatting
- Configuration files:
  - `.eslintrc.js` - ESLint rules
  - `.prettierrc` - Prettier formatting
  - `.editorconfig` - Editor settings

**Best Practices Reference**:
- Svelte Best Practices: https://svelte.dev/docs/svelte/best-practices
- TypeScript Best Practices: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html
- Monorepo Best Practices: https://pnpm.io/workspaces

### Database Extensibility Pattern

**Abstraction Layer Structure**:
```typescript
// Database abstraction interface
interface IDatabaseAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T>(sql: string, params?: any[]): Promise<T[]>;
  transaction<T>(callback: () => Promise<T>): Promise<T>;
}

// Supabase implementation
class SupabaseAdapter implements IDatabaseAdapter {
  // Implementation details
}

// Future: PostgreSQL direct implementation
class PostgreSQLAdapter implements IDatabaseAdapter {
  // Implementation details
}
```

**Extensibility Requirements**:
- All database operations MUST use abstraction interface
- Database-specific features MUST be documented as implementation details
- Business logic MUST NOT depend on Supabase-specific APIs
- Migration path to other databases MUST be documented

### Material UI Integration Specification

**Recommended Library**: Svelte Material UI (SMUI)
- Repository: https://github.com/hperrin/svelte-material-ui
- Documentation: https://sveltematerialui.com/

**Alternative Consideration**: If SMUI proves unmaintained or incompatible, evaluate:
1. Skeleton UI (Tailwind-based alternative)
2. Custom Material Design implementation
3. Carbon Components Svelte

**Theme Configuration Pattern**:
```typescript
// packages/ui-theme/base/src/theme.config.ts
export const theme = {
  palette: {
    primary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0' },
    secondary: { main: '#9c27b0', light: '#ba68c8', dark: '#7b1fa2' },
    error: { main: '#d32f2f' },
    warning: { main: '#ffa726' },
    info: { main: '#0288d1' },
    success: { main: '#2e7d32' }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14
  },
  spacing: 8
};
```

### Clusters Pattern Specification

**Base Pattern Structure**:
The Clusters pattern establishes a three-level hierarchical entity structure that serves as the foundation for similar features throughout the application.

**Entity Hierarchy**:
```
Cluster (Top Level)
├── Domain (Middle Level)
│   ├── Resource (Bottom Level)
│   ├── Resource
│   └── Resource
├── Domain
│   └── Resource
```

**Pattern Application Examples**:
- **Clusters Feature**: Clusters → Domains → Resources
- **Metaverses Feature**: Metaverses → Sections → Entities
- **Uniks Feature**: Uniks → Categories → Items (+ additional levels)

**Entity Relationships**:
- One Cluster contains many Domains (1:N)
- One Domain contains many Resources (1:N)
- Resources are the leaf nodes with no children
- Each level MUST support CRUD operations
- Each level MUST support hierarchical navigation

**Database Schema Pattern**:
```sql
-- Top level entity
CREATE TABLE clusters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Middle level entity
CREATE TABLE domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cluster_id UUID REFERENCES clusters(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bottom level entity
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain_id UUID REFERENCES domains(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  resource_type VARCHAR(100),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**UI Component Pattern**:
- List view for each level showing child entities
- Detail view for individual entity CRUD operations
- Breadcrumb navigation showing hierarchy path
- Tree view for visualizing entire hierarchy

**Implementation Priority**:
1. Implement Clusters pattern as the reference implementation
2. Document patterns and reusable components
3. Apply pattern to Metaverses with minor variations
4. Extend pattern to Uniks with additional levels

### Shared Package Architecture Pattern

**Purpose**: Shared packages eliminate code duplication, provide consistent types and utilities, and create reusable building blocks for feature packages.

**Required Shared Packages**:

#### `@universo/types`
**Purpose**: Centralized TypeScript type definitions used across frontend and backend

**Structure**:
```
packages/universo-types/
└── base/
    ├── src/
    │   ├── common/          # Common types (IDs, timestamps, pagination)
    │   ├── ecs/             # Entity Component System types
    │   ├── errors/          # Error types and codes
    │   ├── protocol/        # Network protocol types
    │   ├── updl/            # Universal Platform Description Language types
    │   ├── validation/      # Validation schemas (Zod)
    │   └── index.ts         # Unified exports
    ├── package.json
    └── tsconfig.json
```

**Requirements**:
- MUST be a pure TypeScript package with no runtime dependencies
- MUST export both types and Zod validation schemas
- MUST be consumed by both frontend and backend packages
- SHOULD use conditional exports for different module systems

**Example package.json**:
```json
{
  "name": "@universo/types",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./validation": {
      "types": "./dist/validation/index.d.ts",
      "import": "./dist/validation/index.mjs"
    }
  },
  "dependencies": {
    "zod": "3.25.76"
  }
}
```

#### `@universo/utils`
**Purpose**: Shared utility functions for validation, serialization, network operations, rate limiting, and UI helpers

**Structure**:
```
packages/universo-utils/
└── base/
    ├── src/
    │   ├── api/             # API utilities (request builders, error handlers)
    │   ├── delta/           # Delta compression for network efficiency
    │   ├── env/             # Environment variable validation
    │   ├── math/            # Mathematical utilities
    │   ├── net/             # Network utilities
    │   ├── rate-limiting/   # Rate limiting middleware
    │   ├── serialization/   # Data serialization (binary protocols)
    │   ├── ui-utils/        # UI utilities (formatters, validators)
    │   ├── validation/      # Validation helpers
    │   ├── index.ts         # Server-side exports
    │   └── index.browser.ts # Browser-side exports
    ├── package.json
    └── tsconfig.json
```

**Requirements**:
- MUST provide separate exports for server and browser environments
- MUST use conditional exports to prevent server-only code from bundling in frontend
- MAY have optional peer dependencies (e.g., express for rate-limiting middleware)
- MUST depend on `@universo/types` for shared type definitions

**Example package.json with conditional exports**:
```json
{
  "name": "@universo/utils",
  "exports": {
    ".": {
      "browser": {
        "import": "./dist/index.browser.mjs",
        "require": "./dist/index.browser.js",
        "types": "./dist/index.browser.d.ts"
      },
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./rate-limiting": {
      "import": "./dist/rate-limiting.mjs",
      "require": "./dist/rate-limiting.js",
      "types": "./dist/rate-limiting.d.ts"
    },
    "./ui-utils": {
      "import": "./dist/ui-utils.mjs",
      "require": "./dist/ui-utils.js"
    }
  },
  "dependencies": {
    "@universo/types": "workspace:*",
    "@universo/i18n": "workspace:*",
    "zod": "catalog:"
  },
  "peerDependencies": {
    "express": "^4.18.0"
  },
  "peerDependenciesMeta": {
    "express": {
      "optional": true
    }
  }
}
```

#### `@universo/api-client`
**Purpose**: Type-safe API client for communicating with backend services

**Structure**:
```
packages/universo-api-client/
├── src/
│   ├── clients/          # API client classes (ClustersClient, AuthClient, etc.)
│   ├── hooks/            # React Query hooks for data fetching
│   ├── types/            # Request/response types
│   └── index.ts          # Main exports
├── package.json
└── tsconfig.json
```

**Requirements**:
- MUST provide type-safe API methods matching backend endpoints
- SHOULD integrate with React Query or SvelteKit for data fetching patterns
- MUST handle authentication headers automatically
- MUST provide retry logic and error handling
- MUST depend on `@universo/types` for API contracts
- MAY use axios or fetch as HTTP client

**Example API client**:
```typescript
import { z } from 'zod';
import { ClusterSchema } from '@universo/types';

export class ClustersClient {
  async getClusters(params: PaginationParams): Promise<Cluster[]> {
    const response = await this.http.get('/api/clusters', { params });
    return ClusterSchema.array().parse(response.data);
  }
}
```

#### `@universo/i18n`
**Purpose**: Centralized internationalization instance and translation management

**Structure**:
```
packages/universo-i18n/
└── base/
    ├── src/
    │   ├── instance.ts      # i18next instance singleton
    │   ├── registry.ts      # Translation namespace registry
    │   ├── types.ts         # i18n TypeScript types
    │   └── index.ts         # Main exports
    ├── package.json
    └── tsconfig.json
```

**Requirements**:
- MUST provide singleton i18next instance to avoid multiple instance conflicts
- MUST export namespace registry for dynamic translation loading
- MUST support lazy loading of translation namespaces
- MUST integrate with react-i18next or equivalent Svelte i18n library
- SHOULD provide type-safe translation keys (TypeScript namespaces)

**Example usage**:
```typescript
import { i18nInstance, registerNamespace } from '@universo/i18n';
import clustersEn from './locales/en/clusters.json';
import clustersRu from './locales/ru/clusters.json';

registerNamespace('clusters', {
  en: clustersEn,
  ru: clustersRu
});

// Type-safe translations
const { t } = useTranslation('clusters');
t('cluster.create.title'); // Autocomplete and type-checked
```

### PNPM Catalog Pattern

**Purpose**: Centralize dependency versions in `pnpm-workspace.yaml` to ensure consistency across all packages and simplify version updates.

**Catalog Definition** (in `pnpm-workspace.yaml`):
```yaml
packages:
  - 'packages/*'
  - 'packages/*/base'

catalog:
  # TypeScript toolchain
  typescript: ^5.8.3
  
  # i18next ecosystem
  i18next: 23.16.8
  react-i18next: ^15.5.3
  
  # Svelte ecosystem (adapt for Svelte version)
  svelte: ^4.2.0  
  '@sveltejs/kit': ^2.0.0
  
  # Build tools
  vite: ^5.4.19
  vitest: ^2.1.8
  
  # MUI/UI (find Svelte equivalents)
  # Note: React MUI won't work with Svelte; need alternatives
  
  # Testing
  '@testing-library/svelte': ^4.0.5
  happy-dom: ^16.14.2
  
  # Utilities
  dayjs: ^1.11.18
  axios: ^1.7.9
  zod: ^3.25.76
  
  # Rate limiting
  express-rate-limit: ^8.2.0
  ioredis: ^5.8.2
```

**Usage in package.json**:
```json
{
  "dependencies": {
    "typescript": "catalog:",
    "i18next": "catalog:",
    "dayjs": "catalog:"
  }
}
```

**Benefits**:
- Single source of truth for dependency versions
- Automatic version consistency across monorepo
- Simplified dependency updates (change once, apply everywhere)
- Prevents accidental version drift between packages

### Advanced Build Configuration Pattern

**Build Tool Selection**: Use `tsdown` for TypeScript library builds or Vite for full applications

**Tsdown Configuration Pattern** (for library packages):
```typescript
// tsdown.config.ts
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: './src/index.ts',
  },
  
  // Output both ESM and CJS for compatibility
  format: ['esm', 'cjs'],
  
  // Generate TypeScript declarations
  dts: true,
  
  // Platform: 'node' for backend, 'browser' for frontend
  platform: 'node',
  
  clean: true,
  outDir: 'dist',
  
  // CRITICAL: Don't auto-modify package.json exports
  exports: false,
  
  // Tree-shaking for optimization
  treeshake: true,
  
  // Don't minify libraries for better debugging
  minify: false,
  
  // Source maps for debugging
  sourcemap: true,
  
  // External dependencies (don't bundle)
  external: [
    '@universo/*',  // All workspace packages
    'svelte',
    'react',
    // ... other peer dependencies
  ],
});
```

**Frontend Package tsconfig.json Pattern**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowJs": true,
    
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@types/*": ["../../../packages/universo-types/base/src/*"],
      "@utils/*": ["../../../packages/universo-utils/base/src/*"],
      "@api/*": ["src/api/*"],
      "@components/*": ["src/components/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

**Backend Package tsconfig.json Pattern**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "Node16",
    "lib": ["ES2020"],
    "moduleResolution": "node16",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Turborepo Configuration** (optional but recommended):
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"],
      "cache": false
    },
    "test": {},
    "dev": {
      "cache": false,
      "persistent": true
    },
    "clean": {
      "cache": false
    }
  }
}
```

**Root package.json Scripts with Turbo**:
```json
{
  "scripts": {
    "build": "turbo run build",
    "build-force": "pnpm clean && turbo run build --force",
    "dev": "turbo run dev --parallel --no-cache",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "clean": "turbo run clean",
    "clean:all": "rimraf node_modules .turbo **/node_modules **/.turbo **/dist **/build"
  }
}
```

### Clusters Pattern Specification

**Base Pattern Structure**:
The Clusters pattern establishes a three-level hierarchical entity structure that serves as the foundation for similar features throughout the application.

**Entity Hierarchy**:
```
Cluster (Top Level)
├── Domain (Middle Level)
│   ├── Resource (Bottom Level)
│   ├── Resource
│   └── Resource
├── Domain
│   └── Resource
```

**Pattern Application Examples**:
- **Clusters Feature**: Clusters → Domains → Resources
- **Metaverses Feature**: Metaverses → Sections → Entities
- **Uniks Feature**: Uniks → Categories → Items (+ additional levels)

**Entity Relationships**:
- One Cluster contains many Domains (1:N)
- One Domain contains many Resources (1:N)
- Resources are the leaf nodes with no children
- Each level MUST support CRUD operations
- Each level MUST support hierarchical navigation

**Database Schema Pattern**:
```sql
-- Top level entity
CREATE TABLE clusters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Middle level entity
CREATE TABLE domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cluster_id UUID REFERENCES clusters(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bottom level entity
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain_id UUID REFERENCES domains(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  resource_type VARCHAR(100),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**UI Component Pattern**:
- List view for each level showing child entities
- Detail view for individual entity CRUD operations
- Breadcrumb navigation showing hierarchy path
- Tree view for visualizing entire hierarchy

**Implementation Priority**:
1. Implement Clusters pattern as the reference implementation
2. Document patterns and reusable components
3. Apply pattern to Metaverses with minor variations
4. Extend pattern to Uniks with additional levels

### Step-by-Step React Repository Analysis Process

**Analysis Workflow**:

1. **Initial Repository Scan** (Before any feature implementation):
   - Clone Universo Platformo React repository
   - Review repository structure and package organization
   - Document monorepo patterns and conventions
   - Identify core packages and their purposes
   - Map dependencies between packages

2. **Feature-Specific Analysis** (Before each major feature):
   - Locate feature implementation in React repository
   - Document component hierarchy and data flow
   - Identify API endpoints and database schemas
   - Extract business logic and validation rules
   - Note UI/UX patterns and user workflows
   - Document any Flowise legacy code to avoid

3. **Pattern Extraction**:
   - Identify reusable architectural patterns
   - Document authentication and authorization patterns
   - Extract database access patterns
   - Note state management approaches
   - Document API design patterns

4. **Translation to Svelte**:
   - Map React components to Svelte equivalents
   - Adapt state management (React state → Svelte stores)
   - Convert class components to Svelte functional patterns
   - Update routing (React Router → SvelteKit routing)
   - Adapt build configuration for Svelte tooling

5. **Documentation**:
   - Create analysis document in specs directory
   - Document differences between React and Svelte implementations
   - Note improvements and optimizations
   - Reference original React implementation for context

**Analysis Output Template**:
```markdown
# Feature Analysis: [Feature Name]

## React Implementation Reference
- Location: packages/[package-name]
- Key files: [list]
- Dependencies: [list]

## Business Logic Extracted
- [List core business rules]

## Database Schema
- [Document tables and relationships]

## API Endpoints
- [List endpoints and contracts]

## UI Components Identified
- [List main components]

## Svelte Translation Plan
- [Document adaptation strategy]

## Improvements from React Version
- [List planned improvements]
```

### Legacy Code Definition

**Explicitly Defined Legacy Code**:
1. **Flowise Integration Code**: Any code in React repository related to Flowise workflow builder that has not been fully refactored
2. **Incomplete Migrations**: Code marked with TODO, FIXME, or HACK comments
3. **Deprecated Patterns**: Code using outdated libraries or patterns marked for replacement
4. **Temporary Workarounds**: Code with comments indicating temporary solutions
5. **Unused Dependencies**: Packages imported but not used in production code

**Incomplete Implementations Definition**:
1. **Partial Features**: Features with UI but no backend, or vice versa
2. **Missing Validation**: CRUD operations without proper validation
3. **Unimplemented Error Handling**: Code without try-catch or error boundaries
4. **Missing Tests**: Features without corresponding test coverage
5. **Undocumented APIs**: Endpoints without API documentation

**Verification Approach**:
- Review React repository issues for known legacy code areas
- Check git blame for recent refactoring commits
- Look for deprecation warnings in console/logs
- Identify files with high churn rate indicating instability

### Validation Approaches *(mandatory)*

#### Bilingual Documentation Line Count Validation

**Automated Validation Script**:
```bash
#!/bin/bash
# scripts/validate-bilingual-docs.sh

for readme in $(find . -name "README.md"); do
  readme_ru="${readme%.md}-RU.md"
  
  if [ -f "$readme_ru" ]; then
    lines_en=$(wc -l < "$readme")
    lines_ru=$(wc -l < "$readme_ru")
    
    if [ "$lines_en" -ne "$lines_ru" ]; then
      echo "ERROR: Line count mismatch"
      echo "  EN: $readme ($lines_en lines)"
      echo "  RU: $readme_ru ($lines_ru lines)"
      exit 1
    fi
  else
    echo "ERROR: Missing Russian translation for $readme"
    exit 1
  fi
done

echo "✓ All bilingual documentation validated"
```

**CI Integration**:
- Script MUST run in GitHub Actions on every PR
- PR MUST be blocked if validation fails
- Validation report MUST be posted as PR comment

**Pre-commit Hook**:
```bash
# .husky/pre-commit
#!/bin/sh
./scripts/validate-bilingual-docs.sh
```

#### Package Structure Compliance Validation

**Structure Validation Script**:
```bash
#!/bin/bash
# scripts/validate-package-structure.sh

for package in packages/*; do
  # Check naming convention
  if [[ ! "$package" =~ -frt$ ]] && [[ ! "$package" =~ -srv$ ]]; then
    echo "ERROR: Package $package does not follow naming convention"
    echo "  Packages must end with -frt or -srv"
    exit 1
  fi
  
  # Check base/ directory exists
  if [ ! -d "$package/base" ]; then
    echo "ERROR: Package $package missing base/ directory"
    exit 1
  fi
  
  # Check required files
  required_files=("base/package.json" "base/tsconfig.json" "base/README.md")
  for file in "${required_files[@]}"; do
    if [ ! -f "$package/$file" ]; then
      echo "ERROR: Package $package missing required file: $file"
      exit 1
    fi
  done
  
  # Check src/ directory exists
  if [ ! -d "$package/base/src" ]; then
    echo "ERROR: Package $package missing base/src/ directory"
    exit 1
  fi
done

echo "✓ All packages follow structure requirements"
```

**IDE Integration**:
- VSCode workspace settings MUST include structure validation
- Yeoman generator template MUST create compliant structure
- Documentation MUST include structure checklist

#### Workspace Dependency Resolution Validation

**Dependency Audit Script**:
```bash
#!/bin/bash
# scripts/validate-workspace-deps.sh

# Verify all workspace dependencies exist
for package in packages/*/base/package.json; do
  workspace_deps=$(jq -r '.dependencies // {} | to_entries[] | select(.value | startswith("workspace:")) | .key' "$package")
  
  for dep in $workspace_deps; do
    dep_name="${dep#@universo/}"
    
    # Check if referenced package exists
    if [ ! -d "packages/$dep_name" ]; then
      echo "ERROR: Package dependency not found"
      echo "  Package: $package"
      echo "  Missing dependency: $dep ($dep_name)"
      exit 1
    fi
  done
done

# Verify no version conflicts
pnpm list --depth=0 > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "ERROR: Workspace dependency conflicts detected"
  pnpm list --depth=0
  exit 1
fi

echo "✓ All workspace dependencies validated"
```

**Lock File Validation**:
- pnpm-lock.yaml MUST be committed
- Lock file MUST be validated in CI
- Outdated dependencies MUST be flagged by Dependabot

#### Authentication Flow Validation

**Integration Test Suite**:
```typescript
// tests/integration/auth-flow.test.ts
describe('Authentication Flow', () => {
  test('successful login with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });
  
  test('token refresh before expiration', async () => {
    const token = await getValidToken();
    const response = await request(app)
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
  
  test('expired token handling', async () => {
    const expiredToken = await getExpiredToken();
    const response = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${expiredToken}`);
    
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'Token expired');
  });
  
  test('session persistence across requests', async () => {
    const agent = request.agent(app);
    
    // Login
    await agent
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    
    // Verify session persists
    const response = await agent.get('/api/user/profile');
    expect(response.status).toBe(200);
  });
});
```

**Manual Test Checklist**:
- [ ] User can log in with valid Supabase credentials
- [ ] User session persists after page refresh
- [ ] User is redirected to login when accessing protected routes unauthenticated
- [ ] User can log out and session is cleared
- [ ] Token refresh happens automatically before expiration
- [ ] Expired token triggers re-authentication flow

## Success Criteria *(mandatory)*

### Measurable Outcomes

#### Development Environment
- **SC-001**: Developers can clone the repository and complete initial setup in under 5 minutes
- **SC-002**: Development server starts successfully on first run without errors after dependency installation
- **SC-003**: Changes to source code reflect in the running application in under 2 seconds

#### Package Management
- **SC-004**: New packages can be created following the structure template in under 10 minutes
- **SC-005**: Package dependencies resolve correctly 100% of the time when properly configured
- **SC-006**: Build process successfully compiles all packages without errors
- **SC-006a**: Shared packages (@universo/types, @universo/utils, @universo/api-client, @universo/i18n) are successfully consumed by feature packages without import errors
- **SC-006b**: Catalog dependencies maintain version consistency across all packages (verified by automated checks)

#### Documentation Quality
- **SC-007**: All README files pass bilingual structure validation (identical line count in English and Russian)
- **SC-008**: New developers can understand the project structure from documentation within 15 minutes
- **SC-009**: Documentation coverage includes setup, architecture, and contribution guidelines

#### Authentication Integration
- **SC-010**: User authentication flow completes successfully in under 3 seconds
- **SC-011**: Session persistence works correctly across page refreshes and browser restarts
- **SC-012**: Authentication integration can be reused across new packages without code duplication

#### Code Quality
- **SC-013**: Code compilation completes without errors across all packages
- **SC-014**: Code follows consistent style guide enforced by automated tools
- **SC-015**: No legacy code or incomplete implementations remain from reference project

#### Database Integration  
- **SC-016**: Database connection establishes successfully with valid credentials
- **SC-017**: Database queries execute successfully through the established connection pattern
- **SC-018**: Database integration pattern is documented and reusable

#### Project Health
- **SC-019**: Repository has zero critical security vulnerabilities in dependencies
- **SC-020**: Build process completes in under 2 minutes for typical changes
- **SC-021**: All configured development tools run successfully without errors
- **SC-022**: Development team demonstrates understanding of React repository architectural patterns through documented analysis before implementing major features
- **SC-023**: All feature implementations have corresponding GitHub Issues created before development begins

## Definitions and Terminology *(mandatory)*

### Base Functionality

"Base functionality" refers to the foundational infrastructure that must be established before implementing feature-specific functionality:

1. **Repository Infrastructure**:
   - Monorepo setup with PNPM workspace configuration
   - Package structure patterns and naming conventions
   - Build, lint, and test script configuration
   - TypeScript and Svelte tooling setup

2. **Development Environment**:
   - Local development server with hot module replacement
   - Environment configuration management
   - Development tooling (ESLint, Prettier, etc.)
   - Git hooks for pre-commit validation

3. **Core Packages**:
   - `core-config`: Centralized configuration management
   - `auth-srv`: Authentication and authorization services
   - `ui-theme`: Material UI theme and styling configuration
   - `db-client`: Database connection and query abstraction

4. **Documentation Foundation**:
   - Root README files (English and Russian)
   - Contribution guidelines
   - Package creation templates
   - Development workflow documentation

**What is NOT Base Functionality**:
- Business domain features (Clusters, Metaverses, Uniks)
- User-facing UI pages and forms
- Specific database schemas for business entities
- Advanced features like LangChain integration or graph nodes

### Clusters Pattern

The Clusters pattern is the reference implementation for hierarchical entity management. See "Clusters Pattern Specification" in the Technical Standards and Patterns section for complete details.

**Summary**: A three-level hierarchy (Cluster → Domain → Resource) that establishes reusable patterns for entity CRUD operations, hierarchical navigation, and database relationships.

### Centralized Configuration

Configuration that is defined once and reused across all packages in the monorepo. See "Centralized Configuration Pattern" in the Technical Standards and Patterns section for implementation details.

**Components**:
- Database connection settings
- Authentication configuration
- UI theme and styling
- Environment variable management
- Feature flags and runtime settings

### Best Practices

Coding standards and patterns that ensure consistency, maintainability, and quality. See "TypeScript and Code Quality Standards" in the Technical Standards and Patterns section for specific standards.

**Categories**:
- Svelte component patterns and conventions
- TypeScript type safety and strict mode
- Code formatting and linting rules
- Testing patterns and coverage requirements
- Documentation standards
- Git commit message format
- Code review guidelines

## Assumptions

- Developers have Node.js (version 18 or higher) and PNPM installed on their system
- Supabase project is already created and credentials are available
- Material UI library for Svelte (such as SMUI or similar) is available and maintained
- Team members are familiar with Svelte, TypeScript, and monorepo concepts
- Git and GitHub are used for version control and collaboration
- The reference Universo Platformo React repository (https://github.com/teknokomo/universo-platformo-react) is accessible for concept reference
- Development will primarily occur on Linux or macOS environments (Windows supported via WSL)
- Documentation will be maintained in Markdown format
- Issue labels will be manually created in GitHub repository settings or via API
- Passport.js supports Supabase authentication through available connectors or custom strategies

## Dependencies

- Reference to Universo Platformo React repository for architectural concepts and patterns
- Availability of Supabase instance with appropriate access credentials
- PNPM package manager for monorepo management
- Material UI library compatible with Svelte
- Passport.js with Supabase authentication capability
- TypeScript compiler and Svelte compiler
- Development tools: linters, formatters, build tools

## Out of Scope

The following items are explicitly excluded from this initial setup:

- Implementation of specific business features beyond base infrastructure (Clusters, Domains, Resources, etc. will be in subsequent features)
- Creation of complete UI components and pages for business features
- Database schema design and migrations for business entities
- Deployment configuration and CI/CD pipelines (basic setup only, not production deployment)
- Comprehensive test suites (will be added with features)
- Internationalization (i18n) for application UI content (only documentation is bilingual; i18n infrastructure setup is in scope)
- Performance optimization and load testing
- Security audits and penetration testing
- Mobile application setup
- Legacy code migration from React version (only pattern extraction)
- Documentation repository setup (external)
- Complete feature parity with React version (iterative implementation)
- Advanced features like LangChain integration, UPDL nodes, multiplayer (Colyseus), and complex publish mechanisms

**Note**: While shared package architecture (@universo/types, @universo/utils, @universo/api-client, @universo/i18n) is now explicitly in scope as part of base functionality, the actual feature implementations using these packages are out of scope for initial setup.

These items will be addressed in subsequent features and specifications.
