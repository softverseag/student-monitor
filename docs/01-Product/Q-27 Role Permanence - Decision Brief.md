---
title: Q-27 Role Permanence — Decision Brief
status: awaiting-decision
raised: 2026-10-19
decidedBy: []
updated: 2026-10-19
---

# Q-27 — Should a user's role be permanent?

**For: @bursadev · Raised by: Batuhan, 2026-10-19 · Status: not decided, deciding together**

This note exists so the decision can be made from one page instead of five. It **decides nothing**
and **changes nothing**: [[ADR-0014]] still stands, the shipped onboarding behaviour is untouched,
and [[T-017]] is unaffected until we agree on an answer here.

> [!question] What I need from you
> Pick one of the four options below — or tell me the framing is wrong. If you pick A, I will write
> the superseding ADR and the task; if you pick D, I will close Q-27 as "answered: no change" and we
> keep moving. **Either answer is fine. Not answering is the expensive one**, because [[T-017]] is
> sitting in review and M1 builds on top of it.

---

## The situation in four sentences

Today a user picks their role once at onboarding and it is **permanent** — there is no way to
change it, ever. That was decided in [[ADR-0014]] (September) and is already built and working.

The concern, raised while re-reading [[FR-01]]: the entire cost of this falls on a person who taps
the wrong button in their first thirty seconds of using the app, and we have given them no way out.
Not support (no admin role until v1.1, [[Open Questions|Q-18]]), and not self-service — deleting the
account discards all history by [[ADR-0013]].

## This is not a surprise — the ADR predicted it

Worth saying plainly, because it changes the tone of the conversation: **[[ADR-0014]] already wrote
this down as an accepted cost.** Quoting its own Consequences section:

> **Choosing wrong is unrecoverable by the user.** A teenager who taps "Koç" on day one needs
> support intervention — and we have no admin role to intervene with. The form warns before
> submitting ("Rolünü daha sonra değiştiremezsin"), which is mitigation, not a fix.

So the question is **not** "did we miss something". It is: *we knowingly accepted this bet in
September — do we still want to be holding it at launch?*

## What is and is not in dispute

| | |
| --- | --- |
| **Not in dispute** | *One role per account.* Nobody is proposing multi-role accounts or an "acting as" switcher. That is [[Open Questions\|Q-08]], it was answered, and it stays answered. |
| **In dispute** | *Permanence.* Whether a role, once chosen, can ever be corrected. |

Keeping these apart is the whole point. Letting a user **correct** their single role is a small,
local change. Letting an account **hold** several roles is a large one that touches every policy
check. Q-27 is only about the first.

## Why it matters more than it looks

- **It hits the worst possible moment.** Not an edge case deep in the product — the first screen,
  before the user understands what the three words mean. "Koç", "Öğrenci", "Veli" are clear to us
  and less clear to a 16-year-old installing an app their tutor told them to install.
- **The audience is minors.** A teenager who gets stranded does not file a support ticket. They
  uninstall, or they create a second account with a fake e-mail — and now we have a duplicate
  person and no history.
- **We have no escape hatch at all.** Normally "we'll fix it manually" covers this. Here there is no
  admin tooling until v1.1, so in v1 the fix is literally "someone opens the production database".
- **It is cheapest to change now.** `role` is written in exactly one place today — the ADR
  deliberately preserved that property. The longer we build on top of it, the less true it stays.

**The honest counter-argument:** we have zero users, so we have zero evidence this actually happens.
Everything above is reasoning about a hypothetical teenager. That is a real objection, and it is the
case for option D.

## The options

| | Option | What the user can do | Cost | Depends on |
| --- | --- | --- | --- | --- |
| **A** | **Changeable while the account is empty** *(recommended)* | Change role freely until the first link or first piece of content exists; permanent after that | Small — one endpoint, one emptiness check, one audit row | nothing |
| **B** | Changeable any time | Change role whenever, history stays attached to the capacity that created it | Large — we must answer what happens to existing links, work, lessons and earnings | [[FR-21]] audit trail, plus new rules |
| **C** | Support can change it | User asks, we fix it | Medium, and **unavailable in v1** | [[Open Questions\|Q-18]] admin role (v1.1) |
| **D** | **Keep it permanent** | Nothing changes; improve the warning copy and add a confirmation step | Zero | nothing |

### Why A is the recommendation

A is not a compromise between the others — it is the option that makes the hard part disappear.

The reason [[ADR-0014]] rejected "one role, changeable later" was precisely this, in its own words:

> nothing answers what happens to work, links and earnings created under the old role — and an audit
> trail for it ([[FR-21]]) does not exist yet

**On an empty account, that question has no content to be asked about.** No links, no tasks, no
lessons, no earnings — so there is nothing to migrate, nothing to reattribute, and no audit trail
needed to explain a migration that never happens. The objection that killed the general version does
not apply to the restricted one.

And it covers the actual failure mode. The teenager who taps "Koç" by mistake discovers it within
minutes, long before anything exists on the account. A user who has been working for three months
and *then* wants a different role is a different problem — and a much rarer one, which option A
deliberately does not solve.

What stays true under A:

- `role` remains a single column. No "acting as" dimension, no role switcher, no change to the
  policy layer.
- `role` still has **exactly one writer**. `completeOnboarding` today gates on
  `updateMany … where onboardedAt: null` and answers 409; option A is the same write with an
  emptiness check instead. We do not add a second place that writes `role` — that invariant is what
  keeps every future option open.
- It is self-service, so it does not wait for the admin role in v1.1.

**What A still needs us to agree on,** and the reason this is not already done:

1. **What counts as "empty"?** My proposal: no `CoachStudentLink` and no `ParentStudentLink` in any
   state (including pending), and no content rows authored by or addressed to the user. Pending
   links count as non-empty — someone on the other side has already acted.
2. **An audit row when the role changes** ([[FR-21]]). Already a [[T-017]] follow-up, so it is work
   we owe anyway.
3. **Is it time-bounded as well?** E.g. "empty **and** within 24 hours". My view: no — adding a
   clock buys nothing that emptiness does not already cover, and it creates a support case at hour
   25. Mentioning it because it is the obvious next suggestion.

### Why you might reasonably pick D instead

- We have no users and therefore no evidence the problem is real.
- The warning copy already exists; a confirm step is an hour of work and may be enough.
- Every hour spent here is an hour not spent on M1, and [[FR-23]] (çizelge) is the feature the
  client called the most important thing in v1.
- A is cheap, but "cheap" is not "free", and it is one more thing to test.

If you pick D, I would still want the confirmation step rather than the current single warning line,
and I would want Q-27 recorded as *answered: deliberately accepted* rather than quietly dropped — so
that when a real user hits it, we know we chose this.

## Scope note

Whatever we pick, it does **not** reopen:

- multi-role accounts ([[Open Questions|Q-08]] — answered, staying answered),
- the admin/support role ([[Open Questions|Q-18]] — v1.1),
- account deletion behaviour ([[ADR-0013]], and [[Open Questions|Q-19]] separately).

## If we choose A — what follows

Nothing here is started; this is the shape of the work so the cost is visible.

1. A new ADR superseding [[ADR-0014]] (one role per account **stands**; permanence relaxed), with
   `ADR-0014` moved to `superseded by ADR-00xx` and kept, per the vault rule.
2. [[FR-01|FR-01.9]] reworded, `checkedBy` cleared and the note re-read.
3. A task under M1: the endpoint, the emptiness check, the audit row, and the negative tests — a
   non-empty account must get a 409, and the test must prove the check cannot be bypassed.
4. UI: the role becomes editable in settings while empty, and visibly locks once it is not.

## Where this came from

- [[Open Questions|Q-27]] — the one-line version, with the placeholder we are running on
- [[ADR-0014]] — the original decision, its accepted costs, and its reversibility analysis
- [[FR-01|FR-01.9]] — the requirement itself, marked under review
- [[T-017]] — the implementation, in `review`, with the follow-up queued
- [[T-013]] — where open questions get chased

## Decision

*(leave your answer here — option letter, one line of reasoning, and your name; then we update
[[Open Questions]] and, if needed, write the ADR)*

- **Decision:**
- **By:**
- **Date:**
