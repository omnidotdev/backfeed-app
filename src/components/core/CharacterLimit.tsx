import { match } from "ts-pattern";

import {
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressRoot,
} from "@/components/ui/progress";

import type { CSSProperties, ComponentProps } from "react";

interface CharacterLimitProps
  extends Omit<ComponentProps<typeof ProgressRoot>, "value" | "max"> {
  /** Current character count. */
  value: number;
  /** Maximum character count. */
  max: number;
}

/**
 * Character limit component that displays a circular progress bar with a text label indicating the current character count and maximum character count.
 */
const CharacterLimit = ({
  value,
  max,
  className,
  ...rest
}: CharacterLimitProps) => {
  const characterLimitColor = match(value / max)
    .when(
      (value) => value >= 0.9,
      () => "var(--colors-primary)",
    )
    .when(
      (value) => value >= 0.7,
      () => "yellow",
    )
    .otherwise(() => "var(--colors-brand-primary)");

  return (
    <ProgressRoot
      value={value}
      min={0}
      max={max}
      className="w-fit flex-row items-center gap-2"
      {...rest}
    >
      <ProgressCircle
        style={
          {
            "--size": "1rem",
            "--thickness": "0.125rem",
          } as CSSProperties
        }
      >
        <ProgressCircleTrack className="stroke-background-emphasized" />
        <ProgressCircleRange
          className="transition-none"
          style={{ stroke: characterLimitColor }}
        />
      </ProgressCircle>

      <span
        className="whitespace-nowrap text-sm"
        style={{ color: characterLimitColor }}
      >
        {`${value} / ${max}`}
      </span>
    </ProgressRoot>
  );
};

export default CharacterLimit;
