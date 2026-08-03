# Synthetic Monitoring and Safe Production Validation

**Status:** Approved

## Decision

Production validation is bounded, attributable, non-destructive by default, and paired with progressive delivery telemetry. It supplements pre-production evidence and never shifts unsafe testing onto customers.

Public synthetics cover availability, Search entry, Product read, legal/support content, authentication entry, and safe recovery. Authenticated synthetics use isolated test tenants/accounts and clearly marked synthetic objects. Consequential flows stop before commitment unless a separately approved provider test mode and automatic reconciliation prove zero customer/financial impact.

Checks assert semantic content, source freshness, operation status, accessibility smoke, certificate/security policy, latency, trace correlation, and correct degraded state. They avoid brittle presentation text where stable semantics exist.

Canaries and progressive exposure define baseline, cohort, error/latency/saturation/security/journey thresholds, halt, rollback or forward repair, owner, and observation window before exposure. Synthetic failure does not automatically execute destructive recovery.

Production probes use rate limits, geographic/network controls, robots/search safeguards, data classification, cleanup, alert labeling, and cost controls. Results are excluded from customer analytics and workforce queues where appropriate.

## References

- [CI/CD Architecture](../06-engineering/34-ci-cd-and-deployment-architecture.md)
- [Observability Validation](33-observability-and-operational-diagnostics-validation.md)
