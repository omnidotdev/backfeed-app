import { Icon } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { FiUserPlus } from "react-icons/fi";

import Page from "@/components/layout/Page";
import Invitations from "@/components/organization/Invitations";
import InviteMember from "@/components/organization/InviteMember";
import { Role } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { invitationsOptions } from "@/lib/options/invitations";
import { organizationOptions } from "@/lib/options/organizations";
import { DialogType } from "@/lib/store/useDialogStore";
import seo from "@/lib/util/seo";

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout/_manage/invitations",
)({
  loader: async ({
    context: { queryClient, role, organizationId, organizationName },
  }) => {
    if (!role || role === Role.Member) throw notFound();

    await queryClient.ensureQueryData(invitationsOptions({ organizationId }));

    return { organizationName };
  },
  head: ({ loaderData }) => ({
    meta: seo({ title: `${loaderData?.organizationName} Invitations` }),
  }),
  component: OrganizationInvitationsPage,
});

function OrganizationInvitationsPage() {
  const { organizationSlug } = Route.useParams();

  const { data: organization } = useQuery({
    ...organizationOptions({ slug: organizationSlug }),
    select: (data) => data?.organizationBySlug,
  });

  return (
    <Page
      header={{
        title: `${organization?.name} ${app.organizationInvitationsPage.breadcrumb}`,
        description: app.organizationInvitationsPage.description,
        cta: [
          {
            label: app.organizationInvitationsPage.cta.inviteMember.title,
            icon: <Icon src={FiUserPlus} />,
            dialogType: DialogType.InviteMember,
            variant: "outline",
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
