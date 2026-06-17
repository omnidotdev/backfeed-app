import { Link } from "@tanstack/react-router";
import { LuChevronRight } from "react-icons/lu";

import cn from "@/lib/utils";

import type { LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * A single breadcrumb. Items with a `to` render as links; the final item (the
 * current page) always renders as plain text regardless of `to`.
 */
export interface Crumb {
  label: ReactNode;
  to?: LinkProps["to"];
  params?: LinkProps["params"];
  /** Optional leading image (e.g. a workspace logo) shown before the label. */
  image?: string | null;
}

/**
 * Breadcrumb trail. Renders crumbs separated by chevrons, with the last crumb
 * marked as the current page. Pass to a Page header to give every screen a
 * consistent sense of place and a one-tap path back up the hierarchy.
 */
const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-2">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const key = item.to
            ? `${String(item.to)}-${index}`
            : `current-${index}`;

          const content = (
            <>
              {item.image && (
                <img
                  src={item.image}
                  alt=""
                  className="size-4 shrink-0 rounded-sm object-cover"
                />
              )}
              {item.label}
            </>
          );

          return (
            <li key={key} className="flex items-center gap-1.5">
              {index > 0 && (
                <LuChevronRight
                  aria-hidden
                  className="size-3.5 shrink-0 text-muted-foreground/60"
                />
              )}

              {isLast || !item.to ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1.5",
                    isLast && "font-medium text-foreground",
                  )}
                >
                  {content}
                </span>
              ) : (
                <Link
                  to={item.to}
                  params={item.params}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
