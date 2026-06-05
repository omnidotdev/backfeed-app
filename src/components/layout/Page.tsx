import { Link } from "@tanstack/react-router";
import { LuArrowLeft } from "react-icons/lu";

import CallToAction from "@/components/core/CallToAction";
import cn from "@/lib/utils";

import type { LinkProps } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import type { ActionButton } from "@/components/core/CallToAction";

interface Props extends ComponentProps<"div"> {
  /** Page header props. */
  header?: {
    /** Header section title. */
    title: ReactNode;
    /** Header section description. */
    description?: string;
    /** Header section call to action buttons. */
    cta?: ActionButton[];
    /** Back link displayed above the title. */
    backLink?: {
      label: string;
      to: LinkProps["to"];
      params?: LinkProps["params"];
    };
    /** Props to pass to the header section. */
    headerProps?: ComponentProps<"div"> & { children?: ReactNode };
  };
}

/**
 * Page layout.
 */
const Page = ({ header, children, className, ...rest }: Props) => (
  <div
    className={cn(
      "mx-auto flex h-full w-full max-w-[90svw] flex-col gap-6 py-6 lg:max-w-[90rem] lg:px-6",
      className,
    )}
    {...rest}
  >
    {header && (
      <div
        className={cn("flex w-full flex-col", header.headerProps?.className)}
      >
        {header.backLink && (
          <Link
            to={header.backLink.to}
            params={header.backLink.params}
            className="mb-2 inline-flex w-fit items-center gap-1 text-muted-foreground text-sm hover:text-foreground"
          >
            <LuArrowLeft className="size-4" />
            {header.backLink.label}
          </Link>
        )}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {typeof header.title === "string" ? (
                <h1 className="font-bold text-2xl leading-tight tracking-[-0.02em] md:text-3xl">
                  {header.title}
                </h1>
              ) : (
                header.title
              )}

              {header.headerProps?.children}
            </div>

            {header.description && (
              <h2 className="max-w-2xl font-normal text-muted-foreground text-sm leading-normal sm:text-base">
                {header.description}
              </h2>
            )}
          </div>

          {!!header.cta?.length && (
            <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row md:w-auto">
              {header.cta?.map((action) => (
                <CallToAction key={action.label} action={action} />
              ))}
            </div>
          )}
        </div>
      </div>
    )}

    {children}
  </div>
);

export default Page;
