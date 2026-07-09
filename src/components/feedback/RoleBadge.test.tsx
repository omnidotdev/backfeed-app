import { describe, expect, it } from "bun:test";

import { render, screen } from "@testing-library/react";

import RoleBadge from "./RoleBadge";

import type { OrgRole } from "@/lib/hooks/useOrgRoleMap";

// pass the role via a variable so Biome doesn't read the `role` prop as an
// ARIA role attribute (it only validates string-literal roles)
const renderBadge = (role?: OrgRole) => render(<RoleBadge role={role} />);

describe("RoleBadge", () => {
  it("renders a title-cased Owner badge", () => {
    renderBadge("owner");
    const badge = screen.getByText("Owner");
    expect(badge).toBeInTheDocument();
    // capitalization comes from the label, not a CSS uppercase transform
    expect(badge).not.toHaveClass("uppercase");
  });

  it("renders a title-cased Admin badge", () => {
    renderBadge("admin");
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("renders nothing for ordinary members", () => {
    const { container } = renderBadge("member");
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when the role is unknown", () => {
    const { container } = renderBadge();
    expect(container).toBeEmptyDOMElement();
  });
});
