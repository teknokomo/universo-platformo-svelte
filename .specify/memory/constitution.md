<!--
SYNC IMPACT REPORT
==================
Version Change: 1.0.0 → 1.1.0
Rationale: MINOR version - Added new principle VIII (Shared Package Architecture) and expanded Technology Stack

Modified Principles:
  - Added Principle VIII: Shared Package Architecture and Dependency Management
  - Expanded Technology Stack Requirements: Added build tools specification

Added Sections:
  - Core Principles now includes 8 principles (was 7)
  - Technology Stack Requirements expanded with build tools

Templates Status:
  ✅ .specify/templates/plan-template.md - No changes required
  ✅ .specify/templates/spec-template.md - Compatible with new shared package requirements
  ✅ .specify/templates/tasks-template.md - No changes required
  ✅ .github/instructions/github-issues.md - No changes required
  ✅ .github/instructions/github-labels.md - No changes required
  ✅ .github/instructions/github-pr.md - No changes required
  ✅ .github/instructions/i18n-docs.md - No changes required

Follow-up TODOs:
  - Create shared packages (@universo/types, @universo/utils, @universo/api-client, @universo/i18n) during initial setup
  - Configure PNPM catalog in pnpm-workspace.yaml
  - Set up tsdown configuration for library packages

Previous Changes:
==================
Version 0.0.0 → 1.0.0
Rationale: MAJOR version - Initial constitution establishment with complete governance framework
Added Sections: Core Principles (7 principles), Technology Stack Requirements, Development Workflow, Governance
-->


# Universo Platformo Svelte Constitution

## Core Principles

### I. Monorepo Architecture with PNPM

The project MUST be organized as a monorepo managed by PNPM workspace. All packages reside in the `packages/` directory. Each package requiring both frontend and backend functionality MUST be separated into distinct packages with suffixes: `-frt` for frontend and `-srv` for backend (e.g., `packages/clusters-frt` and `packages/clusters-srv`). Every package MUST contain a root-level `base/` directory to accommodate future alternative implementations of the same functionality.

**Rationale**: This structure enables independent deployment, clear separation of concerns, and allows multiple technology stack implementations while maintaining consistent package organization.

### II. Svelte Fullstack with TypeScript

All code MUST be written using Svelte framework with TypeScript for type safety. Frontend components MUST use Svelte's reactive paradigm and component composition patterns. Backend services MUST leverage SvelteKit's server-side capabilities where appropriate. TypeScript MUST be used throughout the entire stack with strict type checking enabled.

**Rationale**: Svelte provides optimal developer experience and performance. TypeScript ensures type safety and reduces runtime errors across the entire application stack.

### III. Database and Authentication Standards

Supabase MUST be used as the primary database solution. All database interactions MUST go through Supabase client. Passport.js MUST be used for authentication with Supabase connector. Database schema MUST be designed to accommodate future support for additional database systems without requiring major refactoring of business logic.

**Rationale**: Supabase provides a complete backend solution while allowing future extensibility. Passport.js offers standardized authentication patterns that work across multiple providers.

### IV. Material UI Implementation

Material UI MUST be implemented using the MUI library adapted for Svelte. All UI components MUST follow Material Design guidelines. Custom components MUST be built on top of MUI base components to ensure design consistency. Theming MUST be centralized and configurable.

**Rationale**: Material Design provides proven UX patterns and accessibility standards. MUI ensures consistent component behavior and appearance across the application.

### V. Bilingual Documentation (NON-NEGOTIABLE)

All documentation MUST be created in both English and Russian. English documentation is the primary standard and MUST be created first. Russian documentation MUST be a complete translation with identical structure, content, and line count. README files MUST exist as README.md (English) and README-RU.md (Russian). Issues and Pull Requests MUST include both English content and Russian translation in a `<summary>In Russian</summary>` spoiler section.

**Rationale**: The project serves bilingual audience. Maintaining identical structure ensures documentation parity and prevents information gaps between languages.

### VI. Issue-First Development Workflow

Before implementing any feature from a specification, an Issue MUST be created in the GitHub repository following `.github/instructions/github-issues.md`. Issues MUST use appropriate labels according to `.github/instructions/github-labels.md`. Pull Requests MUST follow `.github/instructions/github-pr.md` guidelines and reference the closing Issue. All work MUST be traceable through Issues and PRs.

**Rationale**: Issue tracking ensures transparency, enables better project planning, and creates auditable development history.

### VII. Pattern-Based Incremental Development

Development MUST start with foundational repository structure, then implement base functionality using the Clusters pattern (three entities: Clusters / Domains / Resources). This pattern MUST be reused for similar features (e.g., Metaverses / Sections / Entities). Core patterns MUST be implemented first, then extended with additional functionality (e.g., Spaces, Canvases, LangChain nodes). Each feature implementation MUST reference the proven base pattern to ensure consistency.

**Rationale**: Establishing proven patterns first reduces complexity, ensures consistency, and accelerates development of similar features through reusable architectural patterns.

### VIII. Shared Package Architecture and Dependency Management

The project MUST maintain shared utility packages to eliminate code duplication and ensure consistency. Required shared packages include: `@universo/types` (TypeScript types and Zod schemas), `@universo/utils` (utilities with browser/server separation), `@universo/api-client` (type-safe API client), and `@universo/i18n` (centralized i18n instance). All packages MUST use the `@universo/` organization scope prefix. Dependency versions MUST be managed through PNPM catalog feature in `pnpm-workspace.yaml` to ensure version consistency across all packages. Feature packages MUST import from shared packages rather than duplicate code.

**Rationale**: Shared packages eliminate code duplication across 20+ feature packages, ensure type safety between frontend and backend, prevent dependency version drift, and create reusable building blocks that accelerate development while maintaining consistency.

## Technology Stack Requirements

### Required Technologies
- **Frontend Framework**: Svelte with SvelteKit
- **Language**: TypeScript (strict mode)
- **Package Manager**: PNPM (workspace configuration with catalog for dependency management)
- **Build Tools**: tsdown for library packages, Vite for applications, Turborepo (optional) for build orchestration
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Passport.js with Supabase connector
- **UI Library**: MUI (Material UI for Svelte) or equivalent Svelte-compatible Material Design library
- **Version Control**: Git with GitHub

### Prohibited Practices
- Copying incomplete or legacy code from Universo Platformo React
- Creating standalone `docs/` directory (documentation lives in external repository)
- Manual creation of AI agent configuration files (user-created only)
- Using database-specific features that prevent future database system support

### Code Quality Standards
- All code MUST pass linting (ESLint for TypeScript/Svelte)
- All code MUST follow Svelte best practices and conventions
- All code MUST include appropriate TypeScript types (no `any` without justification)
- All code MUST be formatted consistently (Prettier)

## Development Workflow

### Feature Development Process
1. Analyze Universo Platformo React repository for feature requirements
2. Create comprehensive documentation following Spec Kit templates
3. Create GitHub Issue per `.github/instructions/github-issues.md`
4. Create feature branch following naming convention
5. Implement feature following specification
6. Create Pull Request per `.github/instructions/github-pr.md`
7. Code review and testing
8. Merge and close Issue

### Documentation Requirements
- English documentation created first (primary standard)
- Russian documentation created immediately after (exact translation)
- Both versions MUST have identical structure and line count
- Verification step MUST confirm line-by-line correspondence

### Monitoring React Repository
The Universo Platformo React repository MUST be monitored regularly for new functionality. New features appearing in React version MUST be evaluated, documented according to Spec Kit standards, and implemented in Svelte using current technology stack principles.

## Governance

This constitution supersedes all other practices and conventions within the Universo Platformo Svelte project. All Pull Requests and code reviews MUST verify compliance with these principles. Any deviation from constitutional principles MUST be explicitly justified with documented rationale.

### Amendment Process
1. Amendments require documented justification and community discussion
2. Version number MUST be incremented according to semantic versioning:
   - MAJOR: Backward incompatible principle changes or removals
   - MINOR: New principles or material expansions
   - PATCH: Clarifications, wording improvements, non-semantic refinements
3. All affected templates and documentation MUST be updated to reflect amendments
4. Sync Impact Report MUST be maintained at top of constitution file

### Compliance Review
- All PRs MUST include constitution compliance verification
- Template files MUST be reviewed after constitutional amendments
- Constitution violations MUST be corrected or explicitly justified
- New principles MUST be validated against existing project structure

### Version Control
This constitution uses semantic versioning. All changes MUST be tracked with clear rationale. Amendment history MUST be preserved in git history and Sync Impact Reports.

**Version**: 1.1.0 | **Ratified**: 2025-11-15 | **Last Amended**: 2025-11-17
