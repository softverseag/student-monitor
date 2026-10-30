---
title: State Machines
status: draft
updated: 2026-10-30
---

# State Machines

Every transition below is guarded by *who* may perform it. The actor is part of the machine, not an
afterthought.

## Coach–student link ([[FR-04]])

```mermaid
stateDiagram-v2
  [*] --> PENDING_STUDENT_ACCEPT: coach invites
  [*] --> PENDING_COACH_ACCEPT: student requests
  PENDING_STUDENT_ACCEPT --> ACTIVE: student accepts
  PENDING_STUDENT_ACCEPT --> DECLINED: student declines
  PENDING_STUDENT_ACCEPT --> EXPIRED: invite expires
  PENDING_COACH_ACCEPT --> ACTIVE: coach accepts
  PENDING_COACH_ACCEPT --> DECLINED: coach declines
  ACTIVE --> ENDED: either side ends
  ENDED --> [*]
```

`ENDED` is terminal for that record; the pair may create a new link later. History survives
([[BR-002]], [[BR-025]]), and the coach's access becomes **read-only** — no new content, while the
student keeps that coach's shared files and recommendations ([[BR-030]]).

## Parent–student link ([[FR-05]])

```mermaid
stateDiagram-v2
  [*] --> PENDING_COACH_APPROVAL: parent requests / coach invites
  PENDING_COACH_APPROVAL --> ACTIVE: coach approves
  PENDING_COACH_APPROVAL --> REJECTED: coach rejects
  ACTIVE --> REVOKED: coach or parent revokes
```

At most two links may be `ACTIVE` per student ([[BR-004]]).

## Work item — task and assignment ([[FR-06]], [[FR-07]])

Since v2, completion follows the **dispute model** ([[BR-006]]): the machine has two paths, chosen
by the item's `requiresApproval` flag at creation.

```mermaid
stateDiagram-v2
  [*] --> OPEN: coach assigns
  OPEN --> COMPLETED: student submits (default — no approval step)
  OPEN --> PENDING_APPROVAL: student submits (requiresApproval items)
  PENDING_APPROVAL --> COMPLETED: assigning coach approves
  PENDING_APPROVAL --> RETURNED: assigning coach returns (note optional)
  COMPLETED --> RETURNED: assigning coach disputes later (note optional)
  RETURNED --> COMPLETED: student resubmits (default)
  RETURNED --> PENDING_APPROVAL: student resubmits (requiresApproval)
  COMPLETED --> [*]
```

`COMPLETED` splits into `COMPLETED_ON_TIME` / `COMPLETED_LATE` by comparing `submittedAt` against
`dueAt + lateCutoff` — the cutoff frozen onto the item at creation ([[BR-027]]).

**`OVERDUE` is not a state in this diagram on purpose.** It is a *view* of `OPEN` or `RETURNED` once
`now > dueAt + lateCutoff`. Deriving it avoids a scheduled job and can never be stale.

Guards:

| Transition | Who |
| --- | --- |
| assign | the coach, with an active link |
| submit / resubmit | the student the item belongs to |
| approve / return / dispute | **only the assigning coach** ([[BR-007]]); bulk approve audits per item ([[FR-06|FR-06.14]]) |

The on-time/late branch uses `submittedAt`, never `approvedAt` ([[BR-009]]) — doubly important now
that most items are never explicitly approved.

**`PENDING_APPROVAL` can be terminal.** If the assigning coach's link ends while an item waits there,
no further transition is possible — approving is a write, and an `ENDED` link grants none
([[BR-030]]). The item stays pending for good and counts as not completed, neither late nor overdue
([[FR-04|FR-04.13]], owner decision 2026-10-30). Nothing special is stored for this: the derivation
simply never receives another fact.

## Lesson ([[FR-09]], [[FR-10]])

```mermaid
stateDiagram-v2
  [*] --> REQUESTED: coach requests (students cannot)
  REQUESTED --> ACCEPTED: student accepts
  REQUESTED --> DECLINED: student declines (note optional)
  ACCEPTED --> CANCELLED: coach or student cancels (note optional)
  ACCEPTED --> COMPLETED: time passes
  COMPLETED --> [*]
```

A **group lesson** is one lesson record; each participant student has their own accept/decline and
attendance — plus, from v1.1, their own earning row ([[BR-028]]). Attendance is marked **only by the
coach**, after the lesson, per participant:

| Lesson outcome | Attendance | Billable (per-lesson model) — `[v1.1]` |
| --- | --- | --- |
| `COMPLETED`, student came | `ATTENDED` | yes |
| `COMPLETED`, student absent | `NO_SHOW` | per-coach setting; default open ([[Open Questions|Q-04]]) |
| `CANCELLED` | `CANCELLED` | **never** (v2 §8.3, decided) |

Under the monthly-flat price model, billing comes from the period, not these rows ([[BR-021]]).
**The billable column is v1.1** — attendance itself ships in v1 and is finance-independent
([[FR-10]], [[Scope and MVP]]).

## Mock exam result ([[FR-15]])

```mermaid
stateDiagram-v2
  [*] --> PENDING_APPROVAL: student enters result, picks approver
  PENDING_APPROVAL --> APPROVED: approver coach approves
  PENDING_APPROVAL --> REJECTED: approver coach rejects
```

The approver is the coach the student selected ([[BR-031]]); no other coach can act on the result.
Only `APPROVED` feeds statistics ([[BR-017]] — rule under review, [[Open Questions|Q-20]]). What
follows `REJECTED` is open ([[Open Questions|Q-25]]).

## Subscription ([[FR-22]])

```mermaid
stateDiagram-v2
  [*] --> TRIAL
  TRIAL --> ACTIVE: pays
  TRIAL --> LAPSED: trial ends
  ACTIVE --> LAPSED: payment fails / cancels
  LAPSED --> ACTIVE: pays
```

`LAPSED` restricts the coach's writes. It never locks students or parents out of their own data.

## Related

[[Domain Model]] · [[Authorization Matrix]] · [[Data Model]]
