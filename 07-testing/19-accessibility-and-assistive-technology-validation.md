# Accessibility and Assistive-Technology Validation

**Status:** Approved

## Decision

WCAG 2.2 AA is a blocking baseline proven through semantic automation, component contracts, manual interaction review, assistive-technology testing, disabled-user journeys, and production monitoring. Automation alone is insufficient.

## Automated coverage

Applicable changes check:

- roles, names, relationships, landmarks, headings, labels, errors, and live regions;
- keyboard reachability and obvious focus traps;
- contrast, target size, language, document title, and selected parsing rules;
- component state matrices and page-template smoke scans; and
- regressions in supported browsers at stable deterministic states.

Automated results are triaged; false positives require rule-level justification rather than blanket suppression.

## Manual interaction matrix

Critical components, states, templates, and journeys cover:

- keyboard-only and visible focus;
- 200% zoom and 400% reflow where applicable;
- text spacing and content enlargement;
- forced colors/high contrast;
- reduced motion;
- touch and alternative pointer;
- screen-reader reading, navigation, forms, errors, dynamic updates, dialogs, tables, grids, and recovery; and
- interruption, timeout extension, persistence, restoration, and authentication.

## Assistive-technology baseline

The controlled support matrix includes:

- one current desktop screen reader/browser pairing representative of Windows users;
- one current desktop screen reader/browser pairing representative of macOS users;
- one current mobile screen reader/browser pairing on iOS;
- one current mobile screen reader/browser pairing on Android;
- keyboard, zoom/reflow, forced colors, reduced motion, switch-compatible semantics, and voice-input naming checks.

Exact supported versions and pairings are maintained in a versioned register based on Brazilian usage, platform support, risk, and observed defects. Not every pairing runs on every change.

## Journey emphasis

Disabled-user evidence covers Search/Product evaluation, Comparison, PC Builder, Cart/Checkout/payment, authentication/recovery, Account/Order, Support Case, system recovery, Admin Queue, and Admin Resource Workspace according to risk.

Third-party identity, payment, editor, chart, media, and provider controls must provide equivalent completion or an approved accessible alternative.

## Defect authority

An inaccessible critical task is Blocker or High according to consequence and blocks supported release. An exception cannot use “works with a mouse” or an unsupported alternate channel as equivalence.

## Rejected alternative

Automated WCAG scans and periodic audits alone are rejected because they cannot prove focus, comprehension, dynamic state, assistive-technology operation, or end-to-end task completion.

## References

- [Accessibility Foundations](../04-design-system/10-accessibility-foundations.md)
- [Accessibility Engineering](../06-engineering/28-accessibility-engineering.md)
- [Component Testing](08-component-and-design-system-testing.md)
