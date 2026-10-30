---
id: FR-06
aliases: [FR-06]
title: Task Management
area: work
source: "§6, §7, §8 · v2 §5, §6"
status: specified
priority: must
updated: 2026-10-30
---

# FR-06 — Task Management

> **Source:** catalog §6.1–6.7, §7.1–7.3, §8 · [[Source - Requirements v2 (TR)|v2]] §5, §6 ·
> **Rules:** [[BR-005]], [[BR-006]], [[BR-007]], [[BR-008]], [[BR-009]], [[BR-010]], [[BR-025]],
> [[BR-027]]

## Intent

The core loop. A coach assigns work with a deadline; the student says "done". By default the system
**believes the student** — the item completes immediately and the coach can dispute it afterwards
([[BR-006]], the v2 reversal). The coach reserves the stricter flow per item where it matters. Either
way, *submitted* and *approved* must never collapse into one timestamp.

## Requirements

### Creating and viewing

- **FR-06.1** A coach can assign a task to any actively linked student.
- **FR-06.2** A task carries at least: student, assigning coach, type, subject, topic, content, due
  date, **late cutoff (copied from the coach's default and frozen**, [[BR-027]]), creation metadata,
  current status, and the **requires-approval flag**.
- **FR-06.3** Subject and topic are **free text** — there is no curriculum list. The coach's own past
  values are offered as autocomplete for consistency (v2 §5.2, K-25).
- **FR-06.4** A student can see every task assigned to them, each showing which coach assigned it.
  Other active coaches see the task read-only, with attribution; they can never manage it
  ([[BR-024]]).

### Statuses

- **FR-06.5** The system distinguishes at least:

  | Code | Turkish (v2 §5.3) | Meaning |
  | --- | --- | --- |
  | `OPEN` | Tamamlanmadı | assigned, not yet submitted, not yet overdue |
  | `PENDING_APPROVAL` | Onay bekliyor | submitted, awaiting the coach — **only for requires-approval items** |
  | `RETURNED` | Geri gönderildi | coach sent it back, student must redo |
  | `COMPLETED_ON_TIME` | Zamanında tamamlandı | submitted on or before due date + cutoff |
  | `COMPLETED_LATE` | Geç tamamlandı | submitted after due date + cutoff |
  | `OVERDUE` | Gecikti / tamamlanmadı | past due, never submitted |

  UI labels may differ; these codes may not.

### Completion — the dispute model ([[BR-006]])

- **FR-06.6** **Default:** when the student reports a task done, it is completed **immediately** and
  enters the statistics. No coach action is needed.
- **FR-06.7** The assigning coach can **send a completed item back** afterwards; the statistics are
  updated to reflect the return.
- **FR-06.8** **Exception:** the coach can mark an item **"requires approval"** at creation. Such an
  item goes to `PENDING_APPROVAL` on submission and completes only when the assigning coach approves.
- **FR-06.9** Approval and return authority belongs to the **assigning coach only** ([[BR-007]]).
  The completion notification goes to that coach only — never to the student's other coaches
  (v2 §5.7).
- **FR-06.10** When returning, the coach may write an explanation. It is **optional** ([[BR-008]]).
  If written, the student can read it.
- **FR-06.11** A returned task can be submitted again; each round trip is recorded.

### Bulk approval (v2 §5.5)

- **FR-06.12** The coach can **bulk-approve** pending items at two levels: across all their students,
  and within a single student.
- **FR-06.13** There is **no bulk return** — a return explanation is context-specific, so returns are
  one at a time (K-15).
- **FR-06.14** A bulk approval writes an **audit entry per item**, marked "done via bulk approval"
  (K-16, [[FR-21]]).

### Lateness ([[BR-009]], [[BR-027]])

- **FR-06.15** Lateness is computed from the **student's submission time**, never the coach's
  approval time.
- **FR-06.16** The boundary is **due date + the item's frozen late cutoff**: submitted before it →
  on time; after it → `COMPLETED_LATE`; never submitted and past it → `OVERDUE`.
- **FR-06.17** Each coach sets their own default cutoff (e.g. 20:00); the value is copied onto the
  item at creation and never changes afterwards ([[BR-027]]).
- **FR-06.18** `COMPLETED_LATE` and `OVERDUE` are never merged into one statistic ([[BR-010]]).

### History (v2 §6.4)

- **FR-06.19** The system preserves at least: creation, due date, late cutoff, each submission time,
  each approval time, each return time and note, resubmissions, and the final status.
- **FR-06.20** Submission time and approval time are stored separately and are never substituted for
  one another.
- **FR-06.21** Past tasks are never deleted after completion or after the deadline passes
  ([[BR-025]]).

## Acceptance criteria

- [ ] Submitting a default task at 19:59 with cutoff 20:00 on the due date yields
      `COMPLETED_ON_TIME` immediately, with no coach involved.
- [ ] Submitting a requires-approval task leaves it `PENDING_APPROVAL` and out of the completed
      statistics until the assigning coach approves.
- [ ] A coach returning an already-completed task removes it from the completed bucket; the history
      shows both the completion and the return.
- [ ] Changing the coach's default cutoff never changes the lateness of an existing task
      ([[BR-027]]).
- [ ] Returning without a note succeeds; the note field is nullable everywhere, including the API.
- [ ] Only the assigning coach can approve or return; another coach of the same student can read the
      task but gets 404 on every management route ([[BR-024]]).
- [ ] Bulk-approving 12 items writes 12 audit entries, each flagged as bulk.
- [ ] The completion notification reaches exactly one coach.
- [ ] The full event history of a task with two returns and three submissions is reconstructable.

## Design notes

- `OVERDUE` is **derived**, not a stored transition — a function of `dueAt`, `lateCutoff`,
  `submittedAt` and now. Do not run a cron job to "mark things overdue"; compute it in the query.
  The same applies to on-time vs late.
- Store the event log ([[FR-21]]) as the source of truth for §8 / v2 §6.4 and derive current status.
- Tasks and assignments share this entire engine ([[FR-07]], [[ADR-0005]] — independently confirmed
  by v2 decision K-22: one entity, a `type` field, type-specific optional fields).
- Tasks may originate from a study plan ([[FR-23]]); plan-born tasks carry their plan/topic
  reference but behave identically.
- Editing after submission: [[Open Questions|Q-13]].
- **A `PENDING_APPROVAL` item outlives the relationship.** If the assigning coach's link ends while
  the item waits, it stays `PENDING_APPROVAL` for good and counts as not completed — no auto-approve,
  no auto-return ([[FR-04|FR-04.13]], [[BR-030]]). Statistics queries must therefore treat
  "pending" as a non-completed bucket that is neither late nor overdue, not as a transient state
  that will resolve.

## Open questions

- [[Open Questions|Q-13]] — can a coach edit a task after submission?
- Which submission determines lateness after a return (last submission proposed; unconfirmed).

## Related

[[FR-07]] · [[FR-08]] · [[FR-14]] · [[FR-16]] · [[FR-21]] · [[FR-23]] · [[State Machines]]

## Change log

- 2026-10-14 — v2 integration: dispute model as default ([[BR-006]] reversed, K-13/K-14),
  requires-approval flag, bulk approval, frozen late cutoff ([[BR-027]]), free-text subject/topic
  with autocomplete, read-only visibility for other coaches ([[BR-024]] see/manage split)
- 2026-09-12 — created from catalog §6, §7, §8
