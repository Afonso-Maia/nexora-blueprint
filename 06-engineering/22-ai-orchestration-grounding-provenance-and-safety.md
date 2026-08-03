# AI Orchestration, Grounding, Provenance, and Safety

**Status:** Approved

## Purpose

This document defines optional AI execution, model-provider boundaries, conversation persistence, grounding, tools, provenance, confirmation, safety, retention, evaluation, and degradation.

AI assists discovery, comparison, PC Builder, Support, and commerce explanation. It never becomes Product, Compatibility, price, stock, permission, eligibility, Order, Case, or operation truth.

## Decision

Use an independently deployed AI Orchestration runtime with managed model providers behind Nexora-owned adapters.

The runtime uses:

- A durable AI Conversation authority in the modular core
- A short-lived orchestration run for each response
- Retrieval and tool calls only through governed application contracts
- Source-filtered structured context before model invocation
- Typed tool schemas and least-authority delegated identity
- Explicit provenance for factual claims and tool output
- Human confirmation before consequential mutations
- Provider-independent model, prompt, safety, and evaluation contracts
- Data minimization, bounded retention, redaction, and no provider training by default
- Deterministic product paths that remain complete without AI

Do not deploy a self-hosted foundation model initially. Do not give a model direct database, Search index, provider, browser-session, or unrestricted API access.

## Viable approaches

### Managed models behind Nexora orchestration

Nexora owns context, tools, policies, provenance, persistence, and evaluation while a managed provider supplies inference. This is approved for a small team.

### Self-hosted models

Self-hosting offers greater runtime control but adds model operations, accelerator capacity, security patching, and evaluation burden. It requires later evidence and a superseding ADR.

### Provider-managed agents

A provider could own conversations, tools, memory, and retrieval. This is not approved because provider state would cross Nexora authority, privacy, and exit boundaries.

## Runtime boundary

The AI runtime owns orchestration execution only:

- Model routing
- Prompt assembly
- Tool planning and invocation
- Streaming
- Safety checks
- Citation assembly
- Run diagnostics

The AI Conversation module owns:

- Conversation identity and access
- Messages and attributed participants
- User-visible citations
- Guest or customer continuity
- Retention, deletion, and share state
- Approved context references

Provider thread, assistant, file, cache, or response identifiers are adapter metadata and cannot become durable Nexora identity.

## AI Run

Every run records:

- Run and Conversation identifiers
- Actual subject and delegated AI actor
- User task and surface
- Authorized context manifest
- Model route and provider adapter version
- Prompt and policy versions
- Tool grants and calls
- Source citations and revisions
- Safety decisions
- Token, latency, and cost metadata
- Completion, interruption, refusal, or failure outcome

Raw hidden reasoning is not stored or shown. Store concise operational rationale, tool evidence, and customer-visible explanation instead.

## Context manifest

Context is explicit and inspectable. A manifest contains:

- Source owner and object
- Authorized fields
- Source revision and freshness
- Purpose
- Retention eligibility
- Citation label
- Expiry

Context can come from Search, Catalog, Compatibility, Pricing, Inventory, Purchase, PC Builder, Support, or customer-approved continuity. Each source authorizes and minimizes its contribution.

The model cannot recover omitted fields through another tool, embeddings, logs, earlier conversation, or prompt injection.

## Grounding

Ground factual answers in authoritative structured sources.

- Product claims cite Catalog.
- Compatibility cites an Evaluation and Rule Set.
- Price and availability cite current source results with freshness.
- Order and payment status cite their owners.
- Support guidance cites published articles and Legal versions.
- Build advice cites the Build Revision and source results.

Search retrieval is discovery, not proof. The orchestrator opens and authorizes the source contract before presenting a consequential fact.

When evidence is absent, stale, conflicting, or unavailable, the answer says so. The model must not fill the gap from pretrained knowledge as Nexora truth.

## Retrieval

Use:

- Structured source queries for current facts
- Search for candidate discovery
- Approved published-content retrieval
- Optional vector retrieval only after the Search semantic gate

Chunking, embeddings, and vector stores are derived state with source, revision, field class, locale, model version, expiry, and deletion contracts.

Restricted, customer, workforce, Case, and Evidence content uses separate stores or filters and direct source reauthorization. Public and protected embeddings are not mixed casually.

## Tool contract

Every tool declares:

- Stable name and owner
- Typed input and output schema
- Read or mutation class
- Required capability and assurance
- Allowed actor and surface
- Resource scope
- Idempotency and timeout
- Side effects
- Confirmation requirement
- Safe errors and audit behavior

Tool input is runtime validated. Strings cannot silently become identifiers, prices, permissions, or commands.

Models never construct raw SQL, OpenSearch DSL, URLs, provider requests, or arbitrary HTTP calls.

## Read tools

Read tools are purpose-specific and return source-filtered representations. They:

- Reauthorize each call
- Apply field restrictions
- Bound result count and size
- Include source and freshness
- Resist prompt injection in retrieved content
- Avoid secrets and unrestricted internal diagnostics

Tool output is untrusted model input. Retrieved instructions cannot alter system policy, tool grants, confirmation, or destination.

## Consequential tools

AI cannot autonomously commit a consequential action in the initial architecture.

It may prepare a typed proposal for actions such as:

- Apply visible Search filters
- Add a user-selected candidate to Comparison
- Propose a PC Builder component
- Prepare a Cart change
- Draft a Support message

The host presents exact effect, source facts, constraints, total where relevant, and confirmation. The user then invokes the ordinary domain command under current identity, assurance, authorization, idempotency, and source validation.

AI cannot confirm its own proposal, acknowledge a Compatibility Warning, place an Order, send a message, approve a remedy, publish Admin content, grant permission, or bypass segregation.

## Delegated identity

Each tool call carries:

- Human or workload principal
- Delegated AI actor
- Conversation and Run
- Purpose
- Allowed tool and resource scope
- Expiry
- Confirmation state

Delegation is audience-bound, non-transferable, and narrower than the principal. The runtime never receives reusable browser session or broad provider tokens.

## Conversation persistence

Messages are immutable after submission except governed correction or deletion representation.

Store:

- User-visible content
- Attributed role
- Approved context references
- Tool result summaries
- Citations
- Run outcome
- Retention class

Do not store secrets, raw payment data, authentication factors, unrestricted provider payloads, or hidden reasoning.

Guest Conversations are bounded and session-associated. Claiming requires explicit authenticated ownership proof. Account navigation does not absorb Conversation authority.

## Memory

No implicit cross-conversation long-term memory is approved.

Within one Conversation, earlier messages are used only within token, retention, authorization, and current-source limits. Current source facts replace stale quoted facts visibly.

Future preference memory requires an explicit Customer-owned preference, inspection, correction, deletion, purpose, and consent contract.

## Prompt architecture

Prompts are versioned artifacts with:

- Purpose and surface
- Instruction hierarchy
- Tool catalog
- Context schema
- Required citations
- Safety and refusal policy
- Locale behavior
- Output schema
- Evaluation set
- Owner, review, activation, and rollback

Business rules do not live only in prompts. Deterministic policy stays in source code or governed domain data.

Prompt changes use review and evaluation before activation. Provider dashboard edits outside version control are prohibited.

## Model routing

A versioned route selects a model class based on:

- Task type
- Required modality
- Context sensitivity
- Structured-output reliability
- Latency and cost budget
- Locale quality
- Safety posture
- Provider availability

The exact provider and model identifier are deployment configuration pinned by environment. Silent provider alias upgrades are prohibited.

Fallback is allowed only to an evaluated compatible route. A weaker route cannot gain broader data or tools, omit citations, or change confirmation policy.

## Structured output

Use strict schemas for:

- Tool arguments
- Recommendations
- Citations
- Filter proposals
- Build proposals
- Safety classifications
- Customer-visible status metadata

Schema failure triggers bounded repair or a safe response. Parser coercion is narrow and observable.

Free-form prose is allowed for explanation but cannot carry executable authority.

## Streaming

Streaming is a presentation optimization.

- Persist the final accepted message, not every transient token.
- Tool results and citations are withheld until validated.
- Interrupted output remains visibly incomplete.
- Unsafe or invalid output can terminate the stream.
- Screen readers receive controlled batched updates.
- Cancellation stops provider work where possible and marks Run outcome.

Partial streamed text cannot be used as a confirmed domain decision.

## Provenance

Factual response segments reference citations containing:

- Source owner and customer-safe label
- Object reference
- Source revision or evaluated time
- Retrieved field class
- Destination

The UI distinguishes:

- Authoritative fact
- Compatibility determination
- Estimate
- AI recommendation
- Customer-provided information
- Missing or conflicting evidence

Citations reauthorize on open. They are not public bearer links.

## Safety layers

Apply:

1. Request authentication, authorization, and abuse limits
2. Context minimization and content classification
3. Prompt-injection and data-exfiltration defenses
4. Tool allowlist and argument validation
5. Provider safety controls
6. Output schema, citation, and policy validation
7. Host confirmation and source revalidation
8. Monitoring and incident response

No single classifier is a security boundary.

## Prompt injection

Treat user input, webpages, Support content, Product descriptions, files, Evidence, provider output, and tool results as untrusted data.

- Delimit content from instructions.
- Strip active markup.
- Do not expose system prompts or secrets.
- Ignore retrieved requests to change tools, reveal data, or contact external systems.
- Require registered destinations.
- Canary and test exfiltration resistance.
- Restrict tool output size and nesting.

Evidence and external content access requires a stronger policy than ordinary public Product text.

## Privacy and provider use

- Send minimum fields for the task.
- Use provider controls that disable training on Nexora data by default.
- Declare provider retention and region behavior.
- Avoid sensitive personal data unless the approved task requires it.
- Redact or tokenize identifiers where full values are unnecessary.
- Maintain deletion propagation and provider evidence.
- Separate production, test, and evaluation tenants.
- Prohibit production Conversations in development fixtures.

A provider must support contractual privacy, security, availability, audit, deletion, and incident requirements before adoption.

## Safety and refusal

Refusals and safe completion follow the current task and risk. The system can:

- Decline unsupported authority
- Offer deterministic paths
- Ask for missing non-sensitive context
- Route to Support or Security
- Explain uncertainty

It does not imply that a refusal is a source-domain denial unless the source actually decided.

## Evaluation

Maintain versioned Portuguese-first suites for:

- Product grounding
- Exact technical models
- Compatibility explanation
- Price and inventory freshness
- Search and filter proposals
- Build trade-offs
- Support article grounding
- Citation completeness
- Prompt injection and data leakage
- Tool authorization and confirmation
- Hallucination and unsupported certainty
- Accessibility and tone
- Refusal and recovery

Gate on factual support, citation precision, tool validity, source-version use, unsafe-action rate, privacy leakage, task success, latency, and cost.

Human evaluation is required for nuanced commerce, safety, accessibility, and Brazilian Portuguese quality.

Online experiments cannot remove the deterministic fast path or broaden data use.

## Degraded behavior

- AI failure never blocks Search, Comparison, PC Builder, Cart, Checkout, Account, Support, or Admin.
- Tool failure is attributed to the affected source.
- Provider timeout produces interrupted or unavailable state, not a fabricated answer.
- Citation failure suppresses affected factual claims.
- A fallback route uses the same or narrower policy.
- Conversation persistence failure prevents claiming a durable response as saved.
- Rate limit preserves current work and offers deterministic continuation.

## Observability

Measure:

- Runs, latency, token use, cost, and provider failure
- Tool calls, denials, timeouts, and schema repair
- Citation coverage and stale-source use
- Safety decisions and injection signals
- Confirmation proposal and acceptance
- User correction and deterministic fallback
- Evaluation regressions by prompt and model route

Logs contain identifiers and policy outcomes, not raw sensitive prompts by default. Debug capture is sampled, redacted, access-controlled, expiring, and never enabled casually on protected flows.

## Quality gates

Before release:

- Prove tools cannot exceed delegation or bypass source authorization.
- Prove consequential proposals require ordinary host confirmation.
- Test prompt injection across every retrieval and tool source.
- Validate deletion, provider retention, failover, and model pinning.
- Test citation source, revision, permission, and stale behavior.
- Run adversarial and Portuguese-first evaluation suites.
- Test streaming interruption, schema failure, provider timeout, and AI-off operation.
- Verify keyboard, screen reader, zoom, reduced motion, citation navigation, and long technical content.

## Consequences

### Benefits

- Optional AI can use current authoritative sources without becoming one.
- Provider replacement remains possible.
- Tool effects are bounded, attributable, and confirmable.
- Provenance and evaluation make quality inspectable.
- AI failure leaves Nexora functional.

### Costs and risks

- Orchestration, evaluation, and provider governance are substantial.
- Prompt injection cannot be eliminated and requires layered control.
- Source citation and freshness add latency.
- Managed providers introduce privacy, cost, and availability dependencies.

## References

- [Global UX Principles](../02-information-architecture/10-global-ux-principles.md)
- [Page Relationships and Domain Ownership](../03-product-structure/02-page-relationships-and-ownership.md)
- [State Ownership and Restoration](08-state-ownership-and-restoration.md)
- [Authorization and Policy Enforcement](13-authorization-and-policy-enforcement.md)
- [Search Architecture](15-search-indexing-ranking-filtering-and-query.md)
- [PC Builder Architecture](21-pc-builder-persistence-and-recalculation.md)
- [ADR-0028: Managed Model Orchestration with Governed Tools](../adrs/ADR-0028-managed-model-orchestration-with-governed-tools.md)
