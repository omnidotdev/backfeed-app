import {
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressRoot,
  Text,
} from "@omnidev/sigil";
import { match } from "ts-pattern";

import { token } from "generated/panda/tokens";

import type { ProgressProps } from "@omnidev/sigil";

interface CharacterLimitProps extends ProgressProps {
  /** Current character count. This is an override for the default Sigil `Progress` `value` prop. */
  value: number;
  /** Maximum character count. This is an override for the default Sigil `Progress` `max` prop. */
  max: number;
}

/**
 * Character limit component that displays a circular progress bar with a text label indicating the current character count and maximum character count.
 */
const CharacterLimit = ({ value, max, ...rest }: CharacterLimitProps) => {
  const characterLimitColor = match(value / max)
    .when(
      (value) => value >= 0.9,
      () => "red",
    )
    .when(
      (value) => value >= 0.7,
      () => "yellow",
    )
    .otherwise(() => token("colors.brand.primary"));

  return (
    <ProgressRoot
      type="circular"
      value={value}
      min={0}
      max={max}
      display="flex"
      alignItems="center"
      w="fit"
      gap={2}
      {...rest}
    >
      <ProgressCircle
        css={{
          "--size": "sizes.4",
          "--thickness": "sizes.0.5",
        }}
      >
        <ProgressCircleTrack stroke="background.emphasized" />
        <ProgressCircleRange
          transitionProperty="none"
          style={{
            stroke: characterLimitColor,
          }}
        />
      </ProgressCircle>

      <Text fontSize="sm" color={characterLimitColor ?? "foreground.muted"}>
        {`${value} / ${max}`}
      </Text>
    </ProgressRoot>
  );
};

export default CharacterLimit;
