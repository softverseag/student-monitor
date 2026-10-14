---
title: Authorization Matrix
status: draft
updated: 2026-10-14
---

# Authorization Matrix

The concrete form of [[FR-02]], catalog §32–§33 and v2 §3.4/§18. **Enforced in the backend** — the
UI only mirrors it.

v2 makes the **see / manage split** explicit ([[BR-024]], K-20): the student's own data is visible
to all active coaches; coach-produced tasks/assignments are visible to other coaches but managed only
by their owner; a coach's lessons, files, notifications and money are invisible to other coaches.
Every policy decision resolves the quintuple **actor · role · target student · relationship status ·
content ownership** (v2 §2.3) — plus, for finance, whether the module and the visibility switch are
on.

Columns:

- **Student** — the student the data belongs to
- **Coach (owner)** — an actively linked coach who created the item
- **Coach (other)** — an actively linked coach who did *not* create it
- **Parent** — an approved, active parent of that student
- **Anyone else** — including unlinked coaches, pending parents, other students

`R` read · `W` create/update · `—` no access

| Resource | Student | Coach (owner) | Coach (other) | Parent | Anyone else |
| --- | --- | --- | --- | --- | --- |
| Own profile | R W | R W | — | R W (own) | — |
| Student grade level | R W | R W | R W | R | — |
| Coach–student link | R W (end) | R W (end) | — | R | — |
| Parent–student link | R | R W (approve) | R W (approve) | R (own) | — |
| Task / assignment | R, submit | R W, approve/return | **R (labelled, no manage)** | R¹ (summary only) | — |
| Work item history | R | R | — | R¹ | — |
| Study plan ([[FR-23]]) | — (sees assigned copies) | R W | — | — | — |
| Lesson request | R, accept/decline | R W | — | R¹ | — |
| Lesson cancellation | W | W | — | — | — |
| Attendance | R | R W | — | R¹ | — |
| Personal schedule (school, personal) | R W | **—** | **—** | — | — |
| Schedule: own lessons | R | R | — | — | — |
| Resource pool | R W | R | R | R¹ | — |
| Resource recommendation | R | R W | — | — | — |
| Shared file | R (if shared) | R W | — | — | — |
| Mock exam result | R W, picks approver | R; approve/reject **if selected** ([[BR-031]]) | R; approve only if selected | R¹ (approved only) | — |
| School report card ([[FR-24]]) | R W | R | R | R | — |
| Progress / statistics | R (own) | R (own items) | R (own items) | R¹ | — |
| Price | **—** | R W² | — | R¹ ² | — |
| Timesheet / earnings | **—** | R² | — | R¹ ² | — |
| Payment / ledger ([[FR-25]]) | **—** | R W² | — | R¹ ² | — |
| Coach's pool total earnings | — | R (own)² | — | **—** | — |
| Visibility switches ([[FR-20]]) | — | R W (own links) | — | — | — |
| Reminder prefs / quiet hours | R W | — | — | — | — |
| Notification | R (own) | R W (to own students) | — | R (own) | — |
| Notification template | — | R W (own) | — | — | — |
| Audit log | — | — | — | — | — (support only) |

¹ Only if the coach has opened that switch to the parent — progress / exams / finance ([[FR-20]],
K-29).
² Only while the coach's finance module is enabled ([[BR-029]], [[FR-25]]).

## The five bolded cells

Those are the ones the catalog states explicitly and the ones a careless join will break:

1. **Coach cannot read the personal schedule** — [[BR-014]]. Not school hours, not personal events,
   not free time. Only their own lessons.
2. **Student cannot read price** — [[BR-022]].
3. **Student cannot read earnings** — [[BR-022]].
4. **Parent cannot read the coach's pool total** — that is the coach's business across other
   families ([[FR-19|FR-19.9]]).
5. **Coach (other) manages nothing of another coach's** — [[BR-024]]. Since v2 they may *see*
   tasks/assignments (labelled), which makes the trap worse: the list renders, so a careless UI adds
   an "Approve" button and a careless endpoint honours it (K-20's exact warning).

## Rules of enforcement

1. Resolve the caller's **capabilities** once per request (which students, in which capacity), then
   scope every query with it. Do not re-derive permissions per controller.
2. Rows the caller cannot see return **404, not 403** — otherwise the API confirms that Coach B has
   a task with that id.
3. Never share a serializer between a coach response and a student response for anything containing
   money.
4. Every list endpoint gets a negative test. Positive tests do not catch leakage.
5. `ENDED` links grant no writes. The coach keeps read-only access to that relationship's history;
   the student keeps that coach's shared files and recommendations ([[BR-030]]).
6. The guard protects single records; a mandatory repository-level scope filter protects lists.
   **Both are required** (v2 technical plan §3) — the guard alone leaks through list endpoints.

## Related

[[FR-02]] · [[BR-024]] · [[BR-022]] · [[BR-014]] · [[Domain Model]]
