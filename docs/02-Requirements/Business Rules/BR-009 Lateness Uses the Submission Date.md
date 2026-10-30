---
id: BR-009
aliases: [BR-009, İK-009]
source: "İK-009"
area: work
status: specified
updated: 2026-10-30
---

# BR-009 — Lateness is measured by the student's submission time

**Rule.** On-time versus late is determined by when the **student submitted**, never by when the
coach approved. A coach approving days later does not make the student late.

**Which submission.** The **latest** one (decided 2026-10-30, [[Open Questions|Q-13]]). An item that
was submitted, returned and resubmitted is judged on the most recent `submittedAt` — the earlier
submissions stay in the history ([[FR-06|FR-06.19]]) but do not drive the status. An on-time
submission does not buy immunity for a late redo.

**Why.** The student controls only their own submission. Penalising them for a coach's response time
would make the whole statistic dishonest, and coaches would be blamed for it by parents.

**Enforcement.** The completion state is derived, not stored ([[ADR-0008]]):
`latest submittedAt <= dueAt + lateCutoff ? ON_TIME : LATE`, with the cutoff frozen onto the item at
creation ([[BR-027]]). `approvedAt` never enters any lateness comparison — this is worth a comment in
the code, because it looks like a bug to anyone who has not read this rule. Write "latest
submission" into the shared derivation once; a query that reaches for the first submission looks
right and disagrees with every other number on the screen.

**Verification.** Submitted 23:59 on the due date, approved three days later → `COMPLETED_ON_TIME`.
Submitted on time, returned, resubmitted a day past the cutoff → `COMPLETED_LATE`. A coach editing
the due date re-derives both answers, by design ([[FR-06|FR-06.24]]).

**Related.** [[FR-06]] · [[BR-006]] · [[BR-010]] · [[BR-027]] · [[ADR-0008]]
