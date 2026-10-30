---
id: FR-15
aliases: [FR-15]
title: Mock Exam Tracking
area: exams
source: "§22, §23, §24 · v2 §10"
status: specified
priority: must
updated: 2026-10-30
---

# FR-15 — Mock Exam (Deneme) Tracking

> **Source:** catalog §22, §23, §24 · [[Source - Requirements v2 (TR)|v2]] §10 · **Decisions:**
> K-21, K-30, K-31 · **Rules:** [[BR-016]], [[BR-017]], [[BR-018]], [[BR-019]], [[BR-031]]

## Intent

Deneme results are how progress is actually measured in Turkish exam prep. Students take a full
practice exam most weeks, and the trend in *net* over months is the single most-watched number by
student, coach and parent alike.

Results are self-reported, so the coach verifies them — and since the result is the *student's*
data, the student picks which coach does ([[BR-031]]).

## Requirements

### Recording (v2 §10.1–10.2)

- **FR-15.1** A student can record the results of mock exams they have taken.
- **FR-15.2** A result record supports at least: exam name, exam type, date, per-subject
  correct/wrong, net, score.
- **FR-15.3** The **net is calculated automatically**, with the rule varying per exam type (e.g.
  TYT/AYT: wrong ÷ 4). The **score (puan) is entered manually** ([[BR-018]], K-30).
- **FR-15.4** The subject list varies per exam type, and the data model must **not** depend on one
  fixed formula or subject set — new exam types must be addable without a schema change
  ([[BR-019]], K-31).

### Approval (v2 §10.3)

- **FR-15.5** Mock exam results are subject to coach approval; a student-entered result is not
  treated as final ([[BR-016]]).
- **FR-15.6** Statuses: `PENDING_APPROVAL` (Onay bekliyor), `APPROVED` (Onaylandı), `REJECTED`
  (Reddedildi).
- **FR-15.7** **The student selects which of their active coaches approves** ([[BR-031]]). With one
  coach, that coach is auto-assigned and no picker is shown.
- **FR-15.8** What happens to a rejected result (does the student correct and resubmit?) is open —
  [[Open Questions|Q-25]] (A-08).

### Statistics

- **FR-15.9** Whether unapproved results enter statistics is **under review** — v2 reopened İK-017
  as open item A-01 ([[Open Questions|Q-20]]). **Until decided, [[BR-017]] stands:** only approved
  results feed average, best result, trend, past performance and per-subject analysis.
- **FR-15.10** Build every statistic behind one approved-results scope so the Q-20 decision touches
  a single place.

### Progression (v2 §10.5)

- **FR-15.11** From approved results the system can produce: latest result, historical results, best
  result, average, change versus the previous exam, and per-subject change.

## Acceptance criteria

- [ ] Entering 32 correct / 8 wrong on a TYT subject stores net 30 with no user calculation; the
      typed score round-trips unchanged.
- [ ] A pending result appears in the student's own list marked "pending" and in no statistic
      (current [[BR-017]] behaviour, pending Q-20).
- [ ] A student with two coaches picks coach A; coach B gets 404 on the approval route
      ([[BR-031]]).
- [ ] A student with one coach never sees an approver picker.
- [ ] Per-subject rows survive a change of exam type — the schema is not TYT-shaped.
- [ ] Net values accept decimals (a net is routinely 42.75).

## Design notes

- Schema: `MockExamResult` (header: name, type, date, totals, status, `approverCoachId`, approval
  metadata) + per-subject results in a **variable structure** per exam type (K-31 — the client's
  technical plan uses a JSON `subjects` field; fixed columns would be TYT-shaped).
- Net formula: `net = correct − wrong / k`, `k = 4` for YKS, `k = 3` for LGS — in a per-type
  strategy, one pure module, never hard-coded ([[BR-019]]).
- Exam types differ in structure, not just arithmetic: TYT is one combined session, AYT is
  field-specific, LGS splits into two sessions.

## Open questions

- [[Open Questions|Q-09]] — **answered** (K-30/K-31): net auto per type, score manual, variable
  subject structure; launch types follow the product scope (YKS: TYT/AYT, and LGS).
- [[Open Questions|Q-16]] — **answered** (v2 §10.3): `REJECTED` exists.
- [[Open Questions|Q-20]] — do unapproved results enter statistics? (A-01)
- [[Open Questions|Q-25]] — the aftermath of a rejection. (A-08)
- [[Open Questions|Q-28]] — a result left `PENDING_APPROVAL` when the approving coach ([[BR-031]])
  ends the link. Coach-owned work freezes there by decision ([[FR-04|FR-04.13]]); whether the
  student may re-point their own result at another active coach is open.

## Related

[[FR-14]] · [[FR-20]] · [[FR-03]] · [[BR-016]] · [[BR-017]] · [[BR-018]] · [[BR-019]] · [[BR-031]]

## Change log

- 2026-10-14 — v2 integration: net auto-calculated per exam type, score manual (K-30), variable
  subject structure (K-31), `REJECTED` status, student-selected approver ([[BR-031]]), statistics
  rule reopened as Q-20
- 2026-09-12 — created from catalog §22–§24
