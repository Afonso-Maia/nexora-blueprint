# Phase Navigation and Guided Journeys

**Status:** Approved

## Decision

Generate a phase landing route from each phase index, preserving roadmap order, status, scope, approved decisions, inputs, outputs, and handoff. Provide optional guided journeys for:

- Blueprint overview;
- discovery to product structure;
- page to Design System, engineering, testing, and delivery;
- ADR to implementing documents;
- safe-purchase critical path; and
- publication architecture and readiness.

Journeys are ordered link manifests with audience, purpose, estimated reading scope, prerequisites, and completion outcome. They quote no authoritative paragraphs and may be regenerated when source relationships change.

Previous/next controls appear only inside an explicit journey or ordered phase list. Readers can exit to the canonical source hierarchy at every step.

## Validation

CI verifies that journey targets exist, remain canonical, expose status, and do not skip a required handoff identified by their manifest.

## References

- [Product Roadmap](../00-overview/roadmap.md)
- [Audiences and Reading Modes](03-audiences-and-reading-modes.md)
