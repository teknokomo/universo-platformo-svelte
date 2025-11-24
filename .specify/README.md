# .specify - Spec Kit Standard Directory

This directory contains all project specifications, templates, scripts, and memory files following the [Spec Kit](https://github.com/specification-driven-development/spec-kit) standard.

## Directory Structure

```
.specify/
├── memory/              # Project memory and historical documents
│   ├── constitution.md  # Project constitution (NON-NEGOTIABLE principles)
│   └── archive/         # Historical analysis and review documents
├── scripts/             # Helper scripts for Spec Kit workflow
│   └── bash/            # Bash scripts for feature management
├── specs/               # Feature specifications
│   └── NNN-feature/     # Individual feature directories (e.g., 001-initial-setup)
│       ├── spec.md      # Feature specification
│       ├── plan.md      # Implementation plan
│       ├── tasks.md     # Task breakdown
│       ├── research.md  # Research and decisions (optional)
│       ├── data-model.md # Data model (optional)
│       ├── quickstart.md # Quick start guide (optional)
│       ├── checklists/  # Verification checklists (optional)
│       └── contracts/   # API contracts (optional)
└── templates/           # Templates for specs, plans, tasks, and checklists
```

## Key Files

### constitution.md
The project constitution defines the core principles, technology stack requirements, development workflow, and governance. This file is **NON-NEGOTIABLE** and supersedes all other practices.

**Current Version**: 1.2.0

**Core Principles**:
1. Monorepo Architecture with PNPM (NON-NEGOTIABLE)
2. Svelte Fullstack with TypeScript
3. Database and Authentication Standards
4. Material UI Implementation
5. Bilingual Documentation (NON-NEGOTIABLE)
6. Issue-First Development Workflow
7. Pattern-Based Incremental Development
8. Shared Package Architecture and Dependency Management

### Scripts

- `check-prerequisites.sh` - Validate feature branch and required files
- `create-new-feature.sh` - Create new feature specification directory
- `setup-plan.sh` - Initialize implementation plan
- `update-agent-context.sh` - Update agent context files
- `common.sh` - Shared functions and variables

All scripts support both JSON and text output modes.

### Templates

- `spec-template.md` - Feature specification template
- `plan-template.md` - Implementation plan template
- `tasks-template.md` - Task breakdown template
- `checklist-template.md` - Verification checklist template
- `agent-file-template.md` - AI agent configuration template

## Workflow

### Creating a New Feature

1. **Specify**: Run `/speckit.specify "Feature description"` to create feature structure
2. **Clarify**: Run `/speckit.clarify` to resolve ambiguities (optional)
3. **Plan**: Run `/speckit.plan` to create implementation plan
4. **Tasks**: Run `/speckit.tasks` to generate task breakdown
5. **Analyze**: Run `/speckit.analyze` to check consistency (optional)
6. **Implement**: Run `/speckit.implement` to start implementation

### Feature Branch Naming

Feature branches must be named: `NNN-feature-name` where `NNN` is a three-digit number (e.g., `001-initial-setup`, `002-user-authentication`).

## Agents

All GitHub Copilot agents are configured to read from the `.specify` directory:

- `speckit.specify` - Create feature specifications
- `speckit.clarify` - Clarify ambiguities in specifications
- `speckit.plan` - Generate implementation plans
- `speckit.tasks` - Generate task breakdowns
- `speckit.analyze` - Analyze consistency across artifacts
- `speckit.implement` - Implement features
- `speckit.constitution` - Update project constitution
- `speckit.checklist` - Generate verification checklists
- `speckit.taskstoissues` - Convert tasks to GitHub Issues

All agents automatically use the `.specify/scripts/bash/check-prerequisites.sh` script to locate feature directories and validate prerequisites.

## Archive

The `memory/archive/` directory contains historical analysis and review documents from the initial project setup phase. These documents are preserved for reference but are not part of the active specification workflow.

## References

- [Spec Kit Documentation](https://github.com/specification-driven-development/spec-kit)
- Project Constitution: `.specify/memory/constitution.md`
- Feature Specifications: `.specify/specs/`
