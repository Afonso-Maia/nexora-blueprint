# Security and Privacy Validation

**Status:** Approved

## Decision

Nexora uses continuous threat-led validation integrated into design, code, dependencies, deployment, and operations, with independent evidence for Q0 and material Q1 risks.

## Security evidence

- Threat models for trust boundaries, consequential flows, new providers, and material changes
- Static secret, dependency, provenance, license, configuration, and unsafe-code checks
- Authentication, authorization, session, input, output, upload, callback, SSRF, injection, and abuse tests
- Network, workload identity, least privilege, encryption, headers, cookie, and browser-policy validation
- Container/artifact scanning, SBOM, signature, provenance, and deploy-identity checks
- Targeted dynamic scanning and manual penetration testing of critical deployed boundaries
- Incident, key rotation, revocation, break-glass, restore, and evidence-preservation drills

Automated scanners create findings, not automatic risk acceptance. Exploit validation occurs only in isolated approved environments with bounded data and targets.

## Privacy evidence

Tests prove:

- field-level classification, purpose, minimization, residency, retention, and access;
- no prohibited data in logs, traces, Search, AI, analytics, queues, caches, screenshots, fixtures, or support artifacts;
- consent and preference separation;
- export, correction, restriction, deletion, closure, and legal-retention workflows executed by each source;
- identity/authorization of privacy requests and secure export delivery;
- provider propagation, completion evidence, exceptions, and Audit; and
- synthetic data outside governed production diagnostics.

Deletion tests distinguish source deletion, retained legal evidence, de-identification, projections, backups, and provider state without promising impossible instantaneous erasure.

## Independent validation

Q0 boundaries receive qualified independent review before initial release and after material changes. Periodic penetration and privacy-control assessment scopes are risk-driven, and findings enter the common defect policy.

## Production safety

Production security validation is non-destructive, rate-bounded, attributable, approved, monitored, and stopped on unexpected impact. Customer records and live consequential operations are not used as test targets.

## Rejected alternative

An annual penetration test as the primary security program is rejected. It provides a useful independent snapshot but cannot replace continuous source, dependency, authorization, privacy, and operational controls.

## References

- [Security, Privacy, Secrets, and Audit](../06-engineering/27-security-privacy-secrets-and-audit.md)
- [ADR-0033](../adrs/ADR-0033-managed-secrets-and-append-only-audit-integrity.md)
- [Quality Risk Classification](02-quality-risk-classification.md)
