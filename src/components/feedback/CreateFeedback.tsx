import { Collapsible, Stack, sigil } from "@omnidev/sigil";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouteContext } from "@tanstack/react-router";
import { z } from "zod";

import CharacterLimit from "@/components/core/CharacterLimit";
import { useCreateFeedbackMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import useForm from "@/lib/hooks/useForm";
import { freeTierFeedbackOptions } from "@/lib/options/feedback";
import {
  projectMetricsOptions,
  projectOptions,
  projectStatusesOptions,
  statusBreakdownOptions,
} from "@/lib/options/projects";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import toaster from "@/lib/util/toaster";

const MAX_DESCRIPTION_LENGTH = 500;

const feedbackSchemaErrors =
  app.projectPage.projectFeedback.createFeedback.errors;

// TODO adjust schema in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create feedback form fields, as well as validating the form. */
const createFeedbackSchema = z.object({
  title: z
    .string()
    .trim()
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
  const { session, queryClient } = useRouteContext({
    from: "/_auth/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
  });
  const { workspaceSlug, projectSlug } = useParams({
    from: "/_auth/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
  });

  // TODO: discuss. Not technically a dialog, but acts similarly to add state management globally
  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.CreateFeedback,
  });
  const { data: canCreateFeedback } = useQuery(
    freeTierFeedbackOptions({ workspaceSlug, projectSlug }),
  );

  const { data: project } = useQuery({
    ...projectOptions({
      projectSlug,
      workspaceSlug,
    }),
    select: (data) => data?.projects?.nodes?.[0],
  });

  const projectId = project?.rowId;
  const workspaceId = project?.workspace?.rowId;

  const { data: defaultStatusTemplateId } = useQuery({
    ...projectStatusesOptions({
      workspaceId: workspaceId!,
    }),
    enabled: !!workspaceId,
    select: (data) => {
      // find the default status from project status configs, or fall back to first template
      const templates = data?.statusTemplates?.nodes;
      const configs = data?.projectStatusConfigs?.nodes;
      const defaultConfig = configs?.find((c) => c?.isDefault);
      if (defaultConfig) {
        return defaultConfig.statusTemplateId;
      }
      return templates?.[0]?.rowId;
    },
  });

  const { mutateAsync: createFeedback, isPending } = useCreateFeedbackMutation({
    onSettled: async () => {
      reset();

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: statusBreakdownOptions({ projectId: projectId! }).queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: projectMetricsOptions({ projectId: projectId! }).queryKey,
        }),
        queryClient.invalidateQueries(
          freeTierFeedbackOptions({ workspaceSlug, projectSlug }),
        ),
      ]);

      return queryClient.invalidateQueries({
        queryKey: ["Posts.infinite"],
      });
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset, store } = useForm(
    {
      defaultValues: {
        title: "",
        description: "",
      },
      asyncDebounceMs: DEBOUNCE_TIME,
      validators: {
        onSubmitAsync: createFeedbackSchema,
      },
      onSubmit: async ({ value }) => {
        // Validate that required data is available before submitting
        if (!projectId || !session?.user?.rowId) {
          toaster.error({
            title: app.projectPage.projectFeedback.action.error.title,
            description: "Missing required data. Please try again.",
          });
          return;
        }

        if (!defaultStatusTemplateId) {
          toaster.error({
            title: app.projectPage.projectFeedback.action.error.title,
            description:
              "No status templates configured for this workspace. Please contact an administrator.",
          });
          return;
        }

        return toaster.promise(
          createFeedback({
            input: {
              post: {
                statusTemplateId: defaultStatusTemplateId,
                projectId,
                userId: session.user.rowId,
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
        );
      },
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
        p={1}
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
              disabled={!session?.user || !canCreateFeedback}
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
              rows={3}
              maxLength={MAX_DESCRIPTION_LENGTH}
              disabled={!session?.user || !canCreateFeedback}
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
