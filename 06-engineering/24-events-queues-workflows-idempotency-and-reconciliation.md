# Events, Queues, Workflows, Idempotency, and Reconciliation

**Status:** Approved

## Decision

Use:

- Transactional outbox in each authoritative module schema
- Managed at-least-once queues and topics
- Consumer inbox and idempotent handlers
- Domain-owned durable Workflow and Operation records in PostgreSQL
- Separately executed workers
- Explicit retry, timeout, compensation, dead-letter, replay, and reconciliation
- Source snapshots for rebuild

Do not introduce Kafka, event sourcing, distributed transactions, or a general workflow platform initially.

## Rationale

Nexora needs reliable asynchronous work but has one regional core writer and a small team. PostgreSQL-backed workflow state plus a managed queue provides durable truth, simple operations, and controlled extraction. A streaming platform or Temporal-like engine can be adopted later if measured throughput, retention, replay, or workflow complexity justifies it.

## Message classes

- **Domain event** — immutable committed source fact.
- **Integration event** — minimized versioned fact for another runtime.
- **Command** — request for one owner to attempt work.
- **Reply or outcome** — accepted source result.
- **Invalidation** — notice to refresh a projection.
- **Scheduled trigger** — request whose applicability is rechecked at execution.

An event is not a command. A queue message is never business authority.

## Event envelope

Every message includes:

- Message, schema, and type identifiers
- Producer and owning aggregate
- Aggregate revision
- Occurred and recorded time
- Correlation and causation
- Actor or delegated context when required
- Trace context
- Partition or ordering key
- Data-classification label
- Payload

Payloads use stable identifiers and minimum facts. Secrets, raw payment data, unrestricted personal data, and complete aggregates are prohibited.

## Outbox

The source transaction writes state and outbox row atomically.

The dispatcher:

- Claims rows with bounded leases
- Publishes with a stable message identity
- Records attempts and broker acknowledgement
- Retries safely
- Never marks published before acknowledgement
- Reconciles ambiguous publication

Duplicate publication is expected. Consumers deduplicate.

Outbox cleanup follows retention and evidence policy and cannot remove unpublished or unresolved rows.

## Broker semantics

Assume:

- At-least-once delivery
- No global order
- Bounded message size
- Visibility or lease timeout
- Dead-letter capability
- Encryption and private networking

Ordering is required only per declared aggregate or workflow key and is reinforced by source revision checks. Consumers handle duplicates, gaps, delay, and reordering.

Exactly-once broker claims are not used as a business invariant.

## Inbox

Each authoritative consumer records:

- Consumer and message identity
- Schema version
- Received time
- Processing state
- Attempt and error category
- Applied source revision
- Resulting Operation or outbox references

Inbox insertion, source mutation, and resulting outbox write occur in one local transaction where the handler mutates authoritative state.

Duplicate messages return the recorded result. A different payload under the same identity is a security and integrity incident.

## Handler rules

Handlers:

- Validate schema, producer, identity, authorization context, and size
- Recheck current source applicability
- Reject stale revision regression
- Use bounded database and external calls
- Commit one owner-led transaction
- Emit semantic outcomes

Handlers do not use unbounded fan-out, hidden cross-module SQL, or remote provider calls inside a database transaction.

## Durable workflows

Every cross-owner or remote process has one accountable domain and durable record containing:

- Workflow identity and type
- Owning aggregate
- Current state and revision
- Input snapshot and source versions
- Current step
- Attempt identities
- Deadlines
- Outcomes
- Compensation
- Final status

Examples include Checkout, cancellation, refund coordination, Catalog publication, Build conversion, Support Remedy, export, and provider work.

Workflow state is domain truth. Queue position and worker memory are not.

## Workflow execution

1. Claim eligible workflow step with a lease.
2. Recheck revision and applicability.
3. Record or reuse the step idempotency identity.
4. Execute one local or remote action.
5. Persist outcome and next state.
6. Publish resulting events.
7. Release or renew lease.

A crashed worker resumes from durable state. Multiple workers cannot advance the same revision concurrently.

## Retries

Classify failures:

- Validation or policy rejection — no retry
- Concurrency conflict — reload and governed retry
- Transient dependency — exponential backoff with jitter
- Rate limit — provider-directed bounded delay
- Timeout or unknown remote outcome — query or reconcile before mutation retry
- Permanent provider failure — fail or compensate
- Unknown schema — quarantine

Retry budgets are per operation and dependency. Infinite retry is prohibited.

## Timeouts

Every remote call has connection, request, and overall step deadlines. Deadline expiry produces Unknown when the remote outcome may have occurred.

Workers do not hold database transactions while waiting for remote systems.

## Compensation

Compensation is a new idempotent business operation, not rollback.

It:

- Names the prior successful effect
- Has current eligibility
- Can fail or remain pending
- Preserves audit
- Does not assume exact inverse semantics

Workflows expose compensating and Indeterminate states to their host.

## Scheduling

Schedules are durable source records with:

- Target and exact approved version
- Trigger instant and time zone
- Misfire policy
- Idempotency identity
- Cancellation and supersession

A scheduler enqueues due triggers. The source rechecks current approval, lifecycle, and applicability.

Clock-sensitive business rules use server time and versioned calendars. Missed scheduling is reconciled.

## Dead letters and quarantine

Dead-letter or quarantine is an operational state, not disposal.

Records include payload reference, classification, attempts, error, owner, and recovery action. Access is restricted.

Replay:

- Requires authorization and reason
- Uses the original identity unless semantics require a new corrective command
- Targets a fixed consumer and schema
- Rechecks source applicability
- Is audited

Editing payloads in place is prohibited.

## Reconciliation

Every consequential workflow declares invariants and a reconciler.

Reconcilers compare authoritative sources, provider state, workflow state, inbox/outbox, and projections; classify discrepancy; and issue owner commands.

Reconciliation is recurring and can also be triggered after outage, deploy, migration, or incident.

Projection repair never rewrites source truth.

## Rebuild

Projection owners expose:

- Version-fixed source snapshot
- Change watermark
- Incremental event replay or query
- Validation counts and checksums
- Atomic promotion

The broker is not the only recovery history.

## Idempotency

Keys bind to actor, operation, target, request digest, and retention window.

Store original outcome. Reuse with different input conflicts. Derived provider keys are stable and persisted.

Idempotency records outlive likely retries and provider redelivery according to risk.

## Security

- Distinct workload identity per producer and consumer
- Topic and queue least privilege
- Payload classification and schema registry
- Encryption in transit and at rest
- No secrets in messages
- Restricted replay and dead-letter access
- Signed external callbacks through inbox adapters
- Environment isolation

## Observability

Measure outbox age, publish attempts, queue depth and oldest age, handler latency, duplicate rate, revision gaps, retry budget, dead letters, workflow duration, stuck steps, compensation, scheduling lag, and reconciliation discrepancies.

Trace correlation survives asynchronous hops.

## Quality gates

- Crash between every workflow step and prove safe resume.
- Duplicate, reorder, delay, lose, and poison messages.
- Test publisher ambiguity and inbox atomicity.
- Prove provider timeout reconciles before retry.
- Prove replay cannot duplicate consequential work.
- Exercise queue, worker, database, and provider outage.
- Architecture tests require outbox for post-commit events and idempotency for consequential handlers.

## Consequences

The model is operationally practical and safe under partial failure, but each workflow requires explicit state, compensation, and reconciliation. A later streaming or workflow platform must preserve these contracts.

## References

- [Runtime Topology](04-system-context-and-runtime-topology.md)
- [Domain Modules](10-domain-modules-and-transaction-boundaries.md)
- [Data Architecture](11-data-ownership-storage-and-migration.md)
- [ADR-0030: PostgreSQL Workflow State and Managed At-Least-Once Queues](../adrs/ADR-0030-postgresql-workflow-state-and-managed-at-least-once-queues.md)

