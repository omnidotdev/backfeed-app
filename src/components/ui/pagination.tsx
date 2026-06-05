import { Pagination as ArkPagination } from "@ark-ui/react/pagination";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";

interface PaginationProps
  extends Omit<ComponentProps<typeof ArkPagination.Root>, "type"> {
  /** Class applied to page item triggers. */
  itemClassName?: string;
  /** Class applied to ellipsis elements. */
  ellipsisClassName?: string;
}

/**
 * Pagination control.
 */
const Pagination = ({
  className,
  itemClassName,
  ellipsisClassName,
  ...rest
}: PaginationProps) => (
  <ArkPagination.Root
    className={cn("flex items-center justify-center gap-1", className)}
    {...rest}
  >
    <ArkPagination.PrevTrigger asChild>
      <Button variant="ghost" size="icon" aria-label="Previous page">
        <LuChevronLeft className="size-4" />
      </Button>
    </ArkPagination.PrevTrigger>

    <ArkPagination.Context>
      {(pagination) =>
        pagination.pages.map((page, index) =>
          page.type === "page" ? (
            <ArkPagination.Item key={`page-${page.value}`} {...page} asChild>
              <Button
                variant={page.value === pagination.page ? "solid" : "ghost"}
                size="icon"
                className={itemClassName}
              >
                {page.value}
              </Button>
            </ArkPagination.Item>
          ) : (
            <ArkPagination.Ellipsis
              // biome-ignore lint/suspicious/noArrayIndexKey: ellipsis position is stable within the page list
              key={`ellipsis-${index}`}
              index={index}
              className={cn(
                "flex size-9 items-center justify-center text-muted-foreground text-sm",
                ellipsisClassName,
              )}
            >
              &#8230;
            </ArkPagination.Ellipsis>
          ),
        )
      }
    </ArkPagination.Context>

    <ArkPagination.NextTrigger asChild>
      <Button variant="ghost" size="icon" aria-label="Next page">
        <LuChevronRight className="size-4" />
      </Button>
    </ArkPagination.NextTrigger>
  </ArkPagination.Root>
);

export { Pagination };
