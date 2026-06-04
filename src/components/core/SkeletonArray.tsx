import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  /** Number of skeletons to render. */
  count: number;
  /** Class names applied to each skeleton. */
  className?: string;
}

/**
 * Skeleton array component. Displays a set number of skeletons with the same class names applied.
 */
const SkeletonArray = ({ count, className }: Props) =>
  Array(count)
    .fill(0)
    // biome-ignore lint/suspicious/noArrayIndexKey: simple index due to the nature of the component
    .map((_, index) => <Skeleton key={index} className={className} />);

export default SkeletonArray;
