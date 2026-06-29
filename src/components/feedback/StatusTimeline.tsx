import { RichTextEditor } from "@omnidotdev/thornberry/rich-text-editor";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { LuGitCommitHorizontal, LuPencil } from "react-icons/lu";

import DestructiveAction from "@/components/core/DestructiveAction";
import CommentMessage from "@/components/feedback/CommentMessage";
import { Button } from "@/components/ui/button";
import {
  useDeletePostStatusChangeMutation,
  useUpdatePostStatusChangeMutation,
} from "@/generated/graphql";
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
  /** Whether the viewer can remove or edit timeline entries (org admin). */
  canManage?: boolean;
}

/** Snapshot captured in onMutate so a failed removal can be rolled back. */
interface RemoveRollbackContext {
  previous: StatusTimelineData | undefined;
}

/** Replace a single entry's note in the cached timeline. */
const patchNote = (
  data: StatusTimelineData | undefined,
  rowId: string,
  note: string | null,
): StatusTimelineData | undefined =>
  data?.post
    ? {
        ...data,
        post: {
          ...data.post,
          postStatusChanges: {
            ...data.post.postStatusChanges,
            nodes: data.post.postStatusChanges.nodes.map((node) =>
              node.rowId === rowId ? { ...node, note } : node,
            ),
          },
        },
      }
    : data;

/**
 * Status timeline. A compact log of a post's status transitions (GitHub-issue
 * style): who moved it to which status, and when. Admins can edit an entry's
 * note or remove an entry, which curates the history only and leaves the post's
 * current status untouched (use the composer to change status). Renders nothing
 * until the post has at least one recorded change.
 */
const StatusTimeline = ({ postId, canManage }: Props) => {
  const queryClient = useQueryClient();
  const timelineKey = statusTimelineQueryKey(postId);

  const { data: changes } = useQuery(statusTimelineOptions(postId));

  // the entry whose note is being edited, plus the editor's working HTML
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

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

  const { mutate: saveNote, isPending: isSaving } =
    useUpdatePostStatusChangeMutation({
      onSuccess: (data) => {
        const updated = data.updatePostStatusChange;
        if (updated) {
          queryClient.setQueryData<StatusTimelineData>(timelineKey, (old) =>
            patchNote(old, updated.id, updated.note ?? null),
          );
        }
        setEditingId(null);
      },
      onError: () =>
        toaster.error({ title: app.postPage.statusHistory.edit.error }),
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

              {canManage && editingId !== change.rowId && (
                <div className="ml-auto flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    tabIndex={-1}
                    aria-label={app.postPage.statusHistory.edit.title}
                    title={app.postPage.statusHistory.edit.title}
                    className="size-6 bg-transparent hover:bg-transparent"
                    onClick={() => {
                      setEditingId(change.rowId);
                      setDraft(change.note ?? "");
                    }}
                  >
                    <LuPencil className="text-foreground-subtle" />
                  </Button>

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
                        "size-6 bg-transparent hover:bg-transparent focus-visible:opacity-100",
                    }}
                    iconClassName="text-[var(--colors-omni-ruby)]"
                  />
                </div>
              )}
            </div>

            {editingId === change.rowId ? (
              <div className="ml-6 flex flex-col gap-2">
                <RichTextEditor
                  defaultContent={change.note ?? ""}
                  editorClassName="min-h-16"
                  placeholder={app.postPage.statusHistory.edit.placeholder}
                  onUpdate={({ getHTML, isEmpty }) =>
                    setDraft(isEmpty ? "" : getHTML())
                  }
                />

                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={isSaving}
                    onClick={() => setEditingId(null)}
                  >
                    {app.postPage.statusHistory.edit.cancel}
                  </Button>

                  <Button
                    size="sm"
                    disabled={isSaving}
                    onClick={() =>
                      saveNote({ rowId: change.rowId, note: draft || null })
                    }
                  >
                    {app.postPage.statusHistory.edit.save}
                  </Button>
                </div>
              </div>
            ) : change.note ? (
              // align the note under the text, past the commit icon. notes are
              // rich text (HTML); legacy notes are plain text. CommentMessage
              // renders both and linkifies #refs
              <div className="ml-6 border-border border-l-2 pl-3 text-muted-foreground text-sm">
                <CommentMessage message={change.note} />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default StatusTimeline;
