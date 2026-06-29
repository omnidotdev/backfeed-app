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
        />

        <span className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
          {app.name}
        </span>
      </div>
    </Link>
  );
};

export default LogoLink;
