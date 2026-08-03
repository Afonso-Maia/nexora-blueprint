# Database, Consistency, and Migration Testing

**Status:** Approved

## Decision

Database evidence uses the production PostgreSQL major-version class, production migrations, realistic data shapes, and explicit concurrent and failure conditions.

## Migration matrix

Every migration proves as applicable:

- clean creation and upgrade from every supported predecessor;
- expand compatibility with oldest concurrently running code;
- online locking and transaction behavior within budget;
- resumable backfill, checkpoint, retry, and observability;
- dual-read/write or switch correctness where used;
- constraint validation and data-integrity counts;
- rollback of uncommitted deployment steps;
- forward repair when committed data cannot safely roll back; and
- contraction only after compatibility and usage evidence.

Destructive changes and large indexes/backfills require production-shaped rehearsal and approval.

## Consistency evidence

Tests cover:

- local atomic invariants and isolation level;
- expected-revision races and deadlocks;
- unique, foreign-key, check, and exclusion constraints;
- quote, reservation, Order, workflow, inbox/outbox, and idempotency concurrency;
- read-replica and projection staleness where eligible;
- clock and transaction-boundary assumptions;
- retry only when outcome is known or reconcilable; and
- no cross-module storage access outside the approved exception register.

## Backup, restore, and rebuild

Restore drills verify:

- encrypted backup usability and point-in-time selection;
- schema, data, object evidence, idempotency, and workflow integrity;
- provider and queue reconciliation;
- checksums, counts, sampling, and business invariants;
- projection and Search rebuild from source snapshots and watermarks; and
- recovery objectives in the controlled operations register.

Infrastructure creation without restored-data validation is not a successful drill.

## Test data scale

Use bounded production-shaped synthetic distributions for cardinality, skew, history, hot keys, and large objects. Personal or payment production data is prohibited.

## Rejected alternative

SQLite or generic in-memory database compatibility is rejected as authoritative database evidence. Reverse migration is not required when unsafe; tested forward repair and compatible rollout are the approved recovery.

## References

- [Data Ownership, Storage, and Migration](../06-engineering/11-data-ownership-storage-and-migration.md)
- [Resilience Architecture](../06-engineering/26-error-degraded-mode-and-resilience-architecture.md)
- [Domain-Module Integration](12-domain-module-integration-testing.md)
