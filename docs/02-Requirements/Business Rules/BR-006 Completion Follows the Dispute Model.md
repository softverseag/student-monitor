---
id: BR-006
aliases: [BR-006, İK-006]
source: "İK-006"
area: work
status: specified
updated: 2026-10-14
---

# BR-006 — Completion follows the dispute model

**Rule.** By default, a student's "done" **completes the item immediately** and it enters the
statistics. The assigning coach can send it back afterwards; the return reverts the statistics.
**Exception:** the coach can mark an item **"requires approval"** at creation — those items stay
pending on submission and close only when the assigning coach approves.

**Why.** If every item waited for approval, a coach with 30 students would face hundreds of approval
clicks a day; within two weeks they either blind-approve (the data becomes meaningless) or quit the
app. The coach keeps control where it matters by choosing the exception per item — the coach picks
the rule, not the system. (Decisions K-13, K-14.)

**Enforcement.** `submit()` transitions directly to a `COMPLETED_*` status when
`requiresApproval = false`, and to `PENDING_APPROVAL` when `true`. A return path exists from both
completed and pending states, restricted to the assigning coach ([[BR-007]]). On-time vs late is
always derived from `submittedAt` ([[BR-009]]), so the dispute model never changes lateness.

**Verification.** Submitting a default item immediately counts it as completed in the day's
statistics; submitting a flagged item does not. A later return removes the item from the completed
bucket and the history shows both events.

**History.** The original İK-006 said a student's "done" never closes the item. **Reversed in v2**
(October 2026) after the approval-queue cost became clear — see [[Source - Decision Log (TR)]] K-13
and [[Requirements v2 Delta]].

**Related.** [[FR-06]] · [[BR-007]] · [[BR-009]] · [[BR-027]]
