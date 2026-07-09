import { describe, expect, test } from "bun:test";

import { parse } from "graphql";

import * as generated from "@/generated/graphql";

// Guardrail against a broken codegen artifact. @graphql-codegen/typescript-react-query
// 7.0.0/7.0.1 emitted `new TypedDocumentString(...)` without ever defining the class, so the
// module threw `ReferenceError: TypedDocumentString is not defined` on import and every page died.
// @ts-nocheck hides it from the type checker and it never surfaces at build time, so this runtime
// test is what catches it. Lives here (not next to the artifact) because src/generated is gitignored.
describe("generated graphql artifact", () => {
  const documents = Object.entries(generated).filter(([name]) =>
    name.endsWith("Document"),
  );

  test("exports at least one operation document", () => {
    expect(documents.length).toBeGreaterThan(0);
  });

  test.each(documents)("%s is a parseable GraphQL document", (_name, doc) => {
    const sdl = String(doc);
    expect(sdl.trim().length).toBeGreaterThan(0);
    expect(() => parse(sdl)).not.toThrow();
  });
});
