# ADR-0028: Managed Model Orchestration with Governed Tools

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora needs optional AI across discovery, evaluation, PC Builder, and Support while preserving deterministic fast paths, source truth, authorization, privacy, provenance, and provider portability.

Viable approaches included:

1. Nexora-owned orchestration using managed model providers and governed tools
2. Self-hosted foundation models
3. Provider-managed agents owning memory, retrieval, and tools

## Decision

Use an independently deployed Nexora AI Orchestration runtime with managed models behind provider adapters.

Nexora owns Conversations, context manifests, prompts, tool contracts, delegated identity, confirmation, citations, retention, safety, and evaluation. Provider state remains private adapter metadata.

AI retrieves authoritative facts only through source-authorized tools. It cannot access databases or raw engine APIs.

Consequential AI output is a typed proposal. The host requires explicit human confirmation and invokes the ordinary source command. AI cannot confirm itself or gain autonomous consequential authority initially.

No implicit cross-conversation memory is approved. Managed-provider training on Nexora data is disabled by default.

## Consequences

### Benefits

- AI remains optional, grounded, attributable, and portable.
- Source domains retain authority.
- Tools and data exposure are least privilege.
- Provider failure does not block deterministic journeys.

### Costs and risks

- Orchestration and evaluation require ongoing engineering.
- Managed providers create privacy, availability, and cost dependencies.
- Prompt injection requires layered mitigation.

## Governance

- Provider and model routes are pinned and evaluated.
- Prompt-only business rules are prohibited.
- Tool additions require source ownership, authorization, schema, confirmation, and test review.
- Autonomous consequential execution requires a later explicit Blueprint decision.
- A material change to provider custody, AI authority, memory, tool confirmation, or grounding requires a superseding ADR.

## References

- [AI Orchestration, Grounding, Provenance, and Safety](../06-engineering/22-ai-orchestration-grounding-provenance-and-safety.md)
- [ADR-0010: Runtime Topology](ADR-0010-trust-segmented-runtime-topology.md)
- [ADR-0019: Source-Enforced Authorization](ADR-0019-source-enforced-hybrid-authorization.md)

