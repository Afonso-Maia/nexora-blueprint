# Markdown, MDX, and Component Governance

**Status:** Approved

## Decision

Keep CommonMark-compatible Markdown as the default authoritative format. Use framework-supported extensions only when they preserve repository readability and have deterministic accessible output. MDX is allowed only for approved publication components that cannot be expressed adequately in Markdown.

Maintain a small allowlisted component library for status, source notice, controlled-value notice, tabs, disclosure, diagram, coverage view, and structured technical examples. Components accept references or presentation data; they cannot contain independent product decisions.

Raw HTML, inline scripts, arbitrary imports, remote embeds, runtime content fetches, and document-local styling are prohibited by default. Exceptions require security, accessibility, portability, and maintenance review.

## Validation

Lint syntax, imports, allowed props, heading structure, raw HTML, external embeds, accessible output, scripting fallback, theme parity, and repository-readable source. Component changes run every reference composition.

## References

- [Contributing](../CONTRIBUTING.md)
- [Code, Schema, and Technical-Content Rendering](22-code-schema-and-technical-content-rendering.md)
