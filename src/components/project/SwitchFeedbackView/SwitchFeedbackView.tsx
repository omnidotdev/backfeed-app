import { Icon, ToggleGroup, ToggleGroupItem } from "@omnidev/sigil";
import { useProjectViewStore, ViewState } from "lib/hooks/store";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";

import type { ToggleGroupProps } from "@omnidev/sigil";

/**
 * Switch for project feedback layout.
 */
const SwitchFeedbackView = (props: ToggleGroupProps) => {
  const isClient = useIsClient();

  const { viewState, setViewState } = useProjectViewStore(
    ({ viewState, setViewState }) => ({
      viewState,
      setViewState,
    }),
  );

  if (!isClient) return null;

  return (
    <ToggleGroup
      size="sm"
      variant="ghost"
      mb={-1}
      ml={1}
      value={[viewState]}
      onValueChange={({ value }) =>
        // NB: length check prevents deselecting a selected value
        value.length && setViewState(value[0] as ViewState)
      }
      {...props}
    >
      <ToggleGroupItem value={ViewState.List} h={7} minW={7}>
        <Icon src={LuList} size="sm" />
      </ToggleGroupItem>

      <ToggleGroupItem value={ViewState.Grid} h={7} minW={7}>
        <Icon src={LuLayoutGrid} size="sm" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default SwitchFeedbackView;
