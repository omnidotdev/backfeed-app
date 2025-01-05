import { beforeEach, describe, expect, it } from "bun:test";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ThemeToggle } from "components/layout";
import { render } from "test/unit/util";

describe("theme toggle", () => {
  beforeEach(() => {
    // TODO figure out why this line is somehow causing extra logging (e.g.`{"level":10,"time":1736031877509,"pid":1840,"hostname":"fv-az1378-175","context":"core","context":"core/relayer","context":"core/relayer/subscription","msg":"Initialized"}`). This can be seen in the GitHub Actions workflow and locally. This occurs on other tests as well that use `render`, and appears to be related to WalletConnect (via RainbowKit/wagmi/viem); see https://github.com/orgs/WalletConnect/discussions/2793
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
