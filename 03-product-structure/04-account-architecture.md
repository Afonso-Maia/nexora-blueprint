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

## Provisional dependencies

The following remain pending:

- Dashboard prioritization and continuation rules
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

