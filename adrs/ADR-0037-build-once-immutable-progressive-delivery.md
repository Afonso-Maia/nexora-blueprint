# ADR-0037: Build-Once Immutable Progressive Delivery

**Status:** Accepted  
**Date:** 2026-08-03

## Context

Nexora must deliver multiple runtime roles safely without environment-specific rebuilds, credential sprawl, or unsafe rollback across migrations and external effects.

## Decision

Use GitHub Actions initially, build signed immutable artifacts once, and promote them through controlled environments. Authenticate deployment through short-lived OIDC workload identity. Use compatible migrations, progressive production exposure, explicit health evidence, and outcome-aware rollback or forward repair.

## Alternatives

Building separately per environment is simple but makes equivalence unverifiable. Direct full-fleet deployment is faster in the happy path but expands failure impact and weakens evidence.

## Consequences

- Artifact identity and provenance follow every promotion.
- Deployment credentials need not be stored in CI.
- Applications and schemas must preserve compatibility during rollout.
- Cloud provider and detailed release sequencing remain deferred.

## References

- [CI/CD and Deployment Architecture](../06-engineering/34-ci-cd-and-deployment-architecture.md)
