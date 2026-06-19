import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChangePostStatusMutation } from "@/generated/graphql";
import { statusBreakdownOptions } from "@/lib/options/projects";
import { statusTimelineQueryKey } from "@/lib/options/statusTimeline";
import toaster from "@/lib/util/toaster";
import cn from "@/lib/utils";

import type { QueryKey } from "@tanstack/react-query";
import type { FeedbackByIdQuery } from "@/generated/graphql";
import type { StatusTimelineData } from "@/lib/options/statusTimeline";

/** Prefix for every cached feedback detail (holds the status badge). */
const FEEDBACK_KEY: QueryKey = ["FeedbackById"];

interface StatusOption {
  rowId: string | undefined;
  displayName: string | null | undefined;
  color: string | null | undefined;
}

interface Props {
  /** Post being updated. */
  postId: string;
  /** Project the post belongs to (for breakdown invalidation). */
  projectId: string;
  /** Currently selected status, preselected as the target. */
  currentStatusId: string | undefined;
  /** Status options to move between. */
  statuses: StatusOption[] | undefined;
  /** Current user, used to attribute the optimistic timeline entry. */
  currentUser?: { username: string | null; avatarUrl: string | null };
}

/** Snapshots captured in onMutate so a failed status change can be rolled back. */
interface StatusRollbackContext {
  previousTimeline: StatusTimelineData | undefined;
  previousFeedback: [QueryKey, FeedbackByIdQuery | undefined][];
  previousNote: string;
}

/**
 * Admin status-update composer. Lets a moderator move a post to a new status
 * with an optional note explaining why (Canny-style "status change with
 * comment"), recorded together on the post's timeline via `changePostStatus`.
 */
const StatusUpdateComposer = ({
  postId,
  projectId,
  currentStatusId,
  statuses,
  currentUser,
}: Props) => {
  const queryClient = useQueryClient();

  const [targetStatusId, setTargetStatusId] = useState(currentStatusId);
  const [note, setNote] = useState("");

  const timelineKey = statusTimelineQueryKey(postId);

  const { mutate: changeStatus, isPending } = useChangePostStatusMutation({
    onMutate: async (variables): Promise<StatusRollbackContext> => {
      const target = statuses?.find(
        (status) => status.rowId === variables.statusTemplateId,
      );

      await Promise.all([
        queryClient.cancelQueries({ queryKey: timelineKey }),
        queryClient.cancelQueries({ queryKey: FEEDBACK_KEY }),
      ]);

      const previousTimeline =
        queryClient.getQueryData<StatusTimelineData>(timelineKey);
      const previousFeedback = queryClient.getQueriesData<FeedbackByIdQuery>({
        queryKey: FEEDBACK_KEY,
      });
      const previousNote = note;

      // clear the note right away so the composer feels responsive
      setNote("");

      // append an optimistic entry to the post's timeline (oldest first)
      queryClient.setQueryData<StatusTimelineData>(timelineKey, (old) =>
        old?.post
          ? {
              ...old,
              post: {
                ...old.post,
                postStatusChanges: {
                  ...old.post.postStatusChanges,
                  nodes: [
                    ...old.post.postStatusChanges.nodes,
                    {
                      rowId: "pending",
                      createdAt: new Date().toISOString(),
                      note: variables.note ?? null,
                      toStatusTemplate: target
                        ? {
                            displayName: target.displayName ?? "",
                            color: target.color ?? null,
                          }
                        : null,
                      changedBy: {
                        username: currentUser?.username ?? null,
                        avatarUrl: currentUser?.avatarUrl ?? null,
                      },
                    },
                  ],
                },
              },
            }
          : old,
      );

      // move the post's status badge on the detail page immediately
      if (target)
        queryClient.setQueriesData<FeedbackByIdQuery>(
          { queryKey: FEEDBACK_KEY },
          (old) => {
            if (!old?.post || old.post.rowId !== postId) return old;
            return {
              ...old,
              post: {
                ...old.post,
                statusTemplate: {
                  ...old.post.statusTemplate,
                  rowId: target.rowId ?? old.post.statusTemplate?.rowId ?? "",
                  name: old.post.statusTemplate?.name ?? "",
                  displayName: target.displayName ?? "",
                  color: target.color ?? null,
                },
              },
            };
          },
        );

      return { previousTimeline, previousFeedback, previousNote };
    },
    onError: (_error, _variables, context) => {
      const ctx = context as StatusRollbackContext | undefined;
      if (ctx) {
        queryClient.setQueryData(timelineKey, ctx.previousTimeline);
        for (const [key, data] of ctx.previousFeedback)
          queryClient.setQueryData(key, data);
        setNote(ctx.previousNote);
      }
      toaster.error({ title: "Could not update status" });
    },
    onSuccess: () => toaster.success({ title: "Status updated" }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: timelineKey });
      // prefix match: refresh the post card regardless of the viewer's userId
      queryClient.invalidateQueries({ queryKey: FEEDBACK_KEY });
      queryClient.invalidateQueries({
        queryKey: statusBreakdownOptions({ projectId }).queryKey,
      });
    },
  });

  if (!statuses?.length) return null;

  const isUnchanged = targetStatusId === currentStatusId && !note.trim();

  return (
    <section className="flex flex-col gap-3 rounded-lg border border-border-subtle p-4">
      <h2 className="font-medium text-foreground-subtle text-xs uppercase tracking-wide">
        Post an update
      </h2>

      <div className="flex flex-wrap gap-1.5">
        {statuses.map((status) => {
          const isSelected = status.rowId === targetStatusId;

          return (
            <button
              key={status.rowId}
              type="button"
              onClick={() => setTargetStatusId(status.rowId)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm transition-colors",
                isSelected
                  ? "border-transparent bg-muted font-medium"
                  : "border-border-subtle text-muted-foreground hover:bg-muted/60",
              )}
            >
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: status.color ?? "var(--colors-neutral-400)",
                }}
              />
              {status.displayName}
            </button>
          );
        })}
      </div>

      <Textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Add an optional note (e.g. shipping next release)"
        rows={2}
      />

      <div className="flex justify-end">
        <Button
          size="sm"
          disabled={isUnchanged || isPending}
          onClick={() =>
            changeStatus({
              postId,
              statusTemplateId: targetStatusId ?? null,
              note: note.trim() || null,
            })
          }
        >
          Post update
        </Button>
      </div>
    </section>
  );
};

export default StatusUpdateComposer;
