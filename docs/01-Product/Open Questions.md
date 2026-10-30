---
title: Open Questions
status: open
updated: 2026-10-30
---

# Open Questions

Decisions the client (or we) still owe. **Do not invent answers in code** — implement behind the
placeholder noted here and come back.

The October 2026 requirement set ([[Source - Decision Log (TR)]]) answered ten of these and added
new ones; its open items `A-01`..`A-11` are tracked below with their `A` number noted.

| ID | Question | Blocks | Status | Placeholder in the meantime |
| --- | --- | --- | --- | --- |
| Q-02 | The monthly progress formula — how are on-time, late and missed weighted into one number? (A-09) | [[FR-14]] | **open** | report the six raw counts, no single number |
| Q-04 | Does a student `NO_SHOW` bill? **Decided:** per-coach setting (v2 §16.3). **Open:** the default value (A-11). | [[FR-19]] | **open** | default billable, configurable per coach |
| Q-10 | Subscription packages and prices for v1.1 billing, tiered by active students (A-02). | [[FR-22]] | **open** | free beta, limit enforced, billing stubbed |
| Q-12 | KVKK and minors: age gate at signup, under-18 parental consent flow, data controller, retention periods, deletion-request flow (A-06). **Must be resolved before the first real user.** | [[FR-01]], [[Security and Privacy]] | **open — deadline** | parental consent recorded at signup for under-18 |
| Q-13 | Can a coach edit or delete a task after the student submitted it? | [[FR-06]] | **open** | no edit after submission; return instead |
| Q-14 | Recurring lessons — does a coach schedule "every Tuesday 19:00", or one at a time? | [[FR-09]] | **open** | one at a time in v1 |
| Q-19 | Account deletion is immediate and irreversible ([[ADR-0013]]). Grace period for minors deleting in anger? | [[FR-01]] | **open** | immediate, no undo |
| Q-20 | Do unapproved mock exam results enter statistics (İK-017, A-01)? Option A: excluded, as [[BR-017]] says. Option B: included immediately with an "unverified" marker, mirroring [[BR-006]]. | [[FR-15]], [[BR-017]] | **open** | option A — [[BR-017]] as written, behind one query scope |
| Q-21 | The beta per-coach active-student limit — what number? (A-03) | [[FR-22]] | **open** | configuration value, suggest 30 until told otherwise |
| Q-22 | School report card grade scale: 100-point or 5-point? (A-04) | [[FR-24]] | **open** | store what the student enters, no scale validation |
| Q-23 | If two coaches book the same student at the same time, is it blocked? (A-05) | [[FR-09]] | **open** | warn the student at accept time, do not block |
| Q-24 | File retention: how long are files kept, what happens on relationship end beyond [[BR-030]], per-coach quota? (A-07) | [[FR-13]] | **open** | kept indefinitely, student access per [[BR-030]] |
| Q-25 | A rejected mock exam result — can the student correct and resubmit, or is it dead? (A-08) | [[FR-15]] | **open** | rejected is terminal; student enters a new result |
| Q-26 | The v2 technical plan conflicts with accepted ADRs. **Platform half answered 2026-10-20** — see below. Still open: self-managed JWT + Resend (K-38) vs Clerk ([[ADR-0012]]); Neon/Heroku/R2 hosting; separate `worker` process; repo location (A-10). Which of those stand? | [[Tech Stack]], [[Architecture Overview]] | **open** (narrowed) | existing ADRs stand until explicitly superseded |
| Q-27 | Is the role really fixed **for life** ([[ADR-0014]])? A day-one mistap is unrecoverable: there is no admin to fix it ([[Open Questions\|Q-18]], v1.1) and deleting the account discards all history ([[ADR-0013]]). **A:** changeable while the account is still *empty* — no links, no content (**recommended**, see the review note on [[ADR-0014]]). **B:** changeable any time, history stays attached to the capacity that created it. **C:** support-only, blocked on Q-18. **D:** keep it permanent, better warning copy. **Full write-up, options and costs: [[Q-27 Role Permanence - Decision Brief]] — awaiting @bursadev.** | [[FR-01]], [[T-017]] | **open** | [[ADR-0014]] stands — role fixed at onboarding, and `role` keeps being written in exactly one place |
| Q-28 | A mock exam result sitting in `PENDING_APPROVAL` when the **approving coach** ([[BR-031]]) ends the link. Q-17 froze coach-owned work, but this row is the *student's* data: frozen, it never enters statistics ([[BR-017]]) and the student has no way out — it is not `REJECTED`, so Q-25's "enter a new result" does not apply. Can the student re-point it at another active coach, or is the result abandoned? Raised while answering Q-17 (2026-10-30). | [[FR-15]], [[BR-031]] | **open** | student may re-pick an approver among their active coaches; with no active coach the result stays pending |

## Answered

| ID | Question | Decided | Answer |
| --- | --- | --- | --- |
| Q-26a | Platform: single PWA (K-27) or our Expo mobile app + web? | 2026-10-20 (owner) | **Mobile app for all three roles; web shrinks to a marketing site plus a coach-only portal.** Nothing is web-only, and the coach-only web sign-in is a surface decision, never an authorization boundary. See [[ADR-0017]]. The auth/hosting half of Q-26 stays open. |
| Q-01 | Filiz thresholds and window | 2026-10 (K-24) | **0–24 / 25–74 / 75–99 / 100, daily window.** Still a replaceable rule in one module. See [[FR-08]]. |
| Q-03 | Does a cancelled lesson earn money? | 2026-10 (v2 §8.3) | **Never billed**, regardless of who cancelled. |
| Q-05 | Parent sharing granularity | 2026-10 (K-29) | **Three switches** per coach–student link: progress / exams / finance, all off by default; a closed area is invisible. **v1 ships two** — finance waits for [[FR-25]] (2026-10-20). See [[FR-20]]. |
| Q-06 | File formats, size | 2026-10 (K-32) | **PDF only, 25 MB, coach → student only**, content-based validation. Retention still open → Q-24. |
| Q-07 | Access after a relationship ends | 2026-10 (K-18) | **Coach: read-only, no new content. Student: keeps shared files and recommendations.** Now [[BR-030]]. |
| Q-08 | Can one person hold several roles? | 2026-09-13 | **One role per account**, fixed at onboarding — [[ADR-0014]]. *"One role" stands; **"fixed for life" reopened 2026-10-19 as Q-27**.* |
| Q-09 | Exam types and net formulas | 2026-10 (K-30, K-31) | **Net auto-calculated per exam type** (YKS ÷4, LGS ÷3), score manual, per-type variable subject structure. See [[FR-15]], [[BR-018]], [[BR-019]]. |
| Q-11 | Notification channels, quiet hours | 2026-10 (K-35) | **In-app + push; task-time reminders respect student-set quiet hours; coach messages always deliver.** Delivery mechanism depends on Q-26. |
| Q-15 | Recurring schedule entries | 2026-10 (K-36) | **Moot in v1**: the editable grid is deferred; school hours are a single setting; the timeline is read-only. See [[FR-11]]. |
| Q-16 | Can a coach reject an exam result? | 2026-10 (v2 §10.3) | **Yes — `REJECTED` exists.** Aftermath open → Q-25. |
| Q-17 | What happens to work pending approval when the relationship ends? | 2026-10-30 (owner) | **Frozen in place, counted as not completed.** No auto-approve and no auto-return: the item keeps `submittedAt`, never gets `approvedAt`, so it stays `PENDING_APPROVAL` for good ([[ADR-0008]] — the derivation simply stops receiving facts). It is neither late nor overdue, so [[BR-010]] is untouched; re-linking does not revive it. See [[FR-04\|FR-04.13–15]], [[BR-030]]. The mock-exam variant is **not** covered → Q-28. |
| Q-18 | Admin/support role? | 2026-10 (v2 §1) | **v1.1.** In v1, operational interventions go through direct DB access. |

## How to use this

- Each open question gets a `Q-xx` ID that never changes.
- Reference it in code: `// Q-20: statistics read the approved scope only`.
- Answering one is a change to the FR note plus a line in the *Answered* table plus, usually, a task.
- The client's own open-item IDs (`A-xx` in [[Source - Decision Log (TR)]]) are noted in brackets so
  both sides can talk about the same thing.
