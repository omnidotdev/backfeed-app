import { Dialog, sigil } from "@omnidev/sigil";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";
import { useIsClient } from "usehooks-ts";
import { z } from "zod";

import { useCreateProjectMutation } from "@/generated/graphql";
import { token } from "@/generated/panda/tokens";
import app from "@/lib/config/app.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import {
  projectDescriptionSchema,
  projectNameSchema,
} from "@/lib/constants/schema.constant";
import getSdk from "@/lib/graphql/getSdk";
import useForm from "@/lib/hooks/useForm";
import useViewportSize from "@/lib/hooks/useViewportSize";
import { projectOptions } from "@/lib/options/projects";
import { workspaceMetricsOptions } from "@/lib/options/workspaces";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import generateSlug from "@/lib/util/generateSlug";
import toaster from "@/lib/util/toaster";
import { fetchSession } from "@/server/functions/auth";

// TODO adjust schemas in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/**
 * Schema for create project form fields.
 * Note: organizationId is passed as the workspace identifier since workspaces
 * are now 1:1 with organizations (no separate workspace table).
 */
const createProjectSchema = z
  .object({
    organizationId: z.string(),
    name: projectNameSchema,
    description: projectDescriptionSchema,
  })
  .superRefine(async ({ organizationId, name }, ctx) => {
    const { session } = await fetchSession();

    const slug = generateSlug(name);

    if (!organizationId.length || !slug?.length || !session) return z.NEVER;

    const sdk = await getSdk();

    // Check if project with this slug already exists in the organization
    const { projectBySlugAndOrganizationId } = await sdk.ProjectBySlug({
      organizationId,
      slug,
    });

    if (projectBySlugAndOrganizationId) {
      ctx.addIssue({
        code: "custom",
        message: app.dashboardPage.cta.newProject.projectSlug.error.duplicate,
        path: ["name"],
      });
    }
  });

const workspaceLayoutRoute = getRouteApi(
  "/_public/workspaces/$workspaceSlug/_layout",
);

interface Props {
  /** Slug of the workspace to create the project under. */
  workspaceSlug: string;
}

/**
 * Dialog for creating a new project.
 */
const CreateProject = ({ workspaceSlug }: Props) => {
  const { queryClient, organizationId } =
    workspaceLayoutRoute.useRouteContext();
  const navigate = useNavigate();

  const isClient = useIsClient();

  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  useHotkeys(
    "mod+p",
    () => {
      setIsOpen(!isOpen);
      reset();
    },
    {
      enabled: !!organizationId,
      enableOnFormTags: true,
      preventDefault: true,
    },
    [isOpen, organizationId],
  );

  const { mutateAsync: createProject, isPending } = useCreateProjectMutation({
    onSettled: () => {
      // Invalidate workspace metrics to refresh project count
      queryClient?.invalidateQueries({
        queryKey: workspaceMetricsOptions({ organizationId }).queryKey,
      });
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      organizationId: organizationId ?? "",
      name: "",
      description: "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onSubmitAsync: createProjectSchema,
    },
    onSubmit: async ({ value }) =>
      toaster.promise(
        async () => {
          // Status templates are workspace-level (org-level), projects inherit them
          const { createProject: projectData } = await createProject({
            input: {
              project: {
                name: value.name,
                description: value.description,
                slug: generateSlug(value.name)!,
                organizationId: value.organizationId,
              },
            },
          });

          if (projectData) {
            const projectSlug = projectData.project?.slug!;

            // Invalidate project query so the route loader fetches fresh data
            await queryClient?.invalidateQueries({
              queryKey: projectOptions({
                organizationId,
                projectSlug,
              }).queryKey,
            });

            navigate({
              to: "/workspaces/$workspaceSlug/projects/$projectSlug",
              params: {
                workspaceSlug,
                projectSlug,
              },
            });

            setIsOpen(false);
            reset();
          }
        },
        {
          loading: {
            title: app.dashboardPage.cta.newProject.action.pending,
          },
          success: {
            title: app.dashboardPage.cta.newProject.action.success.title,
            description:
              app.dashboardPage.cta.newProject.action.success.description,
          },
          error: {
            title: app.dashboardPage.cta.newProject.action.error.title,
            description:
              app.dashboardPage.cta.newProject.action.error.description,
          },
        },
      ),
  });

  if (!isClient) return null;

  return (
    <Dialog
      title={app.dashboardPage.cta.newProject.label}
      description={app.dashboardPage.cta.newProject.description}
      open={isOpen}
      onOpenChange={({ open }) => {
        reset();
        setIsOpen(open);
      }}
      contentProps={{
        style: {
          // TODO: adjust minW upstream in Sigil for mobile viewports
          minWidth: isSmallViewport ? undefined : "80%",
        },
      }}
    >
      <sigil.form
        display="flex"
        flexDirection="column"
        gap={4}
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <AppField name="name">
          {({ InputField }) => (
            <InputField
              label={app.dashboardPage.cta.newProject.projectName.id}
              placeholder={
                app.dashboardPage.cta.newProject.projectName.placeholder
              }
            />
          )}
        </AppField>

        <AppField name="description">
          {({ InputField }) => (
            <InputField
              label={app.dashboardPage.cta.newProject.projectDescription.id}
              placeholder={
                app.dashboardPage.cta.newProject.projectDescription.placeholder
              }
            />
          )}
        </AppField>

        <AppForm>
          <SubmitForm
            action={app.dashboardPage.cta.newProject.action}
            isPending={isPending}
            flex={{ sm: 1 }}
          />
        </AppForm>
      </sigil.form>
    </Dialog>
  );
};

export default CreateProject;
