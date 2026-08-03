# Browser, Device, Viewport, Input, and Network Coverage

**Status:** Approved

## Decision

Nexora uses a versioned capability-based coverage register with three tiers, informed by Brazilian usage, accessibility needs, platform support, product risk, and defect evidence.

- **Tier 1:** fully supported; critical automation, manual accessibility, and release blocking
- **Tier 2:** supported; representative automation and scheduled manual coverage
- **Tier 3:** best effort or explicitly unsupported; safe messaging and no false claim

The register names browser engine/version policy, operating system, desktop/mobile class, viewport/template class, touch/pointer/keyboard, screen reader and other assistive modes, zoom/reflow, forced colors, reduced motion, connection quality, latency/loss/offline, memory/CPU class, and ownership.

Every change does not run every combination. Pairwise and risk-based selection covers shared components/templates continuously; critical journeys run representative Tier 1 combinations; scheduled matrices and telemetry detect broader regressions.

Coverage emphasizes semantic capability over device model lists. Exact device/browser versions are controlled implementation values updated without redefining approved responsive or accessibility behavior.

Unsupported capability detection must preserve content and safe recovery; browser sniffing cannot silently remove a consequential path.

## References

- [Frontend Architecture](../06-engineering/05-frontend-architecture.md)
- [Accessibility Validation](19-accessibility-and-assistive-technology-validation.md)
