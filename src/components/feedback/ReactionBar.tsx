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
  postReactionsOptions,
  postReactionsQueryKey,
} from "@/lib/options/reactions";
import toaster from "@/lib/util/toaster";
import cn from "@/lib/utils";

/** Emoji set offered in the picker (mirrors GitHub's issue reactions). */
const REACTION_EMOJIS = ["👍", "👎", "😄", "🎉", "😕", "❤️", "🚀", "👀"];

interface Props {
  /** Post rowId reactions belong to. */
  postId: string;
  /** Current user rowId (required to react). */
  userId?: string;
  /** Whether the viewer can add/remove reactions. */
  canReact?: boolean;
}

/**
 * Emoji reaction bar for a post. Shows existing reactions grouped by emoji with
 * counts; clicking toggles the current user's reaction, and a picker adds new
 * ones.
 */
const ReactionBar = ({ postId, userId, canReact = false }: Props) => {
  const queryClient = useQueryClient();

  const { data: reactions } = useQuery(postReactionsOptions(postId));

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: postReactionsQueryKey(postId) });

  const { mutate: addReaction } = useMutation({
    mutationFn: (emoji: string) =>
      createReaction({ postId, userId: userId!, emoji }),
    onSuccess: invalidate,
    onError: () => toaster.error({ title: "Could not add reaction" }),
  });

  const { mutate: removeReaction } = useMutation({
    mutationFn: (rowId: string) => deleteReaction(rowId),
    onSuccess: invalidate,
    onError: () => toaster.error({ title: "Could not remove reaction" }),
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
