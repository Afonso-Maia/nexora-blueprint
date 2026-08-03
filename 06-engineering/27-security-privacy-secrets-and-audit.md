# Security, Privacy, Secrets, and Audit

**Status:** Approved

## Decision

Use defense in depth with:

- Zero-trust workload and user identity
- Deny-by-default network and authorization policy
- Managed secrets and key management
- Data classification and purpose limitation
- Provider tokenization for high-risk credentials
- Secure development and software-supply-chain controls
- Append-only source-attributed Audit records with cryptographic integrity checkpoints
- Privacy workflows executed by source owners
- Threat modeling and incident response as release requirements

Security controls reduce risk but never replace source-domain invariants.

## Security ownership

Security owns baseline policy, threat methodology, vulnerability response, key and secret governance, assurance, incident coordination, and control evidence.

Source domains own data meaning, authorization, retention inputs, safe logging, business-abuse controls, and remediation commands.

Privacy and Governance coordinates rights requests; each source executes export, correction, restriction, deletion, or retention.

Audit records activity and integrity evidence but does not become source outcome.

## Trust zones

Maintain separate:

- Public edge
- Customer Experience
- Admin Experience
- Commerce Core
- Workers
- Search
- AI
- Data stores
- Provider ingress and egress
- Build and deployment systems

Every connection requires identity, audience, authorization, encryption, timeout, purpose, and telemetry. Network reachability is not business authority.

## Data classification

Use:

- Public
- Internal
- Confidential
- Restricted

Restricted includes authentication secrets, payment-sensitive data, private Evidence, high-risk identity data, provider credentials, cryptographic keys, and equivalent regulated material.

Every schema field, message, log attribute, object type, export, and AI context inherits or declares classification, owner, purpose, retention, residency, encryption, and access.

Unknown classification defaults upward.

## Data minimization

- Collect only for declared purpose.
- Keep historical snapshots only where obligations require them.
- Separate operational data from analytics.
- Use stable internal identifiers instead of personal fields.
- Redact before logs, Search, AI, and support tooling.
- Do not reuse service, Support, or security data for marketing.
- Review new derived inference as new data.

## Encryption

- TLS for every network boundary.
- Managed encryption at rest for databases, object storage, cache, queues, Search, logs, and backups.
- Customer/Admin/provider separation where key policy requires.
- Envelope encryption for selected Restricted fields or objects.
- Key rotation, revocation, usage audit, and recovery.

Application-managed cryptography uses reviewed standard libraries. Custom cryptographic algorithms are prohibited.

## Secrets

Use a managed secret manager and platform workload identity.

- No secrets in source, images, build arguments, logs, tickets, examples, or client bundles.
- Short-lived workload credentials where possible.
- Distinct secret by environment, runtime, provider, and purpose.
- Automated rotation and overlap.
- Break-glass retrieval is named, alerted, and reviewed.
- Local development uses fake or isolated sandbox credentials.

CI uses workload federation rather than long-lived cloud keys.

## Application security

Implement:

- Strict input and output schema validation
- Contextual encoding
- Parameterized persistence
- CSRF and origin controls
- CSP, Trusted Types where viable, and frame restrictions
- Secure cookies
- SSRF egress allowlists
- File quarantine and scanning
- Request size, rate, and complexity limits
- Safe redirects
- Non-disclosing errors
- Dependency and container hardening

Admin and payment surfaces receive stricter policies and third-party review.

## Business abuse

Threat models cover:

- Account takeover and recovery abuse
- Credential stuffing
- Scraping and inventory hoarding
- Promotion and refund abuse
- Payment fraud and replay
- Cart, Reservation, Order, and Case duplication
- Support social engineering
- Provider impersonation
- Admin privilege abuse
- AI prompt injection and exfiltration
- Export and notification leakage

Controls preserve accessible legitimate recovery and do not rely on opaque AI denial alone.

## Privacy rights

Privacy Request is a durable workflow containing subject proof, scope, policy version, source tasks, exceptions, evidence, and outcome.

Sources expose versioned interfaces for:

- Discover
- Export
- Correct
- Restrict
- Delete or anonymize
- Retain under obligation

Completion requires source confirmation and reconciliation, including projections, Search, AI stores, providers, and object storage.

Backups age out through policy; ordinary restoration must reapply deletion tombstones.

## Retention

Every record class declares:

- Purpose
- Minimum and maximum retention
- Legal or operational trigger
- Archive
- Deletion/anonymization
- Hold
- Provider and backup propagation
- Evidence

“Keep forever” is prohibited without explicit obligation and approval.

## Audit event

Material events include:

- Authentication and recovery
- Authorization grants, denials, and emergency access
- Sensitive reads and exports where required
- Admin drafts, approvals, and execution
- Price, inventory, promotion, Compatibility, and Catalog changes
- Payment, Order, fulfillment, cancellation, refund, and Support remedy
- Evidence and provider access
- Privacy actions
- Secret and key administration
- Deployment and migration

An Audit event contains actual actor, delegation, workload, action, target, source outcome, reason, policy and resource versions, occurred and recorded time, correlation, environment, and classification.

## Audit architecture

Sources produce audit facts transactionally with their operation. The Audit module ingests idempotently into append-only storage.

Use:

- Immutable event identifiers
- Append-only database partitions
- Restricted writer identities
- Periodic cryptographic digest chains or Merkle-style checkpoints
- Checkpoint export to independently protected object storage
- Retention and Legal hold
- Verification jobs

Do not use blockchain. Integrity controls detect alteration; source records and provider reconciliation establish business truth.

## Audit access

Audit is not a universal data lake.

- Purpose and field authorization
- Strong assurance
- Query limits
- No mutation
- Controlled export
- Customer data minimization
- Access-to-Audit auditing

Corrections are new linked events. Raw event deletion follows exceptional governed privacy and Legal policy while preserving integrity evidence.

## Supply chain

- Lock dependencies.
- Verify registry and package integrity.
- Generate SBOM.
- Scan dependencies, secrets, source, containers, and infrastructure.
- Sign build artifacts and provenance.
- Use minimal non-root images.
- Pin deployment digests.
- Patch supported runtime versions.
- Review package installation scripts and transitive risk.

Critical vulnerability exceptions are expiring, owned, and deployment-blocking according to policy.

## Vulnerability management

Maintain intake, severity, exploitability, asset ownership, remediation target, exception, disclosure, and verification.

Production penetration testing covers customer, Admin, API, payment, provider, file, and AI boundaries before launch and after material change.

## Incident response

Runbooks cover detection, containment, credential and key revocation, provider coordination, forensic preservation, customer/Legal communication, recovery, and review.

Incident access is bounded and auditable. Evidence preservation does not justify uncontrolled data copying.

## Environment safety

- No production personal data in non-production.
- Synthetic fixtures by default.
- Approved masked subsets only under exceptional control.
- Separate identities, keys, networks, domains, callbacks, providers, and analytics.
- Production access is just-in-time and reviewed.

## Quality gates

- Threat model every new trust boundary and consequential workflow.
- Run static, dependency, secret, IaC, container, and API security tests.
- Prove authorization at source and field leakage resistance.
- Test rotation, revocation, backup restore, privacy deletion, and Audit verification.
- Test abuse without blocking accessible legitimate use.
- Block production on unresolved critical controls.

## Consequences

The architecture provides credible portfolio-grade security without building custom cryptography or identity. It adds classification, evidence, provider, and operational governance to every domain.

## References

- [Identity and Sessions](12-identity-sessions-authentication-and-assurance.md)
- [Authorization](13-authorization-and-policy-enforcement.md)
- [ADR-0033: Managed Secrets and Append-Only Audit Integrity](../adrs/ADR-0033-managed-secrets-and-append-only-audit-integrity.md)

