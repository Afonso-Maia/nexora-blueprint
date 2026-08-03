# Data Ownership, Storage, and Migration

**Status:** Approved

## Purpose

This document defines physical data topology, module storage isolation, identifiers, types, consistency, schema evolution, backfills, retention, archival, deletion propagation, backups, restore validation, and derived-store boundaries.

It preserves the approved domain-module map without creating a database per module or one shared mutable schema.

## Decision

Use:

- A managed **PostgreSQL** primary authority for the modular commerce core
- One initial regional writer with high-availability replicas managed within the selected platform
- One logical database with a private schema and database role per authoritative module
- Separate module connection pools or equivalent role-scoped data access
- No direct cross-module table access or cross-schema foreign keys
- RFC 9562 **UUIDv7** identifiers for new internal durable entities
- Separate human-facing references where operational communication requires them
- S3-compatible private object storage for media, evidence, exports, and other large binary objects
- Independently rebuildable Search, cache, and analytical stores derived from authoritative sources
- Expand → Backfill → Verify → Switch → Contract as the default online migration sequence
- Continuous backup and point-in-time recovery with recurring restore validation

Do not introduce a general document database, event store, graph database, vector database, or database-per-module topology initially. A later workload may justify one through the approved storage threshold.

## Why PostgreSQL

Nexora's core workloads require:

- Strong transactions and constraints
- Relational product, customer, order, permission, case, and operational models
- Exact numeric handling
- Mature indexing and query planning
- JSON support for bounded extensibility without abandoning schemas
- Row and column security mechanisms as defense in depth
- Online evolution techniques
- Point-in-time recovery
- Replication and change capture options
- Broad managed-platform support

A relational authority better fits these invariants than a document-first primary. PostgreSQL also lets modules share operational infrastructure while retaining schema, role, migration, and access boundaries.

The selected managed service and PostgreSQL major version remain deployment decisions. Production uses a supported stable version pinned and tested by environment; major upgrades follow migration and compatibility gates.

## Physical topology

### Initial authority

The authoritative core begins with:

- One primary PostgreSQL cluster
- One logical production database for commerce-core modules
- High-availability standby or managed equivalent
- Point-in-time recovery storage isolated from the primary failure domain
- Read replicas only when measured workloads justify them

Single-writer topology preserves straightforward transaction and consistency semantics for the initial team.

Multi-region active-active writes are not approved. A later regional strategy must define conflict, latency, failover, identity, payment, inventory, and legal consequences before changing the writer model.

### Module schemas

Each authoritative module receives:

- Private schema
- Owning migration history
- Owning database role
- Runtime read/write role
- Optional read-only diagnostic or projection role
- Explicit grants to approved public database interfaces, if any

Examples conceptually include `catalog`, `compatibility`, `pricing`, `inventory`, `purchase`, `payments`, `fulfillment`, `customer`, `support`, and other approved owners. Exact names are implementation metadata.

Schemas express ownership and migration boundaries. They are not sufficient enforcement alone; runtime roles, connection pools, architecture tests, reviews, and query diagnostics reinforce them.

### Role-scoped access

Each module's repository uses its role-scoped connection. The application cannot use one unrestricted database owner credential for normal requests.

Database owner, migration, replication, backup, and break-glass identities are separate from runtime identities.

Registered cross-module atomic transactions use a narrowly approved composite transaction role or equivalent mechanism that:

- Names the transaction owner and participants
- Grants only required operations
- Cannot issue arbitrary cross-schema queries
- Is unavailable to ordinary module repositories
- Is monitored and reviewed

## Ownership rules

- A table, sequence, view, function, index, trigger, and migration has one owning module.
- Only the owner writes its schema.
- Other modules use public application contracts, not SQL.
- A read replica does not grant cross-module query rights.
- Reporting and Search extract through approved events, change capture, or projection contracts.
- Database administrators operate infrastructure but do not become business-data owners.
- Ownership metadata is tracked in the repository and data catalog.

## Cross-schema relationships

Store another module's identifier as an opaque value when an owned aggregate references it.

Do not create cross-schema foreign keys because they:

- Couple migration and deletion order
- Permit storage-level traversal around public contracts
- Make extraction materially harder
- Hide ownership and unavailable-state behavior

Referential validity is maintained through:

- Creation-time source validation where required
- Source events and projections
- Periodic reconciliation
- Tombstone or successor handling
- Explicit unavailable or stale presentation

Within one module schema, foreign keys and constraints are encouraged where they protect owned invariants.

## Identifiers

### Internal durable identity

Use UUIDv7 for new durable aggregate and operation identities.

Properties:

- Globally unique without a central sequence
- Time-ordered enough for index locality
- Standardized by RFC 9562
- Opaque to consumers
- Portable across extraction and migration

UUID timestamp ordering is not an authoritative event timestamp, security boundary, or proof of creation order. Store explicit timestamps and versions.

### Public identifiers

Public API identifiers may use the internal UUID in an opaque representation when exposure is safe. Security never depends on identifier secrecy.

For resources vulnerable to enumeration or abuse, use authorization, rate limits, non-disclosing errors, and optionally a separate random public identifier.

### Human-facing references

Orders, Support cases, returns, payments, shipments, privacy requests, and operations may receive separate references designed for:

- Reading and transcription
- Customer or workforce communication
- Check digits or typo detection where useful
- Non-sequential exposure
- Domain-specific support lookup

Human references are unique within their declared scope but are not primary keys, authorization tokens, or idempotency keys.

### External identifiers

Provider identifiers are stored in adapter-owned mappings with:

- Provider and account identity
- Nexora source object
- Provider reference
- Lifecycle and validity
- Correlation and reconciliation metadata

Provider identifiers do not replace Nexora identity.

## Common data types

### Time

Distinguish:

- Instant in UTC
- Local date
- Local time
- Zoned date-time
- Duration
- Business calendar or deadline

Persist instants in UTC with time-zone-aware types. Preserve the relevant IANA time-zone identifier when local rules matter.

Database insertion time, business occurrence time, provider time, and publication time are separate.

### Money

Represent money with:

- ISO currency code
- Exact integer minor units or constrained exact decimal
- Explicit rounding rule and calculation version

Do not use binary floating point.

Stored formatted strings are not authoritative numeric values. Brazilian presentation is generated through localization contracts.

### Quantities and measurements

Store value, unit, scale, precision, and source where interpretation requires them. Catalog attribute definitions govern technical units.

### Status and lifecycle

Statuses use owned constrained values with explicit transition rules. Database text does not create an open-ended lifecycle.

Unknown future values are handled at contract boundaries. Historical status meaning remains reconstructable by version.

### JSON

JSON columns are permitted for:

- Versioned provider payload excerpts with retention and redaction
- Bounded heterogeneous configuration owned by one module
- Immutable event or audit detail under a registered schema
- Extensible metadata whose fields are not queried as core invariants

JSON is not a substitute for modeling frequently queried, constrained, joined, permissioned, or lifecycle-significant fields.

Every JSON shape has an owner, schema version, size bound, validation, indexing policy, and migration behavior.

## Aggregate persistence

Repositories are module-private and align with aggregate boundaries.

- One transaction loads and changes owned aggregates.
- Persistence models may differ from domain models.
- Application code does not expose generic CRUD repositories across modules.
- Partial updates still invoke domain behavior and concurrency checks.
- Database triggers enforce local mechanical invariants or change capture, not hidden cross-domain policy.
- Stored procedures are allowed for owned atomic operations when their contract, versioning, tests, and observability are explicit.

## Consistency classes

### C0 — Aggregate atomic

One owned aggregate changes in one PostgreSQL transaction with strong consistency.

Examples:

- Wishlist membership
- Support Case transition
- PC Build save
- Role grant creation

### C1 — Registered local transaction

Multiple module contracts participate in one local transaction for a registered invariant.

Requirements follow the approved transaction-boundary register. This class is exceptional.

### C2 — Read-after-write

The command response or primary read provides current state after accepted mutation. Replicas and projections cannot serve a stale result where immediate confirmation is required.

### C3 — Eventually consistent projection

Search, Account summaries, Admin worklists, Notifications, Analytics, and caches update after source commit.

Each declares expected and maximum lag, stale behavior, source recheck, rebuild, and reconciliation.

### C4 — Provider-reconciled

Payments, fulfillment, repair, communications, identity providers, and other external work may remain pending or indeterminate until callback, poll, or reconciliation confirms outcome.

Provider timing does not alter Nexora transaction history retroactively without a source-owned correction record.

## Isolation and locking

Default database isolation follows the selected PostgreSQL driver and service configuration only after each operation class is reviewed.

Architecture rules:

- Use optimistic concurrency for user and workforce editing by default.
- Use row locking for short source-owned critical sections when contention and ordering are understood.
- Never hold database transactions open across browser interaction, external provider calls, model execution, queue waits, or file transfer.
- Establish consistent lock order for registered multi-aggregate transactions.
- Detect, retry, and observe serialization and deadlock failures only when the operation is idempotent.
- Inventory reservations, Checkout commit, and order creation receive dedicated transaction decisions later.

## Read replicas

Replicas are optional scale and resilience tools, not a default read path.

Reads requiring current:

- Authorization relationships
- Price or inventory commitment
- Compatibility at purchase
- Cart and Checkout state
- Operation outcome
- Admin mutation eligibility

use the primary or an explicitly consistent source path.

Replica reads declare lag tolerance and fallback. Routing cannot be based solely on HTTP method because some `GET` operations require current authority.

## Derived stores

### Search

Search documents are rebuilt from source events and backfills. They contain only approved searchable fields, access metadata, source version, and freshness.

### Cache

Caches contain rebuildable approved projections. They follow the cache contracts in the rendering decision.

### Object storage

Object storage contains immutable or versioned binaries and export artifacts. PostgreSQL stores owned metadata, lifecycle, access, scan, checksum, and object reference.

Buckets, prefixes, encryption, credentials, retention, and access are partitioned by purpose and classification. Object URLs do not become permanent public authority.

### Analytics

Analytical stores ingest minimized versioned facts through approved pipelines. They cannot become operational mutation sources.

### Vector and AI retrieval

A vector store is not approved as a general source. Later AI grounding may derive embeddings from authorized source documents with provenance, deletion, access, freshness, and rebuild contracts.

## Schema migrations

### Ownership

Each module owns an append-only migration sequence for its schema. Applied migration files are immutable.

One release manifest records:

- Migration identity
- Owning module
- Required application compatibility
- Lock and rewrite assessment
- Backfill plan
- Verification
- Roll-forward or corrective action
- Contract-removal gate

### Expand → Backfill → Verify → Switch → Contract

1. **Expand:** add compatible structures without removing old readers or writers.
2. **Backfill:** populate in bounded resumable batches with stable checkpoints.
3. **Verify:** compare counts, checksums, invariants, samples, and source behavior.
4. **Switch:** move reads and writes through feature-controlled or release-controlled activation.
5. **Contract:** remove old structures only after consumer and rollback windows close.

Dual writing is temporary, owner-controlled, observable, and reconciled. It is not a permanent architecture.

### Deployment ordering

Database changes remain compatible with both the previous and next application release during rolling deployment.

Destructive migrations do not run before incompatible code is retired. Application rollback cannot assume a dropped column or transformed value can be recreated from backup during an incident.

### Lock and rewrite safety

Before production execution, migrations classify:

- Lock mode and expected duration
- Table rewrite or index build
- WAL and replication impact
- Disk growth
- Query-plan change
- Backfill load
- Failure and resume

Large indexes and constraints use online or staged validation mechanisms where supported. High-risk migrations have production-like rehearsal and abort thresholds.

## Backfills

Backfills are durable operations with:

- Owner and purpose
- Source and target versions
- Bounded batch and rate
- Checkpoint and resume
- Idempotency
- Current authorization or approved maintenance authority
- Error quarantine
- Metrics and completion evidence
- Reconciliation
- Cancellation or pause

Backfills cannot bypass domain validation merely because they operate directly on storage. Where storage-level work is necessary, the owning domain defines equivalent invariants and audit.

## Data corrections

Corrections preserve:

- Prior value or reconstructable history where required
- Reason and evidence
- Subject and authority
- Timestamp and correlation
- Downstream invalidation
- Customer or workforce consequence

Direct manual database edits are prohibited for ordinary correction.

Emergency repair uses a reviewed, versioned, attributable, bounded script or owned Admin operation with before/after evidence and reconciliation.

## Retention and archival

Every data class declares:

- Purpose and legal basis or operational need
- Owner
- Active retention
- Archival threshold
- Archive access and assurance
- Deletion or anonymization
- Legal hold
- Derived-copy propagation
- Backup expiry implications

There is no universal soft-delete flag.

Use:

- Lifecycle state when the object remains operationally meaningful
- Tombstone when references or deletion propagation require durable absence
- Archive when infrequent access remains required
- Hard deletion or irreversible anonymization when policy requires erasure

Archived data is still protected, discoverable only through authorized paths, and included in retention governance.

Exact durations remain Legal, Privacy, Finance, Support, Security, and operational policy inputs.

## Privacy deletion and propagation

Privacy and Governance coordinates approved requests; source modules determine and execute record-specific action.

Deletion propagation covers:

- Primary tables
- Read models
- Search indexes
- Caches
- Object storage
- AI retrieval and conversations
- Analytics where policy requires
- Exports and temporary files
- Notifications and messaging data
- Provider requests

Each consumer acknowledges or reports failure. Completion evidence distinguishes:

- Deleted
- Anonymized
- Retained under lawful exception
- Pending provider action
- Pending backup expiry
- Failed and escalated

Audit records retain only the minimum evidence permitted by policy.

## Backups and recovery

Require:

- Encrypted automated base backups
- Continuous WAL or managed equivalent for point-in-time recovery
- Backup retention aligned to policy and incident needs
- Backup storage separated from primary credentials and failure domain
- Protected deletion and tamper controls
- Inventory and monitoring of backup completeness
- Documented restore procedure
- Recurring automated and manual restore tests
- Post-restore source, projection, object, provider, and event reconciliation

A backup job reporting success is not recovery evidence. Restore testing verifies readable, internally consistent, application-compatible data.

RPO and RTO values follow the disaster-recovery and capacity decision. Until approved, architecture must preserve PITR and measure achievable recovery.

Backups do not excuse migration rollback design or become a routine undo mechanism.

## Object recovery

Object storage uses versioning or equivalent protection according to classification. Database restore and object restore use correlated recovery points where referential consistency matters.

Missing, quarantined, or restored objects enter explicit source state; the application does not present a valid attachment merely because metadata exists.

## Encryption and sensitive fields

Managed storage encryption at rest and encrypted transport are mandatory.

Application-level field encryption, tokenization, hashing, key separation, and searchable-encryption choices follow the security architecture based on field classification.

Passwords are never reversibly encrypted. Payment credentials remain provider-tokenized where possible.

Encryption cannot replace authorization, minimization, retention, or deletion.

## Data quality and reconciliation

Each source module defines:

- Required invariants
- Freshness and completeness signals
- Duplicate detection
- Invalid-state quarantine
- Reconciliation with providers and projections
- Repair authority

Cross-module reconciliation reports discrepancies without writing another owner's records.

Data-quality dashboards, analytics, and audit are evidence surfaces, not source truth.

## Observability

Measure:

- Transaction rate, latency, contention, deadlocks, and retries by module
- Connection and role use
- Schema-boundary violations
- Replica lag
- Migration locks, progress, WAL, and errors
- Backfill rate, age, quarantine, and verification
- Projection lag and reconciliation
- Retention and deletion backlog
- Backup age, completeness, restore duration, and restore validation
- Object/database reference discrepancies

Queries and telemetry use fingerprints and approved identifiers rather than sensitive values.

## Storage adoption threshold

A new storage technology requires:

- Workload PostgreSQL cannot meet credibly
- Explicit authority or derived-state classification
- Data model and consistency need
- Security, privacy, backup, restore, retention, deletion, and migration
- Operational ownership and expertise
- Failure and degraded behavior
- Exit and rebuild strategy
- Measured benefit exceeding platform complexity

Developer preference or vendor feature availability is insufficient.

## Rejected alternatives

### Database per module

This maximizes physical isolation but adds connection, migration, backup, local-development, transaction, and operational overhead before team or compliance boundaries justify it.

### One shared schema

This simplifies joins and migrations but makes ownership unenforceable and encourages direct cross-domain access.

### Document database as the primary core store

Flexible documents suit selected aggregates, but the core requires relational constraints, transactions, operational querying, and explicit schema evolution across many authoritative records.

### Event sourcing as the universal persistence model

Event sourcing provides temporal reconstruction but adds event-version, projection, privacy, correction, and operational complexity. Owned append-only histories and events are used where their semantics require them without making every aggregate event-sourced.

## Validation

This decision:

- Preserves module ownership inside shared infrastructure.
- Supports local transactions and future extraction.
- Prevents cross-module SQL and shared mutable models.
- Defines exact identity and commerce data types.
- Makes strong, eventual, and provider-reconciled consistency explicit.
- Provides online migration, retention, deletion, backup, and restore contracts.
- Keeps Search, cache, objects, analytics, and future AI retrieval derived.

## Consequences

### Benefits

- One mature relational platform supports the initial team and authoritative invariants.
- Schema and role isolation make module boundaries enforceable.
- UUIDv7 identities survive extraction without centralized sequences.
- Online migration rules reduce release risk.
- PITR and restore validation provide credible recovery.

### Costs and risks

- One cluster remains a shared failure and capacity domain.
- Role-scoped pools and schema grants add operational setup.
- No cross-schema foreign keys require reconciliation for references.
- Data deletion and backup expiry require cross-store coordination.

## Governance

- New tables and migrations declare one module owner.
- Cross-schema SQL and foreign keys are prohibited.
- New stores pass the storage adoption threshold.
- Applied migrations are immutable.
- Destructive changes require expand/contract evidence.
- A material change to primary storage, schema isolation, identifier strategy, writer topology, or migration protocol requires a superseding ADR.

## References

- [ADR-0017: PostgreSQL Modular Data Authority](../adrs/ADR-0017-postgresql-data-authority.md)
- [PostgreSQL schemas and privileges](https://www.postgresql.org/docs/current/ddl-schemas.html)
- [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)
- [PostgreSQL point-in-time recovery](https://www.postgresql.org/docs/current/continuous-archiving.html)
- [RFC 9562: UUIDs](https://www.rfc-editor.org/rfc/rfc9562.html)
- [Domain Modules and Transaction Boundaries](10-domain-modules-and-transaction-boundaries.md)
- [State Ownership and Restoration](08-state-ownership-and-restoration.md)
- [Scalability Guidelines](../03-product-structure/09-scalability-guidelines.md)

## Next decision

Define identity, customer and workforce sessions, authentication methods, assurance, recovery, device state, workload identity, and session revocation.
