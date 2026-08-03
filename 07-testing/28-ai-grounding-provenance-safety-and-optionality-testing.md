# AI Grounding, Provenance, Safety, and Optionality Testing

**Status:** Approved

## Decision

AI uses versioned evaluation sets and layered deterministic checks for tool authorization, grounding, provenance, privacy, safety, and optionality. Model output is probabilistic evidence and never source authority.

## Evaluation record

Each run binds model/provider route, prompt and policy versions, tool schemas, context manifest, source fixture revisions, locale, sampling settings, evaluator version, result, citations, latency, cost, and safety findings.

## Required suites

- Grounded product, Compatibility, price, inventory, order, and Support questions with source citations
- Unsupported, stale, conflicting, missing, restricted, and adversarial source data
- Prompt injection in catalog, reviews, web/provider content, messages, evidence, and tool results
- Tool allowlist, delegated identity, scope, field minimization, argument validation, rate limit, and confirmation
- No prompt-only business rule, hidden hard Compatibility override, invented availability, or autonomous consequential effect
- Refusal, uncertainty, correction, provenance display, and safe deterministic continuation
- Conversation retention, deletion, redaction, cross-user isolation, provider data controls, and log safety
- Portuguese quality, accessibility of streaming/status/citations, and content extremes
- Provider/model timeout, malformed output, route change, fallback, AI disabled, and complete non-AI journeys

Deterministic policy and tool-contract gates block before model scoring. Statistical thresholds use representative stratified sets, confidence intervals where useful, regression comparison, and human review for material semantic changes.

Production feedback may discover risks but cannot use private customer conversations as an ungoverned benchmark.

## Rejected alternative

Subjective spot checks and a single aggregate “accuracy” score are rejected. They conceal authority, citation, privacy, subgroup, safety, and optionality failures.

## References

- [AI Architecture](../06-engineering/22-ai-orchestration-grounding-provenance-and-safety.md)
- [ADR-0028](../adrs/ADR-0028-managed-model-orchestration-with-governed-tools.md)
