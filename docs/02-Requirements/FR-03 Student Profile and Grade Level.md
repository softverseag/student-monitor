---
id: FR-03
aliases: [FR-03]
title: Student Profile and Grade Level
area: identity
source: "§3.4"
status: specified
priority: must
updated: 2026-10-30
checkedBy:
  - Batuhan Elmas
---

# FR-03 — Student Profile and Grade Level

> **Source:** catalog §3.4 · **Rules:** [[BR-026]]

## Intent

A student's grade level is the single piece of academic context everything else leans on — which
exam they are preparing for, what a coach should assign, which resources make sense.

## Requirements

- **FR-03.1** A student's current grade level is stored on their profile.
- **FR-03.2** Any coach actively linked to the student can view it.
- **FR-03.3** It can be updated — by the student, and by a linked coach.
- **FR-03.4** Grade level is available as context to tasks, assignments, lessons, resources and mock
  exams; it is not duplicated onto those records.
- **FR-03.5** The profile also holds the exam track the student is preparing for, because grade
  alone does not determine it. The list is fixed (decided 2026-10-20):

  | Value | Who |
  | --- | --- |
  | `LGS` | grades 5–8 |
  | `YKS_SAYISAL` | grades 9–12 and *mezun* |
  | `YKS_ESIT_AGIRLIK` | grades 9–12 and *mezun* |
  | `YKS_SOZEL` | grades 9–12 and *mezun* |
  | `YKS_DIL` | grades 9–12 and *mezun* |
  | `BELIRSIZ` | "henüz belli değil" — mostly grades 9–10 |

  Two things this list deliberately encodes:

  - **`BELIRSIZ` exists and is a valid long-term state.** A 9th or 10th grader has usually not
    chosen a field yet. Without this value a coach picks one at random to get past the form, and
    nobody ever corrects it — which poisons resource recommendations ([[FR-12]]) and reporting.
  - **The label says YKS, not AYT.** The field choice only applies to AYT, but TYT is common to every
    YKS candidate; naming the values `AYT_*` would read as "TYT is not covered here".

- **FR-03.6** Grade level is **never updated automatically** (decided 2026-10-20). There is no
  September rollover job and no prompt. The student or a linked coach changes it by hand
  (FR-03.3).

## Acceptance criteria

- [ ] A coach sees the grade level of every actively linked student, and of no one else.
- [ ] Updating grade level writes an audit entry ([[FR-21]]).
- [ ] Values are a controlled list, not free text, so reporting can group by them.

## Design notes

- Grade levels to support: 5–12, plus *mezun* (graduate re-taker) — a significant segment in Turkish
  exam prep that a naive 1–12 enum would exclude.
- Grade and exam track are **almost** derivable from each other — 5–8 sit the LGS, 9–12 and *mezun*
  sit the YKS — but not quite, which is why both are stored. Do not derive one from the other.
- **TYT vs AYT is not a profile concept.** It belongs to the mock exam record, where the net formula
  differs per exam type ([[FR-15]], [[BR-019]]). The profile only answers "which AYT field".
- **Why FR-03.6 is manual** (the owner's reasoning, 2026-10-20): a yearly `gradeLevel + 1` is wrong
  for every student who does not move up. Some repeat the year. A 12th grader may graduate, may
  carry on as *mezun*, or may stop. And the general point: **we cannot enumerate today every
  situation a real student will be in**, so the rule stays dumb and a human stays in charge. An
  automatic rule would have to be right about cases we have not thought of yet.
- **Accepted cost:** every September a batch of students shows last year's grade until someone edits
  it. A coach sees the grade on the student's profile and can fix it, so the error is visible and
  cheap to correct.

## Open questions

None. The exam-track list and the September-rollover behaviour were both decided on 2026-10-20.

## Related

[[FR-01]] · [[FR-04]] · [[FR-15]] · [[BR-026]]

## Change log

- 2026-10-30 — read in full and approved by Batuhan Elmas (`checkedBy`). No requirement changed;
  the note had no open questions left after the 2026-10-20 decisions.
- 2026-10-20 — two gaps closed by the product owner: the exam-track list is fixed with a `BELIRSIZ`
  value and YKS-prefixed labels (FR-03.5), and grade level is **never** auto-updated — no September
  prompt, manual edit only (FR-03.6).
- 2026-09-12 — created from catalog §3.4
