"use client";

import { parseColor } from "@ark-ui/react";
import {
  Button,
  ColorPicker,
  Flex,
  HStack,
  Icon,
  Stack,
  Switch,
  Table,
  TableCell,
  TableRow,
  sigil,
} from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { SectionContainer } from "components/layout";
import {
  useCreatePostStatusMutation,
  useProjectStatusesQuery,
  useUpdatePostStatusMutation,
} from "generated/graphql";
import { DEBOUNCE_TIME } from "lib/constants";
import { useForm } from "lib/hooks";
import { toaster } from "lib/util";
import { HiOutlineEyeDropper, HiOutlineTrash, HiPlus } from "react-icons/hi2";
import { z } from "zod";

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
  rowId: z.string().uuid().or(z.literal("pending")),
  status: z.string().min(1).max(100),
  description: z.string().min(1).max(255),
  color: z.string().startsWith("#").length(7),
  isDefault: z.boolean(),
});

// TODO: add check that at least one status is default
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

  const { mutateAsync: createStatus } = useCreatePostStatusMutation();

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
          const currentStatuses = value.projectStatuses;

          const removedStatuses = statuses?.filter(
            (status) =>
              !currentStatuses.some(
                (currentStatus) => currentStatus.rowId === status.rowId
              )
          );

          if (removedStatuses?.length) {
            await Promise.all(
              removedStatuses.map((status) =>
                deleteStatus({
                  rowId: status.rowId!,
                  patch: {
                    deletedAt: new Date(),
                  },
                })
              )
            );
          }

          for (const status of currentStatuses) {
            if (status.rowId === "pending") {
              await createStatus({
                input: {
                  postStatus: {
                    projectId,
                    status: status.status,
                    description: status.description,
                    color: status.color,
                    isDefault: status.isDefault,
                  },
                },
              });
            } else {
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
          }

          await queryClient.invalidateQueries({
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
          {({ state: arrayState, pushValue, removeValue }) => (
            <Stack w="100%" overflowX="auto">
              <Table
                headerContent={
                  <TableRow bgColor="background.muted">
                    {[
                      "Default",
                      "Status",
                      "Description",
                      "Color",
                      "Remove",
                    ].map((header) => (
                      <TableCell
                        key={header}
                        textAlign={{ _last: "right" }}
                        fontWeight="bold"
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                }
              >
                {arrayState.value.map((status, i) => (
                  <TableRow key={`${status.rowId}-${i}`} bgColor="transparent">
                    <TableCell>
                      <Field name={`projectStatuses[${i}].isDefault`}>
                        {({ state, handleChange }) => (
                          <Switch
                            // TODO: remove this, allow for pending statuses to become the default
                            disabled={status.rowId === "pending"}
                            checked={state.value}
                            onCheckedChange={({ checked }) => {
                              for (const status of arrayState.value) {
                                const indexOfStatus =
                                  arrayState.value.indexOf(status);

                                // Change the default status of all other statuses to false
                                if (i !== indexOfStatus) {
                                  setFieldValue(
                                    `projectStatuses[${indexOfStatus}].isDefault`,
                                    false
                                  );
                                } else {
                                  // This essentially disables unchecking the default status
                                  if (checked) {
                                    handleChange(true);
                                  }
                                }
                              }
                            }}
                          />
                        )}
                      </Field>
                    </TableCell>

                    <TableCell py={5}>
                      <AppField name={`projectStatuses[${i}].status`}>
                        {({ InputField }) => (
                          <InputField
                            placeholder="Enter status name"
                            borderColor="border.subtle"
                            errorProps={{
                              top: -5,
                            }}
                          />
                        )}
                      </AppField>
                    </TableCell>

                    <TableCell>
                      <AppField name={`projectStatuses[${i}].description`}>
                        {({ InputField }) => (
                          <InputField
                            placeholder="Set a description for the status"
                            borderColor="border.subtle"
                            errorProps={{
                              top: -5,
                            }}
                          />
                        )}
                      </AppField>
                    </TableCell>

                    <TableCell>
                      {/* TODO: handle errors */}
                      <Field name={`projectStatuses[${i}].color`}>
                        {({ state, handleChange }) => (
                          <ColorPicker
                            label={null}
                            presets={COLOR_PRESETS}
                            value={
                              state.value
                                ? parseColor(state.value)
                                : parseColor("#000000")
                            }
                            onValueChange={({ value }) =>
                              handleChange(value.toString("hex"))
                            }
                            gap={0.5}
                            channelInputProps={{
                              // TODO: Omit upstream, or make it optional
                              channel: "hex",
                              borderColor: "border.subtle",
                              minW: 40,
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
                                  color="white"
                                  h={5}
                                  w={5}
                                />
                              ),
                            }}
                          />
                        )}
                      </Field>
                    </TableCell>

                    <TableCell px={3}>
                      {/* TODO: moved to `Field` and track changes for `isDefault` to determine disabled state */}
                      <Flex w="full" justify="flex-end">
                        <Button
                          disabled={status.isDefault}
                          variant="icon"
                          bgColor="transparent"
                          color={{
                            base: "red",
                            _hover: {
                              base: "destructive.hover",
                              _disabled: "red",
                            },
                          }}
                          opacity={{ _disabled: 0.3 }}
                          onClick={() => removeValue(i)}
                          aria-label="Remove status"
                        >
                          <Icon src={HiOutlineTrash} />
                        </Button>
                      </Flex>
                    </TableCell>
                  </TableRow>
                ))}
              </Table>

              <Button
                variant="outline"
                onClick={() =>
                  pushValue({
                    rowId: "pending",
                    isDefault: false,
                    status: "",
                    description: "",
                    color: "#000000",
                  })
                }
              >
                <Icon src={HiPlus} />
                Add New Status
              </Button>
            </Stack>
          )}
        </Field>

        <HStack mt={6}>
          <AppForm>
            <SubmitForm
              action={{
                submit: "Update Statuses",
                pending: "Update Statuses",
              }}
              showAlert
            />
          </AppForm>
        </HStack>
      </sigil.form>
    </SectionContainer>
  );
};

export default UpdateStatuses;
