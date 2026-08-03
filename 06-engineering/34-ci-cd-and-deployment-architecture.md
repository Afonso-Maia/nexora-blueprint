# CI/CD and Deployment Architecture

**Status:** Approved

## Decision

Nexora uses trunk-based development with short-lived branches, required pull-request checks, and immutable build-once artifacts promoted through environments. GitHub Actions is the initial CI/CD control plane. Cloud access uses short-lived workload identity through OIDC; stored long-lived deployment credentials are prohibited.

Infrastructure is declarative and reviewed. Production releases use progressive exposure, explicit health evidence, migration-safe ordering, and independent rollback of applications, workers, configuration, and flags. A cloud and hosting provider is intentionally not selected by this decision.

## Pipeline

1. **Change classification:** determine affected projects, contracts, migrations, infrastructure, flags, and risk.
2. **Verify:** frozen install, generated-file drift, static checks, tests, contracts, accessibility, security, and budgets.
3. **Build once:** produce signed, content-addressed application, worker, package, and infrastructure artifacts with provenance and an SBOM.
4. **Preview:** deploy eligible changes with synthetic data and no production credentials.
5. **Stage:** promote the same artifacts; rehearse migrations, smoke journeys, failure behavior, telemetry, and rollback.
6. **Approve:** require owned evidence and separation of duties for high-risk production changes.
7. **Production:** apply compatible migrations, progressively expose runtime revisions, evaluate health, then advance.
8. **Verify and record:** execute safe smoke/synthetic checks and record artifact, configuration, migration, flag, approver, and result.

Protected main requires reviews and green applicable gates. Emergency changes use the same repository and leave an expedited but complete record.

## Deployment units

The customer app/BFF, Admin app/BFF, authoritative core, worker groups, Search capability, AI orchestration, media processing, notifications, and integration adapters are independently buildable only where approved topology permits. Sharing a repository never requires lockstep deployment; sharing a database never permits uncoordinated schema ownership.

Artifacts are environment-neutral. Runtime configuration and secret references are injected at deployment.

## Database and contract ordering

- Migrations use expand, migrate/backfill, switch, and contract stages.
- The oldest concurrently running compatible application determines when contraction is safe.
- Event and API consumers tolerate additive fields and versioned transitions.
- Destructive migrations, large backfills, and index builds are resumable, observed, and separately approved.
- Deployment rollback never assumes a committed data migration can be reversed.

## Progressive exposure and rollback

Stateless runtimes use rolling or canary exposure with automated halt on error, latency, saturation, security, or journey regression. Workers constrain concurrency and message-version compatibility. Flags can decouple exposure but cannot conceal an unsafe artifact.

Rollback criteria and the last known-good artifact are established before production. If data or external effects crossed a commit boundary, forward repair and reconciliation replace blind rollback.

## Environment and supply-chain controls

- Environments use separate trust roles, provider accounts, data, networks, and secrets.
- Deploy identities are least privilege, short lived, and environment scoped.
- Protected workflows and production environment approvals restrict mutation.
- Dependencies, actions, container bases, and tools are pinned and scanned.
- Provenance, signatures, SBOM, deployment record, and Audit correlation are retained.
- Preview environments expire automatically and cannot receive production personal data.

## Failure behavior

A failed gate cannot be bypassed without a documented, owned, expiring exception. A failed production health check stops progression; it does not automatically issue destructive database actions. CI unavailability preserves existing production and supports a documented emergency path with equivalent evidence.

## Consequences

- Releases are reproducible, attributable, and recoverable.
- Provider choice remains open while the control and evidence model is fixed.
- Progressive delivery and migration compatibility add pipeline work.
- Detailed release trains and delivery sequencing remain in the Delivery Roadmap phase.

## References

- [Data Ownership, Storage, and Migration](11-data-ownership-storage-and-migration.md)
- [Resilience Architecture](26-error-degraded-mode-and-resilience-architecture.md)
- [Architectural Quality Gates](32-testing-interfaces-and-architectural-quality-gates.md)
- [Dependency, Configuration, and Environment Management](33-dependency-configuration-and-environment-management.md)
- [ADR-0037](../adrs/ADR-0037-build-once-immutable-progressive-delivery.md)
