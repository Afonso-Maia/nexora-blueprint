# API and Backend-for-Frontend Strategy

**Status:** Approved

## Purpose

This document defines Nexora's Backend-for-Frontend topology, synchronous API style, contract source, schema validation, error and operation envelopes, concurrency, idempotency, pagination, compatibility, versioning, file transfer, and external API boundary.

It does not define event and workflow technology, backend language, web server, API gateway product, identity token format, database, or provider-specific API.

## Decision

Use:

- One logical **Customer BFF** co-deployed with the Customer Experience Runtime
- One logical **Admin BFF** co-deployed with the Administrative Experience Runtime
- A private **HTTP/JSON Commerce Core API** for cross-runtime synchronous contracts
- **OpenAPI 3.1.x** as the canonical HTTP contract format
- JSON Schema-compatible runtime validation at every trust boundary
- **RFC 9457 Problem Details** for machine-readable HTTP failures
- Standard HTTP methods, status codes, cache headers, strong entity tags, and conditional requests
- Opaque cursor pagination by default
- Explicit idempotency and durable operation resources for consequential commands

Server Components call their co-deployed BFF use cases in-process. Client Components call narrow same-origin BFF endpoints when browser interaction requires network access. The BFF calls private source or application contracts; browsers do not call the Commerce Core directly.

Do not introduce GraphQL, a universal API gateway schema, direct browser-to-domain access, or a public developer API initially.

## BFF topology

### Logical, not initially separate services

Customer and Admin BFFs are separately owned application layers but initially deploy with their respective Next.js runtimes.

Co-deployment:

- Avoids a network self-call from Server Components
- Keeps route composition and browser endpoints under one release and trust boundary
- Allows shared in-process query and command adapters
- Reduces operational units for the initial team

Logical separation remains enforceable through project boundaries, public entry points, contract tests, and distinct customer and workforce contexts.

A BFF may become a separate runtime only if scale, security, release, reliability, or team evidence passes the independent-deployment threshold.

### Customer BFF

The Customer BFF:

- Composes customer page and interaction use cases
- Normalizes URL and browser inputs
- Propagates anonymous, guest, customer, representative, and assurance context
- Shapes payloads for customer performance and accessibility
- Coordinates source queries without copying authority
- Maps source outcomes to approved customer states
- Exposes only fields needed by the current experience

It cannot own products, prices, inventory, Compatibility, Cart, Checkout, orders, Account objects, Support cases, permissions, or AI facts.

### Admin BFF

The Admin BFF:

- Composes capability-adaptive worklists and resource workspaces
- Propagates workforce, provider, assurance, delegation, and field-scope context
- Coordinates governed source-domain commands
- Tracks durable operation references
- Applies defense-in-depth response minimization

It cannot authorize by navigation visibility, mutate source databases, combine restricted fields into unauthorized derived output, or convert a submitted command into apparent completion.

### No BFF persistence authority

BFFs may use request memoization and approved derived caches. They do not own durable business records.

Durable BFF state is limited to explicitly approved experience infrastructure such as anti-abuse records or operation-correlation metadata where no source owner exists. Such state requires a separate owner and lifecycle decision.

## Interaction paths

### Server-rendered query

`Server Component → co-deployed BFF use case → Commerce Core or approved capability contract → view model`

The BFF use case is callable without HTTP inside the experience runtime. Its input and output still use validated owned schemas.

### Browser query

`Client Component → same-origin BFF endpoint → BFF use case → private source contract`

Browser endpoints exist only for approved client-interactive needs. They do not mirror the entire private Core API.

### Browser command

`Client Component or form → same-origin BFF endpoint or Server Function adapter → BFF command use case → authoritative Core API → result or operation reference`

Framework Server Functions are transport adapters. The same command contract, idempotency, authorization, and outcome semantics apply.

### Core internal call

Co-deployed domain modules use owned in-process contracts rather than HTTP loopback. When a capability is independently deployed, the same semantic contract receives an explicit transport schema.

## HTTP resource and command model

Use resource-oriented HTTP for:

- Stable entities and representations
- Collections, filters, sorts, and cursors
- Current state and version retrieval
- Creation where the created resource is the direct outcome
- Idempotent replacement or governed partial update

Use explicit command endpoints when the intent:

- Is not ordinary resource replacement
- Has consequential workflow semantics
- Requires approval, assurance, eligibility, or segregation
- May continue asynchronously
- Produces a durable operation
- Needs domain language that should not be hidden behind a generic patch

Examples include Checkout commit, order cancellation request, refund request, Compatibility rule activation, Admin approval, bulk execution, Account closure, and privacy-request submission.

Generic `/action`, `/execute`, and untyped command endpoints are prohibited.

## Contract source

OpenAPI 3.1.x documents are the canonical cross-runtime HTTP contract.

OpenAPI 3.2 is not adopted initially. Its later adoption requires validator, generator, documentation, security, compatibility, and consumer-tool verification.

Contracts define:

- Operation identity and ownership
- Method and path
- Authentication and authorization context
- Parameters and request schema
- Success, accepted, empty, and failure responses
- Problem types
- Idempotency and concurrency requirements
- Pagination and filtering
- Cache and freshness headers
- Deprecation and compatibility
- Data classification and field restrictions
- Examples without sensitive production data

Generated server stubs, client types, validators, and documentation are derived artifacts. Generated code cannot be edited as independent contract truth.

## Schema validation

Validate:

- Browser and external request input at the BFF
- BFF-to-Core input at the Core boundary
- Provider callbacks before adapter mapping
- Cross-runtime responses in contract and integration tests
- Runtime responses selectively in production according to risk and performance

Compile-time TypeScript types do not validate network data.

Unknown request fields are rejected for consequential commands unless a contract explicitly allows extensibility. Response consumers tolerate documented additive fields.

Schema coercion is narrow and visible. Strings do not silently become money, dates, booleans, identifiers, scopes, or permissions.

## Representation rules

- JSON property names use one governed convention.
- Identifiers are opaque strings.
- Money uses an explicit currency and exact minor-unit or decimal-string representation; binary floating-point is not accepted.
- Date-only, local time, instant, duration, and time zone are distinct schema types.
- Enumerations define unknown-value behavior.
- Optional, nullable, omitted, empty, and redacted are distinct.
- Units accompany technical measurements where ambiguity exists.
- Human-formatted Brazilian Portuguese values do not replace machine fields.
- Links and permitted next actions may be included where they reduce client inference.

APIs do not expose persistence entities directly.

## Success responses

Use HTTP semantics consistently:

- `200 OK` for a returned current representation or completed command result
- `201 Created` with a resource location for creation
- `202 Accepted` with an operation resource for durable asynchronous work
- `204 No Content` only when the consumer needs no representation or outcome detail

Consequential mutation responses include:

- Correlation identity
- Current source version
- Authoritative outcome or operation reference
- Applicable next actions
- Freshness or revalidation requirements

A generic `{ success: true }` response is prohibited.

## Problem Details

Use `application/problem+json` following RFC 9457.

Every problem includes, as applicable:

- Stable problem `type`
- Short non-sensitive `title`
- HTTP `status`
- Occurrence `instance` or correlation reference
- Safe localized `detail` at the BFF boundary
- Machine-readable error code
- Validation issues with stable field pointers
- Current version for conflicts
- Retry or operation reference
- Required assurance or safe remediation

Problem type documentation declares status, meaning, retryability, user presentation class, observability severity, and sensitive-data restrictions.

Problem Details does not expose stack traces, SQL, provider secrets, internal hostnames, raw policy expressions, resource existence, or debugging payloads.

### Status conventions

| Status | Meaning |
| --- | --- |
| 400 | Malformed or structurally invalid request |
| 401 | Missing or invalid authentication |
| 403 | Authenticated but not allowed when disclosure is safe |
| 404 | Resource absent or intentionally non-disclosing |
| 409 | Current state, lifecycle, duplicate, or business conflict |
| 412 | Explicit version or conditional-request precondition failed |
| 422 | Structurally valid input rejected by validation, prerequisite, or eligibility |
| 429 | Rate or abuse control |
| 500 | Unexpected server failure without safe detail |
| 502 | Invalid or failed upstream response where applicable |
| 503 | Required capability temporarily unavailable |
| 504 | Upstream result not received within the gateway boundary |

An HTTP timeout does not determine whether a consequential effect occurred. Consumers resolve by operation or idempotency identity.

## Concurrency

Use strong ETags for versioned HTTP representations where feasible.

- Reads return `ETag`.
- Consequential updates require `If-Match` or an equivalent explicit base version.
- Missing required preconditions are rejected.
- Mismatch returns `412` or a domain-specific `409` according to whether the failure is purely HTTP representation concurrency or a richer business conflict.

Bulk and workflow commands carry item or envelope versions explicitly when one HTTP ETag cannot represent all targets.

Last-write-wins is limited to explicitly commutative, low-risk state.

## Idempotency

Consequential create and command requests require an idempotency key scoped to:

- Subject or workload
- Owning operation
- Intended target
- Contract version
- Bounded retention window

The source owner stores:

- Key fingerprint
- Canonical request hash
- First accepted time
- Current operation or terminal result
- Expiry

Reusing a key with a different intent returns conflict. Retrying the same intent returns the same operation or terminal outcome.

BFFs propagate rather than replace source idempotency. Provider adapters map Nexora idempotency to provider capabilities and reconcile where providers do not support it.

Safe HTTP methods remain semantically safe; idempotency keys do not excuse misuse of `GET`.

## Operation resources

Long-running or indeterminate work returns an opaque operation resource containing:

- Operation ID
- Kind and owner
- Target reference safe for the caller
- State
- Submitted, started, updated, and completed times
- Progress only when measurable
- Current result reference
- Safe problem representation
- Polling or subscription guidance
- Cancellation capability where supported
- Expiry and retention

Operation reads reauthorize the caller. They are not publicly guessable and do not reveal target existence beyond current access.

Polling uses backoff and server guidance. Real-time delivery, if later approved, is an optimization; the operation resource remains durable recovery.

## Pagination

Use opaque cursor pagination by default for changing collections.

Contracts declare:

- Stable sort and deterministic tie-breaker
- Cursor scope and expiry
- Page-size default and maximum
- Snapshot or consistency behavior
- Filter and permission binding
- Next and previous support
- Duplicate and omission behavior under concurrent change

A cursor is opaque, signed or integrity-protected where needed, and contains no sensitive readable state.

Offset pagination is permitted for small stable collections, static content, or analytical results where exact page numbering is a product requirement and consistency limits are explicit.

Search uses query-owned continuation tokens governed by Search. Admin exports do not enumerate unbounded data through interactive pagination.

## Filtering and sorting

- Public commerce filters derive from governed Catalog attributes.
- Filter names, operators, types, limits, and combination rules are contract-defined.
- Unknown filters are rejected or safely ignored according to the route contract, never interpreted dynamically.
- Sorting uses an allowlist and stable tie-breaker.
- Admin field and row visibility are enforced before counts, facets, and results are returned.
- Query complexity, nesting, page size, and expensive sort combinations are bounded.

The API does not expose arbitrary database query languages.

## Field selection and expansion

Prefer purpose-built BFF representations over arbitrary client-selected fields.

Bounded `include` or expansion parameters are allowed when:

- Relationships are explicitly approved.
- Authorization and field scope apply to the expansion.
- Cost and cardinality are bounded.
- Cache and freshness behavior remain clear.
- The default avoids request waterfalls.

Graph-shaped flexibility is not introduced through an ungoverned `fields` language.

## Authentication and authorization context

Browser credentials terminate at the experience boundary according to the later session decision.

BFF-to-Core calls carry:

- Authenticated workload identity
- Original subject identity or anonymous/guest context
- Effective delegated context where applicable
- Assurance
- Correlation and trace context
- Requested operation

The Core derives or validates capabilities and scope through the approved authorization architecture. The BFF cannot assert arbitrary grants.

Source modules enforce resource and field access. BFF minimization is defense in depth and experience shaping.

## Caching and conditional reads

API responses declare cache behavior explicitly.

- Public source-versioned reads may use validators and approved shared caching.
- Private responses use private or no-store semantics according to their contract.
- Consequential command responses are not shared-cacheable.
- Error responses are not cached unless a safe problem type explicitly permits it.
- Authorization and field-varying responses do not use unbounded or unsafe `Vary`.

ETags identify representation versions, not business approval or permission validity. Action time rechecks current authority.

## File upload and download

Large media, Support evidence, imports, and exports do not transit application runtimes as unbounded JSON.

Use a governed transfer flow:

1. Request upload or export intent from the owning domain.
2. Validate identity, authorization, file policy, size, type, and purpose.
3. Issue a short-lived scoped object-transfer capability.
4. Transfer directly to private object storage or a bounded media ingress.
5. Finalize through an owned command.
6. Scan, validate, transform, and quarantine asynchronously.
7. Publish an authoritative attachment or export state only after acceptance.

File names, MIME types, metadata, archives, and contents are untrusted. Download authorization is checked at access time; links expire and are not bearer capabilities with excessive lifetime.

## Compatibility and evolution

### Compatible changes

- Add optional response fields
- Add new endpoints
- Add optional request fields with stable defaults
- Add new documented problem types where existing clients have safe generic handling
- Add enum values only when consumers declare unknown-value behavior

### Breaking changes

- Remove or rename fields or operations
- Change type, unit, nullability, default, authority, or meaning
- Tighten request requirements without migration
- Change pagination or cursor semantics
- Change authentication, authorization, idempotency, or concurrency behavior
- Reinterpret an enum
- Expose previously omitted sensitive data

Breaking changes require a new major contract, compatibility window, migration, consumer inventory, telemetry, and removal criteria.

## Versioning

Private Core APIs use a stable major contract namespace such as `/v1` plus OpenAPI document and operation versions. Compatible changes do not create new URL versions.

BFF browser endpoints are application-private and may evolve with the co-deployed frontend, but saved clients, service workers, open tabs, retries, and pending operations still require a compatibility window.

Deprecation includes:

- Machine-readable marker
- Replacement
- First deprecated date
- Supported-until policy
- Known consumers
- Usage telemetry
- Removal approval

## Contract testing

Require:

- OpenAPI lint and schema validation
- Breaking-change detection against the released contract
- Generated artifact drift checks
- Producer conformance tests
- Consumer contract tests
- Problem-type registry validation
- Authorization and field-redaction tests
- Idempotency, concurrency, retry, and timeout tests
- Pagination stability and cursor-integrity tests
- Content-type, size, and rate-limit tests
- Example validation

Mock servers and generated clients support development but do not replace integration against the real source implementation.

## External API boundary

Nexora exposes no general public developer or partner API initially.

External boundaries are limited to:

- Provider callbacks
- Governed outbound provider calls
- Short-lived object transfer
- Explicit future partner integration approved per use case

Provider endpoints use dedicated authentication, network, replay, signature, rate, schema, idempotency, and reconciliation controls.

A future public or partner API requires separate product purpose, ownership, support, security, rate, versioning, consent, data-use, documentation, and deprecation decisions.

## Rejected alternatives

### GraphQL gateway

GraphQL is viable for varied compositions and typed client-driven selection. It is not selected because two owned BFFs can shape the approved experiences without introducing graph-level authorization, field-cost, cache, N+1, schema ownership, and operational complexity.

### Browser-to-domain APIs

Direct browser calls reduce BFF code but expose internal topology, duplicate composition, increase client waterfalls, and make customer/Admin minimization and session boundaries harder to govern.

### Separate BFF services immediately

Separate deployments permit independent scaling and releases but add network calls and operational units before the customer or Admin BFF has a distinct proven profile.

### Shared universal BFF

One BFF would maximize reuse but combine customer and workforce identity, field scope, payload, release, and security assumptions.

## Validation

This decision:

- Preserves separate customer and Admin trust boundaries.
- Keeps BFFs as composition layers rather than source authorities.
- Supports server-first rendering without network self-calls.
- Provides versioned, language-neutral private Core contracts.
- Makes validation, failure, concurrency, idempotency, and asynchronous outcome behavior explicit.
- Supports search, filters, transactions, Account, Builder, AI, Support, and Admin.
- Avoids premature public API and GraphQL complexity.

## Consequences

### Benefits

- Experience payloads remain focused and independently governed.
- HTTP standards provide interoperable failure and concurrency semantics.
- OpenAPI supports generation, validation, review, and compatibility checks.
- Durable operation resources make timeout and long-running work recoverable.
- Co-deployed BFFs minimize initial latency and operations.

### Costs and risks

- Two BFFs can duplicate adapters without shared-code discipline.
- OpenAPI and runtime validators require generation and drift tooling.
- Purpose-built endpoints require deliberate evolution as experiences grow.
- Co-deployment can hide logical boundaries unless architecture tests enforce them.

## Governance

- New browser endpoints require an approved client-interaction need.
- New Core operations declare owner, authorization, idempotency, concurrency, errors, and observability.
- BFFs cannot own source records or accept authority from presentation state.
- New public or partner APIs require separate approval.
- A material change to BFF topology, HTTP contract style, OpenAPI baseline, error format, or public API posture requires a superseding ADR.

## References

- [ADR-0015: Co-Deployed Experience BFFs and OpenAPI HTTP Contracts](../adrs/ADR-0015-bff-and-http-contracts.md)
- [OpenAPI Specification 3.1](https://spec.openapis.org/oas/v3.1.0)
- [OpenAPI latest specification](https://spec.openapis.org/oas/latest.html)
- [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html)
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
- [System Context and Runtime Topology](04-system-context-and-runtime-topology.md)
- [State Ownership and Restoration](08-state-ownership-and-restoration.md)
- [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md)

## Next decision

Define authoritative domain-module and application-service boundaries, aggregates, transaction ownership, cross-module collaboration, provider ports, and extraction triggers.
