---
id: FR-13
aliases: [FR-13]
title: File Sharing
area: resources
source: "§17 · v2 §12"
status: specified
priority: should
updated: 2026-10-14
---

# FR-13 — File Sharing

> **Source:** catalog §17 · [[Source - Requirements v2 (TR)|v2]] §12 · **Decisions:** K-32 ·
> **Rules:** [[BR-024]], [[BR-030]]

## Intent

Coaches send PDFs constantly — worksheets, schedules, exam analyses. Today those live in WhatsApp
and are unfindable a week later. File sharing is deliberately *not* the same concept as the resource
pool ([[FR-12]]): this is the coach pushing a document, not the student's inventory.

## Requirements

- **FR-13.1** Sharing is **coach → student only**. Students cannot upload files (v2 §12).
- **FR-13.2** The coach chooses which student or students a file goes to.
- **FR-13.3** A student can access only files shared **with them**.
- **FR-13.4** **PDF only, max 25 MB** (K-32). The type is validated by **file content**, not
  extension (v2 §12).
- **FR-13.5** File sharing and the resource pool are separate concepts and need not be unified.
- **FR-13.6** A file is owned by the coach who uploaded it; another coach of the same student has no
  access to it ([[BR-024]]).
- **FR-13.7** A coach can revoke a share; the student then loses access.
- **FR-13.8** There is **no** folder, tag or version management (K-32).
- **FR-13.9** After a relationship ends, the student **keeps access** to files already shared with
  them ([[BR-030]]); the coach can share nothing new.
- **FR-13.10** Virus scanning is `[V1.1]` — a deliberately deferred risk (v2 §12). Retention policy
  is open ([[Open Questions|Q-24]], A-07).

## Acceptance criteria

- [ ] Sharing one file with 12 of 30 students makes it visible to exactly those 12.
- [ ] A direct download URL cannot be used by a student it was not shared with — signed, expiring
      URLs only, never a guessable public path.
- [ ] Coach B cannot list or download Coach A's files for a shared student.
- [ ] Upload rejects a renamed `.exe`-as-`.pdf` (content check), any non-PDF, and files over 25 MB,
      each with a clear Turkish message.
- [ ] Ending a relationship leaves already-shared files readable by the student ([[BR-030]]) and
      blocks any new share from that coach.

## Design notes

- Storage: S3-compatible object storage with short-lived signed URLs. The API authorizes; the
  storage never serves public objects.
- Scan or at least constrain uploads by MIME type — coaches will upload whatever their phone gives
  them, and students are minors.
- Bulk sharing to a group of students is the actual workflow; a one-student-at-a-time UI will not be
  used.
- Retention matters for cost: a coach with 30 students sharing weekly PDFs for a year is real volume.

## Open questions

- [[Open Questions|Q-06]] — **answered** (K-32): PDF only, 25 MB, coach → student.
- [[Open Questions|Q-24]] — retention: how long are files kept, and what happens on relationship
  end beyond [[BR-030]]? (A-07)

## Related

[[FR-12]] · [[FR-17]] · [[Security and Privacy]] · [[BR-024]]

## Change log

- 2026-10-14 — v2 integration: narrowed to coach→student, PDF-only, 25 MB, content-based validation,
  no folders/versions; virus scan deferred; retention tracked as Q-24
- 2026-09-12 — created from catalog §17
