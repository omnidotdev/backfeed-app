import { useMediaQuery } from "usehooks-ts";

/**
 * Custom hook to check if the viewport is considered "small".
 * Uses a media query with a min-width of 40em.
 */
const useIsSmallViewport = () => {
  // Used in favor of `useBreakpointValue` as the fallback to `base` breaks logic for initializing the render state of the menu
  return useMediaQuery("(min-width: 40em)");
};

export default useIsSmallViewport;
