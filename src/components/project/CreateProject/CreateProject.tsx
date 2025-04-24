"use client";

import { Dialog, sigil } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { z } from "zod";

import {
  Role,
  useCreatePostStatusMutation,
  useCreateProjectMutation,
  useOrganizationQuery,
  useOrganizationsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import {
  DEBOUNCE_TIME,
  MAX_NUMBER_OF_PROJECTS,
  projectDescriptionSchema,
  projectNameSchema,
  uuidSchema,
} from "lib/constants";
import { getSdk } from "lib/graphql";
import {
  useAuth,
  useForm,
  useOrganizationMembership,
  useViewportSize,
} from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { generateSlug, getAuthSession, toaster } from "lib/util";
import { DialogType } from "store";

// NB: colors need to be raw hex values (or other color formats). Can't extract this from `token` or other helpers as you would need to fetch the computed value at runtime. See: https://github.com/chakra-ui/panda/discussions/2200
const DEFAULT_POST_STATUSES = [
  {
    status: "Open",
    description: "Newly created",
    color: "#3b82f6",
    isDefault: true,
  },
  {
    status: "Planned",
    description: "Planned for future",
    color: "#a855f7",
  },
  {
    status: "In Progress",
    description: "Currently in progress",
    color: "#eab308",
  },
  {
    status: "Closed",
    description: "Not currently planned",
    color: "#ef4444",
  },
  {
    status: "Resolved",
    description: "Resolved request",
    color: "#22c55e",
  },
];

// TODO adjust schemas in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

/** Schema for defining the shape of the create project form fields, as well as validating the form. */
const createProjectSchema = z
  .object({
    isTeamTier: z.boolean(),
    organizationId: uuidSchema,
    name: projectNameSchema,
    description: projectDescriptionSchema,
  })
  .superRefine(async ({ isTeamTier, organizationId, name }, ctx) => {
    const session = await getAuthSession();

    const slug = generateSlug(name);

    if (!organizationId.length || !slug?.length || !session) return z.NEVER;

    const sdk = getSdk({ session });

    const [{ organizations }, { projectBySlugAndOrganizationId }] =
      await Promise.all([
        sdk.Organizations({
          organizationId,
        }),
        sdk.ProjectBySlug({
          organizationId,
          slug,
        }),
      ]);

    const numberOfProjects =
      organizations?.nodes?.[0]?.projects?.totalCount ?? 0;

    if (!isTeamTier && numberOfProjects >= MAX_NUMBER_OF_PROJECTS) {
      ctx.addIssue({
        code: "custom",
        message: app.dashboardPage.cta.newProject.organizationId.error.max,
        path: ["organizationId"],
      });
    }

    if (projectBySlugAndOrganizationId) {
      ctx.addIssue({
        code: "custom",
        message: app.dashboardPage.cta.newProject.projectSlug.error.duplicate,
        path: ["name"],
      });
    }
  });

interface Props {
  /** Whether the user has basic tier subscription permissions. */
  isBasicTier: boolean;
  /** Whether the user has team tier subscription permissions. */
  isTeamTier: boolean;
  /** Slug of the organization to create the project under. */
  organizationSlug: string;
}

/**
 * Dialog for creating a new project.
 */
const CreateProject = ({
  isBasicTier,
  isTeamTier,
  organizationSlug,
}: Props) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const isSmallViewport = useViewportSize({ minWidth: "40em" });

  const { user } = useAuth();

  const { isOpen: isCreateOrganizationDialogOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const { data: organization } = useOrganizationQuery(
    {
      slug: organizationSlug,
    },
    {
      enabled: !!user?.rowId,
      select: (data) => data?.organizationBySlug,
    },
  );

  const { isAdmin } = useOrganizationMembership({
    organizationId: organization?.rowId,
    userId: user?.rowId,
  });

  // NB: must be subscribed and have admin privileges. If the user has team tier privileges, enabled. Otherwise, check the number of projects for the organization
  const isCreateProjectEnabled =
    !!organization &&
    isBasicTier &&
    isAdmin &&
    (isTeamTier || organization?.projects.totalCount < MAX_NUMBER_OF_PROJECTS);

  useHotkeys(
    "mod+p",
    () => {
      setIsOpen(!isOpen);
      reset();
    },
    {
      enabled: !isCreateOrganizationDialogOpen && isCreateProjectEnabled,
      // enabled even if a form field is focused. For available options, see: https://github.com/JohannesKlauss/react-hotkeys-hook?tab=readme-ov-file#api
      enableOnFormTags: true,
      // prevent default browser behavior on keystroke. NOTE: certain keystrokes are not preventable.
      preventDefault: true,
    },
    [isOpen, isCreateOrganizationDialogOpen, isCreateProjectEnabled],
  );

  const { mutateAsync: createProject, isPending } = useCreateProjectMutation({
    onSettled: () => {
      // ! NB: needed to invalidate the number of projects for an organization
      queryClient.invalidateQueries({
        queryKey: useOrganizationsQuery.getKey({
          userId: user?.rowId!,
          isMember: true,
          slug: organizationSlug,
          excludeRoles: [Role.Member],
        }),
      });
    },
  });

  const { mutateAsync: createPostStatus } = useCreatePostStatusMutation();

  const { handleSubmit, AppField, AppForm, SubmitForm, reset } = useForm({
    defaultValues: {
      isTeamTier,
      organizationId: organization?.rowId ?? "",
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
            await Promise.all(
              DEFAULT_POST_STATUSES.map((status) =>
                createPostStatus({
                  input: {
                    postStatus: {
                      projectId: projectData.project?.rowId!,
                      status: status.status,
                      description: status.description,
                      color: status.color,
                      isDefault: status.isDefault,
                    },
                  },
                }),
              ),
            );

            router.push(
              `/${app.organizationsPage.breadcrumb.toLowerCase()}/${projectData.project?.organization?.slug}/${app.projectsPage.breadcrumb.toLowerCase()}/${projectData.project?.slug}`,
            );

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

  return (
    <Dialog
      title={app.dashboardPage.cta.newProject.label}
      description={app.dashboardPage.cta.newProject.description}
      open={isOpen}
      onOpenChange={({ open }) => {
        reset();
        setIsOpen(open);
      }}
      // TODO: adjust minW upstream in Sigil for mobile viewports
      contentProps={{
        style: {
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
