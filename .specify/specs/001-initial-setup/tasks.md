# Tasks: Initial Setup and Architecture of Universo Platformo Svelte

**Input**: Design documents from `/.specify/specs/001-initial-setup/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Tests are NOT explicitly requested in the feature specification. This is infrastructure setup focused on project architecture and developer experience. Testing tasks are omitted as per requirements.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

This is a **monorepo project** where ALL functionality resides in `packages/` directory. Each package follows the structure:
- `packages/[package-name]/base/src/` - Source code
- `packages/[package-name]/base/package.json` - Package config
- `packages/[package-name]/base/tsconfig.json` - TypeScript config
- `packages/[package-name]/base/README.md` - English documentation
- `packages/[package-name]/base/README-RU.md` - Russian documentation

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize repository structure and configuration files

- [ ] T001 Create root package.json with workspace configuration and build scripts
- [ ] T002 Create pnpm-workspace.yaml with packages glob patterns and dependency catalog
- [ ] T003 Create tsconfig.base.json with shared TypeScript configuration
- [ ] T004 [P] Create .gitignore for Node.js, TypeScript, and Svelte projects
- [ ] T005 [P] Create .eslintrc.js with ESLint configuration for Svelte and TypeScript
- [ ] T006 [P] Create .prettierrc with Prettier formatting rules
- [ ] T007 [P] Create .editorconfig with consistent editor settings
- [ ] T008 Create root README.md with project overview and setup instructions
- [ ] T009 Create root README-RU.md with Russian translation (identical structure to T008)
- [ ] T010 [P] Create scripts/validate-bilingual-docs.sh for documentation validation
- [ ] T011 [P] Create scripts/validate-package-structure.sh for package compliance validation
- [ ] T012 [P] Create scripts/validate-workspace-deps.sh for dependency resolution validation
- [ ] T013 [P] Create .env.example with template environment variables
- [ ] T014 [P] Create turbo.json for Turborepo build orchestration (optional but recommended)

---

## Phase 2: Foundational (Shared Packages - Blocking Prerequisites)

**Purpose**: Create shared utility packages that ALL feature packages will depend on

**⚠️ CRITICAL**: No user story implementation can begin until all shared packages are complete

### @universo/types Package

- [ ] T015 [P] Create packages/universo-types/base/package.json with dependencies
- [ ] T016 [P] Create packages/universo-types/base/tsconfig.json extending base config
- [ ] T017 [P] Create packages/universo-types/base/tsdown.config.ts for build configuration
- [ ] T018 [P] Create packages/universo-types/base/src/common/package.ts with Package schema and types
- [ ] T019 [P] Create packages/universo-types/base/src/common/configuration.ts with Configuration schema
- [ ] T020 [P] Create packages/universo-types/base/src/common/documentation.ts with Documentation schema
- [ ] T021 [P] Create packages/universo-types/base/src/common/index.ts with common type exports
- [ ] T022 [P] Create packages/universo-types/base/src/errors/index.ts with error types and codes
- [ ] T023 [P] Create packages/universo-types/base/src/protocol/index.ts with network protocol types
- [ ] T024 [P] Create packages/universo-types/base/src/validation/index.ts with Zod validation helpers
- [ ] T025 Create packages/universo-types/base/src/index.ts with unified type exports
- [ ] T026 Create packages/universo-types/base/README.md with package documentation
- [ ] T027 Create packages/universo-types/base/README-RU.md with Russian translation
- [ ] T028 Create packages/universo-types/README.md with package overview
- [ ] T029 Build and validate @universo/types package

### @universo/utils Package

- [ ] T030 [P] Create packages/universo-utils/base/package.json with conditional exports
- [ ] T031 [P] Create packages/universo-utils/base/tsconfig.json extending base config
- [ ] T032 [P] Create packages/universo-utils/base/tsdown.config.ts with platform-specific builds
- [ ] T033 [P] Create packages/universo-utils/base/src/api/request-builders.ts with API utilities
- [ ] T034 [P] Create packages/universo-utils/base/src/api/error-handlers.ts with error handling
- [ ] T035 [P] Create packages/universo-utils/base/src/env/validation.ts with environment validation using Zod
- [ ] T036 [P] Create packages/universo-utils/base/src/serialization/index.ts with serialization utilities
- [ ] T037 [P] Create packages/universo-utils/base/src/ui-utils/formatters.ts with UI formatting utilities
- [ ] T038 [P] Create packages/universo-utils/base/src/validation/helpers.ts with validation helpers
- [ ] T039 Create packages/universo-utils/base/src/index.ts with server-side exports
- [ ] T040 Create packages/universo-utils/base/src/index.browser.ts with browser-side exports
- [ ] T041 Create packages/universo-utils/base/README.md with package documentation
- [ ] T042 Create packages/universo-utils/base/README-RU.md with Russian translation
- [ ] T043 Create packages/universo-utils/README.md with package overview
- [ ] T044 Build and validate @universo/utils package

### @universo/i18n Package

- [ ] T045 [P] Create packages/universo-i18n/base/package.json with i18next dependencies
- [ ] T046 [P] Create packages/universo-i18n/base/tsconfig.json extending base config
- [ ] T047 [P] Create packages/universo-i18n/base/tsdown.config.ts for build configuration
- [ ] T048 [P] Create packages/universo-i18n/base/src/instance.ts with i18next singleton instance
- [ ] T049 [P] Create packages/universo-i18n/base/src/registry.ts with namespace registry for dynamic loading
- [ ] T050 [P] Create packages/universo-i18n/base/src/types.ts with i18n type definitions
- [ ] T051 Create packages/universo-i18n/base/src/index.ts with unified exports
- [ ] T052 Create packages/universo-i18n/base/README.md with package documentation
- [ ] T053 Create packages/universo-i18n/base/README-RU.md with Russian translation
- [ ] T054 Create packages/universo-i18n/README.md with package overview
- [ ] T055 Build and validate @universo/i18n package

### @universo/api-client Package

- [ ] T056 [P] Create packages/universo-api-client/base/package.json with HTTP client dependencies
- [ ] T057 [P] Create packages/universo-api-client/base/tsconfig.json extending base config
- [ ] T058 [P] Create packages/universo-api-client/base/tsdown.config.ts for build configuration
- [ ] T059 [P] Create packages/universo-api-client/base/src/clients/config.client.ts with ConfigClient implementation
- [ ] T060 [P] Create packages/universo-api-client/base/src/clients/package.client.ts with PackageClient implementation
- [ ] T061 [P] Create packages/universo-api-client/base/src/clients/docs.client.ts with DocsClient implementation
- [ ] T062 [P] Create packages/universo-api-client/base/src/types/index.ts with request/response types
- [ ] T063 Create packages/universo-api-client/base/src/index.ts with unified client exports
- [ ] T064 Create packages/universo-api-client/base/README.md with package documentation and usage examples
- [ ] T065 Create packages/universo-api-client/base/README-RU.md with Russian translation
- [ ] T066 Create packages/universo-api-client/README.md with package overview
- [ ] T067 Build and validate @universo/api-client package

### @universo/core-config Package

- [ ] T068 [P] Create packages/core-config/base/package.json with configuration dependencies
- [ ] T069 [P] Create packages/core-config/base/tsconfig.json extending base config
- [ ] T070 [P] Create packages/core-config/base/tsdown.config.ts for build configuration
- [ ] T071 [P] Create packages/core-config/base/src/env.config.ts with environment validation using Zod
- [ ] T072 [P] Create packages/core-config/base/src/database.config.ts with Supabase configuration
- [ ] T073 [P] Create packages/core-config/base/src/auth.config.ts with authentication configuration
- [ ] T074 [P] Create packages/core-config/base/src/theme.config.ts with UI theme configuration
- [ ] T075 Create packages/core-config/base/src/index.ts with unified config exports
- [ ] T076 Create packages/core-config/base/README.md with configuration documentation
- [ ] T077 Create packages/core-config/base/README-RU.md with Russian translation
- [ ] T078 Create packages/core-config/README.md with package overview
- [ ] T079 Build and validate @universo/core-config package

### @universo/app-frt Package (SvelteKit Application Shell)

**Note**: This package provides the main application entry point and development server. It ties all shared packages together and enables `pnpm dev` to start a working application.

- [ ] T079a [P] Create packages/app-frt/base/package.json with SvelteKit and shared package dependencies
- [ ] T079b [P] Create packages/app-frt/base/tsconfig.json extending base config for SvelteKit
- [ ] T079c [P] Create packages/app-frt/base/svelte.config.js with SvelteKit configuration
- [ ] T079d [P] Create packages/app-frt/base/vite.config.ts with Vite configuration for development
- [ ] T079e [P] Create packages/app-frt/base/src/app.html with HTML template
- [ ] T079f [P] Create packages/app-frt/base/src/app.d.ts with SvelteKit type declarations
- [ ] T079g Create packages/app-frt/base/src/routes/+layout.svelte with root layout (imports ui-theme)
- [ ] T079h Create packages/app-frt/base/src/routes/+page.svelte with home page placeholder
- [ ] T079i Create packages/app-frt/base/src/routes/+error.svelte with error page
- [ ] T079j Create packages/app-frt/base/README.md with application documentation
- [ ] T079k Create packages/app-frt/base/README-RU.md with Russian translation
- [ ] T079l Create packages/app-frt/README.md with package overview
- [ ] T079m Build and validate @universo/app-frt package
- [ ] T079n Test development server: run pnpm dev and verify application starts on localhost

**Checkpoint**: Foundation ready - shared packages complete and validated. User story implementation can now begin.

---

## Phase 3: User Story 1 - Developer Sets Up Local Development Environment (Priority: P1) 🎯 MVP

**Goal**: Enable developers to clone, install, and run the development environment successfully with documentation and validation tools

**Independent Test**: Clone fresh repository, run `pnpm install`, `pnpm build`, `pnpm dev` - all commands succeed without errors, development server starts, and validation scripts pass

**Why MVP**: This is the absolute minimum viable setup. Without a working development environment, no other features can be developed or tested.

### Implementation for User Story 1

- [ ] T080 [US1] Verify root package.json includes all required scripts (build, dev, test, lint, type-check, validate)
- [ ] T081 [US1] Verify pnpm-workspace.yaml includes catalog with all core dependencies (TypeScript, Svelte, Vite, Vitest, Zod)
- [ ] T082 [US1] Test clean install: delete node_modules and pnpm-lock.yaml, run pnpm install, verify success
- [ ] T083 [US1] Test build process: run pnpm build, verify all packages compile without errors
- [ ] T084 [US1] Test validation scripts: run pnpm validate, verify package structure and documentation validation passes
- [ ] T085 [US1] Create .github/workflows/ci.yml for CI validation of build, test, lint, and validation scripts
- [ ] T086 [US1] Verify quickstart.md instructions are accurate by following them step-by-step
- [ ] T087 [US1] Update root README.md with quick start section referencing .specify/specs/001-initial-setup/quickstart.md
- [ ] T088 [US1] Update root README-RU.md to match English version structure (line-by-line translation)
- [ ] T089 [US1] Run complete validation: pnpm install && pnpm build && pnpm validate && pnpm lint

**Checkpoint**: At this point, User Story 1 should be fully functional - any developer can clone and set up the repository successfully. This is the MVP deliverable.

---

## Phase 4: User Story 2 - Developer Creates New Package Following Structure (Priority: P2)

**Goal**: Establish reusable patterns and templates for creating new packages that follow monorepo conventions

**Independent Test**: Create a new test package following the guidelines, verify it passes validation scripts, builds successfully, and can be imported by other packages

**Dependencies**: Requires US1 (working development environment and validation tools)

### Implementation for User Story 2

- [ ] T090 [P] [US2] Create .github/instructions/package-creation.md with step-by-step package creation guide
- [ ] T091 [P] [US2] Create .github/instructions/package-creation-RU.md with Russian translation
- [ ] T092 [P] [US2] Create templates/package-frt-template/ directory with frontend package template structure
- [ ] T093 [P] [US2] Create templates/package-srv-template/ directory with backend package template structure
- [ ] T094 [P] [US2] Create templates/package-shared-template/ directory with shared package template structure
- [ ] T095 [US2] Create scripts/create-package.sh script for automated package scaffolding
- [ ] T096 [US2] Add package creation section to root README.md
- [ ] T097 [US2] Add package creation section to root README-RU.md (matching English structure)
- [ ] T098 [US2] Test package creation: use script to create example-frt package, verify it passes validation
- [ ] T099 [US2] Test package creation: use script to create example-srv package, verify it passes validation
- [ ] T100 [US2] Test workspace linking: verify new packages can import @universo/* shared packages
- [ ] T101 [US2] Document package naming conventions in package-creation.md
- [ ] T102 [US2] Document base/ directory pattern and rationale in package-creation.md
- [ ] T103 [US2] Clean up example packages created during testing

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Developers can set up the environment AND create new packages following established patterns.

---

## Phase 5: User Story 3 - Developer Authenticates Users via Supabase (Priority: P3)

**Goal**: Implement reusable authentication infrastructure using Passport.js and Supabase that can be consumed by feature packages

**Independent Test**: Implement a test login flow, verify successful authentication with Supabase, confirm authenticated user data is accessible, and session persists across requests

**Dependencies**: Requires US1 (development environment), uses shared packages from Phase 2

### @universo/auth-srv Package Implementation

- [ ] T104 [P] [US3] Create packages/auth-srv/base/package.json with Passport.js and Supabase dependencies
- [ ] T105 [P] [US3] Create packages/auth-srv/base/tsconfig.json extending base config for backend
- [ ] T106 [P] [US3] Create packages/auth-srv/base/tsdown.config.ts with Node.js platform target
- [ ] T107 [P] [US3] Create packages/auth-srv/base/src/strategies/supabase.strategy.ts with custom Passport strategy
- [ ] T108 [P] [US3] Create packages/auth-srv/base/src/middleware/authenticate.ts with authentication middleware
- [ ] T109 [P] [US3] Create packages/auth-srv/base/src/middleware/authorize.ts with authorization middleware
- [ ] T110 [P] [US3] Create packages/auth-srv/base/src/services/session.service.ts with session management
- [ ] T111 [P] [US3] Create packages/auth-srv/base/src/services/token.service.ts with token operations (refresh, validation)
- [ ] T112 [US3] Create packages/auth-srv/base/src/index.ts with unified auth exports
- [ ] T113 [US3] Create packages/auth-srv/base/README.md with authentication usage documentation
- [ ] T114 [US3] Create packages/auth-srv/base/README-RU.md with Russian translation
- [ ] T115 [US3] Create packages/auth-srv/README.md with package overview
- [ ] T116 [US3] Build and validate @universo/auth-srv package

### Authentication Integration Documentation

- [ ] T117 [US3] Create .github/instructions/authentication.md with authentication setup guide
- [ ] T118 [US3] Create .github/instructions/authentication-RU.md with Russian translation
- [ ] T119 [US3] Update .env.example with required Supabase authentication variables
- [ ] T120 [US3] Update quickstart.md with Supabase credential setup instructions
- [ ] T121 [US3] Document session configuration in packages/core-config/base/README.md
- [ ] T122 [US3] Add authentication section to root README.md explaining Passport.js + Supabase integration
- [ ] T123 [US3] Add authentication section to root README-RU.md (matching English structure)

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently. Authentication infrastructure is ready to be consumed by feature packages.

---

## Phase 6: User Story 4 - Team Member Creates Bilingual Documentation (Priority: P4)

**Goal**: Establish and enforce bilingual documentation standards with automated validation

**Independent Test**: Create a new documentation file, generate Russian translation following template, verify both versions pass line count validation

**Dependencies**: Requires US1 (validation scripts already created in Phase 1)

### Implementation for User Story 4

- [ ] T124 [P] [US4] Create .github/instructions/i18n-docs.md with bilingual documentation guidelines (reference existing)
- [ ] T125 [P] [US4] Verify .github/instructions/i18n-docs.md exists and contains detailed bilingual documentation rules
- [ ] T126 [P] [US4] Create templates/README-template.md with standard English README structure
- [ ] T127 [P] [US4] Create templates/README-RU-template.md with standard Russian README structure
- [ ] T128 [US4] Enhance scripts/validate-bilingual-docs.sh with detailed error reporting
- [ ] T129 [US4] Create .husky/pre-commit hook to run bilingual documentation validation
- [ ] T130 [US4] Update .github/workflows/ci.yml to include bilingual documentation validation
- [ ] T131 [US4] Create scripts/translate-readme.sh helper script with line count checking
- [ ] T132 [US4] Document translation workflow in .github/instructions/i18n-docs.md
- [ ] T133 [US4] Validate all existing README files pass bilingual validation
- [ ] T134 [US4] Add bilingual documentation section to root README.md
- [ ] T135 [US4] Add bilingual documentation section to root README-RU.md (matching English structure)
- [ ] T136 [US4] Verify pre-commit hook blocks commits with line count mismatches

**Checkpoint**: At this point, User Stories 1-4 all work independently. Bilingual documentation standards are established and automatically enforced.

---

## Phase 7: User Story 5 - Developer Works with Material UI Components (Priority: P5)

**Goal**: Integrate SMUI (Svelte Material UI) and establish reusable UI theme configuration for feature packages

**Independent Test**: Create a test page with SMUI components, verify proper styling and theming, confirm components work correctly in Svelte environment

**Dependencies**: Requires US1 (development environment), uses shared packages from Phase 2

### @universo/ui-theme Package Implementation

- [ ] T137 [P] [US5] Create packages/ui-theme/base/package.json with SMUI dependencies
- [ ] T138 [P] [US5] Create packages/ui-theme/base/tsconfig.json extending base config for frontend
- [ ] T139 [P] [US5] Create packages/ui-theme/base/tsdown.config.ts with browser platform target
- [ ] T140 [P] [US5] Create packages/ui-theme/base/src/theme.config.ts with Material Design theme configuration
- [ ] T141 [P] [US5] Create packages/ui-theme/base/src/components/Button.svelte with themed button wrapper
- [ ] T142 [P] [US5] Create packages/ui-theme/base/src/components/Card.svelte with themed card wrapper
- [ ] T143 [P] [US5] Create packages/ui-theme/base/src/components/Dialog.svelte with themed dialog wrapper
- [ ] T144 [P] [US5] Create packages/ui-theme/base/src/styles/theme.css with Material Design CSS variables
- [ ] T145 [US5] Create packages/ui-theme/base/src/index.ts with component and theme exports
- [ ] T146 [US5] Create packages/ui-theme/base/README.md with UI theme documentation and examples
- [ ] T147 [US5] Create packages/ui-theme/base/README-RU.md with Russian translation
- [ ] T148 [US5] Create packages/ui-theme/README.md with package overview
- [ ] T149 [US5] Build and validate @universo/ui-theme package

### Material UI Integration Documentation

- [ ] T150 [US5] Create .github/instructions/ui-components.md with SMUI usage guidelines
- [ ] T151 [US5] Create .github/instructions/ui-components-RU.md with Russian translation
- [ ] T152 [US5] Document theme customization in packages/ui-theme/base/README.md
- [ ] T153 [US5] Add Material UI section to root README.md explaining SMUI integration
- [ ] T154 [US5] Add Material UI section to root README-RU.md (matching English structure)
- [ ] T155 [US5] Update pnpm-workspace.yaml catalog with SMUI package versions

**Checkpoint**: All user stories (1-5) are now independently functional. Complete UI infrastructure is ready for feature development.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements, documentation, and validation across all user stories

- [ ] T156 [P] Review and enhance all package README files for clarity and completeness
- [ ] T157 [P] Validate all bilingual documentation has matching line counts across the repository
- [ ] T158 [P] Run full validation suite: pnpm validate && pnpm lint && pnpm type-check
- [ ] T159 [P] Verify all validation scripts work correctly and provide clear error messages
- [ ] T160 [P] Update .github/instructions/github-issues.md with issue creation guidelines (if not exists)
- [ ] T161 [P] Update .github/instructions/github-labels.md with label definitions (if not exists)
- [ ] T162 [P] Update .github/instructions/github-pr.md with PR guidelines (if not exists)
- [ ] T163 [P] Create CONTRIBUTING.md with contribution guidelines in English
- [ ] T164 [P] Create CONTRIBUTING-RU.md with Russian translation
- [ ] T165 [P] Create ARCHITECTURE.md with detailed architecture documentation in English
- [ ] T166 [P] Create ARCHITECTURE-RU.md with Russian translation
- [ ] T167 Run quickstart.md validation: follow all setup steps in clean environment
- [ ] T168 Verify HMR (Hot Module Replacement) works correctly during development
- [ ] T169 Verify build performance: ensure full build completes in under 2 minutes
- [ ] T170 [P] Add security policy: create SECURITY.md with vulnerability reporting process
- [ ] T171 [P] Create LICENSE file with appropriate open source license
- [ ] T172 Final comprehensive test: clean install, build, validate, and dev server startup
- [ ] T173 Update .specify/specs/001-initial-setup/spec.md with completion status
- [ ] T174 Create GitHub Issues for any identified improvements or future enhancements
- [ ] T175 Tag release v0.1.0 with completion of initial setup

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
  - Must complete ALL shared packages before any user story can proceed
- **User Stories (Phases 3-7)**: All depend on Foundational phase completion
  - **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
  - **User Story 2 (P2)**: Can start after US1 (needs working environment and validation)
  - **User Story 3 (P3)**: Can start after US1 (needs development environment)
  - **User Story 4 (P4)**: Can start after US1 (validation scripts created in Phase 1)
  - **User Story 5 (P5)**: Can start after US1 (needs development environment)
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Depends only on Foundational (Phase 2) - No dependencies on other stories
- **US2 (P2)**: Depends on US1 (needs validation scripts and working build)
- **US3 (P3)**: Depends on US1 (needs development environment) - No US2 dependency
- **US4 (P4)**: Depends on US1 (validation scripts) - No US2/US3 dependency
- **US5 (P5)**: Depends on US1 (development environment) - No US2/US3/US4 dependency

**Key Insight**: US3, US4, US5 can run in parallel after US1 completes, as they are independent of each other.

### Within Each Phase

**Phase 1 (Setup)**:
- All tasks marked [P] can run in parallel
- Documentation tasks (T008-T009) should be done together for consistency

**Phase 2 (Foundational)**:
- Each package's internal tasks can run in parallel (marked [P])
- Package builds must be sequential: types → utils → i18n → api-client → core-config → app-frt
- Reason: Dependencies between shared packages (utils depends on types, app-frt depends on ui-theme)
- app-frt package MUST be last as it imports all other shared packages

**Within Each User Story**:
- Package creation tasks within a story can run in parallel (marked [P])
- Documentation must be created after implementation
- English README before Russian README (translation requirement)
- Validation runs after all tasks complete

### Parallel Opportunities

**Maximum Parallelization Strategy**:

1. **Phase 1**: Launch all [P] tasks simultaneously (T004-T007, T010-T014)
2. **Phase 2**: Within each package, launch all [P] tasks simultaneously
   - @universo/types: T015-T024 in parallel, then T025-T029 sequential
   - After types build completes, start @universo/utils
   - Continue pattern for remaining packages
3. **After US1 completes**: Launch US3, US4, US5 in parallel (independent)
4. **US2**: Must wait for US1 but can start while US3-US5 are running
5. **Phase 8**: Launch all [P] tasks simultaneously

---

## Parallel Example: Phase 2 - @universo/types Package

```bash
# Launch all these tasks together:
Task T015: "Create packages/universo-types/base/package.json"
Task T016: "Create packages/universo-types/base/tsconfig.json"
Task T017: "Create packages/universo-types/base/tsdown.config.ts"
Task T018: "Create packages/universo-types/base/src/common/package.ts"
Task T019: "Create packages/universo-types/base/src/common/configuration.ts"
Task T020: "Create packages/universo-types/base/src/common/documentation.ts"
Task T021: "Create packages/universo-types/base/src/common/index.ts"
Task T022: "Create packages/universo-types/base/src/errors/index.ts"
Task T023: "Create packages/universo-types/base/src/protocol/index.ts"
Task T024: "Create packages/universo-types/base/src/validation/index.ts"

# Then sequential:
Task T025: "Create packages/universo-types/base/src/index.ts"
Task T026: "Create packages/universo-types/base/README.md"
Task T027: "Create packages/universo-types/base/README-RU.md"
Task T028: "Create packages/universo-types/README.md"
Task T029: "Build and validate @universo/types package"
```

## Parallel Example: User Stories after US1

```bash
# After US1 completes, launch these user stories in parallel:

# Developer A works on User Story 3 (Authentication):
Tasks T104-T123: "@universo/auth-srv package and documentation"

# Developer B works on User Story 4 (Documentation):
Tasks T124-T136: "Bilingual documentation standards"

# Developer C works on User Story 5 (Material UI):
Tasks T137-T155: "@universo/ui-theme package and SMUI integration"

# All three can proceed independently without conflicts
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

**Fastest path to working environment**:

1. **Phase 1**: Setup (T001-T014) - ~2 hours
   - Create all root configuration files
   - Set up validation scripts
2. **Phase 2**: Foundational (T015-T079) - ~8 hours
   - Build all shared packages sequentially
   - Focus on minimal implementation first
3. **Phase 3**: User Story 1 (T080-T089) - ~2 hours
   - Validate everything works
   - Test clean install and build
4. **STOP and VALIDATE**: Can a developer set up the environment?
5. **Tag v0.1.0-mvp**: First usable version

**Total MVP Time**: ~12 hours for single developer

### Incremental Delivery

**Value-based rollout**:

1. **Week 1**: Complete Setup + Foundational + US1
   - **Deliverable**: Working development environment
   - **Value**: Team can start development
   
2. **Week 2**: Add User Story 2 (Package Creation)
   - **Deliverable**: Package creation templates and scripts
   - **Value**: Consistent package structure across team
   
3. **Week 3**: Add User Stories 3, 4, 5 in parallel
   - **Deliverable**: Authentication, documentation standards, UI theme
   - **Value**: Complete infrastructure for feature development

4. **Week 4**: Polish phase
   - **Deliverable**: Documentation, architecture guides, contribution guidelines
   - **Value**: Professional repository ready for external contributors

### Parallel Team Strategy

**Optimal team allocation with 4 developers**:

**Week 1** (Together):
- All developers pair on Setup + Foundational (critical path)
- Code review and validation as a team
- Ensures everyone understands architecture

**Week 2**:
- Developer A: User Story 1 completion and validation
- Developer B: User Story 2 (Package creation patterns)
- Developers C+D: Begin planning US3-US5

**Week 3** (Parallel):
- Developer A: User Story 3 (Authentication)
- Developer B: User Story 4 (Documentation)
- Developer C: User Story 5 (Material UI)
- Developer D: Code review and integration testing

**Week 4** (Together):
- All developers: Polish phase tasks
- Final validation and documentation
- Release preparation

---

## Success Criteria & Validation

### Phase 1 Success Criteria
- [ ] All configuration files created and valid
- [ ] pnpm install runs successfully
- [ ] Validation scripts execute without errors
- [ ] Git repository is clean (no uncommitted files)

### Phase 2 Success Criteria
- [ ] All 6 shared packages build successfully (types, utils, i18n, api-client, core-config, app-frt)
- [ ] TypeScript types are properly exported
- [ ] Packages can import each other using workspace protocol
- [ ] All shared packages have bilingual README with matching line counts
- [ ] app-frt development server starts on localhost

### Phase 3 (US1) Success Criteria
- [ ] Fresh clone → pnpm install → pnpm build succeeds in under 5 minutes
- [ ] Development server starts without errors
- [ ] HMR works correctly (changes reflect in under 2 seconds)
- [ ] All validation scripts pass
- [ ] Quickstart.md instructions are accurate

### Phase 4 (US2) Success Criteria
- [ ] Package creation script works for all package types (frt, srv, shared)
- [ ] New packages pass validation automatically
- [ ] Templates are complete and ready to use
- [ ] Package creation takes under 10 minutes

### Phase 5 (US3) Success Criteria
- [ ] Authentication package builds successfully
- [ ] Passport strategy authenticates with Supabase
- [ ] Session management works correctly
- [ ] Token refresh is automatic
- [ ] Authentication documentation is clear

### Phase 6 (US4) Success Criteria
- [ ] Bilingual validation catches line count mismatches
- [ ] Pre-commit hooks prevent invalid documentation commits
- [ ] CI fails on documentation validation errors
- [ ] Translation workflow is documented and clear

### Phase 7 (US5) Success Criteria
- [ ] SMUI components render correctly
- [ ] Theme customization works as documented
- [ ] Components work in Svelte environment
- [ ] UI package can be imported by other packages

### Phase 8 (Polish) Success Criteria
- [ ] All documentation is complete and validated
- [ ] Full build completes in under 2 minutes
- [ ] All user stories are independently testable
- [ ] Repository is ready for external contributors
- [ ] Release v0.1.0 is tagged and documented

---

## Notes

- **[P] tasks**: Different files, no dependencies - can run in parallel
- **[Story] label**: Maps task to specific user story for traceability (US1-US5)
- Each user story should be independently completable and testable
- Commit after each logical group of tasks
- Stop at any checkpoint to validate story independently
- Tests are NOT required for this infrastructure setup feature
- Focus on minimal viable implementation first, then enhance
- Document as you build - don't defer documentation to end
- Validate frequently - don't accumulate technical debt

## Task Statistics

- **Total Tasks**: 189 (including 14 new app-frt tasks)
- **Setup Phase**: 14 tasks (~7% of total)
- **Foundational Phase**: 79 tasks (~42% of total) - CRITICAL PATH (includes app-frt)
- **User Story 1 (P1)**: 10 tasks (~5% of total) - MVP TARGET
- **User Story 2 (P2)**: 14 tasks (~7% of total)
- **User Story 3 (P3)**: 20 tasks (~11% of total)
- **User Story 4 (P4)**: 13 tasks (~7% of total)
- **User Story 5 (P5)**: 19 tasks (~10% of total)
- **Polish Phase**: 20 tasks (~11% of total)

**Parallelizable Tasks**: 98 tasks marked [P] (~52% of total)
- Can significantly reduce implementation time with parallel execution

**Critical Path**: Setup → Foundational (with app-frt) → US1 (103 tasks minimum for MVP)
**Recommended MVP Scope**: Phases 1-3 only (103 tasks, ~14-18 hours single developer)

**Note**: The app-frt package is critical for providing a runnable development server. Without it, `pnpm dev` would not have an application entry point.
