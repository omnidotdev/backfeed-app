import { Portal } from "@ark-ui/react/portal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";

import TagBadge from "@/components/feedback/TagBadge";
import SectionContainer from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/button";
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createTag,
  deleteTag,
  projectTagsOptions,
  projectTagsQueryKey,
  updateTag,
} from "@/lib/options/tags";
import toaster from "@/lib/util/toaster";

import type { Tag } from "@/lib/options/tags";

/** Suggested label colors, friendly defaults like GitHub labels. */
const TAG_COLOR_PRESETS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#64748b",
];

interface Props {
  /** Project rowId tags belong to */
  projectId: string;
}

/**
 * Project tags management. Lists a project's tags and lets admins create,
 * edit, and delete them. Intended for the project settings page.
 */
const ProjectTags = ({ projectId }: Props) => {
  const queryClient = useQueryClient();

  const { data: tags } = useQuery(projectTagsOptions(projectId));

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState(TAG_COLOR_PRESETS[0]!);

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: projectTagsQueryKey(projectId),
    });

  const openCreate = () => {
    setEditingTag(null);
    setName("");
    setColor(TAG_COLOR_PRESETS[0]!);
    setIsDialogOpen(true);
  };

  const openEdit = (tag: Tag) => {
    setEditingTag(tag);
    setName(tag.name);
    setColor(tag.color || TAG_COLOR_PRESETS[0]!);
    setIsDialogOpen(true);
  };

  const { mutate: saveTag, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      if (editingTag) {
        await updateTag(editingTag.rowId, { name: name.trim(), color });
      } else {
        await createTag({ projectId, name: name.trim(), color });
      }
    },
    onSuccess: async () => {
      await invalidate();
      setIsDialogOpen(false);
      toaster.success({
        title: editingTag ? "Tag updated" : "Tag created",
      });
    },
    onError: () =>
      toaster.error({
        title: "Could not save tag",
        description: "Make sure the name is unique within this project.",
      }),
  });

  const { mutate: removeTag } = useMutation({
    mutationFn: (rowId: string) => deleteTag(rowId),
    onSuccess: async () => {
      await invalidate();
      toaster.success({ title: "Tag deleted" });
    },
    onError: () => toaster.error({ title: "Could not delete tag" }),
  });

  return (
    <SectionContainer
      title="Tags"
      description="Labels used to categorize and filter feedback in this project."
      headerActions={
        <Button
          size="sm"
          variant="outline"
          className="ml-auto"
          onClick={openCreate}
        >
          <LuPlus className="size-4" />
          New tag
        </Button>
      }
    >
      {tags?.length ? (
        <ul className="flex flex-col divide-y divide-border">
          {tags.map((tag) => (
            <li
              key={tag.rowId}
              className="flex items-center justify-between gap-2 py-2"
            >
              <TagBadge name={tag.name} color={tag.color} />

              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Edit ${tag.name}`}
                  onClick={() => openEdit(tag)}
                >
                  <LuPencil className="size-4" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Delete ${tag.name}`}
                  onClick={() => removeTag(tag.rowId)}
                >
                  <LuTrash2 className="size-4 text-[var(--colors-omni-coral-600)]" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-foreground-subtle text-sm">
          No tags yet.{" "}
          <Button
            variant="link"
            className="h-auto p-0 align-baseline text-sm"
            onClick={openCreate}
          >
            Create one
          </Button>{" "}
          to start categorizing feedback.
        </p>
      )}

      <DialogRoot
        open={isDialogOpen}
        onOpenChange={({ open }) => setIsDialogOpen(open)}
      >
        <Portal>
          <DialogBackdrop />

          <DialogContent>
            <DialogCloseTrigger />

            <DialogTitle>{editingTag ? "Edit tag" : "New tag"}</DialogTitle>
            <DialogDescription>
              {editingTag
                ? "Update the tag name or color."
                : "Add a label to categorize feedback."}
            </DialogDescription>

            <form
              className="flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (name.trim()) saveTag();
              }}
            >
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="tag-name">Name</Label>
                <Input
                  id="tag-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. bug, feature request"
                  autoFocus
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="tag-color">Color</Label>

                <div className="flex flex-wrap items-center gap-2">
                  {TAG_COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      aria-label={`Use color ${preset}`}
                      onClick={() => setColor(preset)}
                      className="size-6 rounded-full border-2 transition-transform hover:scale-110"
                      style={{
                        backgroundColor: preset,
                        borderColor:
                          color === preset
                            ? "var(--colors-foreground)"
                            : "transparent",
                      }}
                    />
                  ))}

                  <input
                    id="tag-color"
                    type="color"
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                    className="size-6 cursor-pointer rounded-full border bg-transparent"
                    aria-label="Custom color"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <TagBadge name={name.trim() || "preview"} color={color} />

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" disabled={!name.trim() || isSaving}>
                    {editingTag ? "Save" : "Create"}
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Portal>
      </DialogRoot>
    </SectionContainer>
  );
};

export default ProjectTags;
