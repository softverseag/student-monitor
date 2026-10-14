---
title: Business Rules Index
updated: 2026-10-14
---

# Business Rules Index

The client's 31 hard rules (`İK-001`–`İK-031`; originally in [[Source - Requirement Catalog (TR)]],
revised and extended by [[Source - Requirements v2 (TR)]] §21), restated as testable constraints.
These are not negotiable design preferences — breaking one is a defect.

**v2 changes at a glance:** İK-006 **reversed** (dispute model), İK-017 **reopened**
([[Open Questions|Q-20]]), İK-018/019 extended (net auto-calculates), İK-021 clarified (price
models), İK-025 gained a finance exception, İK-027–031 are **new**.

```dataview
TABLE source AS "İK", area, status
FROM "02-Requirements/Business Rules"
WHERE id != null
SORT id ASC
```

| ID | İK | Rule | Area |
| --- | --- | --- | --- |
| [[BR-001]] | İK-001 | A student may work with several coaches at once | relationships |
| [[BR-002]] | İK-002 | Either side can end a coach–student relationship | relationships |
| [[BR-003]] | İK-003 | A parent link is active only after coach approval | relationships |
| [[BR-004]] | İK-004 | A student has at most two active parents | relationships |
| [[BR-005]] | İK-005 | Tasks and assignments are tracked independently | work |
| [[BR-006]] | İK-006 | Completion follows the dispute model (**reversed in v2**) | work |
| [[BR-007]] | İK-007 | Only the assigning coach evaluates the completion request | work |
| [[BR-008]] | İK-008 | The return explanation is optional | work |
| [[BR-009]] | İK-009 | Lateness is measured by the student's submission time | work |
| [[BR-010]] | İK-010 | Completed-late and never-completed are different | work |
| [[BR-011]] | İK-011 | Only a coach can create a lesson request | lessons |
| [[BR-012]] | İK-012 | Either side can cancel a confirmed lesson | lessons |
| [[BR-013]] | İK-013 | The cancellation explanation is optional | lessons |
| [[BR-014]] | İK-014 | A coach cannot see the student's whole personal schedule | schedule |
| [[BR-015]] | İK-015 | A coach can see the resource pool and recommend resources | resources |
| [[BR-016]] | İK-016 | Mock exam results are not final until the coach approves | exams |
| [[BR-017]] | İK-017 | Unapproved results enter no statistic (**under review**, [[Open Questions\|Q-20]]) | exams |
| [[BR-018]] | İK-018 | The score is entered manually; the net is calculated | exams |
| [[BR-019]] | İK-019 | Net formulas vary per exam type; auto-calculated from v1 | exams |
| [[BR-020]] | İK-020 | Each coach sets their own price per student | money |
| [[BR-021]] | İK-021 | Earnings derive from the source records of the price model | money |
| [[BR-022]] | İK-022 | Only the coach and authorised parents see money | money |
| [[BR-023]] | İK-023 | Changing the price never rewrites past earnings | money |
| [[BR-024]] | İK-024 | One coach cannot manage another coach's content (see/manage split) | authorization |
| [[BR-025]] | İK-025 | Historical records are preserved (exception: [[BR-029]]) | platform |
| [[BR-026]] | İK-026 | Every student's grade level is tracked and visible to linked coaches | identity |
| [[BR-027]] | İK-027 | The late cutoff is copied onto the work item and frozen | work |
| [[BR-028]] | İK-028 | Group lesson fees are per student and never split | money |
| [[BR-029]] | İK-029 | The finance module is opt-in and its data is truly deletable | money |
| [[BR-030]] | İK-030 | After the relationship ends, the coach's access is read-only | relationships |
| [[BR-031]] | İK-031 | The student picks the coach who approves an exam result | exams |

## The five that will bite us

Ranked by how easy they are to break without noticing:

1. **[[BR-024]]** — one missing `coachId` in a `where` clause leaks a competitor's content; and
   since v2's see/manage split, the opposite trap exists too: an "Approve" button rendered on
   another coach's item.
2. **[[BR-022]]** — one shared DTO between a coach view and a student view exposes money.
3. **[[BR-023]]** — one "simple" price update in place silently rewrites last month's income. The
   same snapshot discipline now covers the late cutoff ([[BR-027]]).
4. **[[BR-009]]** — using `approvedAt` for lateness looks correct and is wrong — doubly so under the
   dispute model, where most items are never "approved" at all.
5. **[[BR-017]]** — one aggregate reading the raw results table poisons every chart (rule under
   review as [[Open Questions|Q-20]], but the single-scope discipline is required either way).

Each of these deserves a test that fails loudly, written before the feature.

## Related

[[Requirements Index]] · [[Authorization Matrix]] · [[Source - Requirement Catalog (TR)]]
