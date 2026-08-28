import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy workspace members path. Permanently redirects to the handle-based
 * admin route behind the `~` sentinel per golden/URL-GRAMMAR.md.
 */
export const Route = createFileRoute("/_app/workspaces/$workspaceSlug/members")(
  {
    beforeLoad: ({ params }) => {
      throw redirect({
        to: "/@{$workspaceSlug}/~/members",
        params: { workspaceSlug: params.workspaceSlug },
      });
    },
  },
);
