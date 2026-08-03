# ADR-0009: Governed Monorepo and Enforced Project Boundaries

- **Status:** Accepted
- **Date:** 2026-08-02

## Context

Nexora requires coordinated evolution across customer and Admin applications, authoritative domain modules, the Design System, contracts, platform adapters, workers, and repository tooling.

Two viable repository strategies were evaluated:

1. A governed monorepo with independently buildable projects and enforced dependency boundaries
2. Multiple repositories aligned to applications or major domains

Multiple repositories provide strong access and release isolation for independently accountable teams. Nexora's small initial organization does not yet have those durable team or compliance boundaries, while its Design System, contracts, and commerce workflows require frequent coordinated change.

## Decision

Use one governed monorepo for first-party Nexora source and contracts.

The repository contains independently buildable projects classified as applications, domain modules, Design System assets, platform capabilities, cross-runtime contracts, or tooling.

Repository, project, runtime, domain, data, and deployment boundaries remain distinct:

- Co-location does not grant shared authority.
- Independent buildability does not require independent deployment.
- A separately deployed project does not automatically own domain truth.
- Repository extraction requires a demonstrated durable boundary.

Projects expose declared public entry points. Private cross-project imports, cross-module storage access, dependency cycles, and provider dependencies inside authoritative domain logic are prohibited and mechanically checked.

The customer ecosystem begins as one coherent customer application boundary with internal route and domain modules. The Administrative Dashboard is a distinct application boundary because of its workforce identity, assurance, permission, density, operational, and deployment profile.

Frameworks, languages, package managers, build orchestrators, BFF topology, databases, and cloud platforms remain separate decisions.

## Consequences

### Benefits

- Contracts and dependent consumers can change atomically.
- Design System and architecture rules apply consistently.
- A small team receives one coherent development environment.
- Dependency analysis and affected-project validation can span the system.
- Runtime and deployment units can evolve without premature repository fragmentation.

### Costs and risks

- Build and validation tooling must scale with repository growth.
- Shared-project governance must prevent generic coupling.
- Path-sensitive access controls may be needed for future sensitive capabilities.
- Independently deployed projects require isolated artifacts and pipelines.

## Governance

- Every project declares class, owner, public entry points, allowed dependencies, consumers, quality commands, and lifecycle.
- Shared code requires stable responsibility, ownership, real consumers, and a governed contract.
- Generic common, shared, utility, helper, or model dumping grounds are prohibited.
- Repository extraction requires explicit access, contract, history, ownership, pipeline, dependency, and migration planning.
- A material change to repository strategy or dependency direction requires a superseding ADR.

## References

- [Repository and Application Organization](../06-engineering/03-repository-and-application-organization.md)
- [System Shape and Deployment Boundary](../06-engineering/01-system-shape-and-deployment-boundary.md)
- [Engineering Mission, Principles, Scope, and Governance](../06-engineering/02-mission-principles-scope-and-governance.md)
- [Design System Architecture](../04-design-system/01-system-architecture.md)
