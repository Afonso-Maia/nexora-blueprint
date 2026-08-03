# ADR-0033: Managed Secrets and Append-Only Audit Integrity

- **Status:** Accepted
- **Date:** 2026-08-03

## Decision

Use platform workload identity, managed secrets and key management, deny-by-default trust boundaries, classified data, and source-executed privacy workflows.

Record material activity through transactionally emitted, idempotently ingested, append-only Audit events with periodic cryptographic integrity checkpoints stored in independently protected object storage.

Do not use long-lived shared service credentials, custom cryptography, production data in ordinary non-production, or blockchain.

## Consequences

The posture is secure and auditable but requires classification, rotation, retention, privacy propagation, verification, and incident discipline across all modules.

## References

- [Security, Privacy, Secrets, and Audit](../06-engineering/27-security-privacy-secrets-and-audit.md)
- [ADR-0018: Managed Identity](ADR-0018-managed-identity-and-server-side-sessions.md)
- [ADR-0019: Authorization](ADR-0019-source-enforced-hybrid-authorization.md)

