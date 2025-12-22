import { Icon } from "@omnidev/sigil";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { LuCirclePlus } from "react-icons/lu";
import { z } from "zod";

import Page from "@/components/layout/Page";
import CreateOrganization from "@/components/organization/CreateOrganization";
import OrganizationFilters from "@/components/organization/OrganizationFilters";
import OrganizationList from "@/components/organization/OrganizationList";
import { OrganizationOrderBy } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { organizationsOptions } from "@/lib/options/organizations";
import { DialogType } from "@/lib/store/useDialogStore";
import seo from "@/lib/util/seo";

import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";

const breadcrumbs: BreadcrumbRecord[] = [
  {
    label: app.organizationsPage.breadcrumb,
  },
];

const organizationSearchSchema = z.object({
  page: z.number().nonnegative().default(1),
  pageSize: z.number().nonnegative().default(10),
  search: z.string().default(""),
});

export const Route = createFileRoute("/_auth/organizations/")({
  validateSearch: organizationSearchSchema,
  search: {
    middlewares: [stripSearchParams({ page: 1, pageSize: 10, search: "" })],
  },
  loaderDeps: ({ search }) => search,
  loader: async ({
    context: { queryClient },
    deps: { page, pageSize, search },
  }) => {
    await queryClient.ensureQueryData({
      ...organizationsOptions({
        pageSize,
        offset: (page - 1) * pageSize,
        orderBy: [OrganizationOrderBy.MembersCountDesc],
        search,
        isMember: false,
      }),
      revalidateIfStale: true,
    });
  },
  head: () => ({ meta: seo({ title: app.organizationsPage.breadcrumb }) }),
  component: OrganizationsPage,
});

function OrganizationsPage() {
  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: app.organizationsPage.header.title,
        cta: [
          {
            label: app.organizationsPage.header.cta.newOrganization.label,
            icon: <Icon src={LuCirclePlus} />,
            dialogType: DialogType.CreateOrganization,
          },
        ],
      }}
    >
      <OrganizationFilters />

      <OrganizationList />

      {/* dialogs */}
      <CreateOrganization />
    </Page>
  );
}
