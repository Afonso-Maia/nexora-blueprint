# API and BFF Contract Testing

**Status:** Approved

## Decision

OpenAPI is the canonical HTTP contract. Nexora combines specification validation, generated fixtures, provider implementation conformance, registered-consumer compatibility, and semantic negative testing.

## Required evidence

- Request, response, headers, media types, bounds, and schema conformance
- Backward compatibility for supported clients and rolling versions
- RFC 9457 problem type, stable code, status, retry, and correlation semantics
- Authentication, assurance, object association, field restriction, and capability negatives
- Non-disclosing `404`/`403` behavior according to policy
- ETag, expected revision, conditional request, cursor, and idempotency behavior
- Freshness, partial-section, pending, indeterminate, and operation-resource representation
- Data classification, redaction, cache-control, localization, and telemetry propagation
- BFF aggregation without source-rule duplication or authority

## Consumer compatibility

Registered consumers declare the operations, fields, problem types, and version window they require. Additive evolution remains compatible only when consumers tolerate it. Required-field, enum, semantic, authorization, and outcome changes follow version governance.

Generated clients and fixtures are checked for drift. Consumer-driven examples supplement but do not override the canonical OpenAPI and source semantics.

## Negative and robustness cases

Tests cover malformed and oversized input, unknown fields according to contract, unsupported media, expired sessions, wrong tenant or subject association, stale revisions, duplicate keys with changed payload, throttling, timeout, dependency degradation, and unavailable optional sections.

Fuzzing is bounded to non-destructive isolated environments and schema-valid/invalid spaces.

## BFF proof

BFF tests verify experience composition, delegation, deadlines, partial-state mapping, permission-aware shaping, and trace propagation. Source modules remain responsible for authorization and business outcomes.

## Rejected alternative

Provider-only OpenAPI schema tests are rejected because schema validity does not prove consumer compatibility, authorization negatives, or business problem semantics. Consumer snapshots alone are rejected because they can freeze accidental representations.

## References

- [API and BFF Strategy](../06-engineering/09-api-and-bff-strategy.md)
- [Authorization](../06-engineering/13-authorization-and-policy-enforcement.md)
- [Test Levels and Types](05-test-levels-and-types.md)
