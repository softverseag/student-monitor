---
id: FR-01
aliases: [FR-01]
title: Accounts and Sessions
area: identity
source: "§3.1, §3.2"
status: in-progress
priority: must
updated: 2026-10-19
checkedBy:
  - Batuhan Elmas
---

# FR-01 — Accounts and Sessions

> **Source:** catalog §3.1, §3.2 · **Rules:** [[BR-001]]

> [!check] Reviewed and approved — 2026-10-19, Batuhan Elmas
> Read in full against the Turkish retelling in [[Gereksinimler (TR)]] (`### FR-01`). The
> requirements below are **accepted as they stand**; no wording or scope change requested.
>
> The two open questions ([[Open Questions|Q-12]] minor consent under KVKK,
> [[Open Questions|Q-19]] a grace period before account deletion) are **acknowledged and
> deliberately left open** — we will come back to them and settle them later. Neither blocks
> FR-01 as specified, and neither changes anything already implemented
> ([[ADR-0013]], [[ADR-0014]]).
>
> First note to use the `checkedBy` field — see [[Vault Guide]].

## Intent

Anyone — coach, student or parent — can create their own account. Registering creates a *person*,
not a *relationship*: a fresh account sees nothing about anyone else until a link is established
and, where required, approved.

## Requirements

- **FR-01.1** A user can register as a coach, a student or a parent.
- **FR-01.2** The account and the coach–student / parent–student relationships are independent
  concepts. Registration never auto-links two users.
- **FR-01.3** A user can log in, log out, and access their own account.
- **FR-01.4** A user can view and edit their own profile (name, contact, password).
- **FR-01.5** A user can recover access if they forget their password.
- **FR-01.6** Sessions survive app restarts on mobile and expire after inactivity on web. Logging
  out invalidates the refresh token.
- **FR-01.7** A new account's landing state is an empty state that explains how to get linked — an
  invite code for students, "invite your first student" for coaches, "request access" for parents.
- **FR-01.8** A user can delete their own account. The credentials and personal data are erased;
  the historical record is anonymised and kept, never destroyed ([[BR-025]], [[ADR-0013]]).
- **FR-01.9** After registering, a user chooses their role and a display name once. The role is
  fixed for the life of the account and cannot be changed afterwards ([[ADR-0014]]).

## Acceptance criteria

- [ ] A newly registered student sees no coach, no tasks, no data belonging to anyone else.
- [ ] A newly registered parent sees no student until [[FR-05]] completes.
- [ ] Logging out on one device does not log the user out everywhere (unless they ask).
- [ ] Password reset does not reveal whether an e-mail is registered.
- [x] Deleting an account erases it from the identity provider and anonymises our row; the row
      itself survives and reports still add up ([[ADR-0013]]).
- [x] A token minted just before deletion stops working — the deleted account is refused, not
      silently recreated.
- [x] A newly registered user cannot reach the app until they have picked a role.
- [x] Submitting onboarding twice does not change the role — the second attempt is rejected.

## Authorization

The user is the only one who can read or write their own credentials. No role can change another
user's password. See [[Authorization Matrix]].

## Design notes

- Identifier: e-mail, with phone as a likely second option for Turkish users. Phone-first signup is
  common in this market — worth validating before building.
- Role is chosen at onboarding and fixed for the life of the account ([[ADR-0014]], answers Q-08).
- Students are minors: parental consent must be captured at signup ([[Open Questions|Q-12]],
  [[Security and Privacy]]).

## Open questions

Both reviewed on 2026-10-19 and consciously left open — to be picked up in a later pass, not
guessed at in code.

- [[Open Questions|Q-12]] — who consents for a minor's account under KVKK?
- [[Open Questions|Q-19]] — should account deletion have a grace period rather than being immediate?

## Related

[[FR-02]] · [[FR-04]] · [[FR-05]] · [[Security and Privacy]]

## Change log

- 2026-10-19 — reviewed and approved by Batuhan Elmas (`checkedBy`); requirements unchanged, Q-12
  and Q-19 left open on purpose
- 2026-09-13 — FR-01.9 (onboarding) added and implemented; Q-08 answered by [[ADR-0014]]; [[T-017]]
- 2026-09-13 — FR-01.8 (account deletion) added and implemented; see [[ADR-0013]], [[T-016]]
- 2026-09-12 — created from catalog §3.1–3.2
