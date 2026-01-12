import { Icon } from "@omnidev/sigil";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { LuCirclePlus } from "react-icons/lu";
import { z } from "zod";

import Page from "@/components/layout/Page";
import CreateWorkspace from "@/components/workspace/CreateWorkspace";
import WorkspaceFilters from "@/components/workspace/WorkspaceFilters";
import WorkspaceList from "@/components/workspace/WorkspaceList";
import { WorkspaceOrderBy } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { workspacesOptions } from "@/lib/options/workspaces";
import { DialogType } from "@/lib/store/useDialogStore";
import createMetaTags from "@/lib/util/createMetaTags";

import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";

const breadcrumbs: BreadcrumbRecord[] = [
  {
    label: app.workspacesPage.breadcrumb,
  },
];

const workspaceSearchSchema = z.object({
  page: z.number().nonnegative().default(1),
  pageSize: z.number().nonnegative().default(10),
  search: z.string().default(""),
});

export const Route = createFileRoute("/_public/workspaces/")({
  validateSearch: workspaceSearchSchema,
  search: {
    middlewares: [stripSearchParams({ page: 1, pageSize: 10, search: "" })],
  },
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps: { page, pageSize } }) => {
    await queryClient.ensureQueryData({
      ...workspacesOptions({
        pageSize,
        offset: (page - 1) * pageSize,
        orderBy: [WorkspaceOrderBy.MembersCountDesc],
        isMember: false,
      }),
      revalidateIfStale: true,
    });
  },
  head: () => ({
    meta: createMetaTags({ title: app.workspacesPage.breadcrumb }),
  }),
  component: WorkspacesPage,
});

function WorkspacesPage() {
  const { session } = Route.useRouteContext();
  const isAuthenticated = !!session?.user?.rowId;

  return (
    <Page
      breadcrumbs={isAuthenticated ? breadcrumbs : undefined}
      header={{
        title: app.workspacesPage.header.title,
        cta: isAuthenticated
          ? [
              {
                label: app.workspacesPage.header.cta.newWorkspace.label,
                icon: <Icon src={LuCirclePlus} />,
                dialogType: DialogType.CreateWorkspace,
              },
            ]
          : undefined,
      }}
    >
      <WorkspaceFilters />

      <WorkspaceList />

      {/* dialogs */}
      {isAuthenticated && <CreateWorkspace />}
    </Page>
  );
}
