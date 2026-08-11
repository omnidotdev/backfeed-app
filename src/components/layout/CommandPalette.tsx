import { CommandPalette as CommandPaletteShell } from "@omnidotdev/thornberry/command-palette";
import { LuColumns3, LuFolderPlus, LuPlus, LuSunMoon } from "react-icons/lu";

import { Hotkeys, hotkeyLabel } from "@/lib/constants/hotkeys.constant";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import useProjectViewStore from "@/lib/store/useProjectViewStore";
import { useTheme } from "@/providers/ThemeProvider";

import type { CommandAction } from "@omnidotdev/thornberry/command-palette";

/**
 * Global command palette (⌘K). Surfaces the app's primary actions with their
 * keyboard shortcuts, so the app is keyboard-driven and discoverable. Built on
 * the shared thornberry palette; Backfeed supplies only its own actions.
 */
const CommandPalette = () => {
  const { theme, setTheme } = useTheme();
  const { setIsOpen: setCreatePostOpen } = useDialogStore({
    type: DialogType.CreatePost,
  });
  const { setIsOpen: setCreateProjectOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });
  const cycleViewState = useProjectViewStore((state) => state.cycleViewState);

  const commands: CommandAction[] = [
    {
      id: "create-feedback",
      label: "Create feedback",
      group: "Create",
      icon: LuPlus,
      shortcut: hotkeyLabel(Hotkeys.CreatePost),
      onSelect: () => setCreatePostOpen(true),
    },
    {
      id: "create-project",
      label: "Create project",
      group: "Create",
      icon: LuFolderPlus,
      shortcut: hotkeyLabel(Hotkeys.CreateProject),
      onSelect: () => setCreateProjectOpen(true),
    },
    {
      id: "switch-view",
      label: "Switch view",
      group: "General",
      icon: LuColumns3,
      shortcut: hotkeyLabel(Hotkeys.CycleView),
      onSelect: cycleViewState,
    },
    {
      id: "toggle-theme",
      label: "Toggle theme",
      group: "General",
      icon: LuSunMoon,
      shortcut: hotkeyLabel(Hotkeys.ToggleTheme),
      onSelect: () => setTheme(theme === "dark" ? "light" : "dark"),
    },
  ];

  return (
    <CommandPaletteShell
      commands={commands}
      triggerKey={Hotkeys.CommandPalette}
      placeholder="Type a command or search..."
    />
  );
};

export default CommandPalette;
