import { describe, expect, it } from "bun:test";

import { render, screen } from "@testing-library/react";

import { FREE_PRODUCT_DETAILS } from "@/lib/util/pricing";
import PricingMatrix, {
  PRICING_MATRIX_ROWS,
  PRICING_MATRIX_TIERS,
} from "./PricingMatrix";

describe("PricingMatrix", () => {
  it("shows exactly the catalog tiers (no invented Enterprise tier)", () => {
    expect(PRICING_MATRIX_TIERS.map(({ id }) => id)).toEqual([
      "free",
      "pro",
      "team",
    ]);

    render(<PricingMatrix />);

    for (const name of ["Free", "Pro", "Team"]) {
      expect(screen.getByRole("columnheader", { name })).toBeInTheDocument();
    }
    expect(screen.queryByText("Enterprise")).not.toBeInTheDocument();
  });

  it("matches the catalog free tier limits", () => {
    const freeFeatures = FREE_PRODUCT_DETAILS.marketing_features.map(
      ({ name }) => name,
    );
    const free = (id: string) =>
      PRICING_MATRIX_ROWS.find((row) => row.id === id)?.values.free;

    expect(freeFeatures).toContain("Up to 2 projects");
    expect(free("projects")).toBe("Up to 2");
    expect(freeFeatures).toContain("Unlimited members");
    expect(free("members")).toBe("Unlimited");
    expect(freeFeatures).toContain("Unlimited feedback submissions");
    expect(free("unlimitedFeedback")).toBe(true);
  });

  it("keeps unbuilt catalog features marked coming soon", () => {
    const comingSoon = PRICING_MATRIX_ROWS.filter((row) => row.comingSoon).map(
      ({ id }) => id,
    );

    expect(comingSoon).toEqual([
      "aiTriage",
      "multiSourceIngestion",
      "themeClustering",
      "productReviews",
      "teamCollaboration",
      "apiAccess",
      "customBranding",
    ]);
  });
});
