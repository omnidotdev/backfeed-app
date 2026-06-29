import { Portal } from "@ark-ui/react/portal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useState } from "react";
import {
  LuChevronDown,
  LuChevronUp,
  LuPencil,
  LuPlus,
  LuTrash2,
} from "react-icons/lu";

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
  SwitchControl,
  SwitchHiddenInput,
  SwitchRoot,
  SwitchThumb,
} from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateStatusTemplateMutation,
  useDeleteStatusTemplateMutation,
  useUpdateStatusTemplateMutation,
} from "@/generated/graphql";
import { isStatusOnBoard } from "@/lib/constants/board.constant";
import { isStatusOnRoadmap } from "@/lib/constants/roadmap.constant";
import { projectStatusesOptions } from "@/lib/options/projects";
import slugify from "@/lib/util/slugify";
import toaster from "@/lib/util/toaster";

import type { ProjectStatusesQuery } from "@/generated/graphql";

const settingsRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/settings",
);

/** Friendly default status colors, in the same family as the tag presets. */
const STATUS_COLOR_PRESETS = [
  "#64748b",
  "#3b82f6",
  "#8b5cf6",
  "#eab308",
  "#f97316",
  "#22c55e",
  "#06b6d4",
  "#ec4899",
];

interface Status {
  rowId: string;
  name: string;
  displayName: string;
  description?: string | null;
  color?: string | null;
  sortOrder?: number | null;
  showOnRoadmap?: boolean | null;
  showOnBoard?: boolean | null;
}

/**
 * Status template management. Lets admins create, edit, reorder, delete, and
 * toggle roadmap visibility for the workspace's statuses. Statuses are
 * workspace-level, so changes here apply to every project's board and roadmap
 * in the workspace.
 */
const StatusTemplateManager = () => {
  const { organizationId, queryClient } = settingsRoute.useRouteContext();

  const statusesOptions = projectStatusesOptions({ organizationId });

  const { data: statuses } = useQuery({
    ...statusesOptions,
    select: (data): Status[] =>
      (data?.statusTemplates?.nodes ?? []).filter(
        (node): node is Status => !!node,
      ),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState<Status | null>(null);
  const [deletingStatus, setDeletingStatus] = useState<Status | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(STATUS_COLOR_PRESETS[0]!);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: statusesOptions.queryKey });

  const { mutateAsync: createStatus } = useCreateStatusTemplateMutation();
  const { mutateAsync: updateStatus } = useUpdateStatusTemplateMutation();
  const { mutateAsync: deleteStatus } = useDeleteStatusTemplateMutation();

  const openCreate = () => {
    setEditingStatus(null);
    setDisplayName("");
    setDescription("");
    setColor(STATUS_COLOR_PRESETS[0]!);
    setIsDialogOpen(true);
  };

  const openEdit = (status: Status) => {
    setEditingStatus(status);
    setDisplayName(status.displayName ?? "");
    setDescription(status.description ?? "");
    setColor(status.color ?? STATUS_COLOR_PRESETS[0]!);
    setIsDialogOpen(true);
  };

  const { mutate: saveStatus, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      const trimmed = displayName.trim();

      if (editingStatus) {
        await updateStatus({
          rowId: editingStatus.rowId,
          patch: {
            displayName: trimmed,
            description: description.trim() || null,
            color,
          },
        });
        return;
      }

      // append new statuses after the current highest sort order
      const nextSortOrder =
        Math.max(
          0,
          ...(statuses ?? []).map((status) => status.sortOrder ?? 0),
        ) + 1;

      await createStatus({
        input: {
          statusTemplate: {
            organizationId,
            name: slugify(trimmed),
            displayName: trimmed,
            description: description.trim() || null,
            color,
            sortOrder: nextSortOrder,
          },
        },
      });
    },
    onSuccess: async () => {
      await invalidate();
      setIsDialogOpen(false);
      toaster.success({
        title: editingStatus ? "Status updated" : "Status created",
      });
    },
    onError: () =>
      toaster.error({
        title: "Could not save status",
        description: "Make sure the name is unique within this workspace.",
      }),
  });

  const { mutate: confirmDelete } = useMutation({
    mutationFn: (rowId: string) => deleteStatus({ rowId }),
    onSuccess: async () => {
      await invalidate();
      setDeletingStatus(null);
      toaster.success({ title: "Status deleted" });
    },
    onError: () => toaster.error({ title: "Could not delete status" }),
  });

  const { mutate: toggleRoadmap } = useMutation({
    mutationFn: ({
      rowId,
      showOnRoadmap,
    }: {
      rowId: string;
      showOnRoadmap: boolean;
    }) => updateStatus({ rowId, patch: { showOnRoadmap } }),
    // optimistically flip the switch so it responds instantly, then reconcile
    onMutate: async ({ rowId, showOnRoadmap }) => {
      await queryClient.cancelQueries({ queryKey: statusesOptions.queryKey });
      const previous = queryClient.getQueryData<ProjectStatusesQuery>(
        statusesOptions.queryKey,
      );

      queryClient.setQueryData<ProjectStatusesQuery>(
        statusesOptions.queryKey,
        (old) =>
          old?.statusTemplates?.nodes
            ? {
                ...old,
                statusTemplates: {
                  ...old.statusTemplates,
                  nodes: old.statusTemplates.nodes.map((node) =>
                    node?.rowId === rowId ? { ...node, showOnRoadmap } : node,
                  ),
                },
              }
            : old,
      );

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(statusesOptions.queryKey, context.previous);
      }
      toaster.error({ title: "Could not update roadmap visibility" });
    },
    onSettled: invalidate,
  });

  const { mutate: toggleBoard } = useMutation({
    mutationFn: ({
      rowId,
      showOnBoard,
    }: {
      rowId: string;
      showOnBoard: boolean;
    }) => updateStatus({ rowId, patch: { showOnBoard } }),
    // optimistically flip the switch so it responds instantly, then reconcile
    onMutate: async ({ rowId, showOnBoard }) => {
      await queryClient.cancelQueries({ queryKey: statusesOptions.queryKey });
      const previous = queryClient.getQueryData<ProjectStatusesQuery>(
        statusesOptions.queryKey,
      );

      queryClient.setQueryData<ProjectStatusesQuery>(
        statusesOptions.queryKey,
        (old) =>
          old?.statusTemplates?.nodes
            ? {
                ...old,
                statusTemplates: {
                  ...old.statusTemplates,
                  nodes: old.statusTemplates.nodes.map((node) =>
                    node?.rowId === rowId ? { ...node, showOnBoard } : node,
                  ),
                },
              }
            : old,
      );

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(statusesOptions.queryKey, context.previous);
      }
      toaster.error({ title: "Could not update board visibility" });
    },
    onSettled: invalidate,
  });

  // swap a status with its neighbor by exchanging sort orders
  const { mutate: reorder } = useMutation({
    mutationFn: async ({
      index,
      direction,
    }: {
      index: number;
      direction: -1 | 1;
    }) => {
      const ordered = statuses ?? [];
      const current = ordered[index];
      const neighbor = ordered[index + direction];
      if (!current || !neighbor) return;

      await Promise.all([
        updateStatus({
          rowId: current.rowId,
          patch: { sortOrder: neighbor.sortOrder ?? 0 },
        }),
        updateStatus({
          rowId: neighbor.rowId,
          patch: { sortOrder: current.sortOrder ?? 0 },
        }),
      ]);
    },
    onSettled: invalidate,
    onError: () => toaster.error({ title: "Could not reorder statuses" }),
  });

  return (
    <SectionContainer
      title="Statuses"
      description="Statuses for this workspace's boards and roadmap. Changes apply to every project."
      headerActions={
        <Button
          size="sm"
          variant="outline"
          className="ml-auto"
          onClick={openCreate}
        >
          <LuPlus className="size-4" />
          New status
        </Button>
      }
    >
      {statuses?.length ? (
        <ul className="flex flex-col divide-y divide-border">
          {statuses.map((status, index) => (
            <li
              key={status.rowId}
              className="flex items-center justify-between gap-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      status.color ?? "var(--color-muted-foreground)",
                  }}
                />
                <div className="flex min-w-0 flex-col">
                  <span className="truncate font-medium text-sm">
                    {status.displayName}
                  </span>
                  {status.description ? (
                    <span className="truncate text-foreground-subtle text-xs">
                      {status.description}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <span className="mr-1 flex items-center gap-1.5 text-foreground-subtle text-xs">
                  <span className="hidden sm:inline">Board</span>
                  <SwitchRoot
                    aria-label={`Show ${status.displayName} on the board by default`}
                    checked={isStatusOnBoard({
                      name: status.name,
                      showOnBoard: status.showOnBoard,
                    })}
                    onCheckedChange={({ checked }) =>
                      toggleBoard({
                        rowId: status.rowId,
                        showOnBoard: checked,
                      })
                    }
                  >
                    <SwitchControl>
                      <SwitchThumb />
                    </SwitchControl>
                    <SwitchHiddenInput />
                  </SwitchRoot>
                </span>

                <span className="mr-1 flex items-center gap-1.5 text-foreground-subtle text-xs">
                  <span className="hidden sm:inline">Roadmap</span>
                  <SwitchRoot
                    aria-label={`Show ${status.displayName} on roadmap`}
                    checked={isStatusOnRoadmap({
                      name: status.name,
                      showOnRoadmap: status.showOnRoadmap,
                    })}
                    onCheckedChange={({ checked }) =>
                      toggleRoadmap({
                        rowId: status.rowId,
                        showOnRoadmap: checked,
                      })
                    }
                  >
                    <SwitchControl>
                      <SwitchThumb />
                    </SwitchControl>
                    <SwitchHiddenInput />
                  </SwitchRoot>
                </span>

                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Move ${status.displayName} up`}
                  disabled={index === 0}
                  onClick={() => reorder({ index, direction: -1 })}
                >
                  <LuChevronUp className="size-4" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Move ${status.displayName} down`}
                  disabled={index === statuses.length - 1}
                  onClick={() => reorder({ index, direction: 1 })}
                >
                  <LuChevronDown className="size-4" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Edit ${status.displayName}`}
                  onClick={() => openEdit(status)}
                >
                  <LuPencil className="size-4" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Delete ${status.displayName}`}
                  onClick={() => setDeletingStatus(status)}
                >
                  <LuTrash2 className="size-4 text-[var(--colors-omni-coral-600)]" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-foreground-subtle text-sm">
          No statuses yet.{" "}
          <Button
            variant="link"
            className="h-auto p-0 align-baseline text-sm"
            onClick={openCreate}
          >
            Create one
          </Button>{" "}
          to start organizing feedback.
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

            <DialogTitle>
              {editingStatus ? "Edit status" : "New status"}
            </DialogTitle>
            <DialogDescription>
              {editingStatus
                ? "Update the status name, color, or description."
                : "Add a status for organizing feedback across the workspace."}
            </DialogDescription>

            <form
              className="flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (displayName.trim()) saveStatus();
              }}
            >
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="status-name">Name</Label>
                <Input
                  id="status-name"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="e.g. In Progress, Planned"
                  autoFocus
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="status-description">Description</Label>
                <Textarea
                  id="status-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Optional. What this status means."
                  rows={2}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="status-color">Color</Label>

                <div className="flex flex-wrap items-center gap-2">
                  {STATUS_COLOR_PRESETS.map((preset) => (
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
                    id="status-color"
                    type="color"
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                    className="size-6 cursor-pointer rounded-full border bg-transparent"
                    aria-label="Custom color"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={!displayName.trim() || isSaving}
                >
                  {editingStatus ? "Save" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Portal>
      </DialogRoot>

      <DialogRoot
        open={!!deletingStatus}
        onOpenChange={({ open }) => !open && setDeletingStatus(null)}
      >
        <Portal>
          <DialogBackdrop />

          <DialogContent>
            <DialogCloseTrigger />

            <DialogTitle>Delete status</DialogTitle>
            <DialogDescription>
              Delete "{deletingStatus?.displayName}"? Feedback currently in this
              status will be reset to no status. This cannot be undone.
            </DialogDescription>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDeletingStatus(null)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={() =>
                  deletingStatus && confirmDelete(deletingStatus.rowId)
                }
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Portal>
      </DialogRoot>
    </SectionContainer>
  );
};

export default StatusTemplateManager;
