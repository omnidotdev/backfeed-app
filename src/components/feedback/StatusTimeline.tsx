import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { LuGitCommitHorizontal } from "react-icons/lu";

import DestructiveAction from "@/components/core/DestructiveAction";
import { useDeletePostStatusChangeMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import {
  statusTimelineOptions,
  statusTimelineQueryKey,
} from "@/lib/options/statusTimeline";
import toaster from "@/lib/util/toaster";

import type { StatusTimelineData } from "@/lib/options/statusTimeline";

interface Props {
  /** Post rowId whose status timeline is shown. */
  postId: string;
  /** Whether the viewer can remove timeline entries (org admin). */
  canManage?: boolean;
}

/** Snapshot captured in onMutate so a failed removal can be rolled back. */
interface RemoveRollbackContext {
  previous: StatusTimelineData | undefined;
}

/**
 * Status timeline. A compact log of a post's status transitions (GitHub-issue
 * style): who moved it to which status, and when. Admins can remove an entry,
 * which curates the history only and leaves the post's current status untouched
 * (use the composer to change status). Renders nothing until the post has at
 * least one recorded change.
 */
const StatusTimeline = ({ postId, canManage }: Props) => {
  const queryClient = useQueryClient();
  const timelineKey = statusTimelineQueryKey(postId);

  const { data: changes } = useQuery(statusTimelineOptions(postId));

  const { mutate: removeEntry } = useDeletePostStatusChangeMutation({
    onMutate: async ({ rowId }): Promise<RemoveRollbackContext> => {
      await queryClient.cancelQueries({ queryKey: timelineKey });

      const previous =
        queryClient.getQueryData<StatusTimelineData>(timelineKey);

      // optimistically drop the entry from the cached timeline
      queryClient.setQueryData<StatusTimelineData>(timelineKey, (old) =>
        old?.post
          ? {
              ...old,
              post: {
                ...old.post,
                postStatusChanges: {
                  ...old.post.postStatusChanges,
                  nodes: old.post.postStatusChanges.nodes.filter(
                    (node) => node.rowId !== rowId,
                  ),
                },
              },
            }
          : old,
      );

      return { previous };
    },
    onError: (_error, _variables, context) => {
      const ctx = context as RemoveRollbackContext | undefined;
      if (ctx) queryClient.setQueryData(timelineKey, ctx.previous);
      toaster.error({ title: app.postPage.statusHistory.delete.error });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: timelineKey }),
  });

  if (!changes?.length) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-medium text-foreground-subtle text-xs uppercase tracking-wide">
        Status history
      </h2>

      <ol className="flex flex-col gap-3">
        {changes.map((change) => (
          <li key={change.rowId} className="group flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm">
              <LuGitCommitHorizontal className="size-4 shrink-0 text-foreground-subtle" />

              <span className="text-muted-foreground">
                {change.changedBy?.username ?? "Someone"} moved this to
              </span>

              <span className="inline-flex items-center gap-1.5">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      change.toStatusTemplate?.color ??
                      "var(--colors-neutral-400)",
                  }}
                />
                <span className="font-medium">
                  {change.toStatusTemplate?.displayName ?? "No status"}
                </span>
              </span>

              <span className="text-foreground-subtle text-xs">
                {dayjs(change.createdAt).fromNow()}
              </span>

              {canManage && (
                <DestructiveAction
                  title={app.postPage.statusHistory.delete.title}
                  description={app.postPage.statusHistory.delete.description}
                  action={{
                    label: app.postPage.statusHistory.delete.action.label,
                    onClick: () => removeEntry({ rowId: change.rowId }),
                  }}
                  triggerProps={{
                    "aria-label": app.postPage.statusHistory.delete.title,
                    tabIndex: -1,
                    size: "icon",
                    variant: "ghost",
                    className:
                      "ml-auto size-6 shrink-0 bg-transparent opacity-0 transition-opacity hover:bg-transparent focus-visible:opacity-100 group-hover:opacity-100",
                  }}
                  iconClassName="text-[var(--colors-omni-ruby)]"
                />
              )}
            </div>

            {change.note ? (
              // align the note under the text, past the commit icon
              <p className="ml-6 border-border border-l-2 pl-3 text-muted-foreground text-sm">
                {change.note}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default StatusTimeline;
