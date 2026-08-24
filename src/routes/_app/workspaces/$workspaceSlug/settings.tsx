import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy workspace settings path. Permanently redirects to the handle-based
 * admin route behind the `~` sentinel per golden/URL-GRAMMAR.md.
 */
export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/settings",
)({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/@$workspaceSlug/~/settings",
      params: { workspaceSlug: params.workspaceSlug },
    });
  },
});
