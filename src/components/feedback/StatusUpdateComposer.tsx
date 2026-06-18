import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChangePostStatusMutation } from "@/generated/graphql";
import { statusBreakdownOptions } from "@/lib/options/projects";
import { statusTimelineQueryKey } from "@/lib/options/statusTimeline";
import toaster from "@/lib/util/toaster";
import cn from "@/lib/utils";

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
}: Props) => {
  const queryClient = useQueryClient();

  const [targetStatusId, setTargetStatusId] = useState(currentStatusId);
  const [note, setNote] = useState("");

  const { mutate: changeStatus, isPending } = useChangePostStatusMutation({
    onSuccess: () => {
      setNote("");
      queryClient.invalidateQueries({
        queryKey: statusTimelineQueryKey(postId),
      });
      // prefix match: refresh the post card regardless of the viewer's userId
      queryClient.invalidateQueries({ queryKey: ["FeedbackById"] });
      queryClient.invalidateQueries({
        queryKey: statusBreakdownOptions({ projectId }).queryKey,
      });
      toaster.success({ title: "Status updated" });
    },
    onError: () => toaster.error({ title: "Could not update status" }),
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
