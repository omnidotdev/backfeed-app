// Patch files that Nitro's dependency trace (@vercel/nft) under-copies into the
// server bundle. Runs after `vite build` (see package.json `build`). Idempotent;
// only fills package dirs the trace already emitted, copying from the installed
// source tree. Each gap below was observed in the clean Docker build and 500s or
// errors at runtime.

import { existsSync } from "node:fs";
import { copyFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const serverModules = join(process.cwd(), ".output", "server", "node_modules");
const sourceModules = join(process.cwd(), "node_modules");

if (!existsSync(serverModules)) {
  console.warn(`[fix-server-trace-gaps] ${serverModules} not found, skipping`);
  process.exit(0);
}

let copied = 0;

/** Copy specific files from a source package into its emitted bundle dir, if missing. */
const fillPackageFiles = async (pkg, files) => {
  const srcPkg = join(sourceModules, pkg);
  const outPkg = join(serverModules, pkg);
  if (!existsSync(outPkg) || !existsSync(srcPkg)) return;
  for (const file of files) {
    const src = join(srcPkg, file);
    const dest = join(outPkg, file);
    if (!existsSync(src) || existsSync(dest)) continue;
    await copyFile(src, dest);
    copied += 1;
  }
};

// Gap 1 - Lexical. Its packages list `production` before `node` in `exports`, so the
// trace (run with `production` active) copies only `LexicalX.prod.mjs`. The deployed
// plain-Node runtime has no `production` condition, so it resolves `node` ->
// `LexicalX.node.mjs`, which the trace never copied -> ERR_MODULE_NOT_FOUND on every
// SSR render of the editor. Each `.node.mjs` is a thin wrapper importing its own
// same-dir `.prod.mjs` (already traced), so copying the entry completes the chain.
// (Overriding Nitro's global trace `conditions` instead is not viable: it breaks
// packages with the inverse exports order, e.g. seroval-plugins and undici via jsdom.)
for (const scope of ["@lexical", "lexical"]) {
  const scopeDir = join(serverModules, scope);
  if (!existsSync(scopeDir)) continue;
  const pkgs =
    scope === "@lexical"
      ? (await readdir(scopeDir, { withFileTypes: true }))
          .filter((d) => d.isDirectory())
          .map((d) => join(scope, d.name))
      : [scope];
  for (const pkg of pkgs) {
    const nodeBuilds = (await readdir(join(sourceModules, pkg))).filter((f) =>
      f.endsWith(".node.mjs"),
    );
    await fillPackageFiles(pkg, nodeBuilds);
  }
}

// Gap 2 - undici. jsdom does `require("undici")`, which resolves undici's `main`
// (index.js). The trace copies undici's `lib/` and package.json but misses the
// top-level entry files, so the require throws (degrading jsdom-backed features such
// as OG image rendering). index.js only requires `./lib/*` (already present), so
// copying the entries completes it.
await fillPackageFiles("undici", ["index.js", "index-fetch.js"]);

// biome-ignore lint/suspicious/noConsole: build-time script reporting its result
console.log(
  `[fix-server-trace-gaps] filled ${copied} missing file(s) in the server bundle`,
);
