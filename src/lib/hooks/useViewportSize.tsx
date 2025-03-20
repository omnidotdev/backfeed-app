import { useMediaQuery } from "usehooks-ts";

interface Options {
  /** Minimum width of viewport to validate against */
  minWidth: string;
}

/**
 * Custom hook that returns a boolean indicating if the viewport is larger than the specified breakpoint.
 */
const useViewportSize = ({ minWidth }: Options) =>
  // Used in favor of `useBreakpointValue` as the fallback to `base` breaks logic for initializing the render state
  useMediaQuery(`(min-width: ${minWidth})`);

export default useViewportSize;
