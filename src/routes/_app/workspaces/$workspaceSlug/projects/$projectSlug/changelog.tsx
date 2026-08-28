import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy changelog path. Permanently redirects to the handle-based project
 * changelog route per golden/URL-GRAMMAR.md.
 */
export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/projects/$projectSlug/changelog",
)({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/@{$workspaceSlug}/$projectSlug/changelog",
      params: {
        workspaceSlug: params.workspaceSlug,
        projectSlug: params.projectSlug,
      },
    });
  },
});
