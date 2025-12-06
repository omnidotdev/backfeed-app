import { Icon } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { LuCirclePlus } from "react-icons/lu";
import { z } from "zod";

import Page from "@/components/layout/Page";
import Members from "@/components/organization/Members";
import MembershipFilters from "@/components/organization/MembershipFilters";
import Owners from "@/components/organization/Owners";
import { Role } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { isDevEnv } from "@/lib/config/env.config";
import { membersOptions } from "@/lib/options/members";
import { organizationOptions } from "@/lib/options/organizations";
import { DialogType } from "@/lib/store/useDialogStore";

const membersSearchSchema = z.object({
  search: z.string().default(""),
  roles: z.array(z.enum(Role)).default([]),
});

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout/_manage/members",
)({
  validateSearch: membersSearchSchema,
  search: {
    middlewares: [stripSearchParams({ search: "", roles: [] })],
  },
  loaderDeps: ({ search }) => search,
  loader: async ({
    context: { queryClient, organizationId },
    deps: { search, roles },
  }) => {
    await Promise.all([
      queryClient.ensureQueryData(
        membersOptions({ organizationId, roles: [Role.Owner] }),
      ),
      queryClient.ensureQueryData(
        membersOptions({
          organizationId,
          roles,
          search,
          excludeRoles: [Role.Owner],
        }),
      ),
    ]);
  },
  component: OrganizationMembersPage,
});

function OrganizationMembersPage() {
  const { organizationSlug } = Route.useParams();
  const { role } = Route.useRouteContext();

  const { data: organization } = useQuery({
    ...organizationOptions({ slug: organizationSlug }),
    select: (data) => data.organizationBySlug,
  });

  return (
    <Page
      header={{
        title: `${organization?.name} ${app.organizationMembersPage.breadcrumb}`,
        description: app.organizationMembersPage.description,
        cta:
          // TODO: allow adding owners when transferring ownership is resolved. Restricting to single ownership for now.
          role === Role.Owner && isDevEnv
            ? [
                {
                  label: app.organizationMembersPage.cta.addOwner.label,
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
