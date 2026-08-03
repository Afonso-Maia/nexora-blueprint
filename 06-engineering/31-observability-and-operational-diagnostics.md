# Observability and Operational Diagnostics

**Status:** Approved

## Decision

Nexora standardizes telemetry on OpenTelemetry and keeps the telemetry backend replaceable. Applications, domain modules, workers, and adapters emit correlated traces, metrics, and structured logs through a governed instrumentation package. Business outcomes remain source-owned records; telemetry diagnoses them and never becomes lifecycle truth.

Every consequential operation carries a generated correlation ID, operation ID, privacy-safe actor reference, source module, contract version, and trace context. Customer-visible references are safe to disclose and resolve to restricted internal diagnostics.

## Signal contracts

### Traces

- Trace BFF requests through module calls, database work, queues, workflows, and provider adapters.
- Preserve W3C trace context across HTTP and messages.
- Annotate retries, cache state, idempotency disposition, policy decision ID, and consistency state.
- Never attach secrets, credentials, raw payment data, message bodies, or unnecessary personal data.

### Metrics

Each runtime exposes request rate, errors, duration, saturation, dependency health, queue age, retry, and reconciliation results. Domain owners define low-cardinality outcome metrics for Checkout, Order creation, payment, fulfillment, Support obligations, Search quality, and Compatibility evaluation.

Customer IDs, Order IDs, queries, identifier-bearing URLs, and exception messages are prohibited metric labels.

### Logs

Logs are structured events with timestamp, severity, runtime, environment, deployment, trace and correlation identifiers, event name, outcome, and classified fields. Free-form messages are supplemental. Redaction occurs before export, and logging failure cannot expose or alter a source transaction.

## Consequential-operation diagnostics

Every consequential operation documents:

1. success, rejection, pending, duplicate, partial, and failure outcomes;
2. signals that distinguish those outcomes;
3. a safe customer or workforce reference;
4. the responsible source owner and runbook;
5. reconciliation evidence for ambiguous commits;
6. degraded-mode expectations and alert route.

Health endpoints separate process liveness, readiness, and dependency diagnostics. Readiness reflects only dependencies required to safely accept that workload; optional dependency failure produces explicit degradation rather than global removal.

## Dashboards, alerts, and runbooks

- Runtime dashboards cover traffic, errors, latency, saturation, and dependencies.
- Journey dashboards cover Search, evaluation, Cart, Checkout, Order, Account, Support, PC Builder, AI, and Admin outcomes.
- Alerts represent actionable customer or integrity risk and link to an owned runbook.
- Multi-window burn-rate alerts are preferred after production objectives exist.
- Deployments, migrations, policies, rulesets, flags, and provider incidents annotate timelines.
- Safe synthetic journeys cover discovery, authentication, Checkout preflight, Order lookup, and workforce access.

## Retention, access, and sampling

Telemetry classes have documented retention, sampling, residency, and access. Access is least privilege and audited. Priority sampling retains failures, slow traces, and consequential operations while bounding routine volume. Audit retention is governed separately.

The local stack can export to a developer-visible collector without the production vendor. Contract tests verify required attributes and redaction. Pre-production rehearsals validate dashboards, alerts, propagation, and runbooks.

## Governance

The platform owner maintains conventions, collectors, schemas, redaction, and cost controls. Domain owners maintain outcome definitions, dashboards, and runbooks. Telemetry schemas are versioned; vendor-specific queries cannot be the sole definition of a critical diagnostic.

## Consequences

- Outcomes can be followed across the core and selective independent capabilities.
- The telemetry backend remains replaceable.
- Correlation, instrumentation, redaction, and cost control become quality gates.

## References

- [Asynchronous Execution](24-events-queues-workflows-idempotency-and-reconciliation.md)
- [Resilience Architecture](26-error-degraded-mode-and-resilience-architecture.md)
- [Security, Privacy, Secrets, and Audit](27-security-privacy-secrets-and-audit.md)
- [Performance Budgets](30-performance-budgets-and-capacity-assumptions.md)
- [ADR-0035](../adrs/ADR-0035-opentelemetry-observability-standard.md)
