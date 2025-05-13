"use client";

import { Stack, sigil } from "@omnidev/sigil";
import { useStore } from "@tanstack/react-form";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { z } from "zod";

import { CharacterLimit } from "components/core";
import {
  Tier,
  useCreateFeedbackMutation,
  useProjectMetricsQuery,
  useProjectQuery,
  useProjectStatusesQuery,
  useStatusBreakdownQuery,
} from "generated/graphql";
import { getProject } from "lib/actions";
import { app } from "lib/config";
import {
  DEBOUNCE_TIME,
  MAX_UNIQUE_USERS_FOR_FEEDBACK,
  standardRegexSchema,
  uuidSchema,
} from "lib/constants";
import { useAuth, useForm } from "lib/hooks";
import { toaster } from "lib/util";

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

/**
 * Create feedback form.
 */
const CreateFeedback = () => {
  const queryClient = useQueryClient();

  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const { data: canCreateFeedback } = useQuery({
    queryKey: ["FreeTierFeedback", { organizationSlug, projectSlug }],
    queryFn: async () => {
      try {
        const project = await getProject({ organizationSlug, projectSlug });

        if (!project) return null;

        const subscriptionTier =
          project.organization?.members.nodes[0]?.user?.tier;

        const activeUserCount = Number(
          project.posts.aggregates?.distinctCount?.userId ?? 0,
        );

        const hasUserSubmittedFeedback = !!project.userPosts.nodes.length;

        return {
          subscriptionTier,
          activeUserCount,
          hasUserSubmittedFeedback,
        };
      } catch (error) {
        return null;
      }
    },
    placeholderData: keepPreviousData,
    select: (data) => {
      if (!data?.subscriptionTier) {
        return false;
      }

      if (data.subscriptionTier === Tier.Free) {
        return (
          data.hasUserSubmittedFeedback ||
          data.activeUserCount < MAX_UNIQUE_USERS_FOR_FEEDBACK
        );
      }

      return true;
    },
  });

  const { user } = useAuth();

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
        queryClient.invalidateQueries({
          queryKey: ["FreeTierFeedback", { organizationSlug, projectSlug }],
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
            disabled={!canCreateFeedback}
            tooltip={app.projectPage.projectFeedback.disabled}
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
            disabled={!canCreateFeedback}
            tooltip={app.projectPage.projectFeedback.disabled}
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
            disabled={!canCreateFeedback}
          />
        </AppForm>
      </Stack>
    </sigil.form>
  );
};

export default CreateFeedback;
