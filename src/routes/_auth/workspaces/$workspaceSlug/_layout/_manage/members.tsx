import { Icon } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { LuCirclePlus } from "react-icons/lu";
import { z } from "zod";

import Page from "@/components/layout/Page";
import Members from "@/components/workspace/Members";
import MembershipFilters from "@/components/workspace/MembershipFilters";
import Owners from "@/components/workspace/Owners";
import { Role } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { isDevEnv } from "@/lib/config/env.config";
import { membersOptions } from "@/lib/options/members";
import { workspaceOptions } from "@/lib/options/workspaces";
import { DialogType } from "@/lib/store/useDialogStore";
import createMetaTags from "@/lib/util/createMetaTags";

const membersSearchSchema = z.object({
  search: z.string().default(""),
  roles: z.array(z.enum(Role)).default([]),
});

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/_layout/_manage/members",
)({
  validateSearch: membersSearchSchema,
  search: {
    middlewares: [stripSearchParams({ search: "", roles: [] })],
  },
  loaderDeps: ({ search }) => search,
  loader: async ({
    context: { queryClient, workspaceId, workspaceName },
    deps: { search, roles },
  }) => {
    await Promise.all([
      queryClient.ensureQueryData({
        ...membersOptions({ workspaceId, roles: [Role.Owner] }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData({
        ...membersOptions({
          workspaceId,
          roles,
          search,
          excludeRoles: [Role.Owner],
        }),
        revalidateIfStale: true,
      }),
    ]);

    return { workspaceName };
  },
  head: ({ loaderData }) => ({
    meta: createMetaTags({ title: `${loaderData?.workspaceName} Members` }),
  }),
  component: WorkspaceMembersPage,
});

function WorkspaceMembersPage() {
  const { workspaceSlug } = Route.useParams();
  const { role } = Route.useRouteContext();

  const { data: workspace } = useQuery({
    ...workspaceOptions({ name: workspaceSlug }),
    select: (data) => data.workspaceByName,
  });

  return (
    <Page
      header={{
        title: `${workspace?.name} ${app.workspaceMembersPage.breadcrumb}`,
        description: app.workspaceMembersPage.description,
        cta:
          // TODO: allow adding owners when transferring ownership is resolved. Restricting to single ownership for now.
          role === Role.Owner && isDevEnv
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

      <MembershipFilters />

      <Members />
    </Page>
  );
}
