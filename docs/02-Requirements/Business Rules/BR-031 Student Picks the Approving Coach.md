---
id: BR-031
aliases: [BR-031, İK-031]
source: "İK-031"
area: exams
status: specified
updated: 2026-10-14
---

# BR-031 — The student picks the coach who approves an exam result

**Rule.** When submitting a mock exam result, the student chooses **which of their active coaches**
will approve it. With exactly one active coach, that coach is assigned automatically and no picker is
shown.

**Why.** The exam result is the *student's* data; no coach owns it, so the student decides who
verifies it. This is the pattern for every student-initiated approval flow. (Decision K-21.)

**Enforcement.** `MockExamResult.approverCoachId` is set at submission to one of the student's active
coaches. Only that coach can approve or reject; every other coach gets 404 on the approval route
(consistent with [[BR-024]] error behaviour).

**Verification.** For a student with coaches A and B who picked A: B's approve and reject calls
return 404; A's succeed and are recorded with coach and timestamp.

**Related.** [[FR-15]] · [[BR-016]] · [[BR-007]]
