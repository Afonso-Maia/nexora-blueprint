# Observability and Operational-Diagnostics Validation

**Status:** Approved

## Decision

Telemetry is tested as a versioned operational contract. Evidence proves correlation, semantic outcome, redaction, sampling, alertability, and diagnostic use—not merely signal emission.

Tests cover HTTP and BFF calls, module commands, database transactions, queues, workflows, providers, browser journeys, and reconciliation. They assert stable service/operation names, trace propagation, source outcome, operation/message/revision references, duration, error classification, and controlled cardinality.

Privacy tests inject canary secrets and classified synthetic fields and verify absence from logs, traces, metrics, analytics, screenshots, alerts, and support exports. Collector outage and backpressure cannot break routine product behavior; governing Audit/monitoring durability can block only where approved.

For each critical failure mode, an alert test proves signal, threshold/window, deduplication, routing, actionable context, runbook link, and recovery resolution. Dashboards distinguish traffic, errors, saturation, freshness, queue age, stuck workflows, duplicates, compensation, reconciliation, and business outcomes without becoming source truth.

Game days require an operator unfamiliar with the change to diagnose and follow the runbook from available evidence. Missing or misleading diagnostics are quality defects.

## References

- [Observability Architecture](../06-engineering/31-observability-and-operational-diagnostics.md)
- [ADR-0035](../adrs/ADR-0035-opentelemetry-observability-standard.md)
