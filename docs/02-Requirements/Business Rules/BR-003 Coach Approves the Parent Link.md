---
id: BR-003
aliases: [BR-003, İK-003]
source: "İK-003"
area: relationships
status: specified
updated: 2026-10-14
---

# BR-003 — A parent link is active only after coach approval

**Rule.** A parent can create their own account and request a link to a student (by entering the
student's code), but the parent–student relationship becomes active **only** when the student's coach
approves it. When the student has several coaches, **any** of them may approve (v2 §4.2); the
approver is recorded.

**Why.** Students are minors. The coach is the accountable professional deciding who may see a
child's data — not the child, and not whoever claims to be a parent.

**Enforcement.** `ParentStudentLink` starts `PENDING_COACH_APPROVAL`; every parent-facing query
filters on `status = ACTIVE`. The approving coach and timestamp are recorded.

**Verification.** A pending parent receives no student data from any endpoint.

**Related.** [[FR-05]] · [[FR-20]] · [[BR-004]]
