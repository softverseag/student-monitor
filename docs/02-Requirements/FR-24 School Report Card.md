---
id: FR-24
aliases: [FR-24]
title: School Report Card
area: school
source: "v2 §13"
status: specified
priority: should
updated: 2026-10-14
---

# FR-24 — School Report Card (Okul Karnesi)

> **Source:** [[Source - Requirements v2 (TR)|v2]] §13 · **Decisions:** K-33

## Intent

The product runs *alongside* school, and the school report card is the concrete school-side datum a
parent cares about most. Deliberately tiny (K-33: "1–2 days of work"): no approval flow, no
notifications, no state machine — a per-term grade table the student fills in.

## Requirements

- **FR-24.1** A student can record a per-term grade table: school year, term (2 terms per year),
  subject–grade rows.
- **FR-24.2** The **student enters** the grades. There is **no approval flow**.
- **FR-24.3** All actively linked coaches can **view** the report card (it is the student's own data,
  visible under the see/manage split of [[BR-024]]).
- **FR-24.4** An approved parent can **view** it ([[FR-20]]) — read-only, like everything
  parent-facing.
- **FR-24.5** The grade scale (100-point vs 5-point) is undecided — [[Open Questions|Q-22]]. Store
  what the student enters; do not bake a scale into the schema until decided.

## Acceptance criteria

- [ ] A student can enter, edit and view grades for multiple terms and years.
- [ ] Coaches and parents can read but never write a grade.
- [ ] Report card data appears in no statistic, Filiz or progress figure — it is informational only.
- [ ] An unlinked coach or pending parent gets nothing.

## Open questions

- [[Open Questions|Q-22]] — grade scale (A-04).

## Related

[[FR-03]] · [[FR-20]] · [[BR-024]] · [[Requirements v2 Delta]]

## Change log

- 2026-10-14 — created from v2 §13 (new module in the October 2026 requirement set)
