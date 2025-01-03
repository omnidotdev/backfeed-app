import NextLink from "next/link";

import type { LinkProps } from "next/link";
import type { ReactNode } from "react";

interface Props extends LinkProps {
  /** Children to render in the link. */
  children: ReactNode;
  /** State to determine if the link is disabled. */
  disabled?: boolean;
}

/**
* Link component.
*/
const Link = ({ children, disabled, ...rest }: Props) => {
  if (disabled) return <>{children}</>;

  return <NextLink {...rest}>{children}</NextLink>;
};

export default Link;
