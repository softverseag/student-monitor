---
id: T-018
aliases: [T-018]
title: Shared core package and Turborepo
status: review
milestone: M0
area: foundation
requirements: []
updated: 2026-09-14
---

# T-018 — `@sm/core` and the Turborepo pipeline

**Goal.** Every domain type has exactly one definition, and the build graph that Biome and CI both
need exists.

**Implements.** [[ADR-0015]] · the `packages/*` half of [[ADR-0001]] and [[ADR-0010]] · closes
several [[T-001]] checkboxes

Before this, `AppUser` was declared in three production files and the role union in three more.
Adding a field meant editing four places in step, with nothing to catch a miss.

## Done

- [x] `@sm/config` — shared tsconfig bases (`base.json`, `node.json`)
- [x] `@sm/core` — `USER_ROLES` / `UserRole` / `isUserRole`, the `AppUser` type, and
      `onboardingSchema` (Zod 4). Sliced as `src/identity/`, mirroring `features/identity/`
- [x] Compiled ESM to `dist/`, `exports` map with `types` + `default` — the backend runs on plain
      Node and cannot load TypeScript ([[ADR-0015]])
- [x] Turborepo 2: `build` / `typecheck` / `test` / `test:e2e` all `dependsOn: ["^build"]`;
      `dev` is persistent and uncached
- [x] `pnpm dev:backend` → `turbo run dev --filter=backend...`, so core's `tsc --watch` runs beside
      Nest's watcher
- [x] Metro monorepo config for mobile — the item [[T-001]] deferred until a package existed
- [x] All three apps migrated off their duplicate declarations
- [x] Removed `packages/i18n`, an orphaned `node_modules` directory (no manifest, no source,
      untracked) left behind when [[ADR-0011]] dropped the i18n layer
- [x] 11 core + 35 backend + 7 e2e green; three apps typecheck; backend and mobile lint

## Two things execution corrected

**1. `resolver.disableHierarchicalLookup` breaks pnpm.** It is standard advice for npm and yarn
monorepos and it was in the plan. With it set, `expo export` fails with *"Unable to resolve module
`@expo/metro-runtime`"*: a package inside the `.pnpm` store resolves its own dependencies by walking
**up** from its store location, which is exactly what the flag forbids. The Metro config carries a
comment so nobody adds it back.

**2. Proving [[T-001]]'s criterion needs a field *removal*, not an addition.** The plan said adding a
field to `AppUser` would break all three apps. It does not — only the backend *constructs* an
`AppUser` (in `toAppUserDTO`), so only the backend fails. Web and mobile only *read* the type.

Removing `displayName` is the test that exercises the readers, and it fails all three:

| App | Error |
| --- | --- |
| backend | `TS2353` — object literal may only specify known properties |
| web | `TS2339` — property does not exist (×2) |
| mobile | `TS2339` — property does not exist |

**A related trap worth knowing:** during that experiment `pnpm --filter web typecheck` passed while
the change was live, because `--filter` bypasses Turbo's `^build` and typechecks against a **stale
`dist/`**. Always go through `pnpm typecheck`.

**And one about verification:** mobile imports only *types* from `@sm/core`, and `import type` is
erased before Metro sees it — so a successful `expo export` proves nothing about runtime resolution.
That was confirmed separately with a temporary value import, which did appear in the Hermes bundle.
It matters for `@sm/api`, whose imports will be real values.

## Deliberately not done

- **The backend does not extend `@sm/config`.** It keeps its own tsconfig; adopting the base would
  shake loose unrelated type errors in a task about packaging. [[ADR-0015]] is corrected to match.
- **No global `ValidationPipe`.** The shared schema is called from `UsersService`, not wired as a
  pipe — that half of the [[T-002]] item is still open.
- **Web and mobile still have no test runner**, so nothing in either app is covered.

## Follow-ups

- [ ] `@sm/api`, replacing the two hand-rolled clients from [[T-016]] and [[T-017]]
- [ ] Backend adopts `@sm/config/tsconfig/node.json`
- [ ] Biome — its `overrides` globs now have to cover `packages/**` as well as the apps
- [ ] CI ([[T-003]]), which can now run one `turbo run` over the whole graph
- [ ] Turborepo remote caching, once CI exists
