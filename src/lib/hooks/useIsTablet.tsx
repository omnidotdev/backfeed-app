import { useBreakpointValue } from "@omnidev/sigil";

/**
 * Determine if the current viewport is approximately the size of a tablet or larger.
 * @returns `true` if the current breakpoint is at least `md` (approximate tablet size), otherwise `false`.
 */
const useIsTablet = () => useBreakpointValue({ base: false, md: true });

export default useIsTablet;
