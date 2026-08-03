# Event and Asynchronous Contract Testing

**Status:** Approved

## Decision

Nexora tests asynchronous behavior as both a versioned message contract and an at-least-once delivery protocol. Schema compatibility without delivery-semantics evidence is incomplete.

## Producer evidence

- Envelope identity, owner, aggregate revision, time, correlation, causation, trace, ordering key, and classification
- Minimal payload without secrets or unrestricted personal data
- Atomic state and outbox write
- Stable message identity across ambiguous publication retry
- Compatible schema evolution and registered-consumer impact

## Consumer evidence

- Producer, schema, identity, size, classification, and authorization validation
- Inbox atomicity with source mutation and resulting outbox
- Duplicate returns the recorded result
- Same identity with different payload raises an integrity incident
- Gap, stale revision, reordering, delay, unknown schema, poison, and replay behavior
- No regression of source revision or duplicate consequential work

## Delivery-semantics matrix

Each consequential flow exercises:

- duplicate before, during, and after processing;
- reordered and delayed messages;
- publisher acknowledgement ambiguity;
- worker crash at each durable boundary;
- lease expiry and concurrent worker attempt;
- transient, permanent, rate-limited, and unknown dependency outcomes;
- dead-letter/quarantine and authorized replay;
- reconciliation after outage, deploy, migration, and lost invalidation; and
- trace continuity across asynchronous hops.

Loss is injected only where the approved broker/rebuild model can represent it; source snapshots remain the recovery authority.

## Compatibility governance

Producer and consumer suites run for the oldest concurrently supported version. Breaking semantic change requires version transition and rollout evidence. A registry cannot mark an event compatible solely because fields remain parseable.

## Rejected alternative

Broker-based end-to-end tests alone are rejected because they are slow and cannot reliably place crashes or ambiguity at every boundary. Pure schema checks are also insufficient.

## References

- [Events, Queues, Workflows, Idempotency, and Reconciliation](../06-engineering/24-events-queues-workflows-idempotency-and-reconciliation.md)
- [ADR-0030](../adrs/ADR-0030-postgresql-workflow-state-and-managed-at-least-once-queues.md)
