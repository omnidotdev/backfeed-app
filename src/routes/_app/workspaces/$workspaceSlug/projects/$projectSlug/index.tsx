import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy project path. Permanently redirects to the flat, handle-based project
 * route (`/@$workspaceSlug/$projectSlug`) per golden/URL-GRAMMAR.md.
 */
export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/projects/$projectSlug/",
)({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/@$workspaceSlug/$projectSlug",
      params: {
        workspaceSlug: params.workspaceSlug,
        projectSlug: params.projectSlug,
      },
    });
  },
});
