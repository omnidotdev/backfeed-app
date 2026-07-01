import { ManageTeamLink } from "@omnidotdev/providers/react";
import { createFileRoute } from "@tanstack/react-router";
import { LuCirclePlus, LuUserPlus } from "react-icons/lu";

import Page from "@/components/layout/Page";
import { buttonVariants } from "@/components/ui/button";
import Members from "@/components/workspace/Members";
import PendingInvitations from "@/components/workspace/PendingInvitations";
import app from "@/lib/config/app.config";
import { AUTH_BASE_URL, isDevEnv } from "@/lib/config/env.config";
import organizationInvitationsOptions from "@/lib/options/organizationInvitations.options";
import { organizationMembersOptions } from "@/lib/options/organizationMembers";
import { isAdminOrOwner } from "@/lib/permissions";
import { DialogType } from "@/lib/store/useDialogStore";
import createMetaTags from "@/lib/util/createMetaTags";
import cn from "@/lib/utils";

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/_layout/_manage/members",
)({
  loader: async ({
    context: { queryClient, organizationId, workspaceName, session },
  }) => {
    // Prefetch organization members from Gatekeeper
    if (organizationId && session?.accessToken) {
      await queryClient.prefetchQuery({
        ...organizationMembersOptions({
          organizationId,
          accessToken: session.accessToken,
        }),
      });
    }

    // Prefetch pending invitations
    if (organizationId) {
      await queryClient.prefetchQuery({
        ...organizationInvitationsOptions({ organizationId }),
      });
    }

    return { workspaceName };
  },
  head: ({ loaderData }) => ({
    meta: createMetaTags({ title: `${loaderData?.workspaceName} Members` }),
  }),
  component: WorkspaceMembersPage,
});

function WorkspaceMembersPage() {
  const { role, workspaceName, workspaceLogo } = Route.useRouteContext();
  const { workspaceSlug } = Route.useParams();

  const ctaButtons = [];

  // TODO: allow adding owners when transferring ownership is resolved. Restricting to single ownership for now.
  if (role === "owner" && isDevEnv) {
    ctaButtons.push({
      label: app.workspaceMembersPage.cta.addOwner.label,
      icon: <LuCirclePlus />,
      dialogType: DialogType.AddOwner,
    });
  }

  return (
    <Page
      header={{
        breadcrumbs: [
          {
            label: workspaceName,
            image: workspaceLogo,
            to: "/workspaces/$workspaceSlug",
            params: { workspaceSlug },
          },
          { label: app.workspaceMembersPage.breadcrumb },
        ],
        title: `${workspaceName} ${app.workspaceMembersPage.breadcrumb}`,
        description: app.workspaceMembersPage.description,
        cta: ctaButtons.length > 0 ? ctaButtons : undefined,
      }}
    >
      {/* Team membership is managed centrally at Gatekeeper (the shared IDP);
          invite/role/remove happen there, not re-implemented per app */}
      {isAdminOrOwner(role) && workspaceSlug && AUTH_BASE_URL && (
        <div className="mb-4 flex justify-end">
          <ManageTeamLink
            identityBaseUrl={AUTH_BASE_URL}
            orgSlug={workspaceSlug}
            className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
          >
            <LuUserPlus className="h-4 w-4" />
            Manage team
          </ManageTeamLink>
        </div>
      )}

      <Members />

      <PendingInvitations />
    </Page>
  );
}
