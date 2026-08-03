# Performance Budgets and Capacity Assumptions

**Status:** Approved

## Decision

Nexora treats performance as a versioned product contract. Each experience and consequential operation has a measurable budget, an owner, a representative test profile, and an exception expiry. Budgets are enforced in pull requests, pre-production tests, and production telemetry.

The initial posture favors efficient server rendering, bounded client JavaScript, cacheable public reads, and asynchronous non-critical work. Capacity is proven with repeatable workload models and ten-times observed peak headroom before architectural extraction is considered.

## Measurement model

- Browser experience uses real-user p75 by device class and synthetic tests for regression.
- APIs use p50, p95, and p99 latency plus error and saturation rates.
- Workers use queue age, completion latency, retry rate, and poison-message count.
- Consequential flows measure end-to-end user outcome, not only individual hops.
- Cold starts, cache misses, degraded dependencies, and low-end mobile devices are explicit profiles.
- Brazil is the primary network and geographic measurement context.

## Initial experience budgets

| Contract | Initial budget |
| --- | --- |
| Largest Contentful Paint | p75 at or below 2.5 s |
| Interaction to Next Paint | p75 at or below 200 ms |
| Cumulative Layout Shift | p75 at or below 0.10 |
| Initial route JavaScript, public experience | at or below 200 KiB compressed, excluding explicitly lazy features |
| Initial route JavaScript, Admin | at or below 300 KiB compressed |
| Critical CSS | at or below 50 KiB compressed |
| Product-grid image | responsive source, correct intrinsic size, lazy outside the initial viewport |
| Route transition feedback | visible within 100 ms |

Budgets apply separately to mobile and desktop. Accessibility code, security controls, and required consent behavior are not removed to meet a budget; the implementation must become more efficient.

## Initial service budgets

| Operation class | Server p95 objective | Notes |
| --- | ---: | --- |
| Cached public document/read | 150 ms | Origin time; excludes network |
| Authoritative product/account read | 300 ms | BFF response under normal dependencies |
| Search query | 500 ms | Includes governed filtering and ranking |
| Ordinary validated command | 800 ms | Returns committed outcome or durable operation |
| Cart mutation | 800 ms | Includes authoritative recalculation |
| Checkout step validation | 1.5 s | Provider-independent validation |
| Order submission acknowledgement | 3 s | Committed Order or explicit pending operation |
| Admin queue read | 700 ms | Permission-filtered and paginated |

Provider-dependent operations publish separate timeout and pending-state contracts. Averages cannot demonstrate compliance.

## Workload and capacity model

The capacity register records, per release:

- observed peak requests, sessions, search queries, commands, and event throughput;
- catalog, customer, Cart, Order, Case, Build, and Audit cardinality;
- hot-key and promotion-event scenarios;
- payload distributions and database growth;
- external-provider quotas and safe concurrency;
- tested sustainable rate, burst rate, recovery time, and limiting resource.

Before production history exists, the launch model is derived from product scenarios and labeled as an assumption. Each critical path must sustain the forecast peak plus ten-times headroom for a bounded test interval without violating correctness or p95 budgets. This multiplier is a readiness margin, not a promise to overprovision every dependency.

## Admission and overload control

- Bound concurrency at ingress, workers, and provider adapters.
- Prioritize Checkout, Order, authentication, and source-authoritative recovery over enrichment.
- Shed optional AI, recommendations, analytics, and bulk work first.
- Use bounded pagination, query-cost limits, upload limits, and export jobs.
- Return semantic retry guidance; never allow unbounded internal queues.
- Preserve idempotency and reconciliation when timeouts cross a commit boundary.

## Budget governance

Budget changes require measured evidence, affected-owner approval, and an expiry when temporary. CI blocks material bundle regression and contract tests block service-budget regression. Production objectives become service-level indicators; operational objectives and paging policies are set during delivery planning.

Extraction or infrastructure scaling is justified by sustained evidence of an independently scaling profile, not one load-test anomaly. Optimization must preserve the approved source-of-truth and transaction boundaries.

## Consequences

- Performance is testable before implementation is declared complete.
- Small-team operation gets clear limits without speculative service decomposition.
- Initial numbers require calibration from production evidence.
- Representative datasets and Brazilian network profiles become maintained engineering assets.

## References

- [Rendering and Navigation Strategy](07-rendering-and-navigation-strategy.md)
- [Caching, Offline Behavior, and State Restoration](25-caching-offline-and-state-restoration.md)
- [Error, Degraded-Mode, and Resilience Architecture](26-error-degraded-mode-and-resilience-architecture.md)
- [Accessibility Engineering](28-accessibility-engineering.md)
