import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy project settings path. Permanently redirects to the handle-based
 * project admin route behind the nested `~` sentinel per golden/URL-GRAMMAR.md.
 */
export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/projects/$projectSlug/settings",
)({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/@{$workspaceSlug}/$projectSlug/~/settings",
      params: {
        workspaceSlug: params.workspaceSlug,
        projectSlug: params.projectSlug,
      },
    });
  },
});
