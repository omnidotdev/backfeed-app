import { Icon, ToggleGroup, ToggleGroupItem } from "@omnidev/sigil";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";

import useProjectViewStore, {
  ViewState,
} from "@/lib/store/useProjectViewStore";

import type { ToggleGroupProps } from "@omnidev/sigil";

/**
 * Switch for project feedback layout.
 */
const SwitchFeedbackView = (props: ToggleGroupProps) => {
  const isClient = useIsClient();

  const viewState = useProjectViewStore((state) => state.viewState);
  const setViewState = useProjectViewStore((state) => state.setViewState);

  if (!isClient) return null;

  return (
    <ToggleGroup
      size="sm"
      variant="ghost"
      value={[viewState]}
      onValueChange={({ value }) =>
        // NB: length check prevents deselecting a selected value
        value.length && setViewState(value[0] as ViewState)
      }
      {...props}
    >
      <ToggleGroupItem
        value={ViewState.List}
        h={8}
        w={8}
        p={2}
        borderRadius="md"
        color="foreground.muted"
        _hover={{
          bgColor: { base: "neutral.100", _dark: "neutral.800" },
        }}
        _selected={{
          color: "foreground.default",
          bgColor: { base: "neutral.200", _dark: "neutral.700" },
        }}
      >
        <Icon src={LuList} size="sm" />
      </ToggleGroupItem>

      <ToggleGroupItem
        value={ViewState.Grid}
        h={8}
        w={8}
        p={2}
        borderRadius="md"
        color="foreground.muted"
        _hover={{
          bgColor: { base: "neutral.100", _dark: "neutral.800" },
        }}
        _selected={{
          color: "foreground.default",
          bgColor: { base: "neutral.200", _dark: "neutral.700" },
        }}
      >
        <Icon src={LuLayoutGrid} size="sm" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default SwitchFeedbackView;
