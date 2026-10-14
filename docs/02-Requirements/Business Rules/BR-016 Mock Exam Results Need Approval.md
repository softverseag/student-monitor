---
id: BR-016
aliases: [BR-016, İK-016]
source: "İK-016"
area: exams
status: specified
updated: 2026-10-14
---

# BR-016 — Mock exam results are not final until the coach approves

**Rule.** A mock exam result entered by a student is not a finalised result. It becomes final only on
coach approval.

**Why.** Results are self-reported and manually typed. Both honest mistakes and optimistic rounding
are routine; an unverified number would poison every trend the product exists to show.

**Enforcement.** `MockExamResult.status` starts `PENDING_APPROVAL` and moves to `APPROVED` or
`REJECTED` (v2 §10.3). Only the student-selected approver coach may decide ([[BR-031]]); the decision
records the coach and timestamp. What happens after a rejection is open ([[Open Questions|Q-25]]).

**Verification.** A freshly entered result is pending and marked as such in the student's own view.

**Related.** [[FR-15]] · [[BR-017]] · [[BR-031]]
