---
title: Personas
status: draft
updated: 2026-10-20
---

# Personas

## Elif — the coach (koç)

28, coaches 20–35 students at once, mostly grade 11–12 preparing for YKS. Meets each student weekly
for 30–60 minutes, online or in person.

**Her day:** assign the week's work, chase yesterday's, approve what came in, review deneme results,
message the three students who went quiet, reschedule two lessons.

**Pain:** she cannot tell at a glance who is behind. Approvals arrive as WhatsApp photos at midnight.
At month end she reconstructs which lessons happened, at what price, for whom.

**What she needs:** a follow-up view that separates *done*, *waiting for me* and *missing*
([[FR-17]]); bulk notifications with reusable templates ([[FR-16]]); plans she builds once and
assigns to many ([[FR-23]]). Earnings that compute themselves ([[FR-19]]) are **v1.1** — in v1 she
keeps doing the month-end reconstruction by hand.

**Platform:** mobile for everything, a web portal when she wants a keyboard — chiefly for building
plans ([[ADR-0017]]). Nothing is web-only.

## Mert — the student (öğrenci)

17, grade 12, at school until 16:00, then 3–4 hours of prep. Works with a coach and a separate maths
tutor. Lives on his phone.

**His day:** check what is due, work, mark things done, log a deneme he took on Sunday, look at his
schedule for tomorrow.

**Pain:** work comes from two coaches through two chats; deadlines get lost. He does not want anyone
watching his whole calendar — including his free time.

**What he needs:** one list of everything due, whoever assigned it ([[FR-06]]); a private schedule he
controls ([[FR-11]], [[BR-014]]); visible progress that makes the daily grind feel like it adds up
([[FR-08]]).

**Platform:** mobile, almost exclusively.

## Ayşe — the parent (veli)

45, pays for the coaching, does not want to micromanage, does want to know it is working.

**Her question, once a week:** is he doing the work, did the lessons happen, are the results moving,
what do I owe this month.

**Pain:** she has to ask the coach, and she gets an answer filtered through politeness.

**What she needs:** a read-only summary the coach has chosen to share ([[FR-20]]), attendance and
exam development. The financial side — price and earnings, which her son must never see
([[BR-022]]) — is **v1.1**, so in v1 "what do I owe this month" is still a question she asks the
coach directly.

**Platform:** mobile, one screen, opened weekly, not daily. No parent web view ([[ADR-0017]]).

## Access at a glance

| | Elif (coach) | Mert (student) | Ayşe (parent) |
| --- | --- | --- | --- |
| Assign work | ✅ own students | ❌ | ❌ |
| Mark work done | ❌ | ✅ own | ❌ |
| Approve work | ✅ own assignments only | ❌ | ❌ |
| Request a lesson | ✅ | ❌ ([[BR-011]]) | ❌ |
| Cancel a confirmed lesson | ✅ | ✅ | ❌ |
| See full personal schedule | ❌ ([[BR-014]]) | ✅ | ❌ |
| Approve mock exam results | ✅ | ❌ | ❌ |
| See price and earnings *(v1.1)* | ✅ own | ❌ ([[BR-022]]) | ✅ approved |
| Approve a parent link | ✅ | ❌ | ❌ ([[BR-003]]) |

Full detail: [[Authorization Matrix]].
