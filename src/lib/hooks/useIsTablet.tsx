import { useBreakpointValue } from "@omnidev/sigil";

const useIsTablet = () => useBreakpointValue({ base: false, md: true });

export default useIsTablet;
