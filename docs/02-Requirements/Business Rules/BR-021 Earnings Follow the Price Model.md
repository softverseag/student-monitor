---
id: BR-021
aliases: [BR-021, İK-021]
source: "İK-021"
area: money
status: specified
updated: 2026-10-20
---

# BR-021 — Earnings derive from the source records of the price model

> [!info] v1.1 — the finance module is not built in v1
> Deferred 2026-10-20 ([[Scope and MVP]]). The rule stands and is binding the moment the
> module is built; there is simply nothing in v1 for it to govern.


**Rule.** What generates an earning depends on the relationship's price model:

- **Per-lesson (`ders başı`):** the source is the **delivered lesson records** — lessons whose
  attendance is `ATTENDED` (whether `NO_SHOW` bills is a per-coach setting, default open:
  [[Open Questions|Q-04]]). A cancelled lesson never bills.
- **Monthly flat (`aylık sabit`):** the source is the **period plus an active relationship**. The
  calendar then serves only continuity reporting and dispute evidence, not the amount.

**Why.** "Earnings come from the calendar" was written with only per-lesson pricing in mind; in the
monthly-flat model — the dominant model in Turkish coaching — it is simply wrong. The engine produces
*periods*, and the period's amount is computed per model. (Decisions K-02, K-05.)

**Enforcement.** The earnings engine is a pure function of (price model, period, lesson/attendance
records, applicable rate). Billability rules are a configuration table, not scattered `if`
statements. Each earning row snapshots its amount ([[BR-023]]).

**Verification.** For a per-lesson pair, the monthly total equals the sum over billable lessons at
their snapshotted rates. For a monthly-flat pair, a month with 2 lessons and a month with 8 lessons
produce the same amount, and the calendar still reports both counts.

**History.** The original İK-021 assumed the calendar as the only source. **Clarified in v2** when
the monthly-flat model was added (K-02, K-05).

**Related.** [[FR-19]] · [[FR-25]] · [[FR-10]] · [[BR-020]] · [[BR-023]] · [[BR-028]]
