---
id: ADR-0016
aliases: [ADR-0016]
title: Mobile runs as a development build, not in Expo Go
status: accepted
date: 2026-10-14
---

# ADR-0016 — Mobile runs as a development build, not in Expo Go

## Status

accepted

## Context

Until now the mobile app ran inside **Expo Go**, the pre-built sandbox app from the App Store. Expo
Go ships a fixed set of native modules; an app running in it can only use JavaScript plus whatever
natives Expo happened to compile in. That was fine for the scaffold, but the planned stack already
breaks out of it:

- **`react-native-mmkv`** is the decided storage adapter on mobile ([[ADR-0010]], `CLAUDE.md` stack
  section). It is a JSI native module and cannot run in Expo Go at all.
- **Push notifications** ([[FR-16]]) do not work in Expo Go on Android since SDK 53, and iOS remote
  push in Go uses Expo's credentials, not ours.
- Anything else native we adopt later (Clerk passkeys, file viewers, background tasks) would hit
  the same wall, one surprise at a time.

There is also a fidelity argument: Expo Go is Expo's runtime, not ours. A development build is our
actual app — our bundle identifier, our native config, our module set — with the dev menu and fast
refresh layered on top. What runs in development is what ships.

## Decision

**The mobile app runs as a development build (`expo-dev-client`), not in Expo Go.**

1. **`expo-dev-client` is a dependency** of `apps/mobile`. With it installed, `expo start` targets
   the development build by default, so `pnpm dev:mobile` keeps working unchanged (`--go` would be
   the explicit opt-out we never use).

2. **Native projects stay generated (CNG).** `ios/` and `android/` remain gitignored and are
   regenerated from `app.json` by prebuild. Native configuration is expressed through config
   plugins, never by hand-editing the generated projects.

3. **The native compile is `expo run:ios`** (and `expo run:android` when we get there), run from
   `apps/mobile`:

   ```
   pnpm --filter mobile exec expo run:ios
   ```

   It prebuilds, compiles a **Debug** configuration with Xcode, installs on the simulator and
   launches. It is only needed again when the native side changes: a new library with native code,
   native config in `app.json`, or an SDK upgrade. Day to day, `pnpm dev:mobile` + `i` is enough.

4. **App identifiers are fixed now**: `ios.bundleIdentifier` and `android.package` are both
   `com.studentmonitor.mobile`. Prebuild requires them, and changing an iOS bundle identifier later
   means new push certificates and a "new app" to TestFlight, so it is effectively one-way.

## Consequences

**Good.** The native module ceiling is gone — `react-native-mmkv` and push notifications
([[FR-16]]) are unblocked. Development runs the real app, so native-level bugs surface in development instead of at
the first production build.

**Bad / accepted cost.**

- **Onboarding gets a native toolchain requirement.** A fresh machine needs Xcode and CocoaPods and
  a multi-minute first build before the simulator shows anything. (Expo Go needed neither.)
- **Native changes mean a rebuild**, and forgetting one produces confusing runtime errors
  ("`TurboModule not found`") rather than a clear message. The fix is always the same:
  `expo run:ios` again.
- Working on a physical device eventually needs either a local provisioning profile or **EAS Build**
  for distributable dev clients. Deferred until someone actually needs a device build.
- CI cannot run the app in a simulator without building it; if we ever want e2e on mobile, the
  pipeline pays the Xcode build there too.

## Alternatives considered

| Option | Why not |
| --- | --- |
| Stay on Expo Go | blocked outright by `react-native-mmkv` and FR-18 push notifications; every future native need becomes a migration event instead of a dependency add |
| Commit `ios/` + `android/` (bare workflow) | hand-maintained native projects make every SDK upgrade a native merge; CNG keeps `app.json` the single source of native truth, which is the same spec-first instinct as the rest of this repo |
| EAS Build only, no local builds | a cloud round-trip per native change is a terrible inner loop; local `expo run:ios` is minutes, and EAS remains available later for device/CI builds without reversing anything |

## Related

[[ADR-0001]] · [[ADR-0010]] · [[ADR-0015]]
