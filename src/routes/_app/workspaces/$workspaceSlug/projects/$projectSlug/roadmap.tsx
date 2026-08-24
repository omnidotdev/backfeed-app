import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy roadmap path. Permanently redirects to the handle-based project
 * roadmap route per golden/URL-GRAMMAR.md.
 */
export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/projects/$projectSlug/roadmap",
)({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/@$workspaceSlug/$projectSlug/roadmap",
      params: {
        workspaceSlug: params.workspaceSlug,
        projectSlug: params.projectSlug,
      },
    });
  },
});
