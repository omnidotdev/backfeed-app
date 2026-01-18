import { Divider, Stack } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import DangerZoneAction from "@/components/core/DangerZoneAction";
import Page from "@/components/layout/Page";
import SectionContainer from "@/components/layout/SectionContainer";
import UpdateProject from "@/components/project/UpdateProject";
import {
  useDeleteProjectMutation,
  useProjectsQuery,
} from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { projectOptions } from "@/lib/options/projects";
import createMetaTags from "@/lib/util/createMetaTags";

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
        organizationId,
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
  const { queryClient, organizationId } = Route.useRouteContext();
  const { projectSlug } = Route.useParams();
  const navigate = Route.useNavigate();

  const { data: project } = useQuery({
    ...projectOptions({
      organizationId,
      projectSlug,
    }),
    select: (data) => data?.projects?.nodes?.[0],
  });

  const { mutate: deleteProject } = useDeleteProjectMutation({
    onMutate: () =>
      navigate({
        to: "/workspaces/$workspaceSlug/projects",
        replace: true,
      }),
    onSettled: () => {
      // Invalidate project queries to refresh project count
      // Use partial queryKey to match all Projects queries for this org
      queryClient.invalidateQueries({
        queryKey: useProjectsQuery.getKey({ organizationId } as never),
      });
      queryClient.invalidateQueries({
        queryKey: ["Projects"],
      });
    },
  });

  return (
    <Page
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
              triggerProps: {
                variant: "outline",
                size: "sm",
                color: "omni.ruby",
                borderColor: "omni.ruby",
                backgroundColor: "transparent",
              },
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
