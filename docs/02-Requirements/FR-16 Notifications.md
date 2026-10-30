---
id: FR-16
aliases: [FR-16]
title: Notifications
area: notifications
source: "§25, §26, §31 · v2 §15"
status: specified
priority: must
updated: 2026-10-14
---

# FR-16 — Notifications

> **Source:** catalog §25, §26, §31 · [[Source - Requirements v2 (TR)|v2]] §15 · **Decisions:**
> K-34, K-35 · **Rules:** [[BR-007]], [[BR-024]]

## Intent

The loop stalls without nudges: work assigned that nobody saw, submissions waiting on a coach who
does not know. Notifications are what make the system feel alive — and the fastest way to make it
unbearable if they go to the wrong person.

## Requirements

### Event notifications (§25)

- **FR-16.1** The system notifies the relevant users on significant events, at minimum (v2 §15.1):
  new task/assignment, completion notification, approval, return, lesson request, lesson acceptance,
  lesson decline, lesson cancellation, mock exam approval request, mock exam approval/rejection,
  resource recommendation, parent-link approval.
- **FR-16.2** Notifications go **only to users involved in the event** — never to a student's other
  coaches ([[BR-007]], [[BR-024]]).

### Task-time reminders (v2 §15.2, K-35)

- **FR-16.2a** An automatic reminder is sent at a task's scheduled time.
- **FR-16.2b** The student configures their own reminder preferences and **quiet hours**; a reminder
  falling into quiet hours is deferred until they end.
- **FR-16.2c** Notifications the coach sends are delivered regardless of quiet hours.

### Coach-sent notifications (§26)

- **FR-16.3** A coach can send manual notifications to their linked students.
- **FR-16.4** A coach can select multiple students for one send.
- **FR-16.5** A coach can create, edit and reuse **notification templates**. A template carries a
  **target audience** field: student or parent (K-34).
- **FR-16.6** This is explicitly **not** an AI prompt system — templates are stored text with
  placeholders at most.
- **FR-16.6a** Manual sends are **rate-limited** to prevent abuse (v2 §15.3).

### Coach → parent (§31)

- **FR-16.7** A coach can send notifications to a linked student's parent.
- **FR-16.8** A coach can create reusable templates for parents as well.
- **FR-16.9** A notification sent to a student is **not** automatically forwarded to the parent.

## Acceptance criteria

- [ ] A completion request for a task assigned by Coach A notifies Coach A and nobody else, on a
      student who has three coaches.
- [ ] Selecting 15 students and a template produces 15 individual notifications, not a group thread.
- [ ] No student notification ever appears in a parent's feed unless separately sent.
- [ ] A notification carries enough context to deep-link to the item it refers to.
- [ ] Templates are per coach and private to them.

## Design notes

- One `Notification` row per recipient per event, with `type` + structured `payload` — never a
  pre-rendered string, or translations and deep links become impossible later.
- Channels: in-app feed plus push. **Settled 2026-10-20** ([[ADR-0017]]): we ship a native mobile
  app, so push is native (Expo push / APNs-FCM), not Web Push/VAPID on a PWA. The client's accepted
  risk — on iOS, web push works only after add-to-home-screen (v2 §23.2) — no longer applies, and
  was the main reason the single-PWA plan lost. The web portal is coach-only and does not need push
  in v1.
- Reminders imply infrastructure: a scheduled-job runner and a `scheduled_reminder`-style table —
  this is the mechanism that makes students open the app at all (K-35).
- Templates want placeholders (`{{student}}`, `{{dueDate}}`) — cheap to add, and the reason a coach
  uses the feature twice.
- Bulk send is a background job, not a request-scoped loop.

## Open questions

- [[Open Questions|Q-11]] — **answered** (K-35, v2 §15.2): in-app + push, quiet hours exist and are
  student-configured; coach messages bypass them. Delivery mechanism **answered 2026-10-20** —
  native mobile push ([[ADR-0017]]).

## Related

[[FR-06]] · [[FR-09]] · [[FR-15]] · [[FR-17]] · [[FR-20]]

## Change log

- 2026-10-20 — push delivery is native, not Web Push: the platform question behind it closed with
  [[ADR-0017]].

- 2026-10-14 — v2 integration: task-time reminders with student quiet hours (K-35), template
  audience field (K-34), send rate limit, event list extended
- 2026-09-12 — created from catalog §25, §26, §31
