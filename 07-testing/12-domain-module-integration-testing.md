# Domain-Module Integration Testing

**Status:** Approved

## Decision

Every authoritative module is tested through its public commands, queries, events, and policies against real owned infrastructure. Tests cannot reach private tables to arrange or assert behavior except dedicated migration and integrity suites.

## Scope

Module suites prove:

- source authorization and field restrictions;
- lifecycle and transaction invariants;
- optimistic concurrency and expected revisions;
- idempotency and original-outcome retention;
- owned persistence, constraints, outbox, inbox, and Audit correlation;
- public errors, pending/indeterminate outcomes, and recovery;
- time, locale, precision, retention, and classification behavior; and
- published events and projection inputs.

## Infrastructure

Use the production PostgreSQL-compatible engine and production migrations. Other owned infrastructure uses a real ephemeral instance when behavior is material; faithful fakes are permitted for a collaborator outside the module boundary.

Each test receives isolated schema/database, identity namespace, queue/topic namespace, or transaction-safe fixture strategy. Parallel execution cannot share mutable business identities.

## Ports and fixtures

Arrange through public factories, commands, governed seed APIs, or versioned fixture loaders. Direct SQL is reserved for:

- migration preconditions and postconditions;
- corruption and integrity drills impossible through valid ports;
- database-level performance or concurrency probes; and
- cleanup performed by the harness.

Such tests state why public arrangement is inappropriate.

## Collaboration

Cross-module local invariants use the approved owner-led transaction boundary. Remote or long-running collaboration uses contracts and workflow tests rather than hidden multi-module SQL.

## Diagnostics

Failure evidence includes input identity, actor and scope, source revision, operation, transaction outcome, emitted event IDs, database logs where safe, and trace correlation without sensitive payloads.

## Rejected alternative

Repository tests against mocked persistence are rejected as module integration because they cannot prove constraints, isolation, concurrency, migrations, or outbox atomicity.

## References

- [Domain Modules](../06-engineering/10-domain-modules-and-transaction-boundaries.md)
- [Data Ownership](../06-engineering/11-data-ownership-storage-and-migration.md)
- [Unit and Property Testing](07-unit-and-property-based-testing.md)
