import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { z } from "zod";

import Page from "@/components/layout/Page";
import WorkspaceFilters from "@/components/workspace/WorkspaceFilters";
import WorkspaceList from "@/components/workspace/WorkspaceList";
import app from "@/lib/config/app.config";
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
  // Organizations come from JWT claims, no data fetching needed
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
      }}
    >
      <WorkspaceFilters />

      <WorkspaceList />
    </Page>
  );
}
