---
id: FR-11
aliases: [FR-11]
title: Student Schedule
area: schedule
source: "§13, §14 · v2 §9"
status: specified
priority: must
updated: 2026-10-14
---

# FR-11 — Student Schedule and Its Privacy

> **Source:** catalog §13, §14 · [[Source - Requirements v2 (TR)|v2]] §9 · **Decisions:** K-36 ·
> **Rules:** [[BR-014]]

## Intent

The student's day is *theirs* — explicitly not a surveillance surface for the coach. v2 cut the
scope sharply (K-36): the editable calendar grid the original catalog implied is deferred, because
the coach cannot see it anyway ([[BR-014]]) and tasks already carry a time and duration — **the
daily list is the student's schedule**.

## Requirements

### v1 — read-only timeline (v2 §9.1)

- **FR-11.1** The student sees a **read-only day/week timeline**: lessons and tasks laid out at
  their times.
- **FR-11.2** School hours are a **single setting** (e.g. "weekdays 08:00–15:00"), not entered as
  individual calendar events.
- **FR-11.3** Time ranges with no record are simply free. The student never creates an explicit
  "free" entry.

### Privacy ([[BR-014]], v2 §9.2)

- **FR-11.4** A coach can **not** view the student's whole personal calendar.
- **FR-11.5** A coach cannot automatically see the student's school hours, personal activities, or
  free time.
- **FR-11.6** A coach sees only the lesson records they created — those within their own coaching
  relationship.

## Out of scope (v1)

**The editable calendar grid** — 06:00–24:00, multi-select slot marking, personal entry kinds — is
`[V1.1]` (K-36). Rationale: the coach cannot see this data ([[BR-014]]), so its commercial value is
low, while a touch-friendly multi-select grid is one of the most expensive UIs in the app.

## Acceptance criteria

- [ ] No API response to a coach ever contains school hours, personal entries or free-slot
      information.
- [ ] The coach's calendar view of a student contains only that coach's lessons — verified with a
      student who has two coaches.
- [ ] An accepted lesson appears in the student's timeline automatically ([[FR-09|FR-09.6]]).
- [ ] A task with a time and duration appears on the timeline at that time.
- [ ] Changing the school-hours setting re-renders the timeline without creating any entry records.

## Design notes

- The timeline is a **projection** — lessons and tasks are the sources of truth; school hours are a
  profile setting. v1 stores no `ScheduleEntry` rows at all; keep the concept reserved for the v1.1
  grid.
- If we ever want "find a free slot" for coaches, it must be a student-initiated share, never an
  automatic read — that would break [[BR-014]].

## Open questions

- [[Open Questions|Q-15]] — **answered** (K-36): no recurrence model needed in v1; school hours are
  one setting, the grid is deferred.

## Related

[[FR-09]] · [[FR-06]] · [[BR-014]] · [[Authorization Matrix]] · [[UX Principles]]

## Change log

- 2026-10-14 — v2 integration: v1 reduced to a read-only day/week timeline plus a single
  school-hours setting; editable grid deferred to v1.1 (K-36)
- 2026-09-12 — created from catalog §13, §14
