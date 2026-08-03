# CI/CD and Deployment Architecture

**Status:** Approved

## Decision

Use build-once immutable publication artifacts promoted from reviewed commit to production. Pull requests run source validation, generation, build, rendered checks, security checks, and a preview. Production deployment consumes the exact approved artifact rather than rebuilding mutable dependencies.

Deploy through short-lived workload identity with least privilege. Separate preview and production configuration, prevent untrusted contributions from accessing deployment credentials, retain build provenance, and support immediate rollback to a previously approved artifact.

The hosting provider and exact workflow platform remain controlled selections. Provider choice must support durable routes, redirects, headers, preview isolation, atomic promotion, rollback, logs, export, and a credible exit path.

## Validation

Require protected approval, immutable artifact digest, provenance, environment validation, post-deploy smoke checks, route/link sampling, rollback rehearsal, and no secret exposure in generated files or previews.

## References

- [ADR-0037](../adrs/ADR-0037-build-once-immutable-progressive-delivery.md)
- [Engineering CI/CD](../06-engineering/34-ci-cd-and-deployment-architecture.md)
