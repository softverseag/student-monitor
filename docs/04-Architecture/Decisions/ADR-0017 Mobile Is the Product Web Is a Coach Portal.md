---
id: ADR-0017
aliases: [ADR-0017]
title: Mobile is the product, web is a coach-only portal
status: accepted
date: 2026-10-20
---

# ADR-0017 — Mobile is the product, web is a coach-only portal

## Status

accepted — resolves the platform half of [[Open Questions|Q-26]]. The authentication half
(Clerk vs self-managed JWT, K-38) and the hosting questions stay open.

## Context

Two plans for "what are we actually building" were live at the same time:

- **Ours**, recorded in [[ADR-0009]], [[ADR-0010]] and [[ADR-0016]] and already scaffolded: an Expo
  mobile app plus a Next.js web app, with the audience split web = coaches + parents, mobile =
  students + coach quick actions.
- **The client's v2 technical plan** (K-27): a **single responsive PWA** for everyone, no store
  apps. Its stated cost was that iOS push only works after add-to-home-screen.

[[Open Questions|Q-26]] held the conflict open and the existing ADRs stood by default. Both scope
notes carried a warning box telling the reader the table underneath might not survive.

The product owner settled it on 2026-10-20, and did not pick either option as written:

- The **mobile app is the product**, and all three roles live there — coach, student *and* parent.
  Not just students.
- **Web exists, but it is small and coach-only.** Its reason to exist is one specific pain: building
  a plan ([[FR-23]]) on a phone is slow and fiddly; on a desktop with a keyboard it is not. That is
  comfort, not capability.
- The **parent** gets a single read-only mobile screen — progress and current state. A parent has no
  reason to open a browser.

## Decision

**1. The Expo mobile app serves all three roles.** Coach, student and parent. K-27's "single PWA, no
store app" is rejected; `apps/mobile` stays and grows a parent surface.

**2. `apps/web` is two things, both narrow.**

- A **public marketing site** for the app — this is now its primary job at launch.
- A **signed-in coach portal** reached from a "Giriş yap" on that site.

**3. Web sign-in is offered to coaches only in v1.** A student or parent who signs in on the web is
told the product is on their phone. Student and parent web access is deliberately postponed, not
rejected forever — "if it turns out to be needed, we open it later".

> This is a **product surface decision, not an authorization boundary.** The backend stays
> role-neutral and relationship-scoped ([[BR-024]], [[FR-02]]); nothing in the API is gated on which
> client called it. The web gate is a client-side redirect after we know the role, and it must never
> be the thing that protects data.

**4. No web-only coach feature in v1.** Everything a coach can do on web, they can also do on
mobile — including authoring plans. The coach decides where to work; the big screen is an
affordance, not a requirement. This keeps mobile the complete product and prevents the web portal
from quietly becoming a second product we have to maintain in step.

**5. The web portal's feature list beyond plan authoring is undesigned.** Deliberately left open;
it is not blocking anything, because of point 4.

## Consequences

**Good.**

- **Push notifications work natively.** The iOS-PWA-push risk (add-to-home-screen or no reminders)
  disappears, and [[FR-16]] is the mechanism the whole student loop depends on (K-35). This alone
  was worth more than the single-codebase saving K-27 was buying.
- Existing ADRs and the scaffold hold. No app is deleted, nothing is rewritten.
- The parent surface is one screen instead of a web view plus a mobile view.
- The web portal can ship late, or thin, without blocking v1 — point 4 guarantees mobile is
  sufficient on its own.

**Bad / accepted cost.**

- **Two clients to build and keep consistent**, which is exactly what K-27 was trying to avoid. The
  cost is real; we are paying it for native push and for a coach experience that does not fight a
  phone keyboard.
- **Store review and release cadence** come back: a fix ships on the app stores' schedule, not ours.
  ([[ADR-0016]] already committed us to real builds, so no new tooling.)
- **Coach feature parity is now an obligation**, not an accident. Every coach feature must land on
  mobile; web is additive. Review needs to watch for drift.
- A marketing site is now in scope that nobody has designed or budgeted.

## Alternatives considered

| Option | Why not |
| --- | --- |
| Single responsive PWA (K-27 as written) | loses native push on iOS unless the student adds the site to their home screen — betting the product's only engagement mechanism ([[FR-16]]) on a step teenagers will not take |
| Keep the old split (web = coaches + parents) | a parent checking weekly progress on a laptop is not the real behaviour; it buys a second parent surface for an audience that is on a phone |
| Mobile only, no web at all | plan authoring ([[FR-23]]) is v1's most important module and the most keyboard-heavy thing a coach does; forcing it onto a phone attacks the feature that justifies the product |
| Web for all three roles, as a full second client | doubles the surface for v1 with no evidence students or parents want it; point 3 keeps the door open to add it when there is evidence |

## Related

[[ADR-0009]] · [[ADR-0010]] · [[ADR-0016]] · [[FR-23]] · [[FR-20]] · [[Scope and MVP]] ·
[[Open Questions|Q-26]]
