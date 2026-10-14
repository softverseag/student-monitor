---
id: FR-09
aliases: [FR-09]
title: Lesson Scheduling
area: lessons
source: "§11, §12 · v2 §8"
status: specified
priority: must
updated: 2026-10-14
---

# FR-09 — Lesson Scheduling and Cancellation

> **Source:** catalog §11.1–11.3, §12 · [[Source - Requirements v2 (TR)|v2]] §8 · **Decisions:**
> K-03, K-04 · **Rules:** [[BR-011]], [[BR-012]], [[BR-013]], [[BR-028]]

## Intent

Lessons are the billable unit: a coach proposes a time, the student confirms, and what actually
happened feeds both the student's calendar and the coach's earnings. Asymmetric on purpose — the
coach drives scheduling, the student consents.

## Requirements

### Requesting

- **FR-09.1** **Only a coach** can create a lesson request. A student cannot request a lesson from a
  coach ([[BR-011]]).
- **FR-09.2** A coach can propose a lesson/meeting for a specific date and time to a linked student.
- **FR-09.3** A lesson request carries at least: student, coach, date, time, **lesson type**, topic,
  status.
- **FR-09.3a** Lesson types are at minimum: **one-on-one (birebir)**, **group (grup)** and **exam
  analysis (deneme analizi)** (v2 §8.1, K-03). Each type can be priced separately ([[FR-18]]).

### Student response

- **FR-09.4** The student can **accept** or **decline** the request.
- **FR-09.5** A lesson is not confirmed until the student accepts.
- **FR-09.6** An accepted lesson is added to the student's schedule ([[FR-11]]).
- **FR-09.7** When declining, the student may write an explanation — **optional**.
- **FR-09.8** The decline, and any explanation, is delivered to the requesting coach.

### Cancellation

- **FR-09.9** Once confirmed, **either** the coach or the student can cancel ([[BR-012]]).
- **FR-09.10** A cancellation may carry an explanation — **optional** ([[BR-013]]).
- **FR-09.11** The system records at least: who initiated the cancellation, when, and the
  explanation if given.
- **FR-09.12** A cancelled lesson is **not** counted as a delivered lesson and is **never billed**
  (v2 §8.3 — decided; regardless of who cancelled).

### Group lessons (v2 §8.4, [[BR-028]])

- **FR-09.13** A group lesson creates **one** calendar record with multiple participant students.
- **FR-09.14** Each participant gets their **own** accept/decline response, their own attendance
  record ([[FR-10]]) and their own earning row ([[FR-19]]).
- **FR-09.15** The fee is per student at that student's group rate — never split ([[BR-028]]).

## Acceptance criteria

- [ ] No API path lets a student create a lesson request, including by crafting the payload.
- [ ] A pending request does not appear in the student's schedule; an accepted one does.
- [ ] Cancelling records the initiator; both a coach-initiated and a student-initiated cancellation
      are distinguishable afterwards.
- [ ] Declining and cancelling both work with an empty note.
- [ ] A cancelled lesson never produces a billable timesheet entry — under any rule.
- [ ] A group lesson with three participants shows once in the coach's calendar and produces three
      independent participant records; one decline leaves the other two confirmed.

## State machine

`REQUESTED → ACCEPTED → (COMPLETED | CANCELLED)`, plus `DECLINED` from `REQUESTED`.
Attendance is recorded against `COMPLETED` — see [[FR-10]] and [[State Machines]].

## Design notes

- Overlap detection: the coach should be warned when proposing a time that collides with one of
  their own confirmed lessons. The student's other commitments are invisible to the coach by design
  ([[BR-014]]) — so the student must be able to see the conflict when accepting.
- Time zone is `Europe/Istanbul`; store UTC.
- Recurring lessons ("every Tuesday 19:00") are the obvious next request — [[Open Questions|Q-14]].

## Open questions

- [[Open Questions|Q-03]] — **answered** (v2 §8.3): a cancelled lesson is never billed, initiator
  irrelevant.
- [[Open Questions|Q-14]] — recurring lessons (still unaddressed in v2).
- [[Open Questions|Q-23]] — should two coaches be blocked from booking the same student at the same
  time? (A-05)

## Related

[[FR-10]] · [[FR-11]] · [[FR-19]] · [[BR-011]] · [[BR-012]]

## Change log

- 2026-10-14 — v2 integration: lesson types (one-on-one / group / exam analysis), group lessons with
  per-participant records ([[BR-028]]), cancellation billing decided (never billed)
- 2026-09-12 — created from catalog §11, §12
