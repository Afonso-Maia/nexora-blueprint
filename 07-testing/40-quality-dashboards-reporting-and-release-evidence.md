# Quality Dashboards, Reporting, and Release Evidence

**Status:** Approved

## Decision

Quality reporting is audience-specific, drillable, trend-aware, and tied to decisions. Nexora does not publish one aggregate quality score.

Dashboards show:

- requirement/risk evidence completeness by tier and owner;
- gate status, duration, flake, quarantine, and failure cause;
- Blocker/High defects, age, recurrence, escapes, and containment;
- contract/migration compatibility and provider conformance;
- accessibility, security/privacy, performance, resilience, and operational findings;
- journey reliability and diagnostic time;
- environment health and parity gaps;
- exceptions, owners, expiries, and compensating controls; and
- release-candidate eligibility with artifact-bound evidence.

Counts are segmented by consequence and supported scope. Pass rate cannot hide skipped, quarantined, stale, or never-executed evidence.

The release dossier is immutable for the promoted artifact and includes the fields defined in [Release Confidence](03-ready-done-and-release-confidence.md). Human evidence records qualified reviewer, scope, method, environment, findings, and decision without storing sensitive raw data.

Retention follows audit, legal, security, operational, and cost policy. Raw high-volume artifacts may expire before summarized signed decisions, provided diagnosis and required evidence remain available.

Dashboards support action; they do not rank individuals or reward low defect reporting.

## References

- [Release Confidence](03-ready-done-and-release-confidence.md)
- [Traceability](39-requirements-risks-tests-and-evidence-traceability.md)
