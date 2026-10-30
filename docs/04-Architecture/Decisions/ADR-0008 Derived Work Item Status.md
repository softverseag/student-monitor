---
id: ADR-0008
aliases: [ADR-0008]
title: Derive work-item status rather than storing it
status: accepted
date: 2026-09-12
---

# ADR-0008 — Derive work-item status rather than storing it

## Status

accepted — **hard to reverse**, historical reports depend on it

## Context

A work item's status depends on time: `OPEN` becomes `OVERDUE` at midnight with no user action. And
whether an approval yields `COMPLETED_ON_TIME` or `COMPLETED_LATE` depends on comparing
`submittedAt` with `dueAt` ([[BR-009]]) — a comparison that must give the same answer forever.

Storing a mutable `status` column means a scheduled job flipping rows to `OVERDUE`, and that job
will at some point not run.

## Decision

Store **facts**: `dueAt`, `lateCutoff` (frozen at creation, [[BR-027]]), `requiresApproval`,
`submittedAt`, `approvedAt`, plus the append-only event log. Derive the displayed status.

*As amended 2026-10-14 for the v2 dispute model ([[BR-006]]):*

```
if completed:                    COMPLETED_ON_TIME | COMPLETED_LATE
   # completed = submitted && (!requiresApproval || approvedAt), minus any later return
elif submittedAt:                PENDING_APPROVAL   (requiresApproval items only)
elif returned:                   RETURNED
elif now > dueAt + lateCutoff:   OVERDUE
else:                            OPEN
```

On-time vs late is computed from `submittedAt <= dueAt + lateCutoff`; `approvedAt` plays no part in
it.

*As amended 2026-10-30 ([[Open Questions|Q-13]]):* `submittedAt` means **the latest submission**, and
the coach may **edit a submitted item** — including its due date. So the derivation gives the same
answer forever *for a given set of facts*, not unconditionally: an edit changes a fact and the next
read reflects it, which is the point of deriving rather than storing. The frozen `lateCutoff`
([[BR-027]]) is the one fact an edit cannot touch, so no item is ever reclassified under a rule that
did not exist when it was assigned. Both are pure-function inputs — implement them in the one shared
derivation, not per query ([[FR-06|FR-06.22–26]]).

## Consequences

**Good.** No cron job, no stale rows, no midnight batch to monitor. A report generated today for
last March gives the same answer it gave in March. The on-time/late decision is made at exactly one
point in the code.

**Bad / accepted cost.** Queries must express the derivation — filtering "show me overdue items"
becomes a predicate rather than `WHERE status = 'OVERDUE'`. Mitigation: a database view or a shared
query builder, so the derivation is written once. Indexes on `(student_id, due_at)` keep it cheap at
this volume.

## Alternatives considered

| Option | Why not |
| --- | --- |
| Stored status + nightly job | the job fails, and the data is silently wrong; also gives different answers depending on when a report runs |
| Stored status updated on read | write amplification and lock contention for no benefit |
| Materialised view refreshed periodically | same staleness problem, more machinery, and unnecessary at this data volume |
