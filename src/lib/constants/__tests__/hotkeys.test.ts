import { describe, expect, it } from "bun:test";

import { Hotkeys, hotkeyLabel } from "../hotkeys.constant";

describe("hotkeyLabel", () => {
  it("renders `mod` as ⌘ and uppercases single-character keys", () => {
    expect(hotkeyLabel(Hotkeys.CommandPalette)).toBe("⌘K");
    expect(hotkeyLabel(Hotkeys.CreateProject)).toBe("⌘P");
    expect(hotkeyLabel(Hotkeys.CreatePost)).toBe("C");
    expect(hotkeyLabel(Hotkeys.ToggleTheme)).toBe("T");
  });
});
