# Performance Budgets and Resilience

**Status:** Approved

## Decision

Use static HTML and CSS as the resilient baseline, adding client JavaScript only for search, navigation enhancement, theme preference, filters, and justified diagrams. Core source content, status, links, and local navigation remain usable when optional scripts fail.

Set measured budgets before public launch for document HTML, critical CSS, route JavaScript, fonts, images, diagrams, search index partitions, largest-content rendering, layout stability, and interaction latency. Exact thresholds are controlled selections derived from representative long documents and constrained mobile conditions.

Partition or defer large search and visualization assets. Self-host or eliminate fonts when privacy, resilience, or performance evidence favors it. Cache immutable assets by digest and HTML with controlled revalidation.

## Validation

Test representative percentiles and worst credible documents on constrained mobile CPU/network, warm and cold cache, script failure, search failure, font failure, missing image, both themes, and deployment rollback. Budget regressions block publication unless an owned exception is approved.

## References

- [Engineering Performance Budgets](../06-engineering/30-performance-budgets-and-capacity-assumptions.md)
- [Performance Validation](../07-testing/32-performance-load-stress-endurance-and-capacity-validation.md)
