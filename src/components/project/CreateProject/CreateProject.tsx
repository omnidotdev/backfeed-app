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
  useOrganizationsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { DEBOUNCE_TIME } from "lib/constants";
import { getSdk } from "lib/graphql";
import { useAuth, useForm, useOrganizationMembership } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { toaster } from "lib/util";
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

/** Schema for defining the shape of the create project form fields. */
const baseSchema = z.object({
  organizationId: z
    .string()
    .uuid(app.dashboardPage.cta.newProject.selectOrganization.error),
  name: z.string().min(3, app.dashboardPage.cta.newProject.projectName.error),
  description: z
    .string()
    .min(10, app.dashboardPage.cta.newProject.projectDescription.error),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      app.dashboardPage.cta.newProject.projectSlug.error.invalidFormat
    )
    .min(3, app.dashboardPage.cta.newProject.projectSlug.error.minLength)
    .max(50, app.dashboardPage.cta.newProject.projectSlug.error.maxLength),
});

/** Schema for validation of the create project form. */
const createProjectSchema = baseSchema.superRefine(
  async ({ organizationId, slug }, ctx) => {
    if (!organizationId.length || !slug.length) return z.NEVER;

    const sdk = await getSdk();

    const { projectBySlugAndOrganizationId } = await sdk.ProjectBySlug({
      organizationId,
      slug,
    });

    if (projectBySlugAndOrganizationId) {
      ctx.addIssue({
        code: "custom",
        message: app.dashboardPage.cta.newProject.projectSlug.error.duplicate,
        path: ["slug"],
      });
    }
  }
);

interface Props {
  /** Whether the user has a team tier subscription. */
  isTeamTier: boolean;
  /** Slug of the organization to create the project under. */
  organizationSlug?: string;
}

/**
 * Dialog for creating a new project.
 */
const CreateProject = ({ isTeamTier, organizationSlug }: Props) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { user } = useAuth();

  const { isOpen: isCreateOrganizationDialogOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const { data: organizations } = useOrganizationsQuery(
    {
      userId: user?.rowId!,
      isMember: true,
      slug: organizationSlug,
      excludeRoles: [Role.Member],
    },
    {
      enabled: !!user?.rowId,
      select: (data) =>
        data?.organizations?.nodes?.map((organization) => ({
          label: organization?.name,
          value: organization?.rowId,
          numberOfProjects: organization?.projects?.totalCount ?? 0,
        })),
    }
  );

  const firstOrganization = organizations?.[0];

  const { isAdmin } = useOrganizationMembership({
    organizationId: firstOrganization?.value,
    userId: user?.rowId,
  });

  const canCreateProject =
    isTeamTier || (firstOrganization && firstOrganization.numberOfProjects < 3);

  useHotkeys(
    "mod+p",
    () => {
      setIsOpen(!isOpen);
      reset();
    },
    {
      enabled:
        !!user &&
        !isCreateOrganizationDialogOpen &&
        // If the dialog is scoped to a specific organization, only allow the user to create projects in that organization if they are an admin and have the necessary permissions based on their subscription tier
        // TODO: handle case where project is *not* scoped to an organization
        (organizationSlug ? isAdmin && canCreateProject : true),
      // enabled even if a form field is focused. For available options, see: https://github.com/JohannesKlauss/react-hotkeys-hook?tab=readme-ov-file#api
      enableOnFormTags: true,
      // prevent default browser behavior on keystroke. NOTE: certain keystrokes are not preventable.
      preventDefault: true,
    },
    [
      user,
      isOpen,
      isCreateOrganizationDialogOpen,
      organizationSlug,
      isAdmin,
      canCreateProject,
    ]
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
      organizationId: organizationSlug ? (firstOrganization?.value ?? "") : "",
      name: "",
      description: "",
      slug: "",
    },
    asyncDebounceMs: DEBOUNCE_TIME,
    validators: {
      onChange: baseSchema,
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
                slug: value.slug,
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
                })
              )
            );

            router.push(
              `/${app.organizationsPage.breadcrumb.toLowerCase()}/${projectData.project?.organization?.slug}/${app.projectsPage.breadcrumb.toLowerCase()}/${projectData.project?.slug}`
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
        }
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
        <AppField name="organizationId">
          {({ SingularSelectField }) => (
            <SingularSelectField
              label={app.dashboardPage.cta.newProject.selectOrganization.label}
              placeholder="Select an organization"
              items={organizations ?? []}
              clearTriggerProps={{
                display: organizationSlug ? "none" : undefined,
              }}
              disabled={!!organizationSlug}
            />
          )}
        </AppField>

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

        <AppField name="slug">
          {({ InputField }) => (
            <InputField
              label={app.dashboardPage.cta.newProject.projectSlug.id}
              placeholder={
                app.dashboardPage.cta.newProject.projectSlug.placeholder
              }
            />
          )}
        </AppField>

        <AppForm>
          <SubmitForm
            action={app.dashboardPage.cta.newProject.action}
            isPending={isPending}
          />
        </AppForm>
      </sigil.form>
    </Dialog>
  );
};

export default CreateProject;
