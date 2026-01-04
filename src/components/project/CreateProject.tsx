import { Dialog, sigil } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";
import { useIsClient } from "usehooks-ts";
import { z } from "zod";

import { Role, useCreateProjectMutation } from "@/generated/graphql";
import { token } from "@/generated/panda/tokens";
import app from "@/lib/config/app.config";
import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";
import {
  projectDescriptionSchema,
  projectNameSchema,
  uuidSchema,
} from "@/lib/constants/schema.constant";
import getSdk from "@/lib/graphql/getSdk";
import useForm from "@/lib/hooks/useForm";
import useViewportSize from "@/lib/hooks/useViewportSize";
import { workspaceOptions, workspacesOptions } from "@/lib/options/workspaces";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import generateSlug from "@/lib/util/generateSlug";
import toaster from "@/lib/util/toaster";
import { fetchSession } from "@/server/functions/auth";

// TODO adjust schemas in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create project form fields, as well as validating the form. */
const createProjectSchema = z
  .object({
    workspaceId: uuidSchema,
    name: projectNameSchema,
    description: projectDescriptionSchema,
  })
  .superRefine(async ({ workspaceId, name }, ctx) => {
    const { session } = await fetchSession();

    const slug = generateSlug(name);

    if (!workspaceId.length || !slug?.length || !session) return z.NEVER;

    const sdk = await getSdk();

    const { projectBySlugAndWorkspaceId } = await sdk.ProjectBySlug({
      workspaceId,
      slug,
    });

    if (projectBySlugAndWorkspaceId) {
      ctx.addIssue({
        code: "custom",
        message: app.dashboardPage.cta.newProject.projectSlug.error.duplicate,
        path: ["name"],
      });
    }
  });

interface Props {
  /** Slug of the workspace to create the project under. */
  workspaceSlug: string;
}

/**
 * Dialog for creating a new project.
 */
const CreateProject = ({ workspaceSlug }: Props) => {
  const { session, queryClient } = useRouteContext({
    from: "/_auth/workspaces/$workspaceSlug/_layout",
  });
  const navigate = useNavigate();

  const isClient = useIsClient();

  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

  const { isOpen: isCreateWorkspaceDialogOpen } = useDialogStore({
    type: DialogType.CreateWorkspace,
  });

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const { data: workspace } = useQuery({
    ...workspaceOptions({
      slug: workspaceSlug,
    }),
    enabled: !!session?.user?.rowId,
    select: (data) => data?.workspaceBySlug,
  });

  useHotkeys(
    "mod+p",
    () => {
      setIsOpen(!isOpen);
      reset();
    },
    {
      enabled: !isCreateWorkspaceDialogOpen && !!workspace,
      // enabled even if a form field is focused. For available options, see: https://github.com/JohannesKlauss/react-hotkeys-hook?tab=readme-ov-file#api
      enableOnFormTags: true,
      // prevent default browser behavior on keystroke. NOTE: certain keystrokes are not preventable.
      preventDefault: true,
    },
    [isOpen, isCreateWorkspaceDialogOpen, workspace],
  );

  const { mutateAsync: createProject, isPending } = useCreateProjectMutation({
    onSettled: () => {
      // ! NB: needed to invalidate the number of projects for a workspace
      queryClient?.invalidateQueries({
        queryKey: workspacesOptions({
          userId: session?.user?.rowId!,
          isMember: true,
          slug: workspaceSlug,
          excludeRoles: [Role.Member],
        }).queryKey,
      });
    },
  });

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      workspaceId: workspace?.rowId ?? "",
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
          // NB: status templates are now workspace-level, so projects automatically
          // inherit them. No need to create per-project statuses.
          const { createProject: projectData } = await createProject({
            input: {
              project: {
                name: value.name,
                description: value.description,
                slug: generateSlug(value.name)!,
                workspaceId: value.workspaceId,
              },
            },
          });

          if (projectData) {
            navigate({
              to: "/workspaces/$workspaceSlug/projects/$projectSlug",
              params: {
                workspaceSlug: projectData.project?.workspace?.slug!,
                projectSlug: projectData.project?.slug!,
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
