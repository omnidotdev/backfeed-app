import { Divider, Stack } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

import DangerZoneAction from "@/components/core/DangerZoneAction";
import Page from "@/components/layout/Page";
import SectionContainer from "@/components/layout/SectionContainer";
import UpdateProject from "@/components/project/UpdateProject";
import { Role, useDeleteProjectMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { organizationsOptions } from "@/lib/options/organizations";
import { projectOptions } from "@/lib/options/projects";

import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";

const deleteProjectDetails = app.projectSettingsPage.cta.deleteProject;

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout/projects/$projectSlug/settings",
)({
  loader: async ({
    context: { queryClient },
    params: { organizationSlug, projectSlug },
  }) => {
    const { projects } = await queryClient.ensureQueryData(
      projectOptions({ organizationSlug, projectSlug }),
    );

    if (!projects?.nodes.length) throw notFound();
  },
  component: ProjectSettingsPage,
});

function ProjectSettingsPage() {
  const { session, queryClient } = Route.useRouteContext();
  const { organizationSlug, projectSlug } = Route.useParams();
  const navigate = Route.useNavigate();

  const { data: project } = useQuery({
    ...projectOptions({ organizationSlug, projectSlug }),
    select: (data) => data?.projects?.nodes?.[0],
  });

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.organizationsPage.breadcrumb,
      to: "/organizations",
    },
    {
      label: project?.organization?.name!,
      to: "/organizations/$organizationSlug",
      params: { organizationSlug },
    },
    {
      label: app.projectsPage.breadcrumb,
      to: "/organizations/$organizationSlug/projects",
      params: { organizationSlug },
    },
    {
      label: project?.name!,
      to: "/organizations/$organizationSlug/projects/$projectSlug",
      params: { organizationSlug, projectSlug },
    },
    {
      label: app.projectSettingsPage.breadcrumb,
    },
  ];

  const { mutate: deleteProject } = useDeleteProjectMutation({
    onMutate: () =>
      navigate({
        to: "/organizations/$organizationSlug/projects",
        replace: true,
      }),
    onSettled: () => {
      // ! NB: needed to invalidate the number of projects for an organization in the `CreateProject` dialog
      queryClient.invalidateQueries({
        queryKey: organizationsOptions({
          userId: session?.user.rowId!,
          isMember: true,
          slug: organizationSlug,
          excludeRoles: [Role.Member],
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
