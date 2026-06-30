import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuExternalLink, LuInfo, LuLayers } from "react-icons/lu";

import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@/components/ui/avatar";
import { AUTH_BASE_URL, BASE_URL } from "@/lib/config/env.config";
import { workspaceMetricsOptions } from "@/lib/options/workspaces";
import createMetaTags from "@/lib/util/createMetaTags";
import setSingularOrPlural from "@/lib/util/setSingularOrPlural";
import { useOrganization } from "@/providers/OrganizationProvider";
import {
  getLastWorkspaceCookie,
  setLastWorkspaceCookie,
} from "@/server/functions/lastWorkspace";

import type { OrganizationClaim } from "@/lib/auth/getAuth";

export const Route = createFileRoute("/_app/workspaces/")({
  beforeLoad: async ({ context: { session }, location, preload }) => {
    if (!session?.user?.rowId) {
      throw redirect({
        to: "/",
        search: { returnTo: location.href },
      });
    }

    const organizations = session?.organizations ?? [];
    if (!organizations.length) return;

    const lastSlug = await getLastWorkspaceCookie();
    // skip the last-workspace redirect during preload (hover) so hovering a
    // /workspaces link doesn't auto-navigate; real navigation still redirects
    if (
      !preload &&
      lastSlug &&
      organizations.some((org) => org.slug === lastSlug)
    ) {
      throw redirect({
        to: "/workspaces/$workspaceSlug",
        params: { workspaceSlug: lastSlug },
      });
    }
  },
  head: () => ({
    meta: [
      ...createMetaTags({
        title: "Workspaces",
        description:
          "Create a new workspace, or select a current one to view details.",
        url: `${BASE_URL}/workspaces`,
      }),
    ],
  }),
  component: WorkspacesPage,
});

function WorkspacesPage() {
  const orgContext = useOrganization();
  const organizations = orgContext?.organizations ?? [];

  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col gap-8 px-4 py-12">
      <div className="flex flex-col items-center gap-4">
        <LuLayers className="size-12 text-muted-foreground" />
        <h1 className="text-center font-semibold text-2xl text-foreground">
          {organizations.length
            ? "Select a workspace"
            : "Create a workspace to get started"}
        </h1>
      </div>

      {!!organizations.length && (
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))]">
          {organizations.map((org) => (
            <WorkspaceCard key={org.id} organization={org} />
          ))}
        </div>
      )}

      <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-300 border-dashed bg-gray-50 p-8 text-center dark:border-gray-600 dark:bg-gray-800">
        <LuInfo className="size-6 text-gray-500" />
        <div className="flex flex-col gap-2">
          <p className="text-gray-700 text-sm dark:text-gray-300">
            Workspaces are currently managed via Omni Organizations.
          </p>
          <p className="text-gray-500 text-xs">
            This experience will be improved soon.
          </p>
        </div>
        <a
          href={AUTH_BASE_URL}
          className="inline-flex items-center gap-2 text-blue-500 text-sm"
        >
          Manage Organizations
          <LuExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

function WorkspaceCard({ organization }: { organization: OrganizationClaim }) {
  const { queryClient } = Route.useRouteContext();

  const metricsData = queryClient.getQueryData(
    workspaceMetricsOptions({ organizationId: organization.id }).queryKey,
  );
  const projectCount =
    (metricsData as { projects?: { totalCount?: number } })?.projects
      ?.totalCount ?? 0;

  return (
    <Link
      to="/workspaces/$workspaceSlug"
      params={{ workspaceSlug: organization.slug! }}
      onClick={() => setLastWorkspaceCookie({ data: organization.slug! })}
      preload="intent"
    >
      <div className="flex h-32 w-full cursor-pointer flex-col justify-between rounded-xl border border-[var(--colors-neutral-200)] bg-[var(--colors-card-item)] p-4 transition-all hover:bg-[var(--colors-neutral-100)] dark:border-[var(--colors-neutral-800)] dark:hover:bg-[var(--colors-neutral-800)]">
        <div className="flex items-center gap-3">
          <AvatarRoot size="sm" className="shrink-0">
            <AvatarImage
              src={organization.logo ?? undefined}
              alt={organization.name}
            />
            <AvatarFallback className="font-semibold uppercase">
              {organization.name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </AvatarRoot>

          <span className="min-w-0 break-words font-semibold text-[var(--colors-brand-primary-700)] dark:text-[var(--colors-brand-primary-400)]">
            {organization.name}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <HiOutlineFolder className="size-5 text-foreground-subtle" />
          <span className="text-foreground-subtle text-sm tabular-nums">
            {projectCount}{" "}
            {setSingularOrPlural({ value: projectCount, label: "project" })}
          </span>
        </div>
      </div>
    </Link>
  );
}
