# Decision and ADR Navigation

**Status:** Approved

## Decision

Generate separate but linked views for topic decisions and ADRs. The ADR index exposes number, title, status, date, phase, supersedes/superseded-by relationships, and referenced decision documents where available. Topic documents expose status, phase, owner when recorded, references, and associated ADRs.

Support browsing by number, phase, status, and subject. Chronology is a secondary view because recency does not imply authority. Search results and summaries always display status.

ADR files and topic documents remain canonical. Generated decision cards and timelines do not restate full decisions. Missing sequence numbers, duplicate ADR identities, invalid statuses, broken supersession links, and index omissions block publication.

## References

- [Architecture Decision Records](../adrs/README.md)
- [Product Decisions](../product-decisions/README.md)
