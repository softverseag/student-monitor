---
id: FR-04
aliases: [FR-04]
title: Coach Student Relationship
area: relationships
source: "§4 · v2 §3"
status: specified
priority: must
updated: 2026-10-14
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

## Acceptance criteria

- [ ] A student with two active coaches sees both, and each task shows which coach assigned it.
- [ ] An invite code cannot be reused, cannot be guessed, and expires.
- [ ] Ending a link leaves every past task, lesson, and earning row intact.
- [ ] A partial unique index prevents two simultaneously active links for the same pair.
- [ ] After ending, the coach can still read that relationship's history but gets 404 on every
      create/approve route ([[BR-030]]); the student still opens that coach's shared files.
- [ ] In v1 the UI shows multi-coach content inline with a "from coach X" label — no separate
      multi-coach flow (v2 §3.1).

## State machine

See [[State Machines]] — `CoachStudentLink`:
`PENDING_STUDENT_ACCEPT | PENDING_COACH_ACCEPT → ACTIVE → ENDED`, plus `DECLINED` and `EXPIRED`.

## Open questions

- [[Open Questions|Q-07]] — **answered** (K-18, [[BR-030]]): coach read-only, student keeps shared
  material.
- [[Open Questions|Q-17]] — what happens to work pending approval when the link ends.

## Related

[[FR-02]] · [[FR-05]] · [[FR-06]] · [[FR-18]] · [[Authorization Matrix]]

## Change log

- 2026-10-14 — v2 integration: post-end read-only access ([[BR-030]]), no parent approval on ending
  (K-17), QR deferred to v1.1, inline multi-coach labelling
- 2026-09-12 — created from catalog §4
