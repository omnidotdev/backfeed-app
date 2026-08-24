import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy workspace path. Permanently redirects to the handle-based home
 * (`/@$workspaceSlug`) per golden/URL-GRAMMAR.md, so old bookmarks survive.
 */
export const Route = createFileRoute("/_app/workspaces/$workspaceSlug/")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/@$workspaceSlug",
      params: { workspaceSlug: params.workspaceSlug },
    });
  },
});
