---
id: BR-028
aliases: [BR-028, İK-028]
source: "İK-028"
area: money
status: specified
updated: 2026-10-14
---

# BR-028 — Group lesson fees are per student and never split

**Rule.** A group lesson is **one** calendar record, but attendance and earnings are produced **per
participant**, each at that student's own group-lesson rate. There is no fee splitting.

**Why.** The price already belongs to the coach–student relationship ([[BR-020]]): 400 TL is not
"the group lesson's price", it is *that student's* group-lesson price. No splitting logic is ever
needed, every participant can be priced differently, and a no-show drops only that student's row.
(Decision K-04.)

**Enforcement.** `LessonParticipant` rows per student carry their own attendance; the earnings engine
produces one earning row per billable participant from that pair's rate (fee type = group).

**Verification.** A group lesson with three participants at three different rates produces three
earning rows at those rates; marking one participant `NO_SHOW` affects only that participant's row.

**Related.** [[FR-09]] · [[FR-19]] · [[BR-020]] · [[BR-023]]
