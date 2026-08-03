# Test Data, Fixtures, Factories, and Privacy

**Status:** Approved

## Decision

Test data is a versioned, classified synthetic product with source-aligned factories, scenario builders, immutable reference datasets, and deterministic seeds.

Core datasets represent Catalog/taxonomy, Compatibility known/unknown/conflict, Portuguese Search judgments, exact pricing/promotions, inventory races, Brazilian addresses/formats, identities/permissions/assurance, orders/fulfillment, cases/evidence, builds, AI sources, system states, content extremes, and accessibility names.

Rules:

- factories create valid source objects through public contracts by default;
- invalid/corrupt fixtures are isolated and explicitly classified;
- every field inherits owner, classification, purpose, retention, and safe diagnostic policy;
- production personal, payment, message, evidence, credential, or support data is prohibited outside an explicitly governed diagnostic workflow;
- seeds, clocks, identities, revisions, and provider outcomes are reproducible;
- datasets declare schema/ruleset compatibility and migrations;
- parallel tests receive collision-free namespaces; and
- cleanup is verified, while immutable reference revisions remain attributable.

Synthetic data is evaluated for representativeness and bias without imitating identifiable customers. Tokenization or masking does not automatically make production data suitable for tests.

## References

- [Security and Privacy](../06-engineering/27-security-privacy-secrets-and-audit.md)
- [Architectural Test Data](../06-engineering/32-testing-interfaces-and-architectural-quality-gates.md#test-data)
