import { Icon, ToggleGroup, ToggleGroupItem } from "@omnidev/sigil";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";

import { ViewState, useProjectViewStore } from "lib/hooks/store";

/**
 * Switch for project feedback layout.
 */
const SwitchFeedbackView = () => {
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
      ml={2}
      value={[viewState]}
      onValueChange={({ value }) =>
        // NB: length check prevents deselecting a selected value
        value.length && setViewState(value[0] as ViewState)
      }
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
