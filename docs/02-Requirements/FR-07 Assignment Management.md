---
id: FR-07
aliases: [FR-07]
title: Assignment Management
area: work
source: "§9 · v2 §5"
status: specified
priority: must
updated: 2026-10-14
---

# FR-07 — Assignment Management (Ödev)

> **Source:** catalog §9 · [[Source - Requirements v2 (TR)|v2]] §5 · **Rules:** [[BR-005]]

## Intent

"Görev" (task) and "ödev" (homework/assignment) are two different things to a Turkish coach: a task
is any piece of coaching work — read this, plan your week, fix your sleep schedule — while an
assignment is concrete academic homework. Students and parents think about them separately, and so
must the statistics.

Behaviourally they are identical.

## Requirements

- **FR-07.1** Tasks and assignments are managed as **independent content types** ([[BR-005]]).
- **FR-07.2** A coach can assign an assignment to any actively linked student.
- **FR-07.3** Every rule defined for tasks applies unchanged to assignments: assigning coach, due
  date, the dispute model and requires-approval flag ([[BR-006]]), return with optional note, frozen
  late cutoff ([[BR-027]]), on-time/late/overdue handling, action history, notifications,
  multi-coach support.
- **FR-07.4** Task progress and assignment progress are calculated **separately** and never mixed.
- **FR-07.5** The two types differ only in their **type-specific fields** (v2 §5, K-22): a task may
  carry a plan link, time-of-day, duration and repetition ([[FR-23]]); an assignment may carry a
  **resource** — selectable from the student's resource pool ([[FR-12]]) — and a hand-in date.
- **FR-07.6** Where a task comes from the daily plan (çizelge), an assignment is work given after a
  lesson — the *origin* differs, the lifecycle does not.

## Acceptance criteria

- [ ] Every acceptance criterion in [[FR-06]] passes for assignments too.
- [ ] Daily/weekly/monthly statistics report tasks and assignments as separate figures
      ([[FR-14]]).
- [ ] Completing all tasks while ignoring all assignments leaves the assignment Filiz at its lowest
      stage ([[FR-08]]).

## Implementation note

One `WorkItem` table with a `type` discriminator (`TASK` | `ASSIGNMENT`), not two parallel tables —
the rules are identical and duplicating them guarantees they will drift. All statistics group by
`type`. Rationale and the rejected alternatives: [[ADR-0005]] — independently reached by the client
team in v2 (K-22: one entity, a `tip` field, type-specific optional fields).

The separation the client asks for is a *product* separation (separate lists, separate progress,
separate Filiz), and it must hold at every surface even though the storage is shared.

## Related

[[FR-06]] · [[FR-08]] · [[FR-14]] · [[ADR-0005]] · [[BR-005]]

## Change log

- 2026-10-14 — v2 integration: type-specific fields (resource from pool, hand-in date), dispute
  model inherited from [[FR-06]], single-entity decision confirmed by K-22
- 2026-09-12 — created from catalog §9
