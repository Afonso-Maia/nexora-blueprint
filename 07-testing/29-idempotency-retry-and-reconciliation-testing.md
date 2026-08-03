# Idempotency, Retry, and Reconciliation Testing

**Status:** Approved

## Decision

Every consequential operation has an executable invariant, stable identity, crash-point matrix, retry classification, and reconciler test. Exactly-once broker behavior is never assumed.

Evidence covers repeated requests, concurrent duplicates, same key/different digest, lost response, publisher ambiguity, callback duplication, worker lease expiry, crash before/after each durable write or remote call, late outcome, compensation failure, dead letter, replay, and outage recovery.

Tests prove:

- keys bind actor, operation, target, digest, and retention;
- original outcomes are retained and returned;
- an unknown remote effect is queried or reconciled before retry;
- inbox/source/outbox mutation is atomic;
- replay rechecks authority and applicability and cannot duplicate work;
- reconciliation compares sources, provider, workflow, inbox/outbox, and projections;
- correction uses owner commands and never rewrites source truth; and
- discrepancies, stuck work, and repair results are observable.

Fault injection is deterministic at each approved workflow boundary. Model tests establish state safety; real infrastructure tests establish atomicity; periodic deployed drills establish operational recovery.

## References

- [Events and Workflows](../06-engineering/24-events-queues-workflows-idempotency-and-reconciliation.md)
- [Event Testing](11-event-and-asynchronous-contract-testing.md)
