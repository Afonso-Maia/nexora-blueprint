# ADR-0032: Single-Region Multi-Zone Resilience

- **Status:** Accepted
- **Date:** 2026-08-03

## Decision

Begin with one primary region, managed multi-zone high availability, one PostgreSQL writer, continuous backups, rebuildable projections, isolated runtimes, and tested secondary-region restoration.

Use bounded calls, load shedding, durable workflows, semantic degraded states, and reconciliation. Do not use active-active multi-region commerce writes initially.

## Consequences

This fits the initial organization and transaction model while providing credible failure recovery. Regional recovery is slower than active-active failover and therefore requires tested runbooks and explicit objectives.

## References

- [Error, Degraded-Mode, and Resilience Architecture](../06-engineering/26-error-degraded-mode-and-resilience-architecture.md)
- [ADR-0010: Runtime Topology](ADR-0010-trust-segmented-runtime-topology.md)
- [ADR-0017: PostgreSQL Data Authority](ADR-0017-postgresql-data-authority.md)

