# Accessibility and Assistive-Technology Conformance

**Status:** Approved

## Decision

Treat WCAG 2.2 AA as a blocking publication baseline proven by layered evidence. Use semantic HTML first, progressively enhanced components, complete keyboard operation, visible focus, correct names and relationships, reflow, contrast, text alternatives, reduced motion, and understandable recovery.

Automation runs on representative routes and reusable components. Manual review covers keyboard, 200% and 400% zoom, reflow, high contrast or forced colors where supported, and screen readers on the approved browser/AT matrix. Disabled-user review is required for major navigation, search, visualization, or interaction changes before public launch.

Accessibility exceptions cannot be silently waived. They require impact, workaround, owner, remediation date, exposure decision, and independent accessibility approval.

## Validation

Blocking evidence covers the landing page, every document template, navigation modes, search and filters, status presentation, tables, diagrams, code, errors, both themes, and representative Portuguese technical content.

## References

- [ADR-0007](../adrs/ADR-0007-accessibility-conformance-foundation.md)
- [Accessibility and Assistive-Technology Validation](../07-testing/19-accessibility-and-assistive-technology-validation.md)
