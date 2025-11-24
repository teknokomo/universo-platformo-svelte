# .specify Directory Structure

This directory follows the Spec Kit standard for organizing project specifications and documentation.

## Directory Structure

```
.specify/
├── memory/                    # Project memory and historical records
│   ├── constitution.md        # Project constitution (NON-NEGOTIABLE principles)
│   └── archived-reports/      # Historical analysis and review documents
├── scripts/                   # Automation scripts
│   └── bash/                  # Bash scripts for feature management
│       ├── check-prerequisites.sh  # Verify feature environment
│       ├── common.sh               # Shared functions
│       ├── create-new-feature.sh   # Create new feature branch/spec
│       ├── setup-plan.sh           # Setup planning workflow
│       └── update-agent-context.sh # Update agent context
├── specs/                     # Feature specifications (Spec Kit standard)
│   └── NNN-feature-name/      # Individual feature directories (numbered)
│       ├── spec.md            # Feature specification
│       ├── plan.md            # Implementation plan
│       ├── tasks.md           # Task breakdown
│       ├── data-model.md      # Data model (if applicable)
│       ├── research.md        # Research decisions
│       ├── quickstart.md      # Quick start guide
│       ├── checklists/        # Quality checklists
│       └── contracts/         # API contracts
└── templates/                 # Document templates
    ├── spec-template.md       # Specification template
    ├── plan-template.md       # Planning template
    ├── tasks-template.md      # Tasks template
    ├── checklist-template.md  # Checklist template
    └── agent-file-template.md # Agent configuration template
```

## Purpose of Each Directory

### memory/

Contains the project's institutional memory:

- **constitution.md**: The project's core principles and governance (NON-NEGOTIABLE)
- **archived-reports/**: Historical documentation from initial project phases

### scripts/

Automation scripts that support the Spec Kit workflow:

- Feature creation and management
- Prerequisites checking
- Environment validation

All scripts support the `.specify/specs/` path structure.

### specs/

The central location for all feature specifications. Each feature gets its own numbered directory (e.g., `001-initial-setup`, `002-user-auth`).

#### Feature Directory Contents

Each feature directory follows this structure:

- **spec.md** (Required): What the feature should do (user-focused, technology-agnostic)
- **plan.md** (Required): How to implement it (technical decisions, architecture)
- **tasks.md** (Required): Actionable implementation tasks
- **data-model.md** (Optional): Data entities and relationships
- **research.md** (Optional): Research findings and decisions
- **quickstart.md** (Optional): Testing scenarios and examples
- **checklists/** (Optional): Quality validation checklists
- **contracts/** (Optional): API contract definitions

### templates/

Standard templates for creating consistent documentation:

- Feature specifications
- Implementation plans
- Task lists
- Quality checklists
- Agent configurations

## Integration with GitHub Agents

The `.github/agents/` directory contains agent configurations that read from `.specify/`:

- All agents use `.specify/scripts/bash/check-prerequisites.sh` to locate feature files
- Agents reference templates from `.specify/templates/`
- The constitution at `.specify/memory/constitution.md` is enforced by agents
- Feature specs are read from `.specify/specs/NNN-feature-name/`

## Workflow

1. **Create Feature**: Run `.specify/scripts/bash/create-new-feature.sh` or use `/speckit.specify`
2. **Write Spec**: Fill in `.specify/specs/NNN-feature-name/spec.md`
3. **Clarify**: Use `/speckit.clarify` to resolve ambiguities
4. **Plan**: Use `/speckit.plan` to create implementation plan
5. **Break Down**: Use `/speckit.tasks` to generate task list
6. **Analyze**: Use `/speckit.analyze` to validate consistency
7. **Implement**: Follow the tasks to build the feature

## Migration Notes

This structure follows the Spec Kit standard. Previous versions had:
- `specs/` at root level → Now at `.specify/specs/`
- Analysis reports at root → Now at `.specify/memory/archived-reports/`

All scripts and agents have been updated to use the new paths.

## References

- Constitution: `.specify/memory/constitution.md`
- Spec Kit Documentation: See `.specify/templates/` for examples
- GitHub Agents: `.github/agents/speckit.*.agent.md`
