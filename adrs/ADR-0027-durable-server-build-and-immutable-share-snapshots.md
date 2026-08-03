# ADR-0027: Durable Server Build and Immutable Share Snapshots

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

The PC Builder must support guest and customer persistence, non-linear editing, deterministic Compatibility, current price and stock, budget and performance estimates, concurrency, sharing, duplication, purchase, and upgrade without making browser storage or derived panels authoritative.

Viable approaches included:

1. A server-authoritative Build aggregate with immutable internal Revisions, derived source-versioned projections, and immutable Share snapshots
2. Browser-first guest Builds promoted only at sign-in
3. An event-sourced Build reconstructed entirely from action history

## Decision

Create a durable server-authoritative PC Build for both guests and customers.

Use a typed versioned Build Schema, stable slots and selections, a current relational aggregate, immutable internal Build Revisions, strong ETags, and field-aware conflict handling.

Evaluate candidate component changes against current Catalog and Compatibility contracts before confirming selections that require a hard check. Existing selections remain intact and visibly blocked if later facts or rules change.

Use dependency-aware recalculation for Compatibility, price, availability, Budget, and deterministic versioned Performance estimates. AI remains outside required recalculation.

Use immutable, expiring, revocable Build Share snapshots. Recipients can inspect and duplicate but cannot edit the source or see later private changes.

Build-to-Cart freezes an exact Build Revision and applies the complete grouped composition atomically and idempotently through Purchase.

Real-time collaboration, ownership transfer, public discoverability, editable shares, and a customer-facing version-history product remain unapproved.

## Consequences

### Benefits

- Build continuity does not depend on browser storage.
- Revisions and ETags prevent silent conflict loss.
- Derived state can degrade without losing composition.
- Share meaning remains stable and private.
- Cart and Order preserve exact Build provenance.

### Costs and risks

- Guest persistence creates retention and abuse work.
- Recalculation spans several sources.
- Revision and Share snapshots add storage.
- Candidate and conflict UX require careful engineering.

## Governance

- PC Builder owns composition, not source facts.
- Guided and Expert remain initialization profiles for one model.
- Browser drafts cannot override server authority.
- Shares remain read-only snapshots unless a later Blueprint decision changes collaboration.
- Hard Compatibility cannot be overridden.
- A material change to Build authority, guest persistence, conflict semantics, sharing, or conversion atomicity requires a superseding ADR.

## References

- [PC Builder Persistence and Recalculation](../06-engineering/21-pc-builder-persistence-and-recalculation.md)
- [PC Builder Architecture](../02-information-architecture/09-pc-builder.md)
- [ADR-0002: Shared Compatibility Domain](ADR-0002-shared-compatibility-domain.md)
- [ADR-0022: Deterministic Compatibility Engine](ADR-0022-deterministic-declarative-compatibility-engine.md)

