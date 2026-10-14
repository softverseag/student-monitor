---
title: Requirements Index
updated: 2026-10-14
---

# Requirements Index

25 functional areas, derived from [[Source - Requirement Catalog (TR)]] and updated against
[[Source - Requirements v2 (TR)]] (October 2026 — see [[Requirements v2 Delta]] for what changed).
Sub-requirements are numbered inside each note (`FR-06.4`) and are the unit we write tests against.

```dataview
TABLE status, priority, source AS "Catalog §", area
FROM "02-Requirements"
WHERE id != null AND contains(id, "FR")
SORT id ASC
```

## All areas

| ID | Area | Catalog § | Priority | v1 |
| --- | --- | --- | --- | --- |
| [[FR-01]] | Accounts and Sessions | §3.1, §3.2 | must | ✅ |
| [[FR-02]] | Roles and Authorization | §3.3, §32, §33 | must | ✅ |
| [[FR-03]] | Student Profile and Grade Level | §3.4 | must | ✅ |
| [[FR-04]] | Coach Student Relationship | §4 | must | ✅ |
| [[FR-05]] | Parent Student Relationship | §5 | must | ✅ |
| [[FR-06]] | Task Management | §6, §7, §8 | must | ✅ |
| [[FR-07]] | Assignment Management | §9 | must | ✅ |
| [[FR-08]] | Filiz Progress Character | §10 | should | ✅ |
| [[FR-09]] | Lesson Scheduling | §11, §12 | must | ✅ |
| [[FR-10]] | Lesson Attendance | §15 | must | ✅ |
| [[FR-11]] | Student Schedule | §13, §14 | must | ✅ |
| [[FR-12]] | Resource Pool and Recommendations | §16 · v2 §11 | should | ✅ |
| [[FR-13]] | File Sharing | §17 · v2 §12 | should | ✅ |
| [[FR-14]] | Progress Reporting | §18–§21 · v2 §14 | must | ✅ |
| [[FR-15]] | Mock Exam Tracking | §22–§24 · v2 §10 | must | ✅ |
| [[FR-16]] | Notifications | §25, §26, §31 · v2 §15 | must | ✅ |
| [[FR-17]] | Coach Student Monitoring | §27 | must | ✅ |
| [[FR-18]] | Student Pricing | §28 | must | ✅ |
| [[FR-19]] | Timesheet and Earnings | §29 | must | ✅ |
| [[FR-20]] | Parent Information Access | §30 | must | ✅ |
| [[FR-21]] | Audit Trail | §34 | must | ✅ |
| [[FR-22]] | Subscription and Billing | §35 | should | ✅ |
| [[FR-23]] | Study Plans (Çizelge) | v2 §7 | must | ✅ |
| [[FR-24]] | School Report Card | v2 §13 | should | ✅ |
| [[FR-25]] | Finance Module and Ledger | v2 §16 | must | ✅ |

✅ in v1 · ⏳ deferred — see [[Scope and MVP]]. The v1 cut changed substantially in v2: exams,
resources and files moved *into* v1, the editable schedule grid moved *out*.

## v2 section → requirement map

Use this to check nothing from [[Source - Requirements v2 (TR)]] got lost.

| v2 § | Topic | Covered by |
| --- | --- | --- |
| 1–2 | Roles, accounts, authorization | [[FR-01]], [[FR-02]], [[FR-03]] |
| 2.5 | Minor users / KVKK `[AÇIK]` | [[Open Questions\|Q-12]] |
| 3 | Coach–student relationship, see/manage split | [[FR-04]], [[BR-024]], [[BR-030]] |
| 4 | Parent–student relationship | [[FR-05]] |
| 5–6 | Work: dispute model, bulk approval, lateness | [[FR-06]], [[FR-07]], [[BR-006]], [[BR-027]] |
| 7 | Study plans (çizelge) | [[FR-23]] |
| 8 | Lessons, types, group lessons, attendance | [[FR-09]], [[FR-10]], [[BR-028]] |
| 9 | Student timeline and privacy | [[FR-11]] |
| 10 | Mock exams | [[FR-15]], [[BR-018]], [[BR-019]], [[BR-031]] |
| 11 | Resource pool | [[FR-12]] |
| 12 | File sharing | [[FR-13]] |
| 13 | School report card | [[FR-24]] |
| 14 | Progress and Filiz | [[FR-08]], [[FR-14]] |
| 15 | Notifications and reminders | [[FR-16]] |
| 16 | Finance: price, earnings, ledger, module | [[FR-18]], [[FR-19]], [[FR-25]], [[BR-029]] |
| 17 | Parent visibility switches | [[FR-20]] |
| 18 | Data authorization summary | [[FR-02]], [[Authorization Matrix]] |
| 19 | Audit trail | [[FR-21]] |
| 20 | Subscription / free beta | [[FR-22]] |
| 21 | Business rules İK-001..031 | [[Business Rules Index]] |
| 22 | Out of v1 scope | [[Scope and MVP]] |
| 23 | Open items and accepted risks | [[Open Questions]], [[Scope and MVP]] |

## Catalog section → requirement map (original, September 2026)

Use this to check nothing from the client's first document got lost.

| § | Topic | Covered by |
| --- | --- | --- |
| 1 | Purpose of the document | — (meta) |
| 2 | System users | [[Personas]], [[FR-02]] |
| 3.1–3.2 | Account creation, sessions | [[FR-01]] |
| 3.3 | Role-based authorization | [[FR-02]] |
| 3.4 | Student education info | [[FR-03]] |
| 4.1–4.6 | Coach–student relationship | [[FR-04]] |
| 5.1–5.4 | Parent–student relationship | [[FR-05]] |
| 6.1–6.7 | Task management | [[FR-06]] |
| 7.1–7.3 | Lateness handling | [[FR-06]] |
| 8 | Task history | [[FR-06]], [[FR-21]] |
| 9 | Assignments | [[FR-07]] |
| 10 | Filiz / progress | [[FR-08]] |
| 11.1–11.3 | Lesson requests | [[FR-09]] |
| 12 | Lesson cancellation | [[FR-09]] |
| 13 | Student schedule | [[FR-11]] |
| 14 | Schedule privacy | [[FR-11]] |
| 15 | Attendance | [[FR-10]] |
| 16.1–16.2 | Resource pool, recommendations | [[FR-12]] |
| 17 | File sharing | [[FR-13]] |
| 18–21 | History, daily/weekly/monthly progress | [[FR-14]] |
| 22.1–22.2 | Mock exam tracking | [[FR-15]] |
| 23–24 | Exam approval and progression | [[FR-15]] |
| 25 | Event notifications | [[FR-16]] |
| 26 | Coach-sent notifications, templates | [[FR-16]] |
| 27 | Coach follow-up | [[FR-17]] |
| 28 | Per-student pricing | [[FR-18]] |
| 29.1–29.3 | Timesheet / earnings | [[FR-19]] |
| 30 | Parent information | [[FR-20]] |
| 31 | Coach → parent notifications | [[FR-16]], [[FR-20]] |
| 32 | Data authorization | [[FR-02]], [[Authorization Matrix]] |
| 33 | Multi-coach isolation | [[FR-02]], [[BR-024]] |
| 34 | Status and action history | [[FR-21]] |
| 35 | Subscription model | [[FR-22]] |
| 36 | Domain concepts | [[Domain Model]] |
| 37 | Business rules İK-001..026 | [[Business Rules Index]] |

## Related

[[Business Rules Index]] · [[Domain Model]] · [[Scope and MVP]] · [[Roadmap]]
