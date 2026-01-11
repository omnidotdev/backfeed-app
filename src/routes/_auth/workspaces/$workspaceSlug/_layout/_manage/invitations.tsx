import { Icon } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { FiUserPlus } from "react-icons/fi";

import Page from "@/components/layout/Page";
import Invitations from "@/components/workspace/Invitations";
import InviteMember from "@/components/workspace/InviteMember";
import { Role } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { invitationsOptions } from "@/lib/options/invitations";
import { workspaceOptions } from "@/lib/options/workspaces";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/_layout/_manage/invitations",
)({
  loader: async ({
    context: { queryClient, role, workspaceId, workspaceName },
  }) => {
    if (!role || role === Role.Member) throw notFound();

    await queryClient.ensureQueryData({
      ...invitationsOptions({ workspaceId }),
      revalidateIfStale: true,
    });

    return { workspaceName };
  },
  head: ({ loaderData }) => ({
    meta: createMetaTags({
      title: `${loaderData?.workspaceName} Invitations`,
    }),
  }),
  component: WorkspaceInvitationsPage,
});

function WorkspaceInvitationsPage() {
  const { workspaceSlug } = Route.useParams();

  const { data: workspace } = useQuery({
    ...workspaceOptions({ name: workspaceSlug }),
    select: (data) => data?.workspaceByName,
  });

  return (
    <Page
      header={{
        title: `${workspace?.name} ${app.workspaceInvitationsPage.breadcrumb}`,
        description: app.workspaceInvitationsPage.description,
        // TODO: re-enable when per-seat pricing is implemented
        cta: [
          {
            label: app.workspaceInvitationsPage.cta.inviteMember.title,
            icon: <Icon src={FiUserPlus} />,
            // dialogType: DialogType.InviteMember,
            variant: "outline",
            disabled: true,
            tooltip: app.info.comingSoon.label,
          },
        ],
      }}
      pt={0}
    >
      <Invitations />

      {/* dialogs */}
      <InviteMember />
    </Page>
  );
}
