import {
  Combobox as ArkCombobox,
  createListCollection,
} from "@ark-ui/react/combobox";
import { Portal } from "@ark-ui/react/portal";
import { useMemo, useState } from "react";
import { LuCheck, LuPlus } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import usePostTagEditor from "@/lib/hooks/usePostTagEditor";

import type { ComponentProps } from "react";

/** Default chip color when a tag has no color set (mirrors TagBadge). */
const DEFAULT_COLOR = "#94a3b8";

interface Props {
  /** Post rowId tags are assigned to. */
  postId: string;
  /** Project rowId the post belongs to (source of available tags). */
  projectId: string;
  /** Trigger button label. */
  label?: string;
  /** Props forwarded to the trigger button (size, variant, className, etc). */
  triggerProps?: ComponentProps<typeof Button>;
}

/**
 * Tag picker. A searchable, multi-select popover for assigning a post's tags.
 * Stays open while toggling so several tags can be set at once, and reflects
 * each change instantly across every surface the post appears on.
 */
const TagPicker = ({
  postId,
  projectId,
  label = "Add tag",
  triggerProps,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // defer loading the tag queries until the picker is first opened so a long
  // feedback list does not fire a query per card
  const [hasOpened, setHasOpened] = useState(false);

  const { projectTags, assignedTagIds, toggleTag } = usePostTagEditor({
    postId,
    projectId,
    enabled: hasOpened,
  });

  const filteredTags = useMemo(() => {
    const needle = inputValue.trim().toLowerCase();
    return needle
      ? projectTags.filter((tag) => tag.name.toLowerCase().includes(needle))
      : projectTags;
  }, [projectTags, inputValue]);

  const collection = useMemo(
    () =>
      createListCollection({
        items: filteredTags.map((tag) => ({
          label: tag.name,
          value: tag.rowId,
        })),
      }),
    [filteredTags],
  );

  return (
    <ArkCombobox.Root
      collection={collection}
      open={open}
      onOpenChange={({ open }) => {
        if (open) setHasOpened(true);
        setOpen(open);
      }}
      value={assignedTagIds}
      onValueChange={({ value }) => {
        // multi-select toggles one item per interaction; find the one that
        // flipped and run the matching assign/unassign
        const added = value.find((id) => !assignedTagIds.includes(id));
        const removed = assignedTagIds.find((id) => !value.includes(id));
        const toggled = added ?? removed;
        if (toggled) toggleTag(toggled);
      }}
      inputValue={inputValue}
      onInputValueChange={({ inputValue }) => setInputValue(inputValue)}
      multiple
      closeOnSelect={false}
      selectionBehavior="preserve"
      loopFocus
    >
      <ArkCombobox.Trigger asChild>
        <Button
          size="sm"
          variant="outline"
          onClick={(evt) => evt.stopPropagation()}
          {...triggerProps}
        >
          <LuPlus className="size-4" />
          {label}
        </Button>
      </ArkCombobox.Trigger>

      <Portal>
        <ArkCombobox.Positioner>
          <ArkCombobox.Content
            className="z-50 w-56 rounded-lg border border-border bg-popover p-1 shadow-md"
            onClick={(evt) => evt.stopPropagation()}
          >
            <ArkCombobox.Input
              autoFocus
              placeholder="Search tags..."
              className="mb-1 w-full rounded-md border border-input bg-muted px-2 py-1.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <div className="max-h-60 overflow-y-auto">
              {filteredTags.map((tag) => (
                <ArkCombobox.Item
                  key={tag.rowId}
                  item={{ label: tag.name, value: tag.rowId }}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-popover-foreground text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
                >
                  <span
                    aria-hidden
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: tag.color || DEFAULT_COLOR }}
                  />
                  <ArkCombobox.ItemText className="flex-1 truncate">
                    {tag.name}
                  </ArkCombobox.ItemText>
                  <ArkCombobox.ItemIndicator>
                    <LuCheck className="size-4 text-[var(--colors-green-500)]" />
                  </ArkCombobox.ItemIndicator>
                </ArkCombobox.Item>
              ))}

              {!projectTags.length && (
                <p className="px-2 py-4 text-center text-muted-foreground text-sm">
                  No tags yet
                </p>
              )}

              {!!projectTags.length && !filteredTags.length && (
                <p className="px-2 py-4 text-center text-muted-foreground text-sm">
                  No matches
                </p>
              )}
            </div>
          </ArkCombobox.Content>
        </ArkCombobox.Positioner>
      </Portal>
    </ArkCombobox.Root>
  );
};

export default TagPicker;
