---
id: FR-20
aliases: [FR-20]
title: Parent Information Access
area: parent
source: "§30 · v2 §17"
status: specified
priority: must
updated: 2026-10-14
---

# FR-20 — Parent Information Access

> **Source:** catalog §30 · [[Source - Requirements v2 (TR)|v2]] §17 · **Decisions:** K-10, K-29 ·
> **Rules:** [[BR-003]], [[BR-022]]

## Intent

The parent pays and worries, but does not coach. Their view is *informational* — a weekly reassurance
that the work is happening and the money is accounted for — not a management console.

## Requirements

- **FR-20.1** A parent can view the progress information that the coach has **opened to them** for
  their linked student.
- **FR-20.2** The purpose on the parent side is general follow-up and information, not student
  management.
- **FR-20.3** The coach controls visibility with exactly **three switches**, set per coach–student
  relationship (K-29, v2 §17.1):

  | Switch | Opens to the parent |
  | --- | --- |
  | **Progress** | weekly/daily progress, completed and missing work, lesson continuity, coach note |
  | **Exams** | approved mock exam results and development ([[BR-017]]) |
  | **Finance** | lesson price, debt, paid, balance, lesson breakdown — only effective while the coach's finance module is on ([[FR-25]]) |

  A closed switch means that area **does not appear at all** in the parent's view — not greyed out,
  absent.
- **FR-20.3a** A parent never sees, regardless of switches (v2 §17.2): task/assignment details, the
  student's personal calendar, the coach's private notes, or other coaches' price and earnings data.
- **FR-20.3b** The parent sees the student's school report card ([[FR-24]]).
- **FR-20.4** Price and earnings are parent-facing financial information and are **never**
  student-facing ([[BR-022]]).
- **FR-20.5** A parent sees only students they are actively and approvedly linked to ([[BR-003]]).
- **FR-20.6** The coach controls what is opened; nothing is shared by default.
- **FR-20.7** A parent can receive notifications from the coach ([[FR-16]]), but does not
  automatically receive the student's notifications.

## Acceptance criteria

- [ ] A newly approved parent sees the student's name and nothing else until the coach opens
      categories.
- [ ] Turning off a category removes it from the parent's view immediately.
- [ ] A parent's financial view shows price and earnings for every coach the student works with,
      each attributed — but never a coach's pool total across other students.
- [ ] Unapproved mock exam results never reach a parent ([[BR-017]]).
- [ ] No parent endpoint allows a write to student data.

## Design notes

- Three switches, not seven: the client cut the prototype's 7 toggles because the cost is the
  **combination count** — 128 states each needing a sensible parent screen vs 8 (K-29). Exams kept
  its own switch because results are sensitive.
- Two parents share the same view; there is no per-parent configuration.
- The parent view is weekly-cadence, not daily. Design for a summary, not a feed.
- Consider a monthly digest notification — the parent behaviour we want is "read the summary", not
  "log in and dig".

## Open questions

- [[Open Questions|Q-05]] — **answered** (K-29): three switches — progress / exams / finance, all
  off by default.

## Related

[[FR-05]] · [[FR-14]] · [[FR-15]] · [[FR-18]] · [[FR-19]] · [[FR-24]] · [[FR-25]] ·
[[Authorization Matrix]]

## Change log

- 2026-10-14 — v2 integration: three visibility switches (K-29), hard never-visible list, report
  card visible, finance switch tied to the finance module
- 2026-09-12 — created from catalog §30
