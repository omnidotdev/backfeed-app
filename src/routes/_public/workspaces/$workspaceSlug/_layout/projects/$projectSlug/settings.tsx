import { Divider, Stack } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import DangerZoneAction from "@/components/core/DangerZoneAction";
import Page from "@/components/layout/Page";
import SectionContainer from "@/components/layout/SectionContainer";
import UpdateProject from "@/components/project/UpdateProject";
import { useDeleteProjectMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { projectOptions } from "@/lib/options/projects";
import { workspacesOptions } from "@/lib/options/workspaces";
import createMetaTags from "@/lib/util/createMetaTags";

import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";

const deleteProjectDetails = app.projectSettingsPage.cta.deleteProject;

export const Route = createFileRoute(
  "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/settings",
)({
  beforeLoad: async ({ context: { session }, location }) => {
    // Settings requires authentication
    if (!session?.user?.rowId) {
      throw redirect({
        to: "/",
        search: { returnTo: location.href },
      });
    }
  },
  loader: async ({
    context: { queryClient, organizationId },
    params: { projectSlug },
  }) => {
    const { projects } = await queryClient.ensureQueryData({
      ...projectOptions({
        workspaceOrganizationId: organizationId,
        projectSlug,
      }),
      revalidateIfStale: true,
    });

    if (!projects?.nodes.length) throw notFound();

    return { projectName: projects.nodes[0]?.name };
  },
  head: ({ loaderData }) => ({
    meta: createMetaTags({ title: `${loaderData?.projectName} Settings` }),
  }),
  component: ProjectSettingsPage,
});

function ProjectSettingsPage() {
  const { queryClient, organizationId, workspaceName } =
    Route.useRouteContext();
  const { workspaceSlug, projectSlug } = Route.useParams();
  const navigate = Route.useNavigate();

  const { data: project } = useQuery({
    ...projectOptions({
      workspaceOrganizationId: organizationId,
      projectSlug,
    }),
    select: (data) => data?.projects?.nodes?.[0],
  });

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.workspacesPage.breadcrumb,
      to: "/workspaces",
    },
    {
      label: workspaceName,
      to: "/workspaces/$workspaceSlug",
      params: { workspaceSlug },
    },
    {
      label: app.projectsPage.breadcrumb,
      to: "/workspaces/$workspaceSlug/projects",
      params: { workspaceSlug },
    },
    {
      label: project?.name!,
      to: "/workspaces/$workspaceSlug/projects/$projectSlug",
      params: { workspaceSlug, projectSlug },
    },
    {
      label: app.projectSettingsPage.breadcrumb,
    },
  ];

  const { mutate: deleteProject } = useDeleteProjectMutation({
    onMutate: () =>
      navigate({
        to: "/workspaces/$workspaceSlug/projects",
        replace: true,
      }),
    onSettled: () => {
      // Invalidate workspace queries to refresh project count
      queryClient.invalidateQueries({
        queryKey: workspacesOptions({
          organizationId,
        }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: ["Projects"],
      });
    },
  });

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: `${project?.name!} Settings`,
      }}
    >
      <Stack gap={6}>
        <UpdateProject />

        <SectionContainer
          title={app.projectSettingsPage.dangerZone.title}
          description={app.projectSettingsPage.dangerZone.description}
          outline="1px solid"
          outlineColor="omni.ruby"
        >
          <Divider />

          <DangerZoneAction
            title={deleteProjectDetails.title}
            description={deleteProjectDetails.description}
            actionProps={{
              title: deleteProjectDetails.destructiveAction.title,
              description: deleteProjectDetails.destructiveAction.description,
              triggerLabel: deleteProjectDetails.destructiveAction.actionLabel,
              destructiveInput: deleteProjectDetails.destructiveAction.prompt,
              action: {
                label: deleteProjectDetails.destructiveAction.actionLabel,
                onClick: () => deleteProject({ rowId: project?.rowId! }),
              },
            }}
          />
        </SectionContainer>
      </Stack>
    </Page>
  );
}
