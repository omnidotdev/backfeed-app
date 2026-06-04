import { Link, useRouteContext } from "@tanstack/react-router";

import app from "@/lib/config/app.config";
import cn from "@/lib/utils";

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
      <div className={cn("flex items-center gap-2", className)} {...rest}>
        <img
          src="/img/logo.png"
          alt={`${app.name} logo`}
          width={width}
          height={width / 2}
          // adjust color based on color theme
          className="brightness-0 dark:invert"
        />

        <span className="rounded-md border border-primary px-2 py-0.5 font-medium text-primary text-xs">
          Beta
        </span>
      </div>
    </Link>
  );
};

export default LogoLink;
