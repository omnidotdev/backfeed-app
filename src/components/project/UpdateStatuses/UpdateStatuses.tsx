"use client";

import { parseColor } from "@ark-ui/react";
import {
  Button,
  ColorPicker,
  Flex,
  HStack,
  Icon,
  Popover,
  Stack,
  Switch,
  sigil,
  Table,
  TableCell,
  TableRow,
  Text,
} from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { SectionContainer } from "components/layout";
import {
  useCreatePostStatusMutation,
  useDeletePostStatusMutation,
  useProjectStatusesQuery,
  useUpdatePostStatusMutation,
} from "generated/graphql";
import { app, isDevEnv } from "lib/config";
import { DEBOUNCE_TIME, standardRegexSchema, uuidSchema } from "lib/constants";
import { useForm } from "lib/hooks";
import { toaster } from "lib/util";
import {
  HiOutlineInformationCircle,
  HiOutlineTrash,
  HiPlus,
} from "react-icons/hi2";
import { LuUndo2 } from "react-icons/lu";
import { z } from "zod";

import type { Project } from "generated/graphql";

// TODO: refactor to use `withForm`. Include status changes within a single update project mutation

interface FieldInfo {
  info?: string;
}

const updateProjectStatuses = app.projectSettingsPage.cta.updateProjectStatuses;

const DEFAULT_PENDING_STATUS = {
  rowId: "pending",
  isDefault: false,
  status: "",
  description: "",
  color: "#00a3a2",
} as const;

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

const statusFields = updateProjectStatuses.fields;

const statusSchema = z.object({
  rowId: uuidSchema.or(z.literal("pending")),
  status: standardRegexSchema
    .min(3, statusFields.status.errors.minLength)
    .max(20, statusFields.status.errors.maxLength),
  description: z
    .string()
    .trim()
    .min(10, statusFields.description.errors.minLength)
    .max(40, statusFields.description.errors.maxLength),
  color: z
    .string()
    .startsWith("#", statusFields.color.errors.startsWith)
    .length(7, statusFields.color.errors.length),
  isDefault: z.boolean(),
});

const updateStatusesSchema = z.object({
  projectStatuses: z
    .array(statusSchema)
    // Validate that there is exactly one default status
    .refine(
      (statuses) => statuses.filter((status) => status.isDefault).length === 1,
    ),
});

interface Props {
  /* Project ID. */
  projectId: Project["rowId"];
}

/**
 * Form to update project statuses.
 */
const UpdateStatuses = ({ projectId }: Props) => {
  const queryClient = useQueryClient();

  const { data: statuses } = useProjectStatusesQuery(
    {
      projectId,
    },
    {
      enabled:
        isDevEnv &&
        // prevent thrown errors if a `router.replace` occurs from updating the project name (i.e. generates a new slug)
        !!projectId,
      select: (data) =>
        data.postStatuses?.nodes?.map((status) => ({
          rowId: status?.rowId,
          status: status?.status,
          description: status?.description,
          color: status?.color,
          isDefault: status?.isDefault,
        })),
    },
  );

  const { mutateAsync: deleteStatus } = useDeletePostStatusMutation(),
    { mutateAsync: updateStatus } = useUpdatePostStatusMutation(),
    { mutateAsync: createStatus } = useCreatePostStatusMutation();

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
    onSubmit: async ({ formApi, value }) =>
      toaster.promise(async () => {
        const currentStatuses = value.projectStatuses;

        const removedStatuses = statuses?.filter(
          (status) =>
            !currentStatuses.some(
              (currentStatus) => currentStatus.rowId === status.rowId,
            ),
        );

        if (removedStatuses?.length) {
          await Promise.all(
            removedStatuses.map((status) =>
              deleteStatus({
                statusId: status.rowId!,
              }),
            ),
          );
        }

        await Promise.all(
          currentStatuses.map((status) => {
            if (status.rowId === "pending") {
              createStatus({
                input: {
                  postStatus: {
                    projectId,
                    status: status.status!,
                    description: status.description,
                    color: status.color,
                    isDefault: status.isDefault,
                  },
                },
              });
            } else {
              updateStatus({
                rowId: status.rowId!,
                patch: {
                  status: status.status,
                  description: status.description,
                  color: status.color,
                  isDefault: status.isDefault,
                },
              });
            }
          }),
        );

        await queryClient.invalidateQueries({
          queryKey: useProjectStatusesQuery.getKey({ projectId }),
        });

        // NB: Passing a value here resets the default state to said value. We want to make sure that the default state is in sync with the query that was invalidated above.
        formApi.reset({ projectStatuses: currentStatuses });
      }, updateProjectStatuses.actions.update.toast),
  });

  // TODO: when ready to implement for production, remove the development environment check and validate that the user is on a team tier subscription or higher
  if (!isDevEnv) return null;

  return (
    <SectionContainer
      title={updateProjectStatuses.title}
      description={updateProjectStatuses.description}
      p={0}
      boxShadow="none"
      overflowX="hidden"
      rounded="none"
    >
      <Button
        variant="ghost"
        bgColor={{
          base: "background.subtle",
          _hover: { base: "background.muted", _dark: "background.subtle/80" },
        }}
        position={{ sm: "absolute" }}
        right={{ sm: 0 }}
        top={{ sm: 3 }}
        onClick={() => reset()}
      >
        {updateProjectStatuses.actions.reset.label}

        <Icon src={LuUndo2} />
      </Button>

      <sigil.form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <Field name="projectStatuses" mode="array">
          {({ state: arrayState, pushValue, removeValue }) => (
            <Stack>
              <Flex w="full" overflowX="auto">
                <Table
                  headerContent={
                    <TableRow bgColor="background.muted">
                      {Object.values(statusFields).map((field) => (
                        <TableCell
                          key={field.label}
                          fontWeight="bold"
                          justifyContent={{ _last: "right" }}
                        >
                          <Flex align="center" justify="inherit">
                            {field.label}

                            {(field as FieldInfo).info ? (
                              <Popover
                                trigger={
                                  <Icon src={HiOutlineInformationCircle} />
                                }
                                closeTrigger={null}
                                positioning={{
                                  placement: "top-start",
                                  strategy: "fixed",
                                  gutter: -4,
                                }}
                                triggerProps={{ cursor: "pointer", p: 2 }}
                                titleProps={{ display: "none" }}
                                descriptionProps={{ display: "none" }}
                              >
                                <Text fontWeight="normal" mt={-2}>
                                  {(field as FieldInfo).info}
                                </Text>
                              </Popover>
                            ) : null}
                          </Flex>
                        </TableCell>
                      ))}
                    </TableRow>
                  }
                >
                  {arrayState.value.map((status, i) => (
                    <TableRow
                      key={`${status.rowId}-${i}`}
                      bgColor="transparent"
                    >
                      <TableCell>
                        <Field name={`projectStatuses[${i}].isDefault`}>
                          {({ state, handleChange }) => (
                            <Switch
                              checked={state.value}
                              onCheckedChange={({ checked }) => {
                                for (const status of arrayState.value) {
                                  const indexOfStatus =
                                    arrayState.value.indexOf(status);

                                  // Change the default status of all other statuses to false
                                  if (i !== indexOfStatus) {
                                    setFieldValue(
                                      `projectStatuses[${indexOfStatus}].isDefault`,
                                      false,
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

                      <TableCell py={6}>
                        <AppField name={`projectStatuses[${i}].status`}>
                          {({ InputField }) => (
                            <InputField
                              placeholder={statusFields.status.placeholder}
                              minW={40}
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
                              placeholder={statusFields.description.placeholder}
                              minW={40}
                              errorProps={{
                                top: -5,
                              }}
                            />
                          )}
                        </AppField>
                      </TableCell>

                      <TableCell>
                        <Field name={`projectStatuses[${i}].color`}>
                          {({ state, handleChange }) => (
                            <ColorPicker
                              label={null}
                              presets={COLOR_PRESETS}
                              positioning={{ strategy: "fixed" }}
                              value={
                                state.value
                                  ? parseColor(state.value)
                                  : parseColor("#000000")
                              }
                              onValueChange={({ value }) =>
                                handleChange(value.toString("hex"))
                              }
                              gap={0.5}
                              controlProps={{
                                minW: 40,
                              }}
                              // @ts-expect-error Omit `channel` from upstream types. It is defined internally.
                              channelInputProps={{
                                borderColor: "border.subtle",
                              }}
                              triggerProps={{
                                borderColor: "transparent",
                                p: 0,
                              }}
                              // @ts-expect-error TODO: omit `value` upstream. It is defined internally.
                              swatchProps={{
                                h: "full",
                                w: "full",
                                aspectRatio: 1,
                                borderRadius: "sm",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                          )}
                        </Field>
                      </TableCell>

                      <TableCell px={3}>
                        <Field name={`projectStatuses[${i}].isDefault`}>
                          {({ state }) => (
                            <Flex w="full" justify="flex-end">
                              <Button
                                disabled={state.value}
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
                                aria-label={
                                  updateProjectStatuses.actions.remove.label
                                }
                              >
                                <Icon src={HiOutlineTrash} />
                              </Button>
                            </Flex>
                          )}
                        </Field>
                      </TableCell>
                    </TableRow>
                  ))}
                </Table>
              </Flex>

              <Button
                variant="outline"
                color="brand.primary"
                borderColor="brand.primary"
                bgColor={{
                  _hover: { base: "brand.primary.50", _dark: "neutral.900" },
                }}
                onClick={() => pushValue(DEFAULT_PENDING_STATUS)}
              >
                <Icon src={HiPlus} h={4} w={4} />

                {updateProjectStatuses.actions.add.label}
              </Button>
            </Stack>
          )}
        </Field>

        <HStack mt={4}>
          <AppForm>
            <SubmitForm
              action={updateProjectStatuses.actions.update}
              showAlert
              containerProps={{
                w: "full",
              }}
            />
          </AppForm>
        </HStack>
      </sigil.form>
    </SectionContainer>
  );
};

export default UpdateStatuses;
