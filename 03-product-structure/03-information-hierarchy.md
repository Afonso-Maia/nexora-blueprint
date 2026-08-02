# Page-Level Information Hierarchy

**Status:** Approved in part — hierarchy contract approved; archetype specifications and page mapping pending

## Purpose

This document defines how approved pages prioritize information, actions, constraints, evidence, continuation, and recovery. It turns the [Page Inventory](01-page-inventory.md) and [relationship graph](02-page-relationships-and-ownership.md) into a wireframing contract without prescribing a fixed visual layout.

## Decision

Nexora uses a **layered semantic hierarchy contract** with governed page archetypes.

Every page follows the same priority logic, while its primary archetype adapts emphasis and arrangement to the user’s goal. Responsive layouts may reposition regions but cannot change their semantic priority, hide critical state, or place optional guidance above deterministic facts and required controls.

## Hierarchy layers

| Priority | Layer | Requirement |
| --- | --- | --- |
| 1 | Identity and state | Establish the destination or object, current status, scope, and relevant user-applied context |
| 2 | Primary outcome | Make the page’s main goal and required primary action unambiguous |
| 3 | Critical constraints | Surface price, availability, compatibility, eligibility, permissions, warnings, and other action-changing facts before commitment |
| 4 | Decision or work area | Provide the results, configuration, transaction, content, or operational controls required to achieve the goal |
| 5 | Evidence and detail | Expose specifications, rationale, history, policy, provenance, and audit context progressively |
| 6 | Secondary continuation | Offer related tasks, relevant products or content, optional AI, and next-step continuation without competing with the primary outcome |
| 7 | Recovery and governance | Provide help, error recovery, legal context, ownership, and audit information appropriate to the page |

The numbered layers express priority, not a mandatory vertical sequence. A persistent workspace may show Layers 1–4 concurrently. A legal document may make evidence and governance the main body. A recovery page may elevate Layer 7 because recovery is its primary outcome.

## Approved archetypes

Every page will map to exactly one primary archetype:

1. **Hub**
2. **Results/List**
3. **Detail**
4. **Workspace**
5. **Transaction**
6. **Content/Document**
7. **Recovery**
8. **Admin Queue**
9. **Admin Resource Workspace**

Embedded experience units inherit the host page’s archetype and hierarchy. They do not establish a competing page hierarchy.

## Global hierarchy rules

1. The primary goal remains visible or readily recoverable throughout the page.
2. Critical warnings and eligibility changes appear before the action they affect.
3. User-applied query, filter, intent, comparison, build, Cart, and case context is visible and modifiable where relevant.
4. Deterministic product, price, inventory, compatibility, policy, and permission facts outrank AI guidance.
5. AI remains optional and does not displace primary controls.
6. Supporting recommendations and merchandising never obscure the fast path.
7. Progressive disclosure hides depth, not consequential facts.
8. Responsive rearrangement preserves reading order, focus order, relationships, and action meaning.
9. Empty, loading, error, offline, and degraded states preserve the host page’s goal and hierarchy.
10. Admin pages show status, permission scope, validation, impact, approval, and audit context before consequential mutation.
11. Legal or policy references appear at the point of consequence and remain accessible as authoritative documents.
12. Secondary continuation cannot look more prominent than the primary outcome merely because it is promotional or personalized.

## Relationship to page shells

Archetype and shell are independent but coordinated:

- Storefront pages may use Hub, Results/List, Detail, Workspace, Content/Document, or Recovery.
- Focused purchase pages primarily use Transaction.
- PC Builder and AI use Workspace.
- Support uses Hub, Content/Document, Results/List, Detail, or Recovery.
- Authentication uses Transaction or Recovery depending on the goal.
- Admin uses Hub, Admin Queue, Admin Resource Workspace, Content/Document, or Recovery.

The shell determines global navigation and persistent utilities. The archetype determines page-level semantic priority.

## Responsive and accessibility contract

- Semantic headings, landmarks, labels, and relationships remain consistent across breakpoints.
- Visual order must not contradict reading or focus order.
- Sticky or persistent actions cannot cover critical content or recovery.
- Mobile may collapse secondary regions but must not hide active constraints or user-applied state.
- Status cannot rely on color alone.
- Dynamic updates announce meaningful changes without interrupting unrelated work.
- Keyboard and assistive-technology users retain equivalent access to primary and recovery actions.

## Next decision

Specify the nine archetypes, including required regions, optional regions, prohibited patterns, responsive behavior, and representative approved pages. Then map all 89 Page Inventory entries to exactly one primary archetype.

