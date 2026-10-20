---
id: FR-23
aliases: [FR-23]
title: Study Plans
area: work
source: "v2 §7"
status: specified
priority: must
updated: 2026-10-20
---

# FR-23 — Study Plans (Çizelge)

> **Source:** [[Source - Requirements v2 (TR)|v2]] §7 · **Decisions:** K-22, K-25, K-26 ·
> **Rules:** [[BR-024]], [[BR-027]]

## Intent

The client calls this **the most important part of v1**: the feature that directly saves the coach
time and justifies the subscription fee. A coach prepares a plan once — a tree of units, topics and
tasks — and assigns it to many students, instead of re-typing the same week for each of 30 students.

## Requirements

### Authoring

- **FR-23.1** A coach can create a reusable plan structured as **main unit → topic → task**.
- **FR-23.2** Each plan task carries a **day offset** (relative to the assignment start date) and a
  **duration**.
- **FR-23.3** The plan's level/tag is free text (e.g. "12. sınıf · YKS") — no curriculum taxonomy
  (K-25).
- **FR-23.4** Subject and topic values are free text with **autocomplete from the coach's own past
  entries**, so "Türev" does not fork into "Türev ve uygulamaları" and ruin topic percentages (K-25).
- **FR-23.11** A coach can **duplicate an existing plan** into a new, independent plan and edit it.
  The copy carries the whole tree; it is unlinked from the original, so editing either one never
  touches the other. This is how per-student variation is produced — a base plan plus a small
  deviation — since plans differ by grade, age and the individual student's weak spots, and there is
  no standard shape to import from.

### Assigning

- **FR-23.5** A plan can be assigned to **several students**, each with their own start date.
- **FR-23.6** During assignment, individual tasks can be removed per student (shortening the plan
  for that student).
- **FR-23.7** Assigned tasks are **copies** of the plan: editing the plan afterwards never changes
  work already assigned. (The same snapshot principle as [[BR-023]] and [[BR-027]].)
- **FR-23.8** Tasks created from a plan are ordinary tasks ([[FR-06]]): same statuses, lateness,
  dispute model, notifications and history. They record which plan/topic they came from.

### Downstream

- **FR-23.9** **Topic progress is derived from the plan**: a topic's completion percentage is the
  completion rate of the tasks attached to it (K-26). There is no separate topic-tracking module in
  v1; an independent curriculum module is `[V1.1]`.
- **FR-23.10** Plans are coach-owned content: invisible to other coaches of the same student
  ([[BR-024]]). Students see only the tasks assigned to them, never the plan library.

## Out of scope (v1)

- **Excel plan import** — `[V1.1]` (v2 §7). The plan editor covers the job. Reviewed 2026-10-20 and
  kept out: coaches' sheets have no shared shape, the sheets are date-based while plans are day-offset
  based, and a bulk import of free-text subjects/topics would poison the FR-23.4 autocomplete corpus
  that topic percentages depend on. Plan duplication (FR-23.11) is the cheap answer to the same need.
- **Bulk paste into the plan editor** (paste an indented/tab-separated list, parse it into the tree) —
  considered 2026-10-20 as a lighter alternative to Excel import and **dropped**: plans vary per
  student, so there is rarely a ready-made list to paste.
- Moving part of a plan (a single unit or topic subtree) into another plan — `[V1.1]`. Duplicating the
  whole plan and deleting what is not needed covers v1.
- Independent curriculum module (subject → unit → topic lists with manual state) — `[V1.1]`.

## Acceptance criteria

- [ ] A plan assigned to three students with different start dates produces three independent task
      sets whose due dates follow each student's start date plus the day offsets.
- [ ] Removing two tasks for one student during assignment affects only that student.
- [ ] Editing the plan after assignment changes no assigned task.
- [ ] A topic's progress percentage equals completed-plan-tasks / all-plan-tasks for that topic and
      student.
- [ ] Coach B cannot read or assign Coach A's plans (404), even for a shared student.
- [ ] Duplicating a plan produces a new plan with the same tree; editing the copy leaves the original
      unchanged, and editing the original leaves the copy unchanged.

## Design notes

- The plan tree is always loaded and edited as a whole; the client's technical plan stores it as one
  variable-structure document (`plan.tree`) plus a separate `plan_assignment` row per student — a
  reasonable shape; normalising the tree buys nothing in v1.
- The copy-on-assign step is where [[BR-027]]'s late cutoff and the task's plan/topic back-reference
  get stamped.

## Related

[[FR-06]] · [[FR-14]] · [[BR-024]] · [[BR-027]] · [[Requirements v2 Delta]]

## Change log

- 2026-10-20 — reviewed how a coach avoids rebuilding the same plan twice. Confirmed Excel import
  stays `[V1.1]`, dropped bulk paste outright, and added plan duplication (FR-23.11) as the v1
  answer. Moving a subtree between plans is `[V1.1]`.
- 2026-10-14 — created from v2 §7 (new module in the October 2026 requirement set)
