import { describe, expect, it } from "bun:test";

import { toPrivilegedMemberRoles } from "../orgRoles";

describe("toPrivilegedMemberRoles", () => {
  it("keeps only owner/admin and drops ordinary members", () => {
    expect(
      toPrivilegedMemberRoles([
        { userId: "u1", role: "owner" },
        { userId: "u2", role: "member" },
        { userId: "u3", role: "admin" },
      ]),
    ).toEqual([
      { userId: "u1", role: "owner" },
      { userId: "u3", role: "admin" },
    ]);
  });

  it("projects to a PII-free { userId, role } shape", () => {
    const roles = toPrivilegedMemberRoles([
      {
        userId: "u1",
        role: "owner",
        // extra roster fields (name/email/etc.) must not leak through
        id: "m1",
        organizationId: "org1",
        user: { id: "u1", name: "Ada", email: "ada@example.com", image: null },
      } as never,
    ]);
    expect(roles).toEqual([{ userId: "u1", role: "owner" }]);
    expect(Object.keys(roles[0])).toEqual(["userId", "role"]);
  });

  it("returns [] for an all-member or empty roster", () => {
    expect(toPrivilegedMemberRoles([])).toEqual([]);
    expect(
      toPrivilegedMemberRoles([
        { userId: "u1", role: "member" },
        { userId: "u2", role: "member" },
      ]),
    ).toEqual([]);
  });
});
