# Requirements, Risks, Tests, and Evidence Traceability

**Status:** Approved

## Decision

Nexora maintains a versioned many-to-many traceability graph joining approved requirements, quality risks, controls, tests, evidence, defects, exceptions, artifacts, pages, templates, domains, and owners.

Stable identifiers are assigned to Q0/Q1 risks, critical requirements, contracts, gates, journeys, and exceptions. Tests reference identifiers in machine-readable metadata; generated reports link to immutable run evidence rather than copying results into Markdown.

The graph answers:

- Which evidence proves this requirement or mitigates this risk?
- Which requirements and risks are affected by this change or failed test?
- Which pages, templates, consumers, roles, states, and providers share the contract?
- Which evidence is missing, stale, quarantined, or conditionally accepted?
- Which artifact and environment produced the release claim?

Traceability completeness is enforced for Q0/Q1 and release gates. Q2/Q3 use lighter grouping where one shared contract genuinely covers many consumers.

Bidirectional orphan checks detect approved requirements without evidence, tests without purpose/owner, risks without controls, exceptions without expiry, and release evidence not bound to the artifact.

The Blueprint remains requirement authority. A test-management product, dashboard, or generated matrix is a projection and cannot silently edit approved meaning.

## References

- [Quality Risk Classification](02-quality-risk-classification.md)
- [Page Mapping](44-page-and-template-testing-mapping.md)
