# Quickstart Guide: Universo Platformo Svelte

**Last Updated**: 2025-11-17  
**Target Audience**: Developers setting up local development environment

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
- **PNPM**: Version 8.0.0 or higher
- **Git**: Latest stable version
- **Code Editor**: VS Code recommended with Svelte and TypeScript extensions

**Verify installations**:
```bash
node --version  # Should be >= 18.0.0
pnpm --version  # Should be >= 8.0.0
git --version
```

**Install PNPM** (if not installed):
```bash
npm install -g pnpm@8
```

---

## Quick Setup (5 minutes)

### 1. Clone Repository

```bash
git clone https://github.com/teknokomo/universo-platformo-svelte.git
cd universo-platformo-svelte
```

### 2. Install Dependencies

```bash
pnpm install
```

This command:
- Installs all workspace dependencies
- Links internal packages using workspace protocol
- Creates `pnpm-lock.yaml` for reproducible builds

**Expected output**: Dependencies installed successfully with no errors.

### 3. Configure Environment

Create `.env` file in repository root:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```bash
# Supabase Configuration
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# Authentication
SESSION_SECRET=your-32-character-secret-key-here

# Environment
NODE_ENV=development
```

**Get Supabase credentials**:
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project (or create new one)
3. Go to Settings → API
4. Copy URL and anon key

**Generate session secret**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Build Packages

```bash
pnpm build
```

This command:
- Builds all packages in dependency order
- Generates TypeScript declarations
- Creates output in each package's `dist/` directory

**Expected time**: 30-60 seconds for initial build

### 5. Run Development Server

```bash
pnpm dev
```

This command:
- Starts development servers for all packages in parallel
- Enables hot module replacement (HMR)
- Watches for file changes

**Expected output**: Development servers running on assigned ports.

---

## Verify Installation

### Check Package Structure

```bash
pnpm run validate
```

This validates:
- ✓ All packages have required `base/` directory
- ✓ All packages have `package.json`, `tsconfig.json`, `README.md`
- ✓ Bilingual documentation has matching line counts
- ✓ Package naming follows conventions
- ✓ Workspace dependencies resolve correctly

### Run Tests

```bash
pnpm test
```

**Expected output**: All tests pass (or no tests if packages not yet implemented).

### Type Check

```bash
pnpm type-check
```

**Expected output**: No TypeScript errors across all packages.

---

## Project Structure Overview

```
universo-platformo-svelte/
├── packages/                    # All workspace packages
│   ├── universo-types/         # Shared TypeScript types
│   ├── universo-utils/         # Shared utilities
│   ├── universo-api-client/    # API client
│   ├── universo-i18n/          # Internationalization
│   ├── core-config/            # Configuration
│   ├── auth-srv/               # Authentication service
│   └── ui-theme/               # UI theme
├── scripts/                    # Validation scripts
├── specs/                      # Feature specifications
├── .env                        # Environment variables (git-ignored)
├── pnpm-workspace.yaml         # Workspace + catalog config
├── package.json                # Root package with scripts
└── README.md                   # Project documentation
```

---

## Development Workflow

### Creating a New Package

1. **Create package directory**:
```bash
mkdir -p packages/my-feature-frt/base/src
cd packages/my-feature-frt
```

2. **Create base structure**:
```bash
# Inside package directory
mkdir -p base/src
touch base/package.json
touch base/tsconfig.json
touch base/README.md
touch base/README-RU.md
```

3. **Configure package.json**:
```json
{
  "name": "@universo/my-feature-frt",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsdown",
    "dev": "tsdown --watch",
    "test": "vitest",
    "lint": "eslint src"
  },
  "dependencies": {
    "@universo/types": "workspace:*",
    "@universo/utils": "workspace:*"
  }
}
```

4. **Validate structure**:
```bash
pnpm run validate
```

### Making Changes

1. **Create feature branch**:
```bash
git checkout -b feature/my-feature
```

2. **Make changes to package**:
```bash
cd packages/my-feature-frt/base/src
# Edit files
```

3. **Build and test**:
```bash
pnpm build
pnpm test
```

4. **Validate before commit**:
```bash
pnpm run validate
pnpm lint
pnpm type-check
```

### Updating Dependencies

**Update single dependency**:
```bash
pnpm update package-name
```

**Update all dependencies**:
```bash
pnpm update
```

**Update catalog versions**:
Edit `pnpm-workspace.yaml`:
```yaml
catalog:
  typescript: ^5.8.3  # Update version here
```

Then run:
```bash
pnpm install
```

---

## Common Commands

### Build Commands
```bash
pnpm build              # Build all packages
pnpm build:frt          # Build frontend packages only
pnpm build:srv          # Build backend packages only
pnpm build --filter @universo/types  # Build specific package
```

### Development Commands
```bash
pnpm dev                # Start all dev servers
pnpm dev --filter @universo/my-package  # Dev mode for specific package
```

### Testing Commands
```bash
pnpm test               # Run all tests
pnpm test:watch         # Run tests in watch mode
pnpm test --filter @universo/types  # Test specific package
```

### Quality Commands
```bash
pnpm lint               # Lint all packages
pnpm lint:fix           # Auto-fix linting issues
pnpm type-check         # TypeScript type checking
pnpm validate           # Validate structure and docs
```

### Cleanup Commands
```bash
pnpm clean              # Remove dist/ folders
pnpm clean:all          # Remove dist/ and node_modules/
```

---

## Troubleshooting

### Dependencies not installing
**Problem**: `pnpm install` fails with errors

**Solutions**:
1. Clear PNPM cache: `pnpm store prune`
2. Delete lock file: `rm pnpm-lock.yaml`
3. Reinstall: `pnpm install`

### Build fails
**Problem**: Build command fails with errors

**Solutions**:
1. Check TypeScript errors: `pnpm type-check`
2. Verify package structure: `pnpm run validate`
3. Clean and rebuild: `pnpm clean && pnpm build`

### Hot reload not working
**Problem**: Changes not reflecting in dev server

**Solutions**:
1. Restart dev server: Stop with Ctrl+C, run `pnpm dev` again
2. Clear build cache: `pnpm clean`
3. Check file watchers limit (Linux): `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

### Type errors in IDE
**Problem**: VS Code shows type errors but build succeeds

**Solutions**:
1. Restart TypeScript server: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
2. Rebuild packages: `pnpm build`
3. Check workspace settings: Ensure VS Code uses workspace TypeScript version

### Documentation validation fails
**Problem**: Bilingual docs validation fails

**Solutions**:
1. Check line counts: `wc -l packages/*/README*.md`
2. Ensure both EN and RU files exist
3. Verify identical structure (same number of lines)

---

## Next Steps

After successful setup:

1. **Read Architecture Documentation**: Review main README.md
2. **Understand Package Structure**: Explore packages/ directory
3. **Review Feature Specifications**: Check specs/ directory
4. **Study Existing Patterns**: Look at shared packages (types, utils)
5. **Check Constitutional Principles**: Read `.specify/memory/constitution.md`
6. **Follow Development Workflow**: See `.github/instructions/` directory

---

## Getting Help

- **Documentation Issues**: Create issue with label `documentation`
- **Build Problems**: Create issue with label `build`
- **Feature Questions**: Create issue with label `question`
- **Bug Reports**: Create issue with label `bug`

**Issue Template**: Follow `.github/instructions/github-issues.md`

---

## Additional Resources

- [Svelte Documentation](https://svelte.dev/docs)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [PNPM Workspace Guide](https://pnpm.io/workspaces)
- [Supabase Documentation](https://supabase.com/docs)
- [Material UI for Svelte](https://sveltematerialui.com/)

---

**Version**: 0.1.0  
**Last Updated**: 2025-11-17  
**Maintainers**: Universo Platformo Team
