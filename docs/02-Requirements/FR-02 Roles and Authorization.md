---
id: FR-02
aliases: [FR-02]
title: Roles and Authorization
area: identity
source: "§3.3, §32, §33 · v2 §2.3, §3.4, §18"
status: specified
priority: must
updated: 2026-10-19
checkedBy:
  - Batuhan Elmas
---

# FR-02 — Roles and Authorization

> **Source:** catalog §3.3, §32, §33 · [[Source - Requirements v2 (TR)|v2]] §2.3, §3.4, §18 ·
> **Decisions:** K-20 · **Rules:** [[BR-022]], [[BR-024]], [[BR-030]]

> [!check] Reviewed and approved — 2026-10-19, Batuhan Elmas
> Read in full. The model — authorize by role **and** relationship, in the backend, through one
> central policy point — is accepted as it stands. No reservation on it, and nothing here is
> deferred to an open question.
>
> **One correction made during the review:** FR-02.7 said a parent sees "the progress data the
> coach has opened to them, **plus** that student's price and earnings", which put money *outside*
> the opened-category gate and contradicted both [[FR-20|FR-20.3]] (finance is one of three
> switches, off by default) and [[FR-25|FR-25.4]] (the switch is inert unless the coach enabled
> the finance module). The note also contradicted itself — its own acceptance criterion already
> says "only the opened categories". The v2 pass updated FR-02.4/.4a and missed .7.
>
> This is a consistency fix, **not a new decision**: the rule it now states was already decided in
> K-29 and [[BR-029]]. Flagged here rather than applied silently, because it narrows what a parent
> can see.

## Intent

Three roles, and within each role, access is further narrowed by *relationship*. Being a coach does
not grant access to students; being the coach of Mert grants access to Mert's coaching data — and
only the part this coach owns.

This is the requirement most likely to be violated by a careless query. Treat every list endpoint as
a security decision.

## Requirements

- **FR-02.1** The system enforces permissions by role **and** by relationship.
- **FR-02.2** Authorization is enforced in the backend, not only in the UI. A hidden button is not
  a permission ([[BR-024]]).
- **FR-02.3** A coach may only access data for students they are **actively linked** to (an ended
  link degrades to read-only over its own history, [[BR-030]]).
- **FR-02.4** The **see/manage split** ([[BR-024]], v2 §3.4): the student's own data (pool, exam
  results, report card, topic progress) is visible to all active coaches; coach-owned
  tasks/assignments are visible to other coaches but managed only by their owner; a coach's lessons,
  files, notifications, rates and earnings are invisible to other coaches.
- **FR-02.4a** Every authorization decision resolves the quintuple **actor, role, target student,
  relationship status, content ownership** in one central policy point (v2 §2.3) — plus the module
  and visibility switches for finance ([[FR-25]], [[FR-20]]).
- **FR-02.5** A student may access their own tasks, assignments, schedule, lesson requests, progress
  history, mock exam results, resource pool, recommendations and files shared with them.
- **FR-02.6** A student may **never** access price or earnings data ([[BR-022]]).
- **FR-02.7** A parent may access only an approved, active linked student, and only the categories
  the coach has opened to them — progress, exams, finance ([[FR-20|FR-20.3]]). **Nothing is open by
  default.** The finance category additionally requires the coach to have the finance module
  enabled; with the module off the switch is inert ([[FR-25|FR-25.4]], [[BR-029]]).
- **FR-02.8** A parent has no management rights over the student's or the coach's data.
- **FR-02.9** Requests for rows the caller cannot see return "not found" rather than "forbidden", so
  the API does not leak the existence of another coach's data.

## Acceptance criteria

- [ ] Coach B can list Coach A's task for a shared student (labelled with its origin) but cannot
      update, approve, return or delete it — by id, by list, by any filter.
- [ ] Coach B cannot read Coach A's lessons, files, notifications, prices or earnings at all — 404
      on every route.
- [ ] A student calling the pricing or earnings endpoints gets 404 regardless of parameters.
- [ ] A parent whose link is `PENDING` gets nothing; the same parent after coach approval gets only
      the opened categories.
- [ ] An approved parent with the finance switch **on** but the coach's finance module **off** sees
      no price or earnings anywhere ([[FR-02|FR-02.7]], [[FR-25|FR-25.4]]).
- [ ] An ended coach–student relationship stops new writes; the coach keeps read-only access to
      its history ([[BR-030]]).
- [ ] Every list endpoint has a test proving cross-tenant leakage fails.

## Implementation notes

- Every coach-owned table carries `coachId`; management and money/file/lesson reads filter on both
  `studentId` and `coachId`.
- Centralise this: a policy/guard layer that resolves "which students may this caller see, in which
  capacity" once per request, rather than ad-hoc `where` clauses per controller. See [[ADR-0006]].
- The guard protects single records; a mandatory repository-level scope filter protects lists — both
  are required (v2 technical plan §3).
- Consider Postgres row-level security as defence in depth later; application-level scoping first.

## Related

[[Authorization Matrix]] · [[BR-024]] · [[BR-022]] · [[FR-04]] · [[FR-05]] · [[FR-21]]

## Change log

- 2026-10-19 — reviewed and approved by Batuhan Elmas (`checkedBy`). FR-02.7 corrected: parent
  access to price and earnings is gated by the finance **switch** ([[FR-20|FR-20.3]]) and the
  coach's finance **module** ([[FR-25|FR-25.4]]), not granted unconditionally — the v2 pass had
  missed this clause. Acceptance criterion added for the module-off case.
- 2026-10-14 — v2 integration: see/manage split made explicit (K-20), policy quintuple, post-end
  read-only ([[BR-030]])
- 2026-09-12 — created from catalog §3.3, §32, §33
