---
id: BR-018
aliases: [BR-018, İK-018]
source: "İK-018"
area: exams
status: specified
updated: 2026-10-14
---

# BR-018 — The score (puan) is entered manually; the net is calculated

**Rule.** The scaled score (`puan`) is **entered manually** by the student. The **net is calculated
automatically** from correct/wrong counts, using the rule for that exam type ([[BR-019]]).

**Why.** Score formulas differ per exam type and per year, and getting them wrong is worse than not
having them — so the score stays manual. Net formulas, by contrast, are fixed, well known and cheap
(e.g. TYT/AYT: wrong ÷ 4); forcing a student to hand-calculate nets per subject kills data entry.
(Decision K-30.)

**Enforcement.** `score` is a writable field with no computation. `net` is derived by the per-type
calculator (`NetCalculator`-style pure function) from `correct`/`wrong`; it is not hand-editable.

**Verification.** Entering 32 correct / 8 wrong on a TYT subject yields net 30 without user input;
the score field stores exactly what was typed.

**History.** The original İK-018 made *everything* manual in v1. **Extended in v2**: net is now
auto-calculated (K-30), score remains manual.

**Related.** [[FR-15]] · [[BR-019]]
