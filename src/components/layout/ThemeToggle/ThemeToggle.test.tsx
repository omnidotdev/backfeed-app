import { beforeEach, describe, expect, it } from "bun:test";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "components/layout";
import { render } from "test/unit/util";

describe("theme toggle", () => {
  beforeEach(() => {
    render(<ThemeToggle />);
  });

  it("renders correctly with light theme enabled by default", () => {
    const themeToggleButton = screen.getAllByLabelText("Toggle theme")[0];

    expect(themeToggleButton).toBeInTheDocument();

    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("toggles color mode when clicked", async () => {
    const user = userEvent.setup();

    const themeToggleButton = screen.getAllByLabelText("Toggle theme")[0];

    await user.click(themeToggleButton);

    expect(document.documentElement).toHaveClass("dark");
  });
});
