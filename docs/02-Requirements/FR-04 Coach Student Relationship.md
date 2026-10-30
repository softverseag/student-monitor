---
id: FR-04
aliases: [FR-04]
title: Coach Student Relationship
area: relationships
source: "§4 · v2 §3"
status: specified
priority: must
updated: 2026-10-30
---

# FR-04 — Coach–Student Relationship

> **Source:** catalog §4.1–4.6 · [[Source - Requirements v2 (TR)|v2]] §3 · **Decisions:** K-17,
> K-18, K-20 · **Rules:** [[BR-001]], [[BR-002]], [[BR-024]], [[BR-025]], [[BR-030]]

## Intent

The relationship — not the account — is what grants access. It is created deliberately by both
sides, it can be ended by either, and it is the boundary every authorization check is drawn around.

A student may work with several coaches at once, and their content must stay separated.

## Requirements

### Forming the link

- **FR-04.1** A student can be linked to more than one coach at the same time ([[BR-001]]).
- **FR-04.2** Linking happens through a controlled mechanism: invite code or invite link (QR code is
  `[V1.1]`, v2 §3.2). The security property is that both parties consent.
- **FR-04.3** A coach can invite a student. The link becomes **active** when the student accepts.
- **FR-04.4** A student can request to work with an existing coach. The link becomes active when the
  coach accepts.
- **FR-04.5** A connection request is *not* a lesson request. It only establishes the working
  relationship ([[BR-011]] keeps lesson requests coach-only).
- **FR-04.6** An invite is single-purpose and expires.

### Ending the link

- **FR-04.7** Either side can end an active relationship, alone — **no parent approval** ([[BR-002]],
  K-17).
- **FR-04.8** Ending the relationship never physically deletes past data ([[BR-025]]).
- **FR-04.9** After the relationship ends ([[BR-030]], v2 §3.3): the coach keeps **read-only** access
  to that relationship's history (required for earnings history) and can create nothing new; the
  student keeps seeing that coach's shared files and resource recommendations.
- **FR-04.10** The same pair can re-link later; the previous period stays a distinct record.

### Ownership

- **FR-04.11** Everything a coach creates for a student is attributed to that coach: tasks,
  assignments, lessons, files, notifications, resource recommendations ([[BR-024]]).
- **FR-04.12** The system can always answer "which coach created this?" for every such record.

### Work pending approval when the link ends

- **FR-04.13** Work still awaiting approval when the link ends **freezes where it is** (decided
  2026-10-30, answers [[Open Questions|Q-17]]). It is neither auto-approved nor auto-returned: the
  item keeps its `submittedAt`, never receives an `approvedAt`, and so stays `PENDING_APPROVAL`
  permanently ([[ADR-0008]] — nothing needs to be written for this, it is what the derivation
  already yields once no further facts arrive).
- **FR-04.14** A frozen item counts as **not completed** in statistics ([[FR-14]]). It is neither
  `COMPLETED_LATE` nor `OVERDUE`, so [[BR-010]]'s separation is untouched; it is a third,
  explicitly non-completed state.
- **FR-04.15** Re-linking the same pair does not revive it. The new link is a distinct record
  (FR-04.10) and the old item belongs to the closed one, where the coach has no write scopes
  ([[BR-030]]).

## Acceptance criteria

- [ ] A student with two active coaches sees both, and each task shows which coach assigned it.
- [ ] An invite code cannot be reused, cannot be guessed, and expires.
- [ ] Ending a link leaves every past task, lesson, and earning row intact.
- [ ] A partial unique index prevents two simultaneously active links for the same pair.
- [ ] After ending, the coach can still read that relationship's history but gets 404 on every
      create/approve route ([[BR-030]]); the student still opens that coach's shared files.
- [ ] In v1 the UI shows multi-coach content inline with a "from coach X" label — no separate
      multi-coach flow (v2 §3.1).
- [ ] Ending a link while one of that coach's requires-approval items is `PENDING_APPROVAL` leaves
      the item `PENDING_APPROVAL`, out of the completed statistics, and out of both the late and the
      overdue buckets; the coach's approve route returns 404 (FR-04.13, [[BR-030]]).

## State machine

See [[State Machines]] — `CoachStudentLink`:
`PENDING_STUDENT_ACCEPT | PENDING_COACH_ACCEPT → ACTIVE → ENDED`, plus `DECLINED` and `EXPIRED`.

## Design notes

- **Why pending work freezes rather than resolving itself** (FR-04.13, decided 2026-10-30).
  Auto-approving would hand the student a completion no coach ever looked at, and it would let
  either side farm completions by ending the link at the right moment. Auto-returning would punish a
  student who did submit on time for a decision that was not theirs. Freezing is the only option
  that invents no verdict, and it costs nothing to implement: with status derived from facts
  ([[ADR-0008]]), "no further facts arrive" *is* the frozen state.
- **The UI must explain a frozen row**, or the student reads "Onay bekliyor" forever and waits for a
  coach who is gone. Show it with the ended relationship's label — the inline "X koçundan" marker
  (FR-04 acceptance criteria) already carries the coach, so the row needs the link's state too.
- Items of the *default* kind are unaffected: they complete at submission ([[BR-006]]), so an ending
  link finds nothing of theirs pending.

## Open questions

- [[Open Questions|Q-07]] — **answered** (K-18, [[BR-030]]): coach read-only, student keeps shared
  material.
- [[Open Questions|Q-17]] — **answered** (owner, 2026-10-30): frozen in place, counted as not
  completed. See FR-04.13–15.
- [[Open Questions|Q-28]] — the same situation for a **mock exam result** whose approving coach
  ([[BR-031]]) ends the link: freezing it means the student's own data never counts and they have no
  way out. Not covered by Q-17's answer, which is about coach-owned work items.

## Related

[[FR-02]] · [[FR-05]] · [[FR-06]] · [[FR-18]] · [[Authorization Matrix]]

## Change log

- 2026-10-30 — Q-17 answered by the product owner: work pending approval when a link ends freezes as
  `PENDING_APPROVAL` and counts as not completed (FR-04.13–15). The mock-exam variant of the same
  situation is now tracked separately as Q-28.
- 2026-10-14 — v2 integration: post-end read-only access ([[BR-030]]), no parent approval on ending
  (K-17), QR deferred to v1.1, inline multi-coach labelling
- 2026-09-12 — created from catalog §4
