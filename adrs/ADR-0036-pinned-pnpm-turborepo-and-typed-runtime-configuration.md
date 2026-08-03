# ADR-0036: Pinned pnpm, Turborepo, and Typed Runtime Configuration

**Status:** Accepted  
**Date:** 2026-08-03

## Context

The approved monorepo and TypeScript applications need reproducible dependency resolution, an explicit task graph, efficient affected builds, and safe configuration without introducing a larger platform than the initial team can operate.

## Decision

Use a pinned supported Node.js LTS line, Corepack-managed pnpm with one lockfile, and Turborepo for task orchestration. Validate typed configuration at startup and access it through owned modules. Use an OpenFeature-compatible interface for feature evaluation.

## Alternatives

An npm-workspaces-only toolchain reduces components but provides a less expressive shared task and caching contract. A polyglot build system offers stronger language neutrality but adds disproportionate operational and authoring cost before Nexora has polyglot needs.

## Consequences

- Developer and CI resolution is reproducible.
- Affected-project tasks and caching have one convention.
- Node, pnpm, and tool versions require governed upgrades.
- Domain packages remain independent of Turborepo and feature-flag providers.

## References

- [Dependency, Configuration, and Environment Management](../06-engineering/33-dependency-configuration-and-environment-management.md)
