---
id: ADR-0015
aliases: [ADR-0015]
title: Workspace packages ship compiled output, orchestrated by Turborepo
status: accepted
date: 2026-09-14
---

# ADR-0015 — Workspace packages ship compiled output, orchestrated by Turborepo

## Status

accepted — implements the `packages/*` half of [[ADR-0001]] and [[ADR-0010]]

## Context

[[ADR-0001]] chose a monorepo so a domain change and its three consumers land in one commit.
[[ADR-0010]] decided *what* lives in `@sm/core` and `@sm/api`. Neither decided **how an app consumes
a workspace package**, and until now it did not matter: no package existed.

It matters now, because the same type is declared three times in production code:

| Declaration | `AppUser` shape | `UserRole` union |
| --- | --- | --- |
| `apps/backend/src/features/users/dto/app-user.dto.ts` | yes | via Prisma enum |
| `apps/web/src/features/identity/lib/app-user.ts` | yes | inline literal |
| `apps/mobile/src/features/identity/hooks/use-app-user.ts` | yes | inline literal |

Adding a field means editing four files in step, with nothing to catch a miss. [[T-016]] and
[[T-017]] also left two hand-rolled API clients that have already drifted, and [[T-006]] would add a
third caller.

### The constraint that decides it

The three consumers do not agree on what they can load:

- **Backend** — ESM, `moduleResolution: nodenext`, runs `node dist/main.js` on plain Node. It cannot
  load TypeScript. It needs **real emitted JavaScript on disk**.
- **Web** — Next 16 / Turbopack. Happily transpiles either.
- **Mobile** — Metro. Happily transpiles either, given monorepo `watchFolders`.

Two of three could consume raw source. The backend cannot, unless Nest switches to its bundling
builder — which changes how the backend builds and deploys, for the convenience of a package.

Meanwhile [[T-001]] sets a demanding acceptance criterion: *"A change to `@sm/core` is picked up by
API, web and mobile **without a rebuild dance**."* A compiled package with a manual build step fails
that outright.

## Decision

**Workspace packages emit compiled JavaScript. Turborepo makes the dev loop live.**

1. **`@sm/core` emits `dist/`** via `tsc`, with `exports` resolving to `dist/index.js` and
   `dist/index.d.ts`. All three consumers load the same built output — one behaviour to reason
   about, not one per platform.

2. **Turborepo 2 orchestrates.** `build` declares `dependsOn: ["^build"]`; so do `typecheck` and
   `test`, because Vitest would otherwise resolve a package that has not been built. `dev` is
   `persistent` with `cache: false`.

3. **The dev loop resolves the rebuild dance.** `pnpm dev:backend` becomes
   `turbo run dev --filter=backend...`. The trailing `...` includes dependencies, so `@sm/core` runs
   `tsc --watch` beside Nest's own watcher and an edit propagates without a manual step.

4. **`@sm/config` holds the tsconfig bases**, consumed by `packages/*`. Web keeps Next's generated
   config and mobile keeps `expo/tsconfig.base` — forcing either onto our base fights the framework
   for no gain. The backend also keeps its own for now: adopting the base there would shake loose
   unrelated type errors in a task about packaging ([[T-018]]).

5. **Packages are sliced by feature name** ([[ADR-0010]]): `core/src/identity/` mirrors
   `features/identity/` in the apps. A single root export for now; subpaths can be added later
   without breaking it.

### Domain, not copy

`@sm/core` holds the enum, the DTO type and the Zod **shape**. It holds no user-facing strings.

The onboarding schema therefore carries no custom messages: the backend maps a `ZodError` onto its
own Turkish copy in `shared/http/error-messages.ts`. Role labels ("Koç", "Öğrenci", "Veli") stay in
the components that render them.

This keeps [[ADR-0011]] intact — there is no i18n layer, copy lives where it is displayed — and it
keeps the package free of the one thing that would make it awkward to share with a future consumer
that words things differently.

## Consequences

**Good.** One declaration of every domain type, checked by the compiler across all three apps. The
build graph that [[T-003]] (CI) and Biome both need exists as a side effect. `pnpm build` at the
root becomes correct by dependency order rather than by luck.

**Bad / accepted cost.**

- **A package must be built before anything can typecheck against it.** A fresh clone must run a
  build before `pnpm typecheck` succeeds — the same shape of trap as Expo's generated route types,
  and it needs to be written down in `CLAUDE.md` next to that one.
- **Turborepo arrives earlier than planned**, making this task larger than "add a package". The
  alternative was wiring the pipeline twice.
- **`dist/` is a build artifact in the repo tree** — gitignored, but it means a stale `dist` can
  produce confusing type errors after a branch switch. `turbo run build --force` is the escape.
- Core is ESM under `nodenext`, so its own relative imports need `.js` extensions — the same rule
  that already bites in the backend, now in a second place.
- Metro needs monorepo `watchFolders` and `nodeModulesPaths`. [[ADR-0001]] already accepted this as
  "a known, solved annoyance"; this is where we pay it.

## Alternatives considered

| Option | Why not |
| --- | --- |
| Source-only exports (`exports` → `src/*.ts`) | best DX and no build step, but the backend cannot load TypeScript at runtime — it would force Nest onto a bundling builder, changing the backend's build and deploy shape for a package's convenience |
| Compiled, no Turborepo | smaller now, but editing core would not reach the running backend until a manual rebuild, failing [[T-001]]'s criterion. The friction lands immediately, on the very next task (`@sm/api`) |
| Publish `@sm/core` to a registry | version churn on every domain change is exactly what [[ADR-0001]] rejected the multi-repo layout to avoid |
| TypeScript project references | solves typechecking, not runtime resolution; the backend still needs emitted JS, so it is additive complexity rather than an alternative |

## Related

[[ADR-0001]] · [[ADR-0010]] · [[ADR-0011]] · [[T-001]] · [[T-002]] · [[T-018]]
