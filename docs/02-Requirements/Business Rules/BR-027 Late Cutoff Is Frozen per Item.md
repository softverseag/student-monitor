---
id: BR-027
aliases: [BR-027, İK-027]
source: "İK-027"
area: work
status: specified
updated: 2026-10-14
---

# BR-027 — The late cutoff is copied onto the work item and frozen

**Rule.** Each coach sets their own default late-cutoff time (e.g. 20:00). When a task or assignment
is created, that value is **copied onto the record and never changes**. A coach changing the setting
later does not change the lateness of any existing item.

**Why.** History must not be re-judged by a settings change — the same snapshot logic as prices
([[BR-023]]). It also dissolves the "which cutoff applies?" question for a student with two coaches:
each item carries its own. (Decision K-19.)

**Enforcement.** `WorkItem.lateCutoff` is written once at creation from the assigning coach's current
default. No update path exists. Lateness = compare `submittedAt` against `dueDate + lateCutoff` on
the row ([[BR-009]]).

**Verification.** Change the coach's default cutoff; the stored cutoff and derived lateness of every
existing item are unchanged, and only items created afterwards use the new value.

**Related.** [[FR-06]] · [[BR-009]] · [[BR-023]]
