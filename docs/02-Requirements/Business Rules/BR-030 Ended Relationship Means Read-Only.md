---
id: BR-030
aliases: [BR-030, İK-030]
source: "İK-030"
area: relationships
status: specified
updated: 2026-10-30
---

# BR-030 — After the relationship ends, the coach's access is read-only

**Rule.** When a coach–student link ends, the coach keeps **read-only** access to the historical
records of that relationship — required for their earnings history — and can create nothing new for
that student: no tasks, assignments, lessons, files or notifications. The student continues to see
the files that coach shared and the resources they recommended.

**Why.** The earnings history must stay auditable by the coach who earned it; producing new content
for an ended relationship is meaningless. The student should not lose material they were given.
(Decision K-18; answers [[Open Questions|Q-07]].)

**Work left pending approval.** Read-only includes approving, so an item that was `PENDING_APPROVAL`
when the link ended **freezes there permanently** — not auto-approved, not auto-returned (owner,
2026-10-30; answers [[Open Questions|Q-17]]; see [[FR-04|FR-04.13]]). Statistics count it as not
completed, and it is neither late nor overdue ([[BR-010]] unaffected). Re-linking the same pair does
not reopen it: the new link is a separate record.

**Enforcement.** The policy layer distinguishes `ACTIVE` from `ENDED` links: `ENDED` grants the coach
read scopes over records created during the relationship and no write scopes. Student-side read
access to that coach's shares and recommendations does not depend on link status.

**Verification.** After ending a link: the coach can list past work, lessons and earnings for that
student; every create/update/approve call returns 404; the student still opens a previously shared
file and still sees the recommendation, attributed. An item that was pending approval still reads as
`PENDING_APPROVAL` and appears in no completed, late or overdue count.

**Related.** [[FR-04]] · [[BR-002]] · [[BR-010]] · [[BR-025]] · [[ADR-0008]] ·
[[Authorization Matrix]]
