---
title: Requirements v2 Delta
status: integrated
received: 2026-10-14
updated: 2026-10-14
---

# Requirements v2 Delta — October 2026

In October 2026 the client delivered an updated document set (`kocluk-app/docs`): a revised
requirement text, a decision log of 43 decisions, and a technical plan. All three are preserved
verbatim:

- [[Source - Requirements v2 (TR)]] — the requirements, every item tagged `[V1]` / `[V1.1]` / `[AÇIK]`
- [[Source - Decision Log (TR)]] — decisions `K-01`..`K-43` with rationale, open items `A-01`..`A-11`
- [[Source - Backend Plan (TR)]] — modules, schema, build order (**input, not accepted architecture**
  — see [[Open Questions|Q-26]])

This note is the integration map: what changed, where it landed, and what is still unresolved.

## The headline change: the dispute model

**İK-006 reversed.** Originally a student's "done" never closed work; now it **completes the item
immediately** and the coach disputes afterwards, with a per-item "requires approval" flag as the
exception (K-13, K-14). Rewritten as [[BR-006]]; [[FR-06]], [[FR-07]], [[FR-08]], [[FR-14]],
[[State Machines]] and `CLAUDE.md` updated to match. **Any code built against the old rule must be
revisited.**

## Business rule changes (v2 §21)

| İK | Change | Landed in |
| --- | --- | --- |
| İK-006 | **Reversed** — dispute model by default | [[BR-006]] |
| İK-017 | **Reopened** — do unapproved exam results enter statistics? (A-01) | [[BR-017]] under review, [[Open Questions|Q-20]] |
| İK-019 | Extended — net auto-calculates per exam type from v1 (K-30) | [[BR-018]], [[BR-019]] |
| İK-021 | Clarified — earnings source depends on the price model (K-02, K-05) | [[BR-021]] |
| İK-025 | Exception — finance data may be truly deleted (K-09) | [[BR-025]], [[BR-029]] |
| İK-027 | **New** — late cutoff copied onto the item and frozen (K-19) | [[BR-027]] |
| İK-028 | **New** — group lesson fees per student, never split (K-04) | [[BR-028]] |
| İK-029 | **New** — finance module opt-in, default off, deletable (K-07, K-09) | [[BR-029]] |
| İK-030 | **New** — post-relationship access is read-only (K-18) | [[BR-030]] |
| İK-031 | **New** — student picks the exam-result approver (K-21) | [[BR-031]] |

All other İK rules carried over unchanged ("korundu").

## New functional areas

| FR | Area | From |
| --- | --- | --- |
| [[FR-23]] | Study plans (çizelge): prepare once, assign to many — "v1's most important module" | v2 §7 |
| [[FR-24]] | School report card (okul karnesi) | v2 §13 |
| [[FR-25]] | Finance module controls + ledger (cari hesap): payments, balance, monthly statement, opt-in, real delete, encryption posture | v2 §16 |

## Materially updated FR notes

[[FR-04]] (post-end read-only, QR → v1.1) · [[FR-05]] (any coach approves) · [[FR-06]] (dispute
model, bulk approval, frozen cutoff) · [[FR-07]] (type-specific fields) · [[FR-08]] (thresholds
0–24/25–74/75–99/100 fixed, gentle single-variant tone) · [[FR-09]] (lesson types, group lessons,
cancelled never bills) · [[FR-10]] (coach-only, finance-independent) · [[FR-11]] (**cut**: read-only
timeline + school-hours setting; grid → v1.1) · [[FR-12]] (pool fields, assignment picks from pool) ·
[[FR-13]] (**narrowed**: PDF only, 25 MB, coach→student) · [[FR-14]] (topic % from plans) ·
[[FR-15]] (auto net, `REJECTED`, student-picked approver) · [[FR-16]] (task-time reminders, quiet
hours, template audience, rate limit) · [[FR-18]] (two price models, per-lesson-type amounts) ·
[[FR-19]] (model-dependent earnings source) · [[FR-20]] (three visibility switches) · [[FR-22]]
(free beta, enforced student limit).

## Open questions: answered and added

Answered by v2: Q-01, Q-03, Q-05, Q-06, Q-07, Q-09, Q-11, Q-15, Q-16, Q-18.
Added from `A-xx`: Q-20 (A-01), Q-21 (A-03), Q-22 (A-04), Q-23 (A-05), Q-24 (A-07), Q-25 (A-08),
plus Q-26 (architecture conflicts). Still open with new context: Q-02 (A-09), Q-04 (A-11), Q-10
(A-02), Q-12 (A-06 — **must be resolved before the first real user**).
Details: [[Open Questions]].

## Conflicts with the existing architecture — not silently adopted

The technical plan makes choices that contradict accepted ADRs. Per our working rule, **existing
ADRs stand until explicitly superseded**; the conflict was parked as [[Open Questions|Q-26]]. The
platform row closed on 2026-10-20 ([[ADR-0017]]); the rest is still parked:

| v2 plan says | We currently have | Where |
| --- | --- | --- |
| ~~Single responsive **PWA**, no store apps (K-27)~~ **resolved 2026-10-20 — rejected** | Expo mobile app for all three roles + a coach-only web portal | [[ADR-0017]] |
| Self-managed **JWT** + Resend e-mail (K-38) | **Clerk** identity | [[ADR-0012]] |
| Neon Postgres, Heroku/Render, Cloudflare R2, separate `worker` process | local Postgres via Docker; deployment undecided | [[Tech Stack]] |
| Repo `kocluk-app` under `softverseag` or personal account (A-10) | this repo (`student-monitor`) | — |

Technical content from the plan that does **not** conflict was adopted into the domain notes:
the policy quintuple and guard + repository-scope double enforcement ([[Authorization Matrix]]),
finance schema isolation and the no-amounts-in-logs rule (K-39, K-41 → [[FR-25]], [[Domain Model]]),
snapshot freezing (K-40 → [[BR-023]], [[BR-027]]), pure single-place calculation modules (K-42,
matching our existing rule), and the authorization-matrix test suite as the highest-value tests
(K-43, matching our definition of done).

## Follow-ups this note does not do

1. **[[Roadmap]] / [[Milestones]] / task notes are not yet reconciled** with the v2 build order
   (Faz 0–7 in [[Source - Backend Plan (TR)]]) or the new v1 scope (plans, finance module, report
   card). Needs a delivery-planning pass.
2. **[[Data Model]] and [[Tech Stack]]** wait on [[Open Questions|Q-26]] before absorbing the
   plan's schema and stack specifics.
3. The client flags **adult–minor safety** (complaint/blocking, file oversight) as a legal
   necessity (v2 §23.2) — currently only noted in [[Scope and MVP]]; needs a requirement of its own
   once scoped.

## Related

[[Scope and MVP]] · [[Requirements Index]] · [[Business Rules Index]] · [[Open Questions]]
