---
id: FR-22
aliases: [FR-22]
title: Subscription and Billing
area: platform
source: "§35 · v2 §20"
status: specified
priority: should
updated: 2026-10-14
---

# FR-22 — Subscription and Commercial Model

> **Source:** catalog §35 · [[Source - Requirements v2 (TR)|v2]] §20 · **Decisions:** K-28

## Intent

The coach is the customer. Students and parents use the platform free — which is also what makes the
product spread: every coach brings 30 students, and some of those students have another coach who is
not on the platform yet.

## Requirements

- **FR-22.1** The paying customer of the platform is the **coach**.
- **FR-22.2** Students and parents use the application without paying.
- **FR-22.3** **v1 is a free beta with an announced end date** (K-28) — no payment integration.
- **FR-22.4** A per-coach **active-student limit is enforced in code from day one**, so later
  package tiers mean something; the number is open ([[Open Questions|Q-21]], A-03).
- **FR-22.5** Billing goes live in v1.1, **tiered by active student count**; exact packages and
  prices are open ([[Open Questions|Q-10]], A-02).
- **FR-22.6** This subscription is a **separate concept** from the lesson price a coach sets for
  their own students ([[FR-18]]) — the platform never touches that money.
- **FR-22.7** **When a coach's subscription lapses, students and parents are never cut off** —
  their access degrades to read-only at worst (v2 §20.2).

## Acceptance criteria

- [ ] Subscription state is stored per coach and is enforceable at the API, not only in the UI.
- [ ] The active-student count is derivable at any moment from [[FR-04]] links.
- [ ] The active-student limit blocks the Nth+1 activation with a clear Turkish message; the number
      lives in configuration ([[Open Questions|Q-21]]).
- [ ] The beta end date is displayed, not hard-coded into behaviour.
- [ ] A lapsed subscription degrades gracefully: the coach keeps read access to history and cannot
      create new work. Students and parents are never locked out of their own data.

## Design notes

- Ship the *model* in v1 (a `Subscription` row per coach, plan, status, period end, student limit)
  and leave enforcement disabled. Retrofitting entitlements after launch means touching every
  endpoint; leaving a disabled check in place costs nothing.
- Payment provider for the Turkish market (iyzico, PayTR, Stripe where available) is a later
  decision — [[Open Questions|Q-10]]. App-store rules apply if the coach subscribes inside the
  mobile app; subscribing on the web avoids the platform cut.
- **Never lock a student out because their coach stopped paying.** The student's history is their
  own, and punishing them makes the free side worthless.

## Open questions

- [[Open Questions|Q-10]] — packages, prices, payment provider (A-02; v1.1).
- [[Open Questions|Q-21]] — the beta active-student limit (A-03).

## Related

[[FR-18]] · [[FR-04]] · [[Product Vision]]

## Change log

- 2026-10-14 — v2 integration: free beta with announced end date (K-28), enforced active-student
  limit from day one, v1.1 billing tiered by active students, lapse never locks out students/parents
- 2026-09-12 — created from catalog §35
