import { Flex, Icon, sigil } from "@omnidev/sigil";
import { useState } from "react";
import { LuGlobe } from "react-icons/lu";

import getFaviconUrl from "@/lib/util/getFaviconUrl";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends Omit<FlexProps, "children"> {
  /** The URL to fetch favicon for */
  url: string;
  /** Size of the favicon (default: 4 = 16px) */
  size?: number;
}

/**
 * Favicon component that fetches and displays a website's favicon.
 * Falls back to a globe icon if favicon fails to load.
 */
const Favicon = ({ url, size = 4, ...rest }: Props) => {
  const [hasError, setHasError] = useState(false);
  const faviconUrl = getFaviconUrl(url);

  return (
    <Flex
      align="center"
      justify="center"
      w={size}
      h={size}
      flexShrink={0}
      {...rest}
    >
      {faviconUrl && !hasError ? (
        <sigil.img
          src={faviconUrl}
          alt=""
          w={size}
          h={size}
          objectFit="contain"
          onError={() => setHasError(true)}
        />
      ) : (
        <Icon src={LuGlobe} w={size} h={size} color="currentColor" />
      )}
    </Flex>
  );
};

export default Favicon;
