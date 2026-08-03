# Test Automation and Quality-Gate Enablement

**Status:** Approved

## Decision

Enable the lowest-cost faithful evidence before its corresponding risk enters a committed increment; do not build the entire automation estate in I0.

I0 supplies static architecture, types, unit/property, component/accessibility, contract-generation, migration, and evidence-publication foundations. I1 adds Catalog/Search integration, relevance, visual, and deployed discovery evidence. I2 adds Compatibility and commercial property/concurrency suites. I3 adds provider adapter, workflow crash-point, payment ambiguity, journey, security, performance, and resilience evidence.

Later increments add their domain-specific suites. Release-candidate, pre-production, progressive-production, and scheduled evidence activate when faithful environments and exposure exist.

## Governance

Tests remain owned with source or experience behavior; Platform Quality owns shared runners and evidence formats. One primary proof boundary applies. Flaky retries cannot create green results. Quarantines and exceptions are owned, visible, expiring, and prohibited for unresolved Q0 gaps.

## Gate

Automation backlog is sequenced by Q/C risk, dependency fan-out, feedback value, determinism, and maintenance cost—not by raw test count or coverage percentage.

## References

- [Test Automation Architecture](../07-testing/41-test-automation-architecture-and-tool-governance.md)
- [CI/CD Quality Gates](../07-testing/42-ci-cd-quality-gate-integration.md)
