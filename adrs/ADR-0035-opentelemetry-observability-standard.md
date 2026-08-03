# ADR-0035: OpenTelemetry Observability Standard

**Status:** Accepted  
**Date:** 2026-08-03

## Context

Nexora needs correlated diagnostics across HTTP, modules, workers, queues, and external adapters without coupling its architecture to one monitoring vendor.

## Decision

Use OpenTelemetry conventions and W3C trace context as the instrumentation and propagation standard. Export through managed collectors to a replaceable backend. Maintain structured logs, bounded metrics, distributed traces, redaction, and source-owned outcome definitions.

Telemetry supports diagnosis; it is not authoritative business or Audit state.

## Alternatives

Vendor-native instrumentation accelerates first integration but embeds provider-specific APIs. Logs alone are initially simple but weak for causal tracing, aggregation, and asynchronous continuity.

## Consequences

- All runtimes share one signal contract.
- Backend selection remains reversible.
- Collector reliability, schema governance, sampling, and cost controls are required.
- Sensitive and high-cardinality fields are rejected before export.

## References

- [Observability and Operational Diagnostics](../06-engineering/31-observability-and-operational-diagnostics.md)
