# ADR-0017: PostgreSQL Modular Data Authority

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora requires strong commerce transactions, relational constraints, explicit module ownership, online schema evolution, derived Search and analytics, privacy lifecycle, and credible backup and recovery for a small initial engineering organization.

Viable approaches included:

1. Managed PostgreSQL with schema and role isolation per module
2. A database per module
3. One shared relational schema
4. A document-first primary store

## Decision

Use managed PostgreSQL as the primary authoritative store for the modular commerce core.

Begin with one regional writer and one logical database. Each authoritative module owns a private schema, migration history, and role-scoped access. Runtime code uses separate module connections or equivalent role isolation.

Direct cross-module table access and cross-schema foreign keys are prohibited. Registered multi-module local transactions use narrowly approved access recorded in the transaction-boundary register.

Use RFC 9562 UUIDv7 for new internal durable identities. Human-facing and provider references remain separate.

Use object storage for large binaries and independently rebuildable stores for Search, cache, and analytics.

Use Expand → Backfill → Verify → Switch → Contract for online schema evolution. Require continuous backup, point-in-time recovery, and recurring restore validation.

## Consequences

### Benefits

- Strong transactions and constraints fit authoritative commerce.
- One managed platform is practical for the initial team.
- Schemas and roles preserve logical ownership.
- UUIDv7 supports portable identity and index locality.
- Online migration and PITR provide credible evolution and recovery.

### Costs and risks

- The cluster is a shared capacity and failure domain.
- Role isolation and module connection pools add setup.
- Cross-module references need application validation and reconciliation.
- Privacy deletion spans primary and derived stores and backup expiry.

## Governance

- Every data object and migration has one module owner.
- Applied migrations are immutable.
- New storage technologies require measured workload and full lifecycle justification.
- Backups are not a routine migration rollback.
- A material change to primary storage, writer topology, schema isolation, identifier strategy, or migration protocol requires a superseding ADR.

## References

- [Data Ownership, Storage, and Migration](../06-engineering/11-data-ownership-storage-and-migration.md)
- [PostgreSQL schemas and privileges](https://www.postgresql.org/docs/current/ddl-schemas.html)
- [PostgreSQL point-in-time recovery](https://www.postgresql.org/docs/current/continuous-archiving.html)
- [RFC 9562: UUIDs](https://www.rfc-editor.org/rfc/rfc9562.html)
- [Domain Modules and Transaction Boundaries](../06-engineering/10-domain-modules-and-transaction-boundaries.md)
- [ADR-0008: Modular Authoritative Core and Selective Deployment Boundaries](ADR-0008-modular-authoritative-core.md)
