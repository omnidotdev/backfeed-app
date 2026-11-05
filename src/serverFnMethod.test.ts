import { describe, expect, test } from "bun:test";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// Regression guard: read server fns declared GET serialize their payload into the
// request URL; with a large many-workspace auth cookie that trips HTTP 431 before
// the handler runs (see fractal-app PR #181). Every server fn must be POST.
const SRC = import.meta.dir;
const collect = (dir: string): string[] => {
  const out: string[] = [];
  for (const e of readdirSync(dir)) {
    if (e === "node_modules") continue;
    const full = join(dir, e);
    if (statSync(full).isDirectory()) {
      out.push(...collect(full));
      continue;
    }
    if (!/\.tsx?$/.test(e) || /\.test\.tsx?$/.test(e)) continue;
    out.push(full);
  }
  return out;
};
const GET_SERVER_FN =
  /createServerFn\(\s*\)|createServerFn\(\{[^}]*method:\s*["']GET["'][^}]*\}\)/;
describe("server functions must use POST (431 header-size guard)", () => {
  test("no production server function is declared with a GET method", () => {
    const offenders: string[] = [];
    for (const f of collect(SRC)) {
      const s = readFileSync(f, "utf8");
      if (!s.includes("createServerFn(")) continue;
      if (GET_SERVER_FN.test(s)) offenders.push(f.slice(SRC.length + 1));
    }
    expect(
      offenders,
      `GET server fns 431 for large-cookie users; make them POST:\n${offenders.join("\n")}`,
    ).toEqual([]);
  });
});
