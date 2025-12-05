import NextLink from "next/link";

import type { LinkProps } from "next/link";
import type { HTMLAttributes } from "react";

interface Props extends LinkProps, HTMLAttributes<HTMLAnchorElement> {
  /** Whether the link is disabled. */
  disabled?: boolean;
}

/**
 * Link component.
 */
const Link = ({ children, disabled, ...rest }: Props) => {
  if (disabled) return children;

  return <NextLink {...rest}>{children}</NextLink>;
};

export default Link;
