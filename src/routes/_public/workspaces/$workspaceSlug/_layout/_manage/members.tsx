import { Icon } from "@omnidev/sigil";
import { createFileRoute } from "@tanstack/react-router";
import { LuCirclePlus } from "react-icons/lu";

import Page from "@/components/layout/Page";
import Members from "@/components/workspace/Members";
import Owners from "@/components/workspace/Owners";
import app from "@/lib/config/app.config";
import { isDevEnv } from "@/lib/config/env.config";
import { organizationMembersOptions } from "@/lib/options/organizationMembers";
import { DialogType } from "@/lib/store/useDialogStore";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute(
  "/_public/workspaces/$workspaceSlug/_layout/_manage/members",
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

    return { workspaceName };
  },
  head: ({ loaderData }) => ({
    meta: createMetaTags({ title: `${loaderData?.workspaceName} Members` }),
  }),
  component: WorkspaceMembersPage,
});

function WorkspaceMembersPage() {
  const { role, workspaceName } = Route.useRouteContext();

  return (
    <Page
      header={{
        title: `${workspaceName} ${app.workspaceMembersPage.breadcrumb}`,
        description: app.workspaceMembersPage.description,
        cta:
          // TODO: allow adding owners when transferring ownership is resolved. Restricting to single ownership for now.
          role === "owner" && isDevEnv
            ? [
                {
                  label: app.workspaceMembersPage.cta.addOwner.label,
                  icon: <Icon src={LuCirclePlus} />,
                  dialogType: DialogType.AddOwner,
                },
              ]
            : undefined,
      }}
      pt={0}
    >
      <Owners />

      <Members />
    </Page>
  );
}
