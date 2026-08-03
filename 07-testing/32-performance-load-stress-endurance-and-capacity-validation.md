# Performance, Load, Stress, Endurance, and Capacity Validation

**Status:** Approved

## Decision

Performance evidence is budget-led, percentile-based, risk-segmented, and tied to versioned workload and capacity assumptions. Average latency and isolated peak requests are insufficient.

The program measures browser experience, BFF/source latency, database/queue/provider work, asynchronous completion, bundle/media cost, and resource saturation across:

- single-operation baseline and regression;
- representative steady load;
- burst and flash demand;
- stress beyond capacity to verify bounded shedding;
- endurance for leaks, backlog, connection, cache, and cost drift;
- volume/cardinality and hot-key/data-skew cases; and
- failover, dependency degradation, recovery, and autoscaling delay.

Models record customer/workforce mix, query distribution, catalog/order history, concurrency, payloads, cache state, provider latency, background work, growth, and uncertainty. Synthetic data represents Brazil-serving usage without production personal data.

Gates enforce approved experience and operation budgets and demonstrate ten-times observed-peak headroom once observed evidence exists. Before launch, controlled forecast assumptions and calibration are recorded. Critical-path protection and truthful degradation are mandatory even when optional budgets fail.

Results bind artifact, configuration class, environment, dataset, load generator, time, percentiles, errors, saturation, cost signals, and trace exemplars.

## References

- [Performance Budgets](../06-engineering/30-performance-budgets-and-capacity-assumptions.md)
- [Resilience Testing](30-error-degraded-mode-and-resilience-testing.md)
