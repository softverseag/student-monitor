---
id: FR-19
aliases: [FR-19]
title: Timesheet and Earnings
area: money
source: "§29 · v2 §16.3"
status: deferred
priority: must
updated: 2026-10-20
---

# FR-19 — Timesheet (Puantaj) and Earnings (Hakediş)

> **Source:** catalog §29 · [[Source - Requirements v2 (TR)|v2]] §16.3 · **Decisions:** K-05 ·
> **Rules:** [[BR-021]], [[BR-022]], [[BR-023]], [[BR-028]], [[BR-029]]

> [!warning] Deferred to v1.1 — not built in v1
> The product owner took the **entire finance module out of v1** on 2026-10-20: handling other
> people's money carries legal and KVKK exposure worth slowing down for, and coaches already track
> fees their own way, so it is not urgent. v1 proves the coaching loop instead. This note stays
> **specified and unimplemented** — the thinking is done, the build is not. See [[Scope and MVP]].

## Intent

This is the coach's strongest reason to pay for the product: the month's income calculates itself
from lessons that actually happened, per student and in total, instead of being reconstructed from
memory at the end of the month.

## Requirements

- **FR-19.1** The system automatically calculates a coach's earnings per student. The source depends
  on the price model ([[BR-021]], K-05): **per-lesson** → delivered lesson records (attendance
  `ATTENDED`); **monthly flat** → the period plus an active relationship, with the calendar serving
  continuity reporting and dispute evidence only.
- **FR-19.2** In the per-lesson model, the calculation joins delivered lesson records with the price
  applicable to that student, lesson type and date.
- **FR-19.2a** A group lesson produces **one earning row per participant**, each at that student's
  own group rate ([[BR-028]]).
- **FR-19.3** A timesheet/earnings record is traceable with at least: student, coach, the related
  lesson(s), lesson date, applicable price, calculated amount.
- **FR-19.4** Only the owning coach and the student's approved parent(s) can view timesheet and
  earnings data ([[BR-022]]).
- **FR-19.5** The student cannot view earnings or price data — at all.
- **FR-19.6** Lesson/calendar records are the primary source of the calculation ([[FR-09]],
  [[FR-10]]).
- **FR-19.7** A **cancelled lesson is never billed** (v2 §8.3 — decided). Whether a `NO_SHOW` bills
  is a **per-coach setting**; its default is open ([[Open Questions|Q-04]], A-11).
- **FR-19.8** Changing a student's price later must **not** retroactively change the amounts already
  calculated for past lessons ([[BR-023]]). A lesson delivered at 500 TL stays 500 TL when the
  current price becomes 600 TL.
- **FR-19.9** A coach can view earnings **per student** and the **total across their whole student
  pool**, so they can do their own accounting. (Client addendum to §29.3.)
- **FR-19.10** Earnings can be viewed per period (month) with a breakdown by student and by lesson.
- **FR-19.11** Earnings are the **debit** side of the ledger; payments and the monthly statement
  live in [[FR-25]].
- **FR-19.12** The whole area is gated behind the opt-in finance module ([[BR-029]], [[FR-25]]).

## Acceptance criteria

- [ ] A lesson marked `ATTENDED` produces exactly one earning row with the rate in force on the
      lesson date, snapshotted onto the row.
- [ ] Raising the price afterwards leaves that row untouched; the next lesson uses the new price.
- [ ] A cancelled lesson produces no billable amount — under any configuration.
- [ ] Flipping the per-coach `NO_SHOW` rule changes future behaviour without rewriting history.
- [ ] A monthly-flat pair accrues the same amount in a 2-lesson month and an 8-lesson month.
- [ ] The coach's monthly total equals the sum of per-student totals, always.
- [ ] A student gets 404 on every earnings route.
- [ ] A parent sees only their own child's figures, never the coach's pool total.

## Implementation — the calculation

```
Lesson (ATTENDED)  ──►  TimesheetEntry  ──►  Earning
                          billable?           amountMinor
                          rule applied        rateSnapshotMinor
                                              rateId, lessonId, periodMonth
```

- The earning row stores `rateSnapshotMinor` **and** the `rateId` it came from. [[BR-023]] then
  holds even if someone later edits a rate row.
- Recalculation is allowed only when the underlying *fact* changes (attendance corrected), never
  when the *price* changes.
- Billing rules (per-lesson model):

  | Attendance | Billable | Note |
  | --- | --- | --- |
  | `ATTENDED` | yes | |
  | `NO_SHOW` | per-coach setting | default open — [[Open Questions|Q-04]] (A-11); placeholder default: billable |
  | `CANCELLED` | **no** | decided in v2, regardless of who cancelled |

- The pool total is a straightforward aggregate; it is coach-private and must never leak into a
  parent response.

## Open questions

- [[Open Questions|Q-03]] — **answered** (v2 §8.3): cancelled lessons never bill.
- [[Open Questions|Q-04]] — no-show billing: per-coach setting decided; the **default** is open
  (A-11).

## Related

[[FR-09]] · [[FR-10]] · [[FR-18]] · [[FR-20]] · [[FR-25]] · [[Pricing and Earnings]] · [[BR-023]]

## Change log

- 2026-10-20 — **deferred to v1.1** with the rest of the finance module (legal/KVKK caution, no urgent coach need). Scope decision, not a requirement change — the requirements below still stand. See [[Scope and MVP]].
- 2026-10-14 — v2 integration: earnings source per price model (K-05), per-participant group rows
  ([[BR-028]]), cancellation billing decided, no-show billing per-coach, gated behind the finance
  module
- 2026-09-12 — created from catalog §29 plus the client's addendum on pool totals
