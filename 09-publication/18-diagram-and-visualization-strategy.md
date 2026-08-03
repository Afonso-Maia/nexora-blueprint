# Diagram and Visualization Strategy

**Status:** Approved

## Decision

Use diagrams only when relationships, sequence, hierarchy, ownership, or state are materially clearer than prose or a table. Prefer text-authored, version-controlled Mermaid for compatible diagrams and generated SVG for validated structured-data views. Store editable source beside or clearly linked from its owning document.

Every consequential diagram has a title, purpose, accessible textual equivalent, source references, and theme-safe semantic styling. Interaction may enhance but cannot be required to understand the content. Raster images are reserved for screenshots or artwork that cannot be expressed accessibly as structured graphics.

Generated diagrams are non-authoritative projections. Their nodes and edges must originate in approved ledgers or explicit diagram source, and they link back to canonical records.

## Validation

Test keyboard access where interactive, screen-reader alternatives, zoom, reflow, contrast in both themes, print, reduced motion, source-data agreement, labels without color dependence, and readable failure fallback.

## References

- [Dependency Graph and Critical Path](../08-roadmap/25-dependency-graph-and-critical-path.md)
- [Assets](../assets/README.md)
