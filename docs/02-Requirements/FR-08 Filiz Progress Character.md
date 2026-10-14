---
id: FR-08
aliases: [FR-08]
title: Filiz Progress Character
area: progress
source: "§10 · v2 §14.3"
status: specified
priority: should
updated: 2026-10-14
---

# FR-08 — Filiz (Progress Character)

> **Source:** catalog §10 · [[Source - Requirements v2 (TR)|v2]] §14.3 · **Decisions:** K-23, K-24 ·
> **Rules:** [[BR-005]]

## Intent

Filiz ("sprout") is the emotional layer over a dry completion percentage: a character that visibly
thrives when the student keeps up and wilts when they do not. It is the reason a 17-year-old opens
the app without being told to.

## Requirements

- **FR-08.1** The system represents the student's **daily** progress through a visual character or
  animation, currently named **Filiz**.
- **FR-08.2** Filiz has exactly **four** progress stages.
- **FR-08.3** Progress is computed **separately** for tasks and for assignments.
- **FR-08.4** There are therefore two Filiz instances, and they never influence each other: task
  progress does not move the assignment Filiz and vice versa.
- **FR-08.5** The four stages and their thresholds are **decided** (K-24) but remain a replaceable
  business rule defined in one place, never scattered constants:

  | Stage | Threshold (daily completion) | Feel (v2 §14.3) |
  | --- | --- | --- |
  | 1 | 0–24% | üzgün (sad) |
  | 2 | 25–74% | idare eder (getting by) |
  | 3 | 75–99% | mutlu (happy) |
  | 4 | 100% | kutlama (celebration) |

- **FR-08.6** Filiz's tone is **gentle and encouraging — a single variant**. No guilt-inducing
  wording or visuals: the audience is minors (K-23).
- **FR-08.7** Animation plays only in the **daily** view; weekly and monthly views show a static
  image (v2 §14.3).

## Acceptance criteria

- [ ] Changing the threshold configuration changes both Filiz stages with no other code change.
- [ ] A student who completed all tasks and no assignments sees a thriving task Filiz and a wilting
      assignment Filiz on the same screen.
- [ ] The stage shown matches the stage used in reporting — one function, one source of truth in
      `packages/shared`.

## Computation

Progress for a given day and type = `completed / due` over that day's items. Under the dispute model
([[BR-006]]) a submitted item is completed immediately, so the old "does pending count?" question
mostly dissolves — only **requires-approval** items can sit pending.

Still open (folded into the monthly-formula question, [[Open Questions|Q-02]]): whether a
requires-approval item pending at day's end counts as done, and whether a late submission repairs
that day's Filiz retroactively.

## Design notes

- **Never punish the student for the coach being slow.** For requires-approval items, proposed
  default: pending counts as done, and a later return reverts it — consistent with the dispute
  model's spirit.
- Four stages want four illustrations plus transitions; treat the transition (sprout growing) as the
  reward moment. See [[UX Principles]].
- Keep stage computation pure and shared so mobile, web and the API cannot disagree.

## Open questions

- [[Open Questions|Q-01]] — **answered** (K-24): thresholds 0–24 / 25–74 / 75–99 / 100, daily window.
- [[Open Questions|Q-02]] — edge cases of the daily/monthly computation.

## Related

[[FR-06]] · [[FR-07]] · [[FR-14]] · [[Progress and Filiz]] · [[UX Principles]]

## Change log

- 2026-10-14 — v2 integration: thresholds fixed (K-24), gentle single-variant tone (K-23),
  animation daily-only; still a replaceable rule in one module
- 2026-09-12 — created from catalog §10
