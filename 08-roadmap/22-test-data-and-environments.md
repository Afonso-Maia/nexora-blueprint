# Test Data and Environment Provisioning

**Status:** Approved

## Decision

Provision the smallest faithful environment and deterministic classified data needed by each decision.

| Stage | Environment/data capability |
| --- | --- |
| I0 local/change CI | one-command dependencies, deterministic factories, clocks/IDs, safe provider fakes, isolated production-engine database |
| Integration | disposable module schemas, migrations, outbox/queues, contract consumers, failure controls |
| Preview | synthetic scenarios only, expiring deployment, no live consequential providers |
| Staging/release candidate | production-like topology and controls, provider sandboxes, representative scale, reset and provenance |
| Production | isolated live accounts/data/secrets, non-destructive synthetics, controlled test identities and reconciliation |

Data products cover lifecycle, permission, locale, theme, device, failure, concurrency, ambiguity, and boundary conditions. Production personal data is not copied into lower environments by default.

## Gates

Every environment records artifact, configuration class, provider mode, data revision, parity gaps, owner, reset state, access, and expiry. Shared state cannot make Q0/Q1 evidence ambiguous.

## References

- [Test Data](../07-testing/35-test-data-fixtures-factories-and-privacy.md)
- [Test Environments](../07-testing/36-test-environments-isolation-reset-and-parity.md)
