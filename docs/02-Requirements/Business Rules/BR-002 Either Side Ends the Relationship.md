---
id: BR-002
aliases: [BR-002, İK-002]
source: "İK-002"
area: relationships
status: specified
updated: 2026-10-14
---

# BR-002 — Either side can end a coach–student relationship

**Rule.** Both the coach and the student can end an active coach–student relationship, **each on
their own — no parent approval is required** (confirmed in v2, decision K-17). Ending it never
deletes past data.

**Why.** Coaching relationships end, sometimes badly. Neither party should be trapped, and neither
should be able to erase the record.

**Enforcement.** `endLink` accepts either party as actor; the transition sets `ENDED` with
`endedBy` and `endedAt`. No cascade delete exists anywhere in the schema.

**Verification.** After a student ends the link, every past task, lesson and earning row still
exists and is still attributed.

**Related.** [[FR-04]] · [[BR-025]] · [[BR-030]]
