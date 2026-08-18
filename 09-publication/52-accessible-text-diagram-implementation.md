# Accessible Text-Diagram Implementation

**Status:** Completed
**Date:** 2026-08-18

## Purpose

Record the bounded presentation and validation increment for the Blueprint's source-controlled text diagrams. It implements the approved diagram strategy without changing the authoritative Markdown or converting diagrams into image-only alternatives.

## Implementation

The Markdown pipeline identifies fenced `text` blocks and derives a concise label from the nearest preceding heading. Each diagram is rendered as a labelled group whose complete text remains selectable, copyable, searchable, zoomable, and available to assistive technology. The generated label is visually hidden on screen to avoid repeating the adjacent heading and becomes visible when printing.

This treatment applies to all five current text diagrams and is derived during publication; no broad frontmatter or source-content migration is required. Starlight's existing expressive-code frame remains intact, avoiding nested figure semantics.

## Blocking checks

Rendered validation inspects every `pre[data-language="text"]` and requires:

- a containing text-diagram group;
- an accessible name connected with `aria-labelledby`;
- a non-empty generated caption;
- the same caption identifier on the group and caption element; and
- compatibility with the publication-wide unique-ID check.

A missing or inconsistent relationship blocks the production build and artifact staging.

## Evidence

Source validation, Astro check, production build, rendered validation, security inspection, Vercel artifact staging, and whitespace validation pass for this increment. The build contains five mechanically labelled text diagrams across information architecture and engineering documents.

## Remaining evidence

Automated semantics do not prove that each diagram communicates effectively. Representative screen-reader reading order, keyboard access to locally scrollable code, 200% and 400% zoom, narrow-screen reflow, print preview, and human comprehension review remain part of the blocking manual accessibility gate.

## References

- [Diagram and Visualization Strategy](18-diagram-and-visualization-strategy.md)
- [Accessibility and Assistive-Technology Conformance](24-accessibility-and-assistive-technology-conformance.md)
- [Print, Export, and Offline-Reading Boundaries](30-print-export-and-offline-reading-boundaries.md)
- [Publication Readiness, Portfolio Journey, and Phase 7 Handoff](42-publication-readiness-portfolio-journey-and-handoff.md)
