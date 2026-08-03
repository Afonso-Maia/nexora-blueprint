# Error, Degraded-Mode, and Resilience Architecture

**Status:** Approved

## Decision

Use failure-domain isolation, bounded synchronous dependencies, durable asynchronous recovery, host-owned semantic states, and tested regional recovery.

The initial production posture is:

- One primary Brazilian-serving region
- Managed multi-zone high availability where supported
- One PostgreSQL writer with managed standby and point-in-time recovery
- Independently degradable Customer, Admin, Core, worker, Search, and AI runtimes
- Encrypted cross-failure-domain backups
- Rebuildable caches, Search, and projections
- Documented restore and regional-rebuild procedures

Active-active multi-region commerce is not approved.

## Failure classes

Distinguish:

- Validation
- Authentication or authorization
- Eligibility or policy rejection
- Concurrency conflict
- Dependency unavailable
- Timeout
- Rate limit
- Partial response
- Stale data
- Pending
- Indeterminate
- Internal defect
- Capacity exhaustion
- Data integrity incident

Transport errors do not replace business outcomes.

## Dependency criticality

Every operation declares:

- Required and optional dependencies
- Timeout and retry budget
- Freshness requirement
- Eligible stale fallback
- Failure state
- Compensation and reconciliation
- Customer or operator recovery

Optional AI, recommendations, reviews, media, and analytics degrade before deterministic commerce.

## Synchronous calls

- Use explicit connection and request deadlines.
- Propagate a smaller remaining deadline.
- Retry only safe idempotent calls and transient failures.
- Use exponential backoff with jitter.
- Limit concurrent calls and queues.
- Avoid nested unbounded fan-out.
- Cancel obsolete work.

Mutations with an unknown outcome reconcile before retry.

## Circuit breaking and load shedding

Apply per dependency and operation:

- Concurrency limits
- Circuit breaker
- Rate limit
- Queue bound
- Bulkhead
- Adaptive load shedding

Protect Checkout, current Orders, authentication, Support obligations, and recovery before low-priority indexing, AI, analytics, prefetch, and bulk work.

Circuit-open responses use the correct unavailable or pending state; they do not imitate empty or denied.

## Graceful degradation

Page hosts own degradation.

- Preserve stable identity and confirmed facts.
- Identify the impaired section and source.
- Keep unaffected actions usable.
- Suppress unsafe commitment.
- Offer retry or canonical alternative.
- Preserve drafts and operation identity.
- Never fabricate price, stock, Compatibility, permission, delivery, refund, or completion.

## Partial reads

Composed responses include per-section status, source revision, freshness, and error category.

Required section failure can fail the whole operation; optional section failure returns a partial representation. The contract declares which.

## Write safety

Consequential commands:

- Validate all preconditions
- Use idempotency and expected revision
- Commit local invariants atomically
- Record outbox
- Return explicit accepted or committed outcome

Remote partial work enters Workflow state. It never returns generic success.

## Database resilience

- Managed multi-zone failover
- Connection pools with strict limits
- Transaction deadlines
- Read replica only for eligible stale reads
- Continuous backup and PITR
- Restore drills
- Schema and data integrity checks
- Capacity headroom

Application retries after failover only when transaction outcome is known or idempotently reconcilable.

## Queue and worker resilience

- Durable messages and dead letters
- Autoscaling within dependency protection
- Poison-message isolation
- Lease recovery
- Backpressure
- Priority separation
- Reconciliation after outage

Critical and optional workloads do not share one unbounded queue.

## Provider resilience

Each external provider adapter declares:

- Timeout and rate limits
- Idempotency
- Status-query capability
- Callback trust
- Fallback eligibility
- Circuit behavior
- Data and credential isolation
- Reconciliation

Switching provider during an unknown consequential attempt is prohibited unless the workflow proves the original effect absent.

## Search and AI

Search outage preserves direct navigation, Product routes, Cart, Account, and Support. It does not query the primary database without bounds.

AI outage leaves all deterministic paths complete.

## Disaster recovery

Classify data:

- Authoritative and irreplaceable
- Provider-reconcilable
- Rebuildable projection
- Ephemeral

Each class has recovery-point and recovery-time objectives assigned in the performance and operations register.

Recovery order:

1. Identity, secrets, network, and observability
2. PostgreSQL authority and object evidence
3. Customer/Core critical reads and writes
4. Workers and reconciliation
5. Search and projections
6. Admin and optional AI

Promotion of a restored environment requires integrity checks, provider reconciliation, idempotency continuity, and explicit incident command.

## Regional failure

The initial posture favors controlled restoration or rebuild in an approved secondary region over active-active writes.

Runbooks cover:

- DNS and ingress
- Identity callbacks
- Secrets and keys
- Database restore or replica promotion
- Object storage
- Queue recovery
- Provider endpoints and webhooks
- Search rebuild
- Reconciliation

No failover occurs into an untested region or stale database merely to meet availability appearance.

## System states

Engineering implements all approved loading, empty, unavailable, failure, partial, stale, conflict, offline, pending, Indeterminate, completion, and route-recovery semantics.

Problem Details codes map consistently to Design System states. Generic exception pages are a last route-level boundary.

## Incident modes

Feature and operational controls can:

- Disable optional features
- Make a capability read-only
- Pause scheduled or bulk work
- Route provider callbacks to durable inbox
- Increase verification
- Reduce query complexity
- Display approved service impact

Controls are owned, versioned, audited, expiring, and tested. They cannot bypass source truth or authorization.

## Chaos and recovery validation

Test:

- Instance and zone loss
- Database failover and restore
- Cache flush
- Queue duplication and backlog
- Provider timeout and late success
- Search loss
- AI loss
- Object-storage delay
- Clock skew
- Network partition
- Invalidation loss
- Regional rebuild

Production experiments use bounded blast radius and approval.

## Quality gates

- Every dependency has timeout and failure behavior.
- Every consequential workflow has idempotency and reconciliation.
- Restore drills verify data, not only infrastructure creation.
- Partial states pass accessibility tests.
- Load tests prove shedding protects critical paths.
- Runbooks identify owner, authority, decision, rollback, and communication.

## Consequences

Nexora remains safe and useful under partial failure without premature multi-region write complexity. The cost is explicit dependency classification, recovery engineering, and recurring drills.

## References

- [Error, Empty, and Degraded States](../03-product-structure/08-error-empty-and-degraded-states.md)
- [Runtime Topology](04-system-context-and-runtime-topology.md)
- [ADR-0032: Single-Region Multi-Zone Resilience](../adrs/ADR-0032-single-region-multi-zone-resilience.md)

