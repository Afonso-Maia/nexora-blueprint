# Data Migration, Seeding, and Readiness

**Status:** Approved

## Decision

Use governed, rehearsal-led data activation. Nexora has no assumed legacy production migration; initial loading is treated with the same provenance, validation, rollback, and reconciliation discipline.

Sequence schema migration capability and deterministic fixtures in I0; representative synthetic catalog in I1 previews; quarantined supplier/content ingestion; catalog and taxonomy publication rehearsal; Search and other projection rebuilds; commercial opening balances and reconciliation; provider identifiers; and controlled production activation.

Each data set has source, classification, owner, transformation version, validation rules, rejection/quarantine behavior, effective time, lineage, reconciliation, and rollback or forward-repair plan.

## Gates

Dry runs use production-like scale before launch. Counts alone are insufficient: referential integrity, semantic validity, localization, media accessibility, authority versions, duplicates, missing facts, projection parity, and operational diagnostics must pass.

Destructive changes and large backfills follow expand/migrate/switch/contract, are resumable and observed, and do not assume deployment rollback reverses committed data.

## References

- [Data Architecture](../06-engineering/11-data-ownership-storage-and-migration.md)
- [Database Testing](../07-testing/13-database-consistency-and-migration-testing.md)
