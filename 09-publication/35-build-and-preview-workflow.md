# Build and Preview Workflow

**Status:** Approved

## Decision

Provide one documented repository workflow for install, lint, validate, develop, build, and preview. Use a pinned supported Node.js release, Corepack-managed package manager, single lockfile, and deterministic tasks consistent with approved engineering governance; exact versions are controlled selections recorded with implementation.

The build sequence validates source, extracts metadata and relationships, generates route/index artifacts, renders the site, then validates rendered output. Local development provides fast targeted feedback; CI runs the complete reproducible pipeline.

Every change receives a local or ephemeral preview built from the same committed source and dependency lock. Generated artifacts are either reproducible build outputs or intentionally versioned schemas/fixtures; editors do not hand-edit derived indexes.

## Validation

Test clean-clone setup, locked dependency installation, deterministic generation, production build, preview parity, actionable errors, changed-file acceleration without coverage loss, and absence of uncommitted generated drift.

## References

- [ADR-0036](../adrs/ADR-0036-pinned-pnpm-turborepo-and-typed-runtime-configuration.md)
- [Phase 7 Framing and Publication Architecture](01-framing-and-publication-architecture.md)
