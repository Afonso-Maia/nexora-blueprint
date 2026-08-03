# Dependency Graph and Critical-Path Analysis

**Status:** Approved

## Decision

Maintain a typed dependency graph linked to increments and gates. A dependency is satisfied only by named evidence, not status assertion.

Types are authority/data, contract, environment, provider/procurement, specialist, operational, workforce, policy, and quality evidence. Each edge records provider, consumer, needed-by gate, lead time/range, fallback, owner, and satisfaction evidence.

The initial critical path is:

`I0 delivery controls → Catalog/data → I1 Search/discovery → I2 Compatibility and commercial facts → I3 payment/Checkout/Order → I4 post-purchase → I5 support readiness → I9 launch readiness`

Identity/security, Design System/accessibility, environments/CI, observability/recovery, test evidence, provider onboarding, and staffing are cross-cutting gates on the relevant nodes. I6 PC Builder and I7 AI are branches; I8 Admin capability slices attach to every source node.

## Control

Review the critical path weekly while committed work is active. A late dependency triggers fallback, resequencing, scope/exposure reduction, or horizon demotion. It never silently removes authoritative behavior or evidence.

## References

- [Delivery Increments](04-delivery-increments-and-vertical-slices.md)
- [Roadmap Registers](03-assumptions-constraints-and-controlled-registers.md)
