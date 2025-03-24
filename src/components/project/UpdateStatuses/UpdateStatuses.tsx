"use client";

import { parseColor } from "@ark-ui/react";
import {
  Button,
  ColorPicker,
  Grid,
  HStack,
  Icon,
  Input,
  Label,
  Stack,
  Switch,
} from "@omnidev/sigil";
import { useState } from "react";
import { HiOutlineEyeDropper, HiPlus } from "react-icons/hi2";

import { SectionContainer } from "components/layout";
import {
  useProjectStatusesQuery,
  useUpdatePostStatusMutation,
} from "generated/graphql";

import { useQueryClient } from "@tanstack/react-query";
import { DestructiveAction } from "components/core";
import type { Project } from "generated/graphql";

const COLOR_PRESETS = [
  "hsl(10, 81%, 59%)",
  "hsl(60, 81%, 59%)",
  "hsl(100, 81%, 59%)",
  "hsl(175, 81%, 59%)",
  "hsl(190, 81%, 59%)",
  "hsl(205, 81%, 59%)",
  "hsl(220, 81%, 59%)",
  "hsl(250, 81%, 59%)",
  "hsl(280, 81%, 59%)",
  "hsl(350, 81%, 59%)",
];

// TODO: implement functionality of form

interface Props {
  /* Project ID. */
  projectId: Project["rowId"];
  /** If the user has permissions to edit project statuses. */
  canEdit: boolean;
}

/**
 * Form to update project statuses.
 */
const UpdateStatuses = ({ projectId, canEdit }: Props) => {
  const queryClient = useQueryClient();

  const { data: statuses } = useProjectStatusesQuery(
    {
      projectId,
    },
    {
      select: (data) =>
        data.postStatuses?.nodes.map((status) => ({
          rowId: status?.rowId,
          status: status?.status,
          description: status?.description,
          color: status?.color,
          isDefault: status?.isDefault,
        })),
    }
  );

  const [defaultStatusId, setDefaultStatusId] = useState(
    statuses?.find((status) => status?.isDefault)?.rowId
  );

  const { mutate: deleteStatus } = useUpdatePostStatusMutation({
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: useProjectStatusesQuery.getKey({ projectId }),
      }),
  });

  if (!canEdit) return null;

  return (
    <SectionContainer
      title="Project Statuses"
      description="Customize statuses that are used to track progress on feedback items."
      p={0}
      boxShadow="none"
    >
      <Grid columns={{ base: 1, md: 2, xl: 3 }} gap="1px">
        {statuses
          ?.sort((a, b) => {
            const aValue = a.isDefault ? 1 : 0;
            const bValue = b.isDefault ? 1 : 0;

            return bValue - aValue;
          })
          .map((status) => {
            const isDefaultStatus = status.rowId === defaultStatusId;

            return (
              <Stack
                key={status.rowId}
                outline="1px solid"
                outlineColor="background.muted"
                p={4}
              >
                <Stack gap={0.5}>
                  <HStack justify="space-between">
                    <Label htmlFor={`status-${status.rowId}`}>Status</Label>

                    <Switch
                      checked={isDefaultStatus}
                      onCheckedChange={({ checked }) =>
                        checked ? setDefaultStatusId(status.rowId) : undefined
                      }
                      label={isDefaultStatus ? "Default" : undefined}
                      size="sm"
                      flexDirection="row-reverse"
                      labelProps={{
                        fontSize: "xs",
                      }}
                    />
                  </HStack>

                  <Input
                    id={`status-${status.rowId}`}
                    defaultValue={status.status}
                    borderColor="border.subtle"
                    size="sm"
                  />
                </Stack>

                <Stack gap={0.5}>
                  <Label htmlFor={`description-${status.rowId}`}>
                    Description
                  </Label>
                  <Input
                    id={`description-${status.rowId}`}
                    defaultValue={status.description ?? ""}
                    placeholder="Set a description for the status"
                    borderColor="border.subtle"
                    size="sm"
                  />
                </Stack>

                <ColorPicker
                  label="Color"
                  presets={COLOR_PRESETS}
                  defaultValue={
                    status.color ? parseColor(status.color) : undefined
                  }
                  gap={0.5}
                  channelInputProps={{
                    // TODO: Omit upstream, or make it optional
                    channel: "hex",
                    borderColor: "border.subtle",
                    // @ts-ignore TODO: fix type error upstream. This `size` prop should be derived from `Input` due to the `asChild` prop. Works at runtime.
                    size: "sm",
                  }}
                  triggerProps={{
                    borderColor: "transparent",
                    p: 0,
                    // @ts-ignore TODO: fix type error upstream. This `size` prop should be derived from `Button` due to the `asChild` prop. Works at runtime.
                    size: "sm",
                  }}
                  // @ts-ignore TODO: omit `value` upstream. The value is derived internally.
                  swatchProps={{
                    h: "full",
                    w: "full",
                    borderRadius: "sm",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    children: (
                      <Icon
                        src={HiOutlineEyeDropper}
                        color="background.default"
                        h={5}
                        w={5}
                      />
                    ),
                  }}
                />

                <DestructiveAction
                  title="Delete"
                  description={`Are you sure you want to remove the ${status.status} status?`}
                  triggerLabel="Delete"
                  triggerProps={{
                    disabled: isDefaultStatus,
                    "aria-label": `Remove ${status.status} Status`,
                  }}
                  action={{
                    label: "Remove Status",
                    // TODO: test this
                    onClick: () =>
                      deleteStatus({
                        rowId: status.rowId!,
                        patch: {
                          deletedAt: new Date(),
                        },
                      }),
                  }}
                />
              </Stack>
            );
          })}
      </Grid>

      <HStack>
        {/* TODO: replace with `SubmitForm` */}
        <Button disabled>Update Statuses</Button>

        {/* TODO: make this a dialog when status component is extracted */}
        <Button variant="outline">
          <Icon src={HiPlus} />
          Add New Status
        </Button>
      </HStack>
    </SectionContainer>
  );
};

export default UpdateStatuses;
