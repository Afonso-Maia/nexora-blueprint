# Accessibility and Brazilian Localization Integration

**Status:** Approved

## Decision

Treat WCAG 2.2 AA and pt-BR as increment entry, implementation, and exit contracts from I0, not launch-hardening work.

I0 provides semantic primitives, keyboard/focus behavior, typed messages, ICU formatting, theme and contrast checks, automated accessibility gates, manual assistive-technology harnesses, and content ownership. Each increment adds page/template-specific automated, manual, AT, responsive, zoom, input, and localized-value evidence.

Third-party identity, payment, media, support, Search, and AI experiences require equivalent accessible continuations or an approved blocking remediation plan before exposure.

Brazilian currency, numbers, dates, addresses, identity fields, installment representations, delivery values, and legal text remain structured and source-owned. Localization does not invent policy.

## Authority

Feature owners remediate defects. Accessibility authority may block exposure; qualified content and policy owners approve consequential language. Q0 accessibility gaps cannot be conditionally eligible.

## References

- [Accessibility Engineering](../06-engineering/28-accessibility-engineering.md)
- [Localization Architecture](../06-engineering/29-localization-and-brazilian-commerce-formatting.md)
