import { Skeleton } from "@omnidev/sigil";

import type { SkeletonProps } from "@omnidev/sigil";

interface Props extends SkeletonProps {
  /** Number of skeletons to render. */
  count: number;
}

/**
 * Skeleton array component. Displays a set number of skeletons with the same props applied.
 */
const SkeletonArray = ({ count, ...rest }: Props) =>
  Array(count)
    .fill(0)
    // biome-ignore lint/suspicious/noArrayIndexKey: simple index due to the nature of the component
    .map((_, index) => <Skeleton key={index} {...rest} />);

export default SkeletonArray;
