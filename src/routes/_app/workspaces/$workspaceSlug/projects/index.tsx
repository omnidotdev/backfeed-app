import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy projects-list path. The handle home (`/@$workspaceSlug`) now lists
 * projects, so this permanently redirects there per golden/URL-GRAMMAR.md.
 */
export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/projects/",
)({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/@$workspaceSlug",
      params: { workspaceSlug: params.workspaceSlug },
    });
  },
});
