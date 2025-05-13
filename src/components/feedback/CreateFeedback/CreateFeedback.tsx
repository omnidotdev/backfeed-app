"use client";

import { Collapsible, Stack, sigil } from "@omnidev/sigil";
import { useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { z } from "zod";

import { CharacterLimit } from "components/core";
import {
  useCreateFeedbackMutation,
  useProjectMetricsQuery,
  useProjectQuery,
  useProjectStatusesQuery,
  useStatusBreakdownQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { DEBOUNCE_TIME, standardRegexSchema, uuidSchema } from "lib/constants";
import { useForm } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { toaster } from "lib/util";
import { DialogType } from "store";

import type { Session } from "next-auth";

const MAX_DESCRIPTION_LENGTH = 500;

const feedbackSchemaErrors =
  app.projectPage.projectFeedback.createFeedback.errors;

// TODO adjust schema in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create feedback form fields, as well as validating the form. */
const createFeedbackSchema = z.object({
  statusId: uuidSchema,
  projectId: uuidSchema,
  userId: uuidSchema,
  title: standardRegexSchema
    .min(3, feedbackSchemaErrors.title.minLength)
    .max(90, feedbackSchemaErrors.title.maxLength),
  description: z
    .string()
    .trim()
    .min(10, feedbackSchemaErrors.description.minLength)
    .max(MAX_DESCRIPTION_LENGTH, feedbackSchemaErrors.description.maxLength),
});

interface Props {
  /** Authenticated user. */
  user: Session["user"] | undefined;
}

/**
 * Create feedback form.
 */
const CreateFeedback = ({ user }: Props) => {
  const queryClient = useQueryClient();

  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  // TODO: discuss. Not technically a dialog, but acts similarly to add state management globally
  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.CreateFeedback,
  });

  const { data: projectId } = useProjectQuery(
    {
      projectSlug,
      organizationSlug,
    },
    {
      enabled: !!projectSlug && !!organizationSlug,
      select: (data) => data?.projects?.nodes?.[0]?.rowId,
    },
  );

  const { data: defaultStatusId } = useProjectStatusesQuery(
    {
      projectId: projectId!,
      isDefault: true,
    },
    {
      enabled: !!projectId,
      select: (data) => data?.postStatuses?.nodes?.[0]?.rowId,
    },
  );

  const { mutateAsync: createFeedback, isPending } = useCreateFeedbackMutation({
    onSettled: async () => {
      reset();

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: useStatusBreakdownQuery.getKey({
            projectId: projectId!,
          }),
        }),

        queryClient.invalidateQueries({
          queryKey: useProjectMetricsQuery.getKey({
            projectId: projectId!,
          }),
        }),
      ]);

      return queryClient.invalidateQueries({
        queryKey: ["Posts.infinite"],
      });
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset, store } = useForm(
    {
      defaultValues: {
        statusId: defaultStatusId ?? "",
        projectId: projectId ?? "",
        userId: user?.rowId ?? "",
        title: "",
        description: "",
      },
      asyncDebounceMs: DEBOUNCE_TIME,
      validators: {
        onSubmitAsync: createFeedbackSchema,
      },
      onSubmit: async ({ value }) =>
        toaster.promise(
          createFeedback({
            input: {
              post: {
                statusId: value.statusId,
                projectId: value.projectId,
                userId: value.userId,
                title: value.title.trim(),
                description: value.description.trim(),
              },
            },
          }),
          {
            loading: {
              title: app.projectPage.projectFeedback.action.pending,
            },
            success: {
              title: app.projectPage.projectFeedback.action.success.title,
              description:
                app.projectPage.projectFeedback.action.success.description,
            },
            error: {
              title: app.projectPage.projectFeedback.action.error.title,
              description:
                app.projectPage.projectFeedback.action.error.description,
            },
          },
        ),
    },
  );

  const descriptionLength = useStore(
    store,
    (store) => store.values.description.length,
  );

  return (
    <Collapsible
      onOpenChange={({ open }) => {
        reset();
        setIsOpen(open);
      }}
      open={isOpen}
    >
      <sigil.form
        display="flex"
        flexDirection="column"
        gap={2}
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <AppField name="title">
          {({ InputField }) => (
            <InputField
              label={app.projectPage.projectFeedback.feedbackTitle.label}
              placeholder={
                app.projectPage.projectFeedback.feedbackTitle.placeholder
              }
              disabled={!user}
            />
          )}
        </AppField>

        <AppField name="description">
          {({ TextareaField }) => (
            <TextareaField
              label={app.projectPage.projectFeedback.feedbackDescription.label}
              placeholder={
                app.projectPage.projectFeedback.feedbackDescription.placeholder
              }
              rows={5}
              minH={32}
              maxLength={MAX_DESCRIPTION_LENGTH}
              disabled={!user}
            />
          )}
        </AppField>

        <Stack justify="space-between" direction="row">
          <CharacterLimit
            value={descriptionLength}
            max={MAX_DESCRIPTION_LENGTH}
            placeSelf="flex-start"
          />

          <AppForm>
            <SubmitForm
              action={app.projectPage.projectFeedback.action}
              isPending={isPending}
              w="fit-content"
              placeSelf="flex-end"
            />
          </AppForm>
        </Stack>
      </sigil.form>
    </Collapsible>
  );
};

export default CreateFeedback;
