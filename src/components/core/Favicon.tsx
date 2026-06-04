import { useState } from "react";
import { LuGlobe } from "react-icons/lu";

import getFaviconUrl from "@/lib/util/getFaviconUrl";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";

interface Props extends Omit<ComponentProps<"div">, "children"> {
  /** The URL to fetch favicon for */
  url: string;
  /** Size of the favicon (default: 4 = 16px) */
  size?: number;
}

/**
 * Favicon component that fetches and displays a website's favicon.
 * Falls back to a globe icon if favicon fails to load.
 */
const Favicon = ({ url, size = 4, className, ...rest }: Props) => {
  const [hasError, setHasError] = useState(false);
  const faviconUrl = getFaviconUrl(url);
  const dimension = `${size * 0.25}rem`;

  return (
    <div
      className={cn("flex shrink-0 items-center justify-center", className)}
      style={{ width: dimension, height: dimension }}
      {...rest}
    >
      {faviconUrl && !hasError ? (
        <img
          src={faviconUrl}
          alt=""
          style={{ width: dimension, height: dimension, objectFit: "contain" }}
          onError={() => setHasError(true)}
        />
      ) : (
        <LuGlobe style={{ width: dimension, height: dimension }} />
      )}
    </div>
  );
};

export default Favicon;
