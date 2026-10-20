---
id: BR-020
aliases: [BR-020, İK-020]
source: "İK-020"
area: money
status: specified
updated: 2026-09-12
---

# BR-020 — Each coach sets their own price per student

> [!info] v1.1 — the finance module is not built in v1
> Deferred 2026-10-20 ([[Scope and MVP]]). The rule stands and is binding the moment the
> module is built; there is simply nothing in v1 for it to govern.


**Rule.** A coach can set a separate price for each student. The price belongs to the coach–student
relationship, so a student working with several coaches has a different price with each.

**Why.** Pricing is negotiated per family and per coach. A price on the student record, or on the
coach record, would be wrong in both directions.

**Enforcement.** `CoachStudentRate` is keyed on `(coachId, studentId)`; there is no price column on
`Student` or `Coach`.

**Verification.** Two coaches set different prices for the same student, and neither can see the
other's.

**Related.** [[FR-18]] · [[BR-022]] · [[BR-024]]
