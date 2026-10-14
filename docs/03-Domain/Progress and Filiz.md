---
title: Progress and Filiz
status: draft
updated: 2026-10-14
---

# Progress and Filiz

How completion turns into numbers, and numbers into a character. The Filiz thresholds were fixed in
v2 (K-24) but remain configuration in one module; the monthly formula is still open
([[Open Questions|Q-02]]).

## Where progress comes from

Only from work items ([[FR-06]], [[FR-07]]). Lessons and exams are reported separately; they do not
feed Filiz.

For a period and a `type` (task or assignment):

| Bucket | Definition |
| --- | --- |
| `onTime` | completed, `submittedAt <= dueAt + lateCutoff` ([[BR-027]]) |
| `late` | completed, `submittedAt > dueAt + lateCutoff` |
| `pending` | submitted `requiresApproval` item, not yet decided ([[BR-006]]) |
| `missing` | past due + cutoff, never submitted (`OVERDUE`) |
| `open` | not yet due, not submitted |

Under the dispute model, a default item is *completed* the moment it is submitted; only
`requiresApproval` items can be `pending`. A later return moves the item back out of the completed
buckets.

`due` = `onTime + late + pending + missing` — that is, items whose due date falls in the period.
Items not yet due are excluded from the denominator, or a student is penalised at 09:00 for work due
at 23:00.

## Daily progress and Filiz

```
progress(day, type) = (onTime + pending) / due       -- due > 0
```

**Pending counts as done.** A student who submitted everything should not watch Filiz wilt while
their coach is asleep. If the coach later returns the item, the day's progress drops — correct, and
attributable. (Only `requiresApproval` items can be pending at all under [[BR-006]].)

Thresholds — decided in v2 (K-24), kept as configuration:

| Stage | Threshold | Feel (v2 §14.3) |
| --- | --- | --- |
| 1 | 0–24% | üzgün (sad) |
| 2 | 25–74% | idare eder (getting by) |
| 3 | 75–99% | mutlu (happy) |
| 4 | 100% | kutlama (celebration) |

Tone is **gentle and encouraging, one variant** — no guilt mechanics; the audience is minors (K-23).
Animation only in the daily view; weekly/monthly show a static image.

Two independent instances — one for tasks, one for assignments ([[BR-005]]). They are shown side by
side and never averaged.

## The empty denominator

If `due = 0`, there is **no progress value**. Show "nothing due today", never 0%, never stage 1.
A student with no work assigned has not failed; blaming them for the coach's quiet week is the
fastest way to lose them.

This case is common — weekends, exam days, holidays — so handle it as a first-class state rather
than an edge case.

## Weekly

Same buckets aggregated over Monday–Sunday, `Europe/Istanbul`, reported per type ([[FR-14]]).
Weekly is the cadence a coach actually reviews in a session, so it should be the default view on
the coach's student detail screen.

## Monthly

The six counts required by §21, per type:

`tasksOnTime`, `tasksLate`, `tasksMissing`, `assignmentsOnTime`, `assignmentsLate`,
`assignmentsMissing`.

A single overall value is required by [[FR-14|FR-14.11]] but its formula is undefined
([[Open Questions|Q-02]]). **Do not invent one and ship it** — a parent will read it as a grade.
Until it is decided, report the six counts.

A plausible starting proposal, for the conversation:

```
overall = (onTime + 0.5 × late) / due
```

with tasks and assignments weighted equally. It has the right shape — late is worth something,
missing is worth nothing — but the weights are a product decision, not an engineering one.

## Topic progress (v2 §14.4)

A topic's percentage = completed plan tasks / all plan tasks for that topic and student
([[FR-14|FR-14.13]], [[FR-23]]). No separate module, no manual marking; it only counts plan-born
tasks.

## Implementation

One module in `packages/core` (domain rules live in `@sm/core`):

```
progress/
  buckets.ts     classify a work item into a bucket
  rates.ts       buckets → progress ratio
  filiz.ts       ratio → stage (thresholds from config)
  config.ts      every threshold and weight, in one object
```

API, web and mobile all import it. A stage computed on the phone must equal the stage computed in
a report — if two implementations exist, they will disagree, and the student will notice before we
do.

## Related

[[FR-08]] · [[FR-14]] · [[FR-06]] · [[FR-07]] · [[UX Principles]] · [[Open Questions]]
