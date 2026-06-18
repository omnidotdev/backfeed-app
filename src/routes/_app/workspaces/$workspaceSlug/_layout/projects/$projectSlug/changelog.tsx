import { createFileRoute, notFound } from "@tanstack/react-router";

import Page from "@/components/layout/Page";
import Changelog from "@/components/project/Changelog";
import { BASE_URL } from "@/lib/config/env.config";
import { changelogOptions } from "@/lib/options/changelog";
import { projectOptions } from "@/lib/options/projects";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/changelog",
)({
  loader: async ({
    context: { session, queryClient, organizationId },
    params: { projectSlug },
  }) => {
    const { projects } = await queryClient.ensureQueryData({
      ...projectOptions({ organizationId, projectSlug }),
      revalidateIfStale: true,
    });

    if (!projects?.nodes.length) throw notFound();

    const project = projects.nodes[0]!;

    // gate private boards for unauthenticated visitors (public boards are shareable)
    if (!project.isPublic && !session?.user) throw notFound();

    // the changelog is a per-project toggle; a hidden changelog 404s for everyone
    if (project.showChangelog === false) throw notFound();

    await queryClient.ensureInfiniteQueryData({
      ...changelogOptions(project.rowId),
      revalidateIfStale: true,
    });

    return { projectName: project.name, projectId: project.rowId };
  },
  head: ({ loaderData, params }) => ({
    meta: loaderData
      ? createMetaTags({
          title: `${loaderData.projectName} Changelog`,
          url: `${BASE_URL}/workspaces/${params.workspaceSlug}/projects/${params.projectSlug}/changelog`,
          image: `${BASE_URL}/api/og/project/${params.workspaceSlug}/${params.projectSlug}`,
        })
      : undefined,
  }),
  component: ChangelogPage,
});

function ChangelogPage() {
  const { workspaceSlug, projectSlug } = Route.useParams();
  const { projectId, projectName } = Route.useLoaderData();
  const { workspaceName, workspaceLogo } = Route.useRouteContext();

  return (
    <Page
      header={{
        breadcrumbs: [
          {
            label: workspaceName,
            image: workspaceLogo,
            to: "/workspaces/$workspaceSlug",
            params: { workspaceSlug },
          },
          {
            label: projectName,
            to: "/workspaces/$workspaceSlug/projects/$projectSlug",
            params: { workspaceSlug, projectSlug },
          },
          { label: "Changelog" },
        ],
        title: `${projectName} Changelog`,
        description: "Recently shipped, newest first.",
      }}
    >
      <Changelog projectId={projectId} />
    </Page>
  );
}
