import { Portal } from "@ark-ui/react/portal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LuSmilePlus } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  createReaction,
  deleteReaction,
  reactionsOptions,
  reactionsQueryKey,
} from "@/lib/options/reactions";
import toaster from "@/lib/util/toaster";
import cn from "@/lib/utils";

import type { Reaction, ReactionTarget } from "@/lib/options/reactions";

/** Emoji set offered in the picker (mirrors GitHub's issue reactions). */
const REACTION_EMOJIS = ["👍", "👎", "😄", "🎉", "😕", "❤️", "🚀", "👀"];

interface Props {
  /** Post rowId reactions belong to (omit when reacting to a comment). */
  postId?: string;
  /** Comment rowId reactions belong to (omit when reacting to a post). */
  commentId?: string;
  /** Current user rowId (required to react). */
  userId?: string;
  /** Whether the viewer can add/remove reactions. */
  canReact?: boolean;
}

/**
 * Emoji reaction bar for a post or comment (pass exactly one target). Shows
 * existing reactions grouped by emoji with counts; clicking toggles the current
 * user's reaction, and a picker adds new ones.
 */
const ReactionBar = ({
  postId,
  commentId,
  userId,
  canReact = false,
}: Props) => {
  const queryClient = useQueryClient();

  // exactly one of postId/commentId is set (enforced by the API CHECK constraint)
  const target = (commentId ? { commentId } : { postId }) as ReactionTarget;

  const queryKey = reactionsQueryKey(target);

  const { data: reactions } = useQuery(reactionsOptions(target));

  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  /** Snapshot, then apply an optimistic change to the cached reaction list. */
  const optimistically = async (
    update: (current: Reaction[]) => Reaction[],
  ) => {
    await queryClient.cancelQueries({ queryKey });
    const previous = queryClient.getQueryData<Reaction[]>(queryKey);
    queryClient.setQueryData<Reaction[]>(queryKey, (old) => update(old ?? []));
    return { previous };
  };

  /** Restore the snapshot taken before an optimistic change failed. */
  const rollback = (context: { previous?: Reaction[] } | undefined) =>
    queryClient.setQueryData(queryKey, context?.previous);

  const { mutate: addReaction } = useMutation({
    mutationFn: (emoji: string) =>
      createReaction({ ...target, userId: userId!, emoji }),
    onMutate: (emoji) =>
      optimistically((current) => [
        ...current,
        { rowId: "pending", emoji, userId: userId! },
      ]),
    onError: (_error, _emoji, context) => {
      rollback(context);
      toaster.error({ title: "Could not add reaction" });
    },
    onSettled: invalidate,
  });

  const { mutate: removeReaction } = useMutation({
    mutationFn: (rowId: string) => deleteReaction(rowId),
    onMutate: (rowId) =>
      optimistically((current) =>
        current.filter((reaction) => reaction.rowId !== rowId),
      ),
    onError: (_error, _rowId, context) => {
      rollback(context);
      toaster.error({ title: "Could not remove reaction" });
    },
    onSettled: invalidate,
  });

  // group by emoji, tracking the current user's reaction id (if any)
  const grouped = new Map<string, { count: number; mine?: string }>();
  for (const reaction of reactions ?? []) {
    const group = grouped.get(reaction.emoji) ?? { count: 0 };
    group.count += 1;
    if (reaction.userId === userId) group.mine = reaction.rowId;
    grouped.set(reaction.emoji, group);
  }

  const toggle = (emoji: string) => {
    const group = grouped.get(emoji);
    // ignore clicks while an optimistic reaction is still settling
    if (group?.mine === "pending") return;
    if (group?.mine) removeReaction(group.mine);
    else if (canReact && userId) addReaction(emoji);
  };

  const entries = [...grouped.entries()];

  if (!entries.length && !canReact) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {entries.map(([emoji, group]) => (
        <button
          key={emoji}
          type="button"
          disabled={!group.mine && (!canReact || !userId)}
          onClick={() => toggle(emoji)}
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-sm transition-colors",
            group.mine
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border-subtle text-foreground-subtle hover:bg-muted",
            (!canReact || !userId) && !group.mine && "cursor-default",
          )}
        >
          <span>{emoji}</span>
          <span className="tabular-nums text-xs">{group.count}</span>
        </button>
      ))}

      {canReact && userId && (
        <MenuRoot
          positioning={{ placement: "bottom-start" }}
          onSelect={({ value }) => toggle(value)}
        >
          <MenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="size-7"
              aria-label="Add reaction"
            >
              <LuSmilePlus className="size-4" />
            </Button>
          </MenuTrigger>

          <Portal>
            <MenuPositioner>
              <MenuContent>
                <MenuItemGroup className="flex max-w-[12rem] flex-wrap gap-1 p-1">
                  {REACTION_EMOJIS.map((emoji) => (
                    <MenuItem
                      key={emoji}
                      value={emoji}
                      className="justify-center text-lg"
                    >
                      {emoji}
                    </MenuItem>
                  ))}
                </MenuItemGroup>
              </MenuContent>
            </MenuPositioner>
          </Portal>
        </MenuRoot>
      )}
    </div>
  );
};

export default ReactionBar;
