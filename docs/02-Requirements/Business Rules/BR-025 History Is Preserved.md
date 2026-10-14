---
id: BR-025
aliases: [BR-025, İK-025]
source: "İK-025"
area: platform
status: specified
updated: 2026-10-14
---

# BR-025 — Historical records are preserved

**Rule.** Past work and action records are retained for reporting. Completing an item, passing a
deadline, or ending a relationship never deletes history. **One defined exception** (added in v2):
a coach disabling the finance module may really delete their finance data — see [[BR-029]].

**Why.** The history *is* the coaching record. It also settles disputes and feeds every report.

**Enforcement.** No hard deletes in the domain: state transitions and soft-delete flags only. No
cascading deletes in the schema. Append-only audit log ([[FR-21]]). The finance wipe ([[BR-029]]) is
possible precisely because the finance schema is referenced by nothing else (K-39).

**Verification.** Ending a relationship and completing a term leaves every task, lesson, exam result
and earning row queryable.

**Related.** [[FR-21]] · [[FR-14]] · [[BR-002]] · [[Security and Privacy]]
