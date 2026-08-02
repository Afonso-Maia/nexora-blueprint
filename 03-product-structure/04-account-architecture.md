# Account and Post-Purchase Architecture

**Status:** Approved in part — federated continuity model approved; detailed behavior pending

## Purpose

This document defines how authenticated customers manage identity, preferences, persistent commerce context, orders, and post-purchase continuity without duplicating the ownership or interfaces of Comparison, PC Builder, AI, and Support.

It builds on the approved [Page Inventory](01-page-inventory.md), [relationships and ownership](02-page-relationships-and-ownership.md), and [Information Hierarchy](03-information-hierarchy.md).

## Decision

Nexora uses a **federated continuity account**.

Account is the trusted home for customer identity, preferences, order access, and meaningful continuation. It summarizes and links source-owned objects across the ecosystem but does not absorb their workspaces or create parallel copies.

## Account-owned pages

Account owns the page experience for:

- ACC-001 Account Dashboard
- ACC-002 Orders
- ACC-003 Order Detail
- ACC-004 Wishlist
- ACC-005 Addresses
- ACC-006 Payment Methods
- ACC-007 Notifications
- ACC-008 Account Settings

The Customer domain owns these experiences. Referenced order, payment, delivery, Support, build, product, and notification-event data retains its authoritative owner as defined in the ownership ledger.

## Federated capabilities

Account provides prominent continuation links to:

- EVA-002 Comparison Workspace
- PCB-003 Saved Builds and PCB-002 Engineering Workspace
- SUP-006 My Support Cases and SUP-007 Support Case Detail
- AIS-001 AI Assistant Conversation

These capabilities retain their approved owning domain, shell, archetype, access checks, and lifecycle. Account links to them without embedding duplicate Account-owned versions.

AI conversation history remains inside the Assistant Conversation template. Comparison remains a global utility rather than permanent Account navigation.

## Account navigation

The conceptual Account navigation is:

1. **Overview**
2. **Orders**
3. **Wishlist**
4. **PC Builds**
5. **Support Cases**
6. **Preferences**
   - Addresses
   - Payment Methods
   - Notifications
   - Account Settings

`Preferences` is a navigation group, not a page.

PC Builds and Support Cases are cross-surface links. Their placement in Account navigation communicates continuity and does not transfer ownership.

## Governance rules

1. Account Dashboard summarizes source-owned objects without copying their authority.
2. Cross-surface navigation preserves identity and minimum meaningful context.
3. Every target independently rechecks authentication, authorization, object ownership, and current state.
4. Current orders, active cases, and resumable builds outrank general settings.
5. Account navigation reflects customer tasks rather than internal service boundaries.
6. Compare remains globally accessible and does not become a duplicate Account page.
7. AI history remains in the dedicated Assistant.
8. Historical order facts are immutable from preference-management pages.
9. Customer profile changes cannot alter historical order, invoice, case, or consent records silently.
10. Mobile preserves the same conceptual groups and high-priority continuation paths.

## Shell transitions

Cross-surface links make the destination clear before or at transition. The target uses its approved shell:

- Account pages use the Storefront Account shell.
- Comparison uses the Decision Workspace.
- PC Builder uses the Engineering Workspace.
- Support cases use the Support shell.
- AI conversations use the AI Workspace.

Returning to Account restores relevant navigation and safe continuation context without carrying sensitive workspace data in URLs.

## Account Dashboard prioritization

Account Dashboard is a **state-driven continuation hub**. It does not use a fixed collection of equally weighted modules.

Applicable modules follow this priority:

1. Account or security action required
2. Order, payment, delivery, return, warranty, or Support exception
3. Active orders and shipments
4. Active Support cases
5. Resumable Cart, Comparison, or PC Build
6. Wishlist and recently viewed continuity
7. Relevant recommendations
8. Preferences and general management

Within the same tier, governed urgency and recency determine order.

### Priority governance

- Priority is deterministic and explainable, not AI-controlled.
- Source domains own status, urgency, eligibility, and resolution facts.
- Dashboard summarizes an item; the target page owns its action.
- Marketing and recommendations cannot outrank active customer obligations or resumable owned work.
- Critical items remain until resolved, expired, or superseded.
- Dismissal is available only for genuinely optional items.
- Empty modules are omitted or reduced to useful first-use guidance.
- Duplicate events from several sources resolve into one clear continuation when they represent the same underlying object.
- A stale or unavailable source is identified rather than silently presented as current.

### Fallback behavior

If personalization or aggregation is unavailable, Dashboard prioritizes:

1. Known account or security requirements
2. Available active-order and case summaries
3. Stable navigation to Orders, Wishlist, PC Builds, Support Cases, and Preferences

It does not fill missing owned state with additional merchandising.

### Responsive behavior

Mobile preserves the same priority order. Critical status and primary continuation remain ahead of recommendations and Preferences. Lower-priority modules may collapse, but their priority cannot be raised merely because they fit a compact presentation.

## Provisional dependencies

The following remain pending:

- Guest-order claim and consolidation
- Order lifecycle and action eligibility
- Account restriction and recovery behavior
- Address and payment assurance
- Notification categories, retention, and preferences
- Privacy requests, export, closure, and retention
- Session and step-up assurance
- Mobile navigation interaction details

## Next decision

Define Account Dashboard prioritization and post-purchase continuation behavior, followed by order lifecycle, guest-order access, preference management, and account lifecycle controls.
