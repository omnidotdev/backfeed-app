import { Collapsible, Stack, sigil } from "@omnidev/sigil";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouteContext } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";

import CharacterLimit from "@/components/core/CharacterLimit";
import {
  useCreateFeedbackMutation,
  useCreateStatusTemplateMutation,
} from "@/generated/graphql";
import app from "@/lib/config/app.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import { DEFAULT_STATUS_TEMPLATES } from "@/lib/constants/defaultStatusTemplates.constant";
import { useEnsureStatusTemplates } from "@/lib/hooks/useEnsureStatusTemplates";
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
  const { session, queryClient, hasAdminPrivileges, organizationId } =
    useRouteContext({
      from: "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
    });
  const { projectSlug } = useParams({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
  });

  // TODO: discuss. Not technically a dialog, but acts similarly to add state management globally
  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.CreateFeedback,
  });
  const { data: canCreateFeedback } = useQuery(
    freeTierFeedbackOptions({
      organizationId,
      projectSlug,
    }),
  );

  const { data: project } = useQuery({
    ...projectOptions({
      projectSlug,
      organizationId,
    }),
    select: (data) => data?.projects?.nodes?.[0],
  });

  const projectId = project?.rowId;

  const { defaultStatusTemplateId, isLoading: isLoadingTemplates } =
    useEnsureStatusTemplates({
      organizationId,
      hasAdminPrivileges,
      enabled: !!organizationId,
    });

  const { mutateAsync: createStatusTemplate } =
    useCreateStatusTemplateMutation();

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
          freeTierFeedbackOptions({
            organizationId,
            projectSlug,
          }),
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

        // If no status template exists, try to create defaults on-demand
        let statusTemplateId = defaultStatusTemplateId;

        if (!statusTemplateId) {
          if (isLoadingTemplates) {
            toaster.info({
              title: "Please wait",
              description: "Setting up feedback categories...",
            });
            return;
          }

          // Try to create default templates on-demand
          if (organizationId) {
            try {
              toaster.info({
                title: "Setting up",
                description: "Creating feedback categories...",
              });

              // Create templates sequentially
              for (const template of DEFAULT_STATUS_TEMPLATES) {
                const result = await createStatusTemplate({
                  input: {
                    statusTemplate: {
                      organizationId,
                      name: template.name,
                      displayName: template.displayName,
                      color: template.color,
                      description: template.description,
                      sortOrder: template.sortOrder,
                    },
                  },
                });

                // Use the "open" template as default, or first one created
                if (template.name === "open" || !statusTemplateId) {
                  statusTemplateId =
                    result.createStatusTemplate?.statusTemplate?.rowId;
                }
              }

              // Invalidate cache so templates are available next time
              await queryClient.invalidateQueries({
                queryKey: projectStatusesOptions({ organizationId }).queryKey,
              });
            } catch (err) {
              console.error(
                "[CreateFeedback] Failed to create templates on-demand:",
                err,
              );
              toaster.error({
                title: app.projectPage.projectFeedback.action.error.title,
                description:
                  "Failed to set up feedback categories. Please try again.",
              });
              return;
            }
          }

          // If still no template after trying to create, show error
          if (!statusTemplateId) {
            toaster.error({
              title: app.projectPage.projectFeedback.action.error.title,
              description:
                "Status templates are not configured. Please contact a workspace admin.",
            });
            return;
          }
        }

        return toaster.promise(
          createFeedback({
            input: {
              post: {
                statusTemplateId: statusTemplateId,
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

  // Pick a random placeholder index on mount (same index for title and description)
  const placeholderIndex = useMemo(() => {
    const placeholders =
      app.projectPage.projectFeedback.feedbackTitle.placeholders;
    return Math.floor(Math.random() * placeholders.length);
  }, []);

  const titlePlaceholder =
    app.projectPage.projectFeedback.feedbackTitle.placeholders[
      placeholderIndex
    ];
  const descriptionPlaceholder =
    app.projectPage.projectFeedback.feedbackDescription.placeholders[
      placeholderIndex
    ];

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
              placeholder={titlePlaceholder}
              disabled={!session?.user || !canCreateFeedback}
            />
          )}
        </AppField>

        <AppField name="description">
          {({ TextareaField }) => (
            <TextareaField
              label={app.projectPage.projectFeedback.feedbackDescription.label}
              placeholder={descriptionPlaceholder}
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
