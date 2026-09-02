import { gatekeeperOrgManageUrl } from "@omnidotdev/providers/react";
import { createFileRoute } from "@tanstack/react-router";
import { LuExternalLink } from "react-icons/lu";

import Page from "@/components/layout/Page";
import { buttonVariants } from "@/components/ui/button";
import app from "@/lib/config/app.config";
import { ACCOUNT_URL } from "@/lib/config/env.config";
import createMetaTags from "@/lib/util/createMetaTags";
import cn from "@/lib/utils";

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/_layout/~/_manage/members",
)({
  loader: ({ context: { workspaceName } }) => ({ workspaceName }),
  head: ({ loaderData }) => ({
    meta: createMetaTags({ title: `${loaderData?.workspaceName} Members` }),
  }),
  component: WorkspaceMembersPage,
});

function WorkspaceMembersPage() {
  const { workspaceName, workspaceLogo } = Route.useRouteContext();
  const { workspaceSlug } = Route.useParams();

  const manageUrl = ACCOUNT_URL
    ? gatekeeperOrgManageUrl(ACCOUNT_URL, workspaceSlug)
    : undefined;

  return (
    <Page
      header={{
        breadcrumbs: [
          {
            label: workspaceName,
            image: workspaceLogo,
            to: "/@{$workspaceSlug}",
            params: { workspaceSlug },
          },
          { label: app.workspaceMembersPage.breadcrumb },
        ],
        title: `${workspaceName} ${app.workspaceMembersPage.breadcrumb}`,
        description: app.workspaceMembersPage.description,
      }}
    >
      {/* Team membership is managed centrally at Gatekeeper (the shared IDP);
          invite/role/remove happen there, not re-implemented per app */}
      <p className="text-muted-foreground">
        Team members and roles are managed in your Omni account, so they stay
        consistent across every Omni product you use.
      </p>

      {manageUrl && (
        <a
          href={manageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mt-4 w-fit gap-1.5",
          )}
        >
          <LuExternalLink className="size-4" />
          Manage members in Omni
        </a>
      )}
    </Page>
  );
}
