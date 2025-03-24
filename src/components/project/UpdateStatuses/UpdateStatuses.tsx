"use client";

import { parseColor } from "@ark-ui/react";
import {
  Button,
  ColorPicker,
  Grid,
  HStack,
  Icon,
  Stack,
  Switch,
  sigil,
} from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { HiOutlineEyeDropper, HiPlus } from "react-icons/hi2";
import { z } from "zod";

import { DestructiveAction } from "components/core";
import { SectionContainer } from "components/layout";
import {
  useProjectStatusesQuery,
  useUpdatePostStatusMutation,
} from "generated/graphql";
import { DEBOUNCE_TIME } from "lib/constants";
import { useForm } from "lib/hooks";
import { toaster } from "lib/util";

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

const statusSchema = z.object({
  rowId: z.string().uuid(),
  status: z.string().min(1).max(100),
  description: z.string().min(1).max(255),
  color: z.string().startsWith("#").length(7),
  isDefault: z.boolean(),
});

const updateStatusesSchema = z.object({
  projectStatuses: z.array(statusSchema),
});

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
        data.postStatuses?.nodes?.map((status) => ({
          rowId: status?.rowId,
          status: status?.status,
          description: status?.description,
          color: status?.color,
          isDefault: status?.isDefault,
        })),
    }
  );

  const { mutate: deleteStatus } = useUpdatePostStatusMutation({
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: useProjectStatusesQuery.getKey({ projectId }),
      }),
  });

  const { mutateAsync: updateStatus } = useUpdatePostStatusMutation();

  const {
    handleSubmit,
    AppForm,
    AppField,
    Field,
    SubmitForm,
    reset,
    setFieldValue,
  } = useForm({
    defaultValues: {
      projectStatuses: statuses ?? [],
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onSubmitAsync: updateStatusesSchema,
    },
    onSubmit: async ({ value }) =>
      toaster.promise(
        async () => {
          const statuses = value.projectStatuses;

          for (const status of statuses) {
            await updateStatus({
              rowId: status.rowId!,
              patch: {
                status: status.status,
                description: status.description,
                color: status.color,
                isDefault: status.isDefault,
              },
            });
          }

          queryClient.invalidateQueries({
            queryKey: useProjectStatusesQuery.getKey({ projectId }),
          });

          reset();
        },
        {
          loading: {
            title: "Updating project statuses...",
          },
          success: {
            title: "Success!",
            description: "Statuses updated successfully",
          },
          error: {
            title: "Error",
            description: "An error occurred while updating project statuses.",
          },
        }
      ),
  });

  if (!canEdit) return null;

  return (
    <SectionContainer
      title="Project Statuses"
      description="Customize statuses that are used to track progress on feedback items."
      p={0}
      boxShadow="none"
    >
      <sigil.form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <Field name="projectStatuses" mode="array">
          {({ state: arrayState }) => (
            <Grid columns={{ base: 1, md: 2, xl: 3 }} gap="1px">
              {arrayState.value.map((status, i) => (
                <Stack
                  key={status.rowId}
                  outline="1px solid"
                  outlineColor="background.muted"
                  p={4}
                >
                  <AppField name={`projectStatuses[${i}].status`}>
                    {({ InputField }) => (
                      <Stack gap={0.5}>
                        <HStack placeSelf="flex-end">
                          <Field name={`projectStatuses[${i}].isDefault`}>
                            {({ state, handleChange }) => (
                              <Switch
                                checked={state.value}
                                onCheckedChange={({ checked }) => {
                                  for (const status of arrayState.value) {
                                    const indexOfStatus =
                                      arrayState.value.indexOf(status);

                                    if (i !== indexOfStatus) {
                                      setFieldValue(
                                        `projectStatuses[${indexOfStatus}].isDefault`,
                                        false
                                      );
                                    } else {
                                      if (checked) {
                                        handleChange(true);
                                      }
                                    }
                                  }
                                }}
                                label={state.value ? "Default" : undefined}
                                size="sm"
                                flexDirection="row-reverse"
                                labelProps={{
                                  fontSize: "xs",
                                }}
                                h={5}
                              />
                            )}
                          </Field>
                        </HStack>

                        <InputField
                          label="Status"
                          placeholder="Enter status name"
                          borderColor="border.subtle"
                        />
                      </Stack>
                    )}
                  </AppField>

                  <AppField name={`projectStatuses[${i}].description`}>
                    {({ InputField }) => (
                      <InputField
                        label="Description"
                        placeholder="Set a description for the status"
                        borderColor="border.subtle"
                      />
                    )}
                  </AppField>

                  <Field name={`projectStatuses[${i}].color`}>
                    {({ state, handleChange }) => (
                      <ColorPicker
                        label="Color"
                        presets={COLOR_PRESETS}
                        value={
                          state.value
                            ? parseColor(state.value)
                            : parseColor("#000000")
                        }
                        onValueChange={({ valueAsString }) =>
                          handleChange(valueAsString)
                        }
                        gap={0.5}
                        channelInputProps={{
                          // TODO: Omit upstream, or make it optional
                          channel: "hex",
                          borderColor: "border.subtle",
                        }}
                        triggerProps={{
                          borderColor: "transparent",
                          p: 0,
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
                    )}
                  </Field>

                  <DestructiveAction
                    title="Delete"
                    description={`Are you sure you want to remove the ${status.status} status?`}
                    triggerLabel="Delete"
                    triggerProps={{
                      disabled: status.isDefault,
                      "aria-label": `Remove ${status.status} Status`,
                    }}
                    action={{
                      label: "Remove Status",
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
              ))}
            </Grid>
          )}
        </Field>

        <HStack mt={6}>
          <AppForm>
            <SubmitForm
              action={{
                submit: "Update Statuses",
                pending: "Updating Statuses...",
              }}
            />
          </AppForm>

          {/* TODO: make this a dialog when status component is extracted */}
          <Button variant="outline">
            <Icon src={HiPlus} />
            Add New Status
          </Button>
        </HStack>
      </sigil.form>
    </SectionContainer>
  );
};

export default UpdateStatuses;
