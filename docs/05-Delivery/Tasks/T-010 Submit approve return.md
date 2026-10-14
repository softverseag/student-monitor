---
id: T-010
aliases: [T-010]
title: Submit approve return
status: todo
milestone: M2
area: work
requirements: [FR-06]
updated: 2026-10-14
---

# T-010 — Submit, approve, return, derived status

**Goal.** The core loop works under the dispute model, and lateness is computed honestly.

**Implements.** [[FR-06]] · [[BR-006]] · [[BR-007]] · [[BR-008]] · [[BR-009]] · [[BR-010]] ·
[[BR-027]] · [[ADR-0008]]

## Steps

- [ ] `submit` on a default item → completed immediately, enters stats ([[BR-006]] dispute model)
- [ ] `submit` on a `requiresApproval` item → `PENDING_APPROVAL` until the assigning coach decides
- [ ] `return` works from both pending and completed states, restricted to the assigning coach
      ([[BR-007]]); a return reverts the statistics
- [ ] Bulk approve (all students / one student), one audit row per item flagged bulk
      ([[FR-06|FR-06.14]]); no bulk return
- [ ] Optional return note, nullable end to end ([[BR-008]])
- [ ] `lateCutoff` copied from the coach default at creation and frozen ([[BR-027]])
- [ ] On-time/late computed from `submittedAt <= dueAt + lateCutoff` ([[BR-009]]) — with a comment
      explaining why `approvedAt` is deliberately unused
- [ ] Derived `OVERDUE`, no cron job ([[ADR-0008]])
- [ ] Resubmission after a return

## Done when

- [ ] Default item submitted 19:59, cutoff 20:00, on the due date → `COMPLETED_ON_TIME` instantly
- [ ] `requiresApproval` item submitted → pending, out of completed stats until approved
- [ ] Completed item returned later → leaves the completed bucket, history shows both events
- [ ] Submitted a minute past due + cutoff → `COMPLETED_LATE`
- [ ] Never submitted, past due → `OVERDUE`, counted separately from late ([[BR-010]])
- [ ] Changing the coach's default cutoff never reclassifies an existing item ([[BR-027]])
- [ ] Return with an empty note succeeds
