"use client";

import { Stack, sigil } from "@omnidev/sigil";
import { useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { z } from "zod";

import { CharacterLimit } from "components/core";
import {
  useCreateFeedbackMutation,
  useInfinitePostsQuery,
  useProjectMetricsQuery,
  useProjectQuery,
  useProjectStatusesQuery,
  useStatusBreakdownQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { DEBOUNCE_TIME } from "lib/constants";
import { useAuth, useForm } from "lib/hooks";
import { toaster } from "lib/util";

const MAX_DESCRIPTION_LENGTH = 240;

// TODO adjust schema in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create feedback form fields, as well as validating the form. */
const createFeedbackSchema = z.object({
  statusId: z
    .string()
    .uuid(app.projectPage.projectFeedback.createFeedback.errors.invalid),
  projectId: z
    .string()
    .uuid(app.projectPage.projectFeedback.createFeedback.errors.invalid),
  userId: z
    .string()
    .uuid(app.projectPage.projectFeedback.createFeedback.errors.invalid),
  title: z
    .string()
    .trim()
    .min(3, app.projectPage.projectFeedback.createFeedback.errors.title),
  description: z
    .string()
    .trim()
    .min(10, app.projectPage.projectFeedback.createFeedback.errors.description),
});

/**
 * Create feedback form.
 */
const CreateFeedback = () => {
  const queryClient = useQueryClient();

  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const { user } = useAuth();

  const { data: projectId } = useProjectQuery(
    {
      projectSlug,
      organizationSlug,
    },
    {
      enabled: !!projectSlug && !!organizationSlug,
      select: (data) => data?.projects?.nodes?.[0]?.rowId,
    }
  );

  const { data: defaultStatusId } = useProjectStatusesQuery(
    {
      projectId: projectId!,
      isDefault: true,
    },
    {
      enabled: !!projectId,
      select: (data) => data?.postStatuses?.nodes?.[0]?.rowId,
    }
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
        queryKey: useInfinitePostsQuery.getKey({
          pageSize: 5,
          projectId: projectId!,
        }),
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
        onChange: createFeedbackSchema,
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
          }
        ),
    }
  );

  const descriptionLength = useStore(
    store,
    (store) => store.values.description.length
  );

  return (
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
  );
};

export default CreateFeedback;
