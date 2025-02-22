import { Link as ViewTransitionLink } from "next-view-transitions";

import type { LinkProps } from "next/link";
import type { HTMLAttributes } from "react";

interface Props extends LinkProps, HTMLAttributes<HTMLAnchorElement> {
  /** State to determine if the link is disabled. */
  disabled?: boolean;
}

/**
 * Link component.
 */
const Link = ({ children, disabled, ...rest }: Props) => {
  if (disabled) return children;

  return <ViewTransitionLink {...rest}>{children}</ViewTransitionLink>;
};

export default Link;
