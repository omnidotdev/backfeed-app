import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy feedback-item path. Permanently redirects to the handle-based item
 * route per golden/URL-GRAMMAR.md; the canonical PREFIX-NUMBER key resolves on
 * arrival.
 */
export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/projects/$projectSlug/$feedbackId",
)({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/@{$workspaceSlug}/$projectSlug/$feedbackId",
      params: {
        workspaceSlug: params.workspaceSlug,
        projectSlug: params.projectSlug,
        feedbackId: params.feedbackId,
      },
    });
  },
});
