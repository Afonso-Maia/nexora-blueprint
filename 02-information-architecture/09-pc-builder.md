# PC Builder Architecture

**Status:** Approved

**Model:** Engineering Workspace.

Guided and Expert initialization modes lead to the same non-linear workspace: Component List, Compatibility Panel, Budget Panel, Performance Panel, and AI Copilot.

The shared compatibility model evaluates sockets, memory generations, power requirements, physical clearance, cooling, and form factors. Hard incompatibilities are blocked with explanations; warnings may be overridden. Changes recalculate relevant constraints immediately. AI acts as an engineering assistant.

Lifecycle: `Create → Save → Resume → Duplicate → Share → Purchase → Upgrade later`

A build converts directly into a cart. Validation remains active through checkout, which displays a build summary.

## Governance

1. The Builder is never a wizard after initialization.
2. Every compatibility decision must be explainable.
3. Users may override warnings, but not hard incompatibilities.
4. A build is a persistent object, not a temporary session.

