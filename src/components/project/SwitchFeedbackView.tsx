import {
  ToggleGroupItem,
  ToggleGroupRoot,
} from "@omnidotdev/thornberry/toggle-group";
import { LuColumns3, LuLayoutGrid, LuList } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";

import useProjectViewStore, {
  ViewState,
} from "@/lib/store/useProjectViewStore";

import type { ComponentProps } from "react";

// Keep the muted idle state and emphasized pressed state of the view switcher
const ITEM_CLASS_NAME =
  "size-8 p-2 text-muted-foreground hover:text-foreground data-[state=on]:bg-background-emphasized data-[state=on]:text-foreground";

/**
 * Switch for project feedback layout.
 */
const SwitchFeedbackView = (props: ComponentProps<typeof ToggleGroupRoot>) => {
  const isClient = useIsClient();

  const viewState = useProjectViewStore((state) => state.viewState);
  const setViewState = useProjectViewStore((state) => state.setViewState);

  if (!isClient) return null;

  return (
    <ToggleGroupRoot
      value={[viewState]}
      onValueChange={({ value }) =>
        // NB: length check prevents deselecting a selected value
        value.length && setViewState(value[0] as ViewState)
      }
      variant="ghost"
      size="sm"
      {...props}
    >
      <ToggleGroupItem value={ViewState.List} className={ITEM_CLASS_NAME}>
        <LuList className="size-4" />
      </ToggleGroupItem>

      <ToggleGroupItem value={ViewState.Grid} className={ITEM_CLASS_NAME}>
        <LuLayoutGrid className="size-4" />
      </ToggleGroupItem>

      <ToggleGroupItem value={ViewState.Roadmap} className={ITEM_CLASS_NAME}>
        <LuColumns3 className="size-4" />
      </ToggleGroupItem>
    </ToggleGroupRoot>
  );
};

export default SwitchFeedbackView;
