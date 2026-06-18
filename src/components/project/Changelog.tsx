import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { LuRocket } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { changelogOptions } from "@/lib/options/changelog";
import stripHtml from "@/lib/util/stripHtml";

interface Props {
  /** Project whose shipped posts are listed. */
  projectId: string;
}

/**
 * Public changelog. A reverse-chronological feed of shipped posts (the close of
 * the feedback loop, "you asked, we shipped it"), grouped by the day they
 * shipped. Read-only and shareable, like the roadmap.
 */
const Changelog = ({ projectId }: Props) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery(changelogOptions(projectId));

  const entries = data?.pages.flatMap((page) => page.posts.nodes) ?? [];

  if (!isLoading && !entries.length) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <LuRocket className="size-8 text-foreground-subtle" />
        <p className="font-medium">Nothing shipped yet</p>
        <p className="text-foreground-subtle text-sm">
          Completed feedback shows up here once it ships.
        </p>
      </div>
    );
  }

  // group entries by the calendar day they shipped, preserving order
  const groups: { day: string; label: string; entries: typeof entries }[] = [];
  for (const entry of entries) {
    const day = entry.shippedAt
      ? dayjs(entry.shippedAt).format("YYYY-MM-DD")
      : "";
    const last = groups.at(-1);
    if (last?.day === day) {
      last.entries.push(entry);
    } else {
      groups.push({
        day,
        label: entry.shippedAt
          ? dayjs(entry.shippedAt).format("MMMM D, YYYY")
          : "Shipped",
        entries: [entry],
      });
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <section key={group.day} className="flex flex-col gap-4">
          <h2 className="font-medium text-foreground-subtle text-sm">
            {group.label}
          </h2>

          <ol className="flex flex-col gap-4 border-border border-l pl-4">
            {group.entries.map((entry) => (
              <li key={entry.rowId} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  {entry.statusTemplate ? (
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            entry.statusTemplate.color ??
                            "var(--colors-neutral-400)",
                        }}
                      />
                      <span className="text-foreground-subtle">
                        {entry.statusTemplate.displayName}
                      </span>
                    </span>
                  ) : null}

                  <h3 className="font-medium">{entry.title}</h3>
                </div>

                {entry.description ? (
                  <p className="line-clamp-3 text-muted-foreground text-sm">
                    {stripHtml(entry.description)}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      ))}

      {hasNextPage ? (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Changelog;
