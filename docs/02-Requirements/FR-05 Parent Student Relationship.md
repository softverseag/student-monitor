---
id: FR-05
aliases: [FR-05]
title: Parent Student Relationship
area: relationships
source: "§5 · v2 §4"
status: specified
priority: must
updated: 2026-10-30
---

# FR-05 — Parent–Student Relationship

> **Source:** catalog §5.1–5.4 · **Rules:** [[BR-003]], [[BR-004]], [[BR-022]]

> [!note] Reviewed 2026-10-30
> Read in full. The model — a parent account grants nothing until a coach approves the link, at most
> two active parents, read-only thereafter — stands as written.
>
> **One correction made during the review**, the same stale clause that was found in
> [[FR-02|FR-02.7]] on 2026-10-19 and missed here. An acceptance criterion read *"an approved parent
> can read price and earnings for that student ([[BR-022]])"* — unconditionally, outside the
> opened-category gate. That contradicted [[FR-20|FR-20.3]] (finance is one of three switches, off
> by default), [[FR-25|FR-25.4]] (the switch is inert unless the coach enabled the finance module)
> and this note's own FR-05.7, which already said "only the information the coach has opened".
>
> A consistency fix, **not a new decision**: K-29, [[BR-029]] and the v1 scope cut already settled
> it. [[BR-022]] is about who may *ever* see money (not the student); it was never a grant.

## Intent

A parent account by itself is worth nothing: it grants access to no student. The link is gated by
the **coach's approval**, not the student's — the coach is the professional accountable for who sees
a minor's data.

## Requirements

- **FR-05.1** A parent can create their own account ([[FR-01]]).
- **FR-05.2** Creating a parent account grants no access to any student's data.
- **FR-05.3** A parent starts the link by entering the **student's code** (v2 §4.2).
- **FR-05.4** Only the student's coach can approve a parent–student link ([[BR-003]]). When the
  student has several coaches, **any of them** may approve; the approver is recorded (v2 §4.2).
- **FR-05.5** Until approved, the parent can access none of the student's protected data.
- **FR-05.6** A student may have at most **2 active parents** at any time. The system prevents a
  third ([[BR-004]]).
- **FR-05.7** A parent accesses only the linked student, and only the information the coach has
  opened to them ([[FR-20]]).
- **FR-05.8** A parent has no management rights over the student's or the coach's data — no
  assigning, no approving, no cancelling.
- **FR-05.9** A link can be revoked, freeing a slot. Revoked links keep their history.

## Acceptance criteria

- [ ] Creating the third active parent link fails with a clear, translated error.
- [ ] Revoking one of two links lets a third parent be approved.
- [ ] A `PENDING` parent calling any student endpoint gets nothing.
- [ ] An approved parent sees **only the categories that coach has opened** — progress, exams,
      finance — and nothing is open by default ([[FR-20|FR-20.3]], [[FR-02|FR-02.7]]). Read-only in
      every case.
- [ ] Finance `[V1.1]`: with the switch **on** but the coach's finance module **off**, the parent
      sees no price or earnings anywhere ([[FR-25|FR-25.4]], [[BR-029]]). The whole finance area is
      out of v1 ([[Scope and MVP]]), so in v1 a parent has two switches, not three.
- [ ] Approval is recorded with the approving coach and timestamp ([[FR-21]]).

## Design notes

- **Which coach approves when the student has several?** Confirmed in v2 §4.2: any actively linked
  coach, and the approval records which one did.
- A parent link should be startable from either end: the parent enters the student's code, or the
  coach invites the parent directly. The coach's approval is required either way.
- Two parents typically means mother and father; both should see the same thing.

## State machine

`PENDING_COACH_APPROVAL → ACTIVE → REVOKED`, plus `REJECTED`.

## Open questions

Both raised in the 2026-10-30 review and left for the owner rather than guessed.

- **Who may revoke a parent link?** FR-05.9 says a link "can be revoked" without naming an actor,
  while [[State Machines]] already asserts *coach or parent*. If that is right, the asymmetry with
  [[FR-04|FR-04.7]] — where either side ends a coach link alone — is deliberate and worth stating:
  a student cannot cut off their own parent. Needs one sentence either way.
- **Can a coach invite a parent directly?** FR-05.3 only specifies the parent-initiated direction
  (parent enters the student's code, v2 §4.2). The design note below assumes both directions exist,
  but no requirement covers the coach-initiated one, so it is currently unbuilt by omission.

## Related

[[FR-20]] · [[FR-02]] · [[BR-003]] · [[BR-004]] · [[Authorization Matrix]]

## Change log

- 2026-10-30 — reviewed. One stale acceptance criterion corrected: a parent's access to price and
  earnings is gated by the opened category *and* the coach's finance module, and finance is out of
  v1 entirely. Same class of error as the FR-02.7 fix. Two gaps recorded rather than guessed —
  who may revoke a parent link, and whether a coach can invite a parent directly (see *Open
  questions*).
- 2026-10-14 — v2 integration: any active coach may approve (confirmed), parent initiates with the
  student's code
- 2026-09-12 — created from catalog §5
