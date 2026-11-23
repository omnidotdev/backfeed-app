import { CommandPalette as CommandPaletteShell } from "@omnidotdev/thornberry/command-palette";
import { ShortcutsDialog } from "@omnidotdev/thornberry/shortcuts-dialog";
import {
  GLOBAL_HOTKEYS,
  hotkeyLabel,
  useHotkeys,
} from "@omnidotdev/thornberry/use-hotkeys";
import { useState } from "react";
import {
  LuColumns3,
  LuFolderPlus,
  LuKeyboard,
  LuPlus,
  LuSunMoon,
} from "react-icons/lu";

import { Hotkeys } from "@/lib/constants/hotkeys.constant";
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

  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // App-wide theme shortcut, bound once here rather than per toggle button.
  // react-hotkeys-hook ignores form fields by default, so this never fires
  // while typing
  useHotkeys(GLOBAL_HOTKEYS.toggleTheme, toggleTheme, [toggleTheme]);

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
      group: "Preferences",
      icon: LuColumns3,
      shortcut: hotkeyLabel(Hotkeys.CycleView),
      onSelect: cycleViewState,
    },
    {
      id: "toggle-theme",
      label: "Toggle theme",
      group: "Preferences",
      icon: LuSunMoon,
      shortcut: hotkeyLabel(GLOBAL_HOTKEYS.toggleTheme),
      onSelect: toggleTheme,
    },
    {
      id: "keyboard-shortcuts",
      label: "Keyboard shortcuts",
      group: "Preferences",
      icon: LuKeyboard,
      keywords: ["hotkeys", "keys", "help"],
      shortcut: hotkeyLabel(GLOBAL_HOTKEYS.showShortcuts),
      onSelect: () => setShortcutsOpen(true),
    },
  ];

  return (
    <>
      <CommandPaletteShell
        commands={commands}
        triggerKey={GLOBAL_HOTKEYS.commandPalette}
        placeholder="Type a command or search..."
      />
      {/* `?` opens it anywhere; the palette entry opens it too */}
      <ShortcutsDialog
        open={shortcutsOpen}
        onOpenChange={setShortcutsOpen}
        groups={[
          {
            title: "Feedback board",
            shortcuts: [
              { keys: Hotkeys.CreatePost, label: "Create feedback" },
              {
                keys: Hotkeys.CycleView,
                label: "Switch view (list, grid, roadmap)",
              },
              { keys: Hotkeys.FocusSearch, label: "Search feedback" },
            ],
          },
          {
            title: "Workspace",
            shortcuts: [
              { keys: Hotkeys.CreateProject, label: "Create project" },
            ],
          },
        ]}
      />
    </>
  );
};

export default CommandPalette;
