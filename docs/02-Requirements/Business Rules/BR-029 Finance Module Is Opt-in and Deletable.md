---
id: BR-029
aliases: [BR-029, İK-029]
source: "İK-029"
area: money
status: specified
updated: 2026-10-20
---

# BR-029 — The finance module is opt-in and its data is truly deletable

> [!info] v1.1 — the finance module is not built in v1
> Deferred 2026-10-20 ([[Scope and MVP]]). The rule stands and is binding the moment the
> module is built; there is simply nothing in v1 for it to govern.


**Rule.** The finance module (prices, earnings, payments, statements) is **off by default**; a coach
enables it deliberately, and the rest of the product works fully while it is off. When disabling the
module, the coach is offered a **"delete my data"** option — and that is a **real, physical delete**,
the one defined exception to [[BR-025]].

**Why.** Coaches working informally fear leaving a financial data trail; that fear is a real adoption
risk. A coach who knows they can wipe the data with one click is willing to enter it. A soft delete
would make that promise a lie. (Decisions K-07, K-09.)

**Enforcement.** A per-coach module flag gates every finance feature, including the parent finance
visibility switch. Finance data lives in its own isolated schema with no inbound references from the
rest of the domain (K-39), so the delete path can physically remove the coach's rows. The audit log
records *that* the module was enabled/disabled/wiped — never any amount ([[FR-21]], K-41).

**Verification.** With the module off, every non-finance test passes unchanged. After a wipe, no
price, earning or payment row for that coach exists anywhere, and attendance/lesson history is
untouched ([[FR-10]] is independent of finance).

**Related.** [[FR-25]] · [[BR-022]] · [[BR-025]] · [[Security and Privacy]]
