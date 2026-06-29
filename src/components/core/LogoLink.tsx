import { LogoLockup } from "@omnidotdev/thornberry/logo-lockup";
import { Link, useRouteContext } from "@tanstack/react-router";

import app from "@/lib/config/app.config";

import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  /** Width of the image */
  width: number;
}

/**
 * Navigation link that displays the Backfeed logo. Routes to the home page.
 */
const LogoLink = ({ width, className, ...rest }: Props) => {
  const { session } = useRouteContext({ from: "__root__" });

  return (
    <Link to={session ? "/dashboard" : "/"}>
      <LogoLockup
        className={className}
        name={app.name}
        logo={
          <img
            src="/img/logo.png"
            alt={`${app.name} logo`}
            width={width}
            height={width / 2}
          />
        }
        {...rest}
      />
    </Link>
  );
};

export default LogoLink;
