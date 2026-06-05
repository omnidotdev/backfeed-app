import { LuLayoutGrid, LuList } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";

import { ToggleGroupItem, ToggleGroupRoot } from "@/components/ui/toggle-group";
import useProjectViewStore, {
  ViewState,
} from "@/lib/store/useProjectViewStore";

import type { ComponentProps } from "react";

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
      {...props}
    >
      <ToggleGroupItem value={ViewState.List} className="size-8 p-2">
        <LuList className="size-4" />
      </ToggleGroupItem>

      <ToggleGroupItem value={ViewState.Grid} className="size-8 p-2">
        <LuLayoutGrid className="size-4" />
      </ToggleGroupItem>
    </ToggleGroupRoot>
  );
};

export default SwitchFeedbackView;
