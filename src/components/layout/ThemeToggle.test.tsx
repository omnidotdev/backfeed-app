import { beforeEach, describe, expect, it } from "bun:test";

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ThemeToggle from "@/components/layout/ThemeToggle";
import { renderWithRouter } from "@/test/unit/render";

describe("theme toggle", () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithRouter(<ThemeToggle />);
    });
  });

  it("renders correctly with light theme enabled by default", () => {
    const themeToggleButton = screen.getAllByLabelText("Toggle theme")[0];

    expect(themeToggleButton).toBeInTheDocument();

    expect(document.documentElement).not.toHaveClass("dark");
  });

  // TODO: Requires server function test. Determine how to properly handle this. Might need to be e2e. server functions provide a `url` key that we could use for mocking
  it.todo("toggles color mode when clicked", async () => {
    const user = userEvent.setup();

    const themeToggleButton = screen.getAllByLabelText("Toggle theme")[0];

    await user.click(themeToggleButton);

    expect(document.documentElement).toHaveClass("dark");
  });
});
