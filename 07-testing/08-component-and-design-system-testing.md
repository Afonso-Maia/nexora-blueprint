# Component and Design System Testing

**Status:** Approved

## Decision

Components are tested as semantic, behavioral, accessible, localized, responsive, and state-aware contracts through public properties and user-observable effects.

Isolation proves the asset contract; approved reference compositions prove interaction among components. Test-only selectors are limited to ambiguous composite-flow correlation and never replace roles, names, labels, states, or text.

## Contract matrix

Each applicable asset covers:

- anatomy, roles, names, relationships, properties, and prohibited combinations;
- keyboard, pointer, touch, focus, dismissal, selection, interruption, and restoration;
- loading, empty, validation, stale, partial, offline, failed, pending, indeterminate, confirmed, and conflict states;
- light/dark, comfortable/compact, supported viewport classes, zoom, reflow, forced color, and reduced motion;
- default, long, missing, invalid, and dynamic Portuguese content;
- anonymous, guest, customer, restricted, workforce, and provider contexts;
- permission-aware presentation without treating visibility as authorization; and
- events and effects without asserting private component state.

Pairwise reduction is allowed for low-risk combinations. Every critical interaction and known combination remains explicit.

## Reference compositions

The minimum compositions remain Customer Hub, Search Results, Product Detail, Comparison, Checkout, Support, Authentication Recovery, Admin Queue, and Admin Resource Workspace. They use representative source states rather than decorative Storybook-only data.

## Accessibility

Automated semantic rules run on all applicable states. Manual keyboard and focused assistive-technology evidence is required for shared primitives, complex composites, critical states, and releases that change semantics.

Third-party controls must pass the Nexora wrapper contract, including payment, identity, editor, chart, media, and provider UI.

## Change handling

Tests are versioned with the component contract. Consumer-impact analysis covers semantic, behavioral, accessibility, state, content, layout, and theme changes even when appearance is described as minor.

## Rejected alternative

Implementation snapshots and shallow rendering are rejected as primary evidence because they reward internal stability while missing user semantics and effects.

## References

- [Component Lifecycle and Quality](../04-design-system/24-component-lifecycle-and-quality.md)
- [System-State Components](../04-design-system/22-system-state-components.md)
- [Design System Implementation](../06-engineering/06-design-system-implementation-architecture.md)
