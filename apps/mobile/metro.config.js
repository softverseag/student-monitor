// Learn more: https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Metro only watches the app folder by default, so an edit in packages/core
// would not trigger a reload.
config.watchFolders = [workspaceRoot];

// pnpm puts the real packages in the root store and symlinks them into each
// app, so Metro has to look in both places.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Do NOT set `disableHierarchicalLookup` here. It is standard advice for npm and
// yarn monorepos, but it breaks pnpm: a package inside the .pnpm store resolves
// its own dependencies by walking up from its store location, and disabling that
// makes expo-router fail to find @expo/metro-runtime.

module.exports = config;
