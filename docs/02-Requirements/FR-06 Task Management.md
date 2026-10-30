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

### Editing after submission (decided 2026-10-30, answers [[Open Questions|Q-13]])

- **FR-06.22** The assigning coach **can edit an item after the student has submitted it** — content,
  subject, topic and due date — whether it is `PENDING_APPROVAL` or already completed. Only that
  coach ([[BR-007]]); another coach of the same student gets 404 ([[BR-024]]).
- **FR-06.23** An edit **does not undo the submission**. The item keeps its `submittedAt` and does
  not return to `OPEN`. Sending work back is what [[BR-008|return]] is for; the two are separate
  actions and must not be conflated in the API.
- **FR-06.24** After an edit the status is simply **re-derived** from the new facts ([[ADR-0008]]).
  Editing the due date can therefore move an item between `COMPLETED_ON_TIME` and `COMPLETED_LATE`,
  and that is intended: the statistic always reflects the deadline the item currently carries.
- **FR-06.25** **The latest submission is the one that counts** (decided 2026-10-30). Where an item
  has several submissions — submitted, returned, resubmitted — lateness is computed from the **most
  recent** `submittedAt`, never the first ([[BR-009]]). Earlier submissions stay in the history
  (FR-06.19) but no longer drive the status.
- **FR-06.26** The item's **late cutoff stays frozen** through an edit ([[BR-027]]). A coach may move
  the due date; they cannot re-take their current default cutoff, or editing an old item would
  silently reclassify it under a rule that did not exist when it was assigned.
- **FR-06.27** Every edit writes an audit entry with actor, timestamp and the fields that changed
  ([[FR-21]]), and the student can see that the item was edited after they submitted it.
- **FR-06.28** There is still **no delete**. An item is never removed, before or after submission
  ([[BR-025]]); a coach who wants the work redone returns it.

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
- [ ] A task submitted on time, then edited by the coach to an earlier due date, reads
      `COMPLETED_LATE` — with the submission intact and an audit entry naming the changed field
      (FR-06.22–24, FR-06.27).
- [ ] A task submitted on time, returned, then resubmitted after the deadline reads
      `COMPLETED_LATE`: the last submission decides, not the first (FR-06.25).
- [ ] Editing the due date leaves the item's frozen late cutoff untouched (FR-06.26, [[BR-027]]).
- [ ] An edit never moves the item back to `OPEN` and never clears `submittedAt` (FR-06.23).
- [ ] A second coach of the same student gets 404 on the edit route (FR-06.22, [[BR-024]]).

## Design notes

- `OVERDUE` is **derived**, not a stored transition — a function of `dueAt`, `lateCutoff`,
  `submittedAt` and now. Do not run a cron job to "mark things overdue"; compute it in the query.
  The same applies to on-time vs late.
- Store the event log ([[FR-21]]) as the source of truth for §8 / v2 §6.4 and derive current status.
- Tasks and assignments share this entire engine ([[FR-07]], [[ADR-0005]] — independently confirmed
  by v2 decision K-22: one entity, a `type` field, type-specific optional fields).
- Tasks may originate from a study plan ([[FR-23]]); plan-born tasks carry their plan/topic
  reference but behave identically.
- **Editing after submission is cheap precisely because status is derived** (FR-06.22–24). There is
  no stored status to migrate and no recomputation job: change `dueAt`, and the next read gives the
  new answer. The same decision under a stored-status model would need a backfill on every edit, and
  would be the kind of thing that silently drifts ([[ADR-0008]]).
- **`submittedAt` means "the latest submission"** (FR-06.25). Write it that way once, in the shared
  derivation, rather than letting each query decide — a query that joins the *first* submission will
  look correct and quietly disagree with every other number on the screen.
- **The honest cost of allowing edits** (accepted 2026-10-30): a coach can move a due date backwards
  and turn an on-time completion into a late one. The mitigations are visibility, not prevention —
  the edit is audited ([[FR-21]]) and the student sees that the item changed after they submitted
  (FR-06.27). Blocking the edit would not remove the capability anyway: the same coach can already
  return a completed item ([[BR-006]]).
- **A `PENDING_APPROVAL` item outlives the relationship.** If the assigning coach's link ends while
  the item waits, it stays `PENDING_APPROVAL` for good and counts as not completed — no auto-approve,
  no auto-return ([[FR-04|FR-04.13]], [[BR-030]]). Statistics queries must therefore treat
  "pending" as a non-completed bucket that is neither late nor overdue, not as a transient state
  that will resolve.

## Open questions

- [[Open Questions|Q-13]] — **answered** (owner, 2026-10-30): yes, the assigning coach can edit
  after submission, and the **last** submission is what lateness is measured from. See
  FR-06.22–28. Delete remains out — [[BR-025]] was never in question.

## Related

[[FR-07]] · [[FR-08]] · [[FR-14]] · [[FR-16]] · [[FR-21]] · [[FR-23]] · [[State Machines]]

## Change log

- 2026-10-30 — Q-13 answered by the product owner: the assigning coach may edit an item after
  submission, and the **latest** submission determines lateness (FR-06.22–28). The frozen cutoff
  ([[BR-027]]) and the no-delete rule ([[BR-025]]) are unchanged. Also noted: a `PENDING_APPROVAL`
  item can outlive the relationship ([[FR-04|FR-04.13]]).
- 2026-10-14 — v2 integration: dispute model as default ([[BR-006]] reversed, K-13/K-14),
  requires-approval flag, bulk approval, frozen late cutoff ([[BR-027]]), free-text subject/topic
  with autocomplete, read-only visibility for other coaches ([[BR-024]] see/manage split)
- 2026-09-12 — created from catalog §6, §7, §8
