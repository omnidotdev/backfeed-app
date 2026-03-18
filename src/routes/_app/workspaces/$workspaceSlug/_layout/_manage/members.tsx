import { Icon } from "@omnidev/sigil";
import { createFileRoute } from "@tanstack/react-router";
import { LuCirclePlus, LuUserPlus } from "react-icons/lu";

import Page from "@/components/layout/Page";
import InviteMemberDialog from "@/components/workspace/InviteMemberDialog";
import Members from "@/components/workspace/Members";
import Owners from "@/components/workspace/Owners";
import PendingInvitations from "@/components/workspace/PendingInvitations";
import app from "@/lib/config/app.config";
import { isDevEnv } from "@/lib/config/env.config";
import organizationInvitationsOptions from "@/lib/options/organizationInvitations.options";
import { organizationMembersOptions } from "@/lib/options/organizationMembers";
import { isAdminOrOwner } from "@/lib/permissions";
import { DialogType } from "@/lib/store/useDialogStore";
import createMetaTags from "@/lib/util/createMetaTags";

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
  const { role, workspaceName } = Route.useRouteContext();

  const ctaButtons = [];

  if (isAdminOrOwner(role)) {
    ctaButtons.push({
      label: "Invite Member",
      icon: <Icon src={LuUserPlus} />,
      dialogType: DialogType.InviteMember,
    });
  }

  // TODO: allow adding owners when transferring ownership is resolved. Restricting to single ownership for now.
  if (role === "owner" && isDevEnv) {
    ctaButtons.push({
      label: app.workspaceMembersPage.cta.addOwner.label,
      icon: <Icon src={LuCirclePlus} />,
      dialogType: DialogType.AddOwner,
    });
  }

  return (
    <Page
      header={{
        title: `${workspaceName} ${app.workspaceMembersPage.breadcrumb}`,
        description: app.workspaceMembersPage.description,
        cta: ctaButtons.length > 0 ? ctaButtons : undefined,
      }}
      pt={0}
    >
      <Owners />

      <Members />

      <PendingInvitations />

      <InviteMemberDialog />
    </Page>
  );
}
