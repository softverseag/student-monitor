---
id: FR-25
aliases: [FR-25]
title: Finance Module and Ledger
area: money
source: "v2 §16"
status: specified
priority: must
updated: 2026-10-14
---

# FR-25 — Finance Module and Ledger (Cari Hesap)

> **Source:** [[Source - Requirements v2 (TR)|v2]] §16 · **Decisions:** K-01, K-06–K-09, K-39, K-41 ·
> **Rules:** [[BR-022]], [[BR-029]]

## Intent

Pricing ([[FR-18]]) and earnings ([[FR-19]]) answer "what am I owed?". The ledger closes the loop
with "what was actually paid?" — without it the debt figure only grows and nobody looks at the
screen. And because many coaches work informally, the whole finance area is **opt-in and genuinely
deletable** ([[BR-029]]): a scared coach can still use the rest of the product.

## Requirements

### Module control

- **FR-25.1** The platform **never moves money**: no cards, no payment institution, no commission.
  It calculates and displays only (K-01).
- **FR-25.2** The finance module is **off by default** and enabled per coach. With it off, every
  other feature works fully ([[BR-029]]).
- **FR-25.3** Disabling the module offers a **"delete my data"** option that physically deletes the
  coach's finance data — the defined exception to [[BR-025]].
- **FR-25.4** The parent **finance visibility switch** ([[FR-20]]) is only effective while the coach
  has the module enabled.

### Ledger (cari hesap)

- **FR-25.5** Earnings are **debits**; payments the coach records manually (tahsilat) are
  **credits**; the difference is the **balance** (K-06).
- **FR-25.6** A payment record carries at least: coach, student, date, amount, optional note.
- **FR-25.7** The view is a **monthly statement** (ekstre): period debt, collected in the period,
  balance.
- **FR-25.8** The coach sees each student's figures separately **and** the total across their whole
  student pool (v2 §16.5).

### Security and honesty

- **FR-25.9** Finance data is stored encrypted on the server; the decryption key is held by the
  operator (K-08, "Kademe 1"). End-to-end encryption with the key held by the coach is `[V1.1]`.
- **FR-25.10** The coach is told honestly: *"Your financial data is stored encrypted. If a legal
  demand arrives we are obliged to open and provide it."* The product is never positioned as a
  tax-audit-evasion tool (K-08).
- **FR-25.11** Amounts never appear in logs, notification bodies, analytics events or search indexes
  (K-41).
- **FR-25.12** Access follows [[BR-022]]: the owning coach and the student's authorised parents
  only. The student never sees any of it; another coach of the same student never sees it
  ([[BR-024]]).

## Acceptance criteria

- [ ] With the module off: no finance endpoint responds for that coach, the parent finance switch is
      inert, and every non-finance feature passes its tests.
- [ ] Earnings of 4,000 TL and recorded payments of 2,500 TL in a month produce a statement with
      debt 4,000, collected 2,500, balance 1,500.
- [ ] The wipe removes every price, earning and payment row of that coach; lessons and attendance
      are untouched ([[FR-10]] is finance-independent, K-11).
- [ ] An audit event records enable/disable/wipe with actor and time — and contains no amount.
- [ ] No log line, push payload or analytics event anywhere contains an amount ([[FR-25.11]]) —
      enforced by a serializer test, not by review.

## Design notes

- The client's technical plan isolates finance in its own DB schema with **no foreign keys from the
  app schema and no joins on amounts** (K-39) — this is what makes both the wipe and a future
  encryption upgrade cheap. Carry this into [[Data Model]] when Prisma lands.
- Encrypted amount fields cannot be `SUM`-med server-side; totals are computed after decryption
  (client of the DB, not the DB itself).
- Money stays integer minor units + currency code, as everywhere ([[FR-18]]).

## Open questions

- [[Open Questions|Q-04]] — whether `NO_SHOW` bills: per-coach setting; the **default** is open
  (A-11).

## Related

[[FR-18]] · [[FR-19]] · [[FR-20]] · [[BR-022]] · [[BR-029]] · [[Pricing and Earnings]] ·
[[Security and Privacy]]

## Change log

- 2026-10-14 — created from v2 §16 (ledger, module opt-in, encryption posture are new in the
  October 2026 requirement set)
