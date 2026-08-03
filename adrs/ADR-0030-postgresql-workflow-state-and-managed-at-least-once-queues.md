# ADR-0030: PostgreSQL Workflow State and Managed At-Least-Once Queues

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora has consequential asynchronous workflows and provider integrations but a small initial team and one modular authoritative core.

## Decision

Use transactional outbox, managed at-least-once queues, consumer inbox, idempotent handlers, and domain-owned PostgreSQL Workflow records executed by separate workers.

Assume duplicates, delay, gaps, and reordering. Business correctness comes from source revisions, idempotency, workflow state, and reconciliation—not broker exactly-once claims.

Do not adopt Kafka, event sourcing, distributed transactions, or a general workflow platform initially.

## Consequences

This minimizes operational complexity and preserves domain authority, but workflow behavior must be implemented explicitly. Adoption of a streaming or workflow platform later requires measured need and a superseding ADR.

## References

- [Events, Queues, Workflows, Idempotency, and Reconciliation](../06-engineering/24-events-queues-workflows-idempotency-and-reconciliation.md)
- [ADR-0008: Modular Authoritative Core](ADR-0008-modular-authoritative-core.md)
- [ADR-0017: PostgreSQL Data Authority](ADR-0017-postgresql-data-authority.md)

