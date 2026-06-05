import { Progress as ArkProgress } from "@ark-ui/react/progress";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const ProgressRoot = ({
  className,
  ...rest
}: ComponentProps<typeof ArkProgress.Root>) => (
  <ArkProgress.Root
    className={cn("flex flex-col gap-1", className)}
    {...rest}
  />
);

const ProgressCircle = ArkProgress.Circle;
const ProgressCircleTrack = ArkProgress.CircleTrack;
const ProgressCircleRange = ArkProgress.CircleRange;
const ProgressLabel = ArkProgress.Label;
const ProgressValueText = ArkProgress.ValueText;

export {
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressLabel,
  ProgressRoot,
  ProgressValueText,
};
