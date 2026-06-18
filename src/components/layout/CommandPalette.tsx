import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { LuFolderPlus, LuPlus, LuSunMoon } from "react-icons/lu";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { Hotkeys, hotkeyLabel } from "@/lib/constants/hotkeys.constant";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import { useTheme } from "@/providers/ThemeProvider";

/**
 * Global command palette (⌘K). Surfaces the app's primary actions with their
 * keyboard shortcuts, so the app is keyboard-driven and discoverable. Mounted
 * once at the root.
 */
const CommandPalette = () => {
  const [open, setOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const { setIsOpen: setCreatePostOpen } = useDialogStore({
    type: DialogType.CreatePost,
  });
  const { setIsOpen: setCreateProjectOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  useHotkeys(Hotkeys.CommandPalette, () => setOpen((isOpen) => !isOpen), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  /** Run an action, closing the palette first. */
  const run = (action: () => void) => () => {
    setOpen(false);
    action();
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={({ open: isOpen }) => setOpen(isOpen)}
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Create">
          <CommandItem onSelect={run(() => setCreatePostOpen(true))}>
            <LuPlus />
            Create feedback
            <Kbd className="ml-auto">{hotkeyLabel(Hotkeys.CreatePost)}</Kbd>
          </CommandItem>
          <CommandItem onSelect={run(() => setCreateProjectOpen(true))}>
            <LuFolderPlus />
            Create project
            <Kbd className="ml-auto">{hotkeyLabel(Hotkeys.CreateProject)}</Kbd>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="General">
          <CommandItem
            onSelect={run(() => setTheme(theme === "dark" ? "light" : "dark"))}
          >
            <LuSunMoon />
            Toggle theme
            <Kbd className="ml-auto">{hotkeyLabel(Hotkeys.ToggleTheme)}</Kbd>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
