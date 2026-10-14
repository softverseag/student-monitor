---
id: FR-10
aliases: [FR-10]
title: Lesson Attendance
area: lessons
source: "§15 · v2 §8.5"
status: specified
priority: must
updated: 2026-10-14
---

# FR-10 — Lesson Attendance

> **Source:** catalog §15 · [[Source - Requirements v2 (TR)|v2]] §8.5 · **Decisions:** K-11 ·
> **Rules:** [[BR-021]], [[BR-028]]

## Intent

What was scheduled and what happened are different things. Attendance is the bridge between the
calendar and the money, and the answer to the parent's question "are the lessons actually
happening?".

## Requirements

- **FR-10.1** Attendance is tracked for lessons that have taken place.
- **FR-10.2** At least these states are supported:

  | Code | Turkish | Meaning |
  | --- | --- | --- |
  | `ATTENDED` | Katıldı | the lesson happened |
  | `NO_SHOW` | Katılmadı | the student did not attend |
  | `CANCELLED` | İptal | the lesson was cancelled |

- **FR-10.3** Each attendance record is linked to student, coach, lesson and date.
- **FR-10.4** Attendance records are one of the data sources for the timesheet/earnings system
  ([[FR-19]], [[BR-021]]).
- **FR-10.5** Attendance is recorded **only by the coach**, after the lesson (v2 §8.5).
- **FR-10.6** A corrected attendance record keeps its history — who changed it and when
  ([[FR-21]]) — because it changes money.
- **FR-10.7** In a group lesson, attendance is recorded **per participant** ([[BR-028]]).
- **FR-10.8** Attendance is **independent of the finance module and always on** (K-11): it is
  pedagogical data first, and it keeps working for coaches who never enable finance ([[FR-25]]).

## Acceptance criteria

- [ ] Every past confirmed lesson can be marked attended or no-show.
- [ ] A cancelled lesson carries attendance `CANCELLED` automatically; it is not left blank.
- [ ] Changing attendance from `ATTENDED` to `NO_SHOW` recalculates the earning under the configured
      rule and writes an audit entry.
- [ ] A parent can see attendance history for their student ([[FR-20]]).
- [ ] A student can see their own attendance, and no financial consequence of it ([[BR-022]]).

## Design notes

- Coaches will not mark attendance promptly unless prompted — surface "yesterday's lessons need a
  status" in the coach's follow-up view ([[FR-17]]).
- Unmarked past lessons should be visibly *pending*, never silently counted as attended, or the
  earnings figure becomes fiction.

## Related

[[FR-09]] · [[FR-19]] · [[FR-20]] · [[FR-17]] · [[BR-021]]

## Change log

- 2026-10-14 — v2 integration: coach-only marking after the lesson, per-participant attendance for
  group lessons, explicitly finance-independent (K-11)
- 2026-09-12 — created from catalog §15
