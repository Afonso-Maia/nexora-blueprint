# Test Environments, Isolation, Reset, and Parity

**Status:** Approved

## Decision

Use the smallest environment faithful to the risk, with environment-as-code, explicit parity claims, isolated identities/data/secrets, and reliable reset. A permanent shared staging environment is not the universal proof boundary.

The environment ladder is:

1. hermetic local/CI execution;
2. ephemeral production-engine infrastructure;
3. isolated deployed integration/preview;
4. provider sandbox;
5. production-like release candidate;
6. progressive production exposure.

Each environment records artifact, configuration schema/class, migrations, data revision, flags, contracts, provider mode, network policy, observability, region/topology differences, owner, expiry, and known parity gaps.

Isolation uses separate accounts/roles, databases or schemas, object prefixes, queues/topics, indexes, caches, provider namespaces, domains, and test identities according to risk. Reset is idempotent, observable, scope-validated, and prohibited from targeting production.

Preview environments expire, contain no production personal data, and cannot silently receive production callbacks. Shared environments use leases/reservations and must not make tests order-dependent.

Parity means behavior relevant to the claim is equivalent; it does not require production scale for every test. Performance, failover, security, and provider claims use environments that actually preserve those properties.

## References

- [Dependency, Configuration, and Environment Management](../06-engineering/33-dependency-configuration-and-environment-management.md)
- [Database Testing](13-database-consistency-and-migration-testing.md)
