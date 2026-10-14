---
id: BR-024
aliases: [BR-024, İK-024]
source: "İK-024"
area: authorization
status: specified
updated: 2026-10-14
---

# BR-024 — One coach cannot manage another coach's content

**Rule.** When a student works with several coaches, data ownership is preserved through the
**see / manage split** (v2 §3.4, K-20):

- The student's **own** data — resource pool, exam results, report card, topic progress — is visible
  to **all** active coaches.
- Coach-produced **tasks and assignments** are visible to the student's other active coaches
  (labelled with the originating coach) but are **managed only by the coach who created them**:
  no approving, editing, returning or deleting.
- A coach's **lessons, files, notifications, prices and earnings** are entirely **invisible** to the
  student's other coaches.

**Why.** Coaches are independent professionals who happen to share a student. Leaking between them is
both a privacy breach and a commercial one — and without the written see/manage rule, the obvious UI
(one task list, an "approve" button per row) leads a developer to let Coach B approve Coach A's work,
silently corrupting Coach A's tracking ([[BR-007]]).

**Enforcement.** Every coach-owned row carries `coachId`. Reads of work items scope to the student's
active links; every *management* action and every read of lessons/files/notifications/money filters
on both `studentId` **and** `coachId`, resolved in one central policy layer rather than per
controller ([[ADR-0006]]). Requests for invisible rows return 404, not 403, so existence is not
leaked.

**Verification.** A dedicated test suite for a student shared by two coaches: Coach B can list
Coach A's assignment with attribution but gets 404 on approve, update and delete; for lessons,
files, notifications, prices and earnings, Coach B gets 404 on read as well, including list filters.

**Related.** [[FR-02]] · [[FR-04]] · [[BR-007]] · [[Authorization Matrix]]
