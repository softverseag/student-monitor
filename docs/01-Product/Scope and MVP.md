---
title: Scope and MVP
status: draft
updated: 2026-10-14
---

# Scope and MVP

The catalog describes the full product. **Not all of it ships in v1.** This note is the agreed cut
line; check it before starting work. Changing it is a product decision, not an implementation detail.

The cut line was redrawn by the October 2026 requirement set ([[Source - Requirements v2 (TR)]] §22,
[[Source - Decision Log (TR)]]): exams, resources, files, report cards, plans and the optional
finance module moved **into** v1; the editable schedule grid, curriculum module, QR linking and
payment integration moved **out**.

## The core loop we must nail first

> A coach prepares a plan and assigns work → the student does it and says done → **the system
> believes the student** ([[BR-006]]); the coach spot-checks, returns or requires approval where it
> matters → both sides see honest progress.

Everything else — lessons, money, exams, parents — hangs off that loop. If the loop is not
frictionless on a phone, nothing else matters.

## v1 — in scope

| Area | Requirement | Why it is v1 |
| --- | --- | --- |
| Accounts, login, roles | [[FR-01]], [[FR-02]] | nothing works without it |
| Student grade level | [[FR-03]] | cheap, needed for context |
| Coach–student link (invite code + link, request, end relationship) | [[FR-04]] | the product is the relationship |
| Parent link with coach approval, max 2 | [[FR-05]] | closes the family loop |
| Tasks + assignments (dispute model, bulk approval) | [[FR-06]], [[FR-07]] | the core loop |
| **Study plans — prepare once, assign to many** | [[FR-23]] | the client calls it v1's most important module; it justifies the subscription |
| Filiz progress character (thresholds decided) | [[FR-08]] | the reason a student opens the app daily |
| Lesson request / accept / decline / cancel, 3 lesson types, group lessons | [[FR-09]] | drives both calendar and money |
| Attendance (always on, finance-independent) | [[FR-10]] | the input to earnings and the parent's first question |
| Read-only student timeline + school-hours setting | [[FR-11]] | the student's day at a glance, without the grid's cost |
| Mock exam tracking (auto net, coach approval) | [[FR-15]] | the most-watched number in exam prep |
| Resource pool + recommendations | [[FR-12]] | feeds assignments; small |
| File sharing (PDF, 25 MB, coach → student) | [[FR-13]] | one less reason to fall back to WhatsApp |
| School report card | [[FR-24]] | 1–2 days of work, the parent's favourite data (K-33) |
| Daily + weekly + monthly progress, topic % from plans | [[FR-14]] | proves the loop is working |
| Event notifications, task-time reminders with quiet hours, templates with audience | [[FR-16]] | the only mechanism that makes students open the app (K-35) |
| Coach follow-up view | [[FR-17]] | how a coach handles 30 students |
| **Finance module (opt-in): pricing, earnings, ledger, statements** | [[FR-18]], [[FR-19]], [[FR-25]] | the coach's strongest pull — made optional so wary coaches still adopt |
| Parent read-only view behind 3 switches | [[FR-20]] | closes the trust loop |
| Free beta with enforced student limit | [[FR-22]] | so v1.1 package tiers mean something (K-28) |
| Audit trail from day one | [[FR-21]] | append-only, cannot be backfilled |

## Deferred to v1.1 (v2 §22 — each line is a deliberate trade)

| Area | Reason |
| --- | --- |
| Payment / subscription billing integration | pricing undecided; free beta first ([[Open Questions|Q-10]]) |
| Excel plan import | the plan editor plus plan duplication covers the job; coaches' sheets share no shape ([[FR-23]]) |
| Editable student calendar grid | the coach cannot see it ([[BR-014]]), so high cost, no commercial return (K-36) |
| Independent curriculum/topic module | content-production cost; derived from plan tasks instead (K-26) |
| QR-code linking | invite code and link cover it |
| In-resource progress tracking (page/test position) | pool holds only the book's identity in v1 |
| Virus scanning of uploads | deliberately deferred risk; content-type validation ships in v1 ([[FR-13]]) |
| End-to-end finance encryption (key held by the coach) | 3–4 weeks of work; validate coach resistance first (K-08) |
| Admin / support panel | direct DB access in v1 (v2 §1) |
| Institution / multi-coach organisation accounts | expectations *conflict* with the individual-coach model; a nullable `organizationId` is kept in the data model (K-12) |

## Explicitly out of scope

- Payments between coach and parent. We *calculate* what is owed; we do not move money (K-01).
- Chat / messaging. Notifications are one-way. **Accepted risk** (v2 §23.2): coaching conversation
  lives in WhatsApp and may drag task talk with it; revisit after beta feedback.
- AI anything — templates are stored text, not prompts (§26); it holds for the whole v1.
- Content: no question banks, no videos, no curriculum.
- Coach discovery / marketplace.

## Accepted risks (v2 §23.2)

1. **No messaging** — see above.
2. **iOS push on a PWA** works only after add-to-home-screen; student adoption depends on reminders,
   so install guidance matters. (Mechanism depends on [[Open Questions|Q-26]].)
3. **Student adoption is coach-dependent** — if the coach does not insist, no data is entered and
   Filiz stays empty; keep invite friction minimal.
4. **KVKK ordering is backwards** — students sign themselves up but are mostly minors, and parental
   links wait on coach approval. Must be resolved before the first real user
   ([[Open Questions|Q-12]]).
5. **Adult–minor interaction** — complaint/blocking mechanics and file-content oversight are needed
   for legal responsibility.

## Platform split for v1

> [!warning] Under review — [[Open Questions|Q-26]]
> The v2 technical plan assumes a **single responsive PWA** (K-27) instead of the Expo mobile app,
> and self-managed JWT instead of Clerk. Until that conflict is resolved, the existing ADRs and the
> split below stand.

| App | Audience | Scope |
| --- | --- | --- |
| **Mobile** (Expo) | students, and coaches for quick approvals | full student experience; coach approvals, follow-up list, lesson requests |
| **Web** (Next.js) | coaches, parents | full coach experience (plans, bulk assigning, earnings, follow-up); parent view |
| **API** (NestJS) | all | one backend, all authorization here ([[BR-024]]) |

## Cut-line principles

1. If a feature cannot be authorized correctly yet, it does not ship.
2. If a business rule is still open ([[Open Questions]]), ship the part that does not depend on it.
3. Anything that writes history ships early, even if the reporting on top comes later — we can
   backfill reports, not events.
4. The finance module must be severable: off by default, deletable on exit ([[BR-029]]).

## Related

[[Kapsam ve MVP (TR)]] — this note in Turkish, for client conversations. A companion, not a source:
where the two disagree, this one wins.

[[Roadmap]] · [[Milestones]] · [[Requirements Index]] · [[Requirements v2 Delta]]
