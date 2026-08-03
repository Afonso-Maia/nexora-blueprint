# Code, Schema, and Technical-Content Rendering

**Status:** Approved

## Decision

Render code, commands, configuration, schemas, contracts, and structured examples with semantic labels, declared language, optional filename, and copy controls that do not obstruct selection. Preserve source text exactly and wrap only where meaning is not changed; otherwise provide accessible horizontal scrolling.

Syntax color is supplementary. Light and dark themes retain token contrast, focus, selection, and error semantics. Line numbers are opt-in for referenced excerpts and are not copied by default. Tabs may group equivalent examples only when all labels are announced and content remains reachable without pointer interaction.

Examples are illustrative unless explicitly identified as an approved contract. Generated API or schema reference must link to its canonical source and build identity. Executable embeds and arbitrary remote snippets are prohibited.

## Validation

Test copy fidelity, keyboard access, screen-reader reading order, long lines, zoom, reflow, print, theme contrast, missing highlighter fallback, and representative Markdown, JSON, YAML, TypeScript, SQL, HTTP, and terminal content.

## References

- [Engineering Architecture](../06-engineering/README.md)
- [Markdown, MDX, and Component Governance](33-markdown-mdx-and-component-governance.md)
