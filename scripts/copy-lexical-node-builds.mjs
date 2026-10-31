// Copy Lexical's `*.node.mjs` entry files into the server bundle.
//
// Lexical packages list `production` before `node` in their `exports`, so Nitro's
// dependency trace (which runs with the `production` condition active) copies only
// `LexicalX.prod.mjs`. At runtime the deployed plain-Node server has no `production`
// condition, so it resolves the `node` condition to `LexicalX.node.mjs` - a file the
// trace never copied, which 500s every SSR render of the rich-text editor with
// ERR_MODULE_NOT_FOUND. Changing Nitro's global trace `conditions` is not viable: it
// fixes Lexical but breaks packages with the opposite ordering (e.g. seroval-plugins,
// undici via jsdom), since the requirements conflict fleet-wide.
//
// Each Lexical `*.node.mjs` is a thin wrapper that only imports its own same-dir
// `*.prod.mjs` (already traced), so copying the entry file alone completes the chain.
// Runs after `vite build` (see package.json `build`). Idempotent; only fills dirs the
// trace already emitted.

import { existsSync } from "node:fs";
import { copyFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const serverModules = join(process.cwd(), ".output", "server", "node_modules");
const sourceModules = join(process.cwd(), "node_modules");

if (!existsSync(serverModules)) {
  console.warn(
    `[copy-lexical-node-builds] ${serverModules} not found, skipping`,
  );
  process.exit(0);
}

// Lexical scopes present in the server bundle (the trace emits only what is reached)
const targets = ["@lexical", "lexical"];
let copied = 0;

for (const target of targets) {
  const scopeDir = join(serverModules, target);
  if (!existsSync(scopeDir)) continue;

  // `@lexical` is a scope of packages; `lexical` is a single package
  const pkgDirs =
    target === "@lexical"
      ? (await readdir(scopeDir, { withFileTypes: true }))
          .filter((d) => d.isDirectory())
          .map((d) => join(target, d.name))
      : [target];

  for (const pkg of pkgDirs) {
    const srcPkg = join(sourceModules, pkg);
    const outPkg = join(serverModules, pkg);
    if (!existsSync(srcPkg)) continue;

    const nodeBuilds = (await readdir(srcPkg)).filter((f) =>
      f.endsWith(".node.mjs"),
    );
    for (const file of nodeBuilds) {
      const dest = join(outPkg, file);
      if (existsSync(dest)) continue;
      await copyFile(join(srcPkg, file), dest);
      copied += 1;
    }
  }
}

// biome-ignore lint/suspicious/noConsole: build-time script reporting its result
console.log(
  `[copy-lexical-node-builds] copied ${copied} Lexical .node.mjs entry file(s) into the server bundle`,
);
