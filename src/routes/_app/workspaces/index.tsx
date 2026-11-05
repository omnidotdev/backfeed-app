import { workspacesUrl } from "@omnidotdev/providers/react";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@omnidotdev/thornberry/avatar";
import {
  Link,
  createFileRoute,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuLayers, LuPlus, LuRefreshCw, LuTriangleAlert } from "react-icons/lu";

import { buttonVariants } from "@/components/ui/button";
import authClient from "@/lib/auth/authClient";
import { ACCOUNT_URL, BASE_URL } from "@/lib/config/env.config";
import { workspaceMetricsOptions } from "@/lib/options/workspaces";
import createMetaTags from "@/lib/util/createMetaTags";
import setSingularOrPlural from "@/lib/util/setSingularOrPlural";
import { fetchFreshSession, signOutLocal } from "@/server/functions/auth";
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
        to: "/@{$workspaceSlug}",
        params: { workspaceSlug: lastSlug },
      });
    }
  },
  // Re-hydrate workspaces live (bypassing the display cache) so a workspace just
  // created in the account portal shows on arrival, rather than waiting out
  // getAuth's org cache TTL. Invalidating the route re-runs this.
  loader: async () => {
    const { session, authDegraded } = await fetchFreshSession();
    return { organizations: session?.organizations ?? [], authDegraded };
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

/**
 * Workspaces list page.
 *
 * Lists the workspaces the user belongs to. Workspace creation and management
 * are funneled to the account hub (account.omni.dev/workspaces), the single
 * ecosystem surface that owns them, so this page lists and links out rather
 * than embedding its own creation flow.
 */
function WorkspacesPage() {
  const router = useRouter();
  const { organizations: workspaces, authDegraded } = Route.useLoaderData();

  // The account hub owns workspace creation; link out to it. Rendered only when
  // the hub URL is configured (optional env), so a missing config degrades to no
  // button rather than a dead link.
  const newWorkspaceHref = workspacesUrl(ACCOUNT_URL);

  // Refresh failed and we have nothing to show: prompt a re-login rather than
  // the create-workspace empty state the user cannot act on.
  if (!workspaces.length && authDegraded) {
    return (
      <div className="mx-auto flex h-full w-full max-w-4xl flex-col items-center gap-6 px-4 py-12">
        <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-300 border-dashed bg-gray-50 p-8 text-center dark:border-gray-600 dark:bg-gray-800">
          <LuTriangleAlert className="size-8 text-muted-foreground" />
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-foreground text-xl">
              Your session expired
            </h1>
            <p className="mx-auto max-w-sm text-muted-foreground text-sm">
              We could not refresh your session, so your workspaces could not be
              loaded. Sign in again to restore access.
            </p>
          </div>
          <button
            type="button"
            onClick={async () => {
              // The better-auth session is still valid (only the OAuth refresh
              // token is dead), so signing in with an active session just
              // bounces back to the callback without re-authorizing. Clear the
              // local session first so the OAuth redirect actually fires and
              // mints a fresh token family.
              try {
                await signOutLocal();
              } catch {
                // Proceed with re-auth even if local sign-out fails.
              }
              await authClient.signIn.social({
                provider: "omni",
                callbackURL: "/workspaces",
              });
            }}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 font-medium text-primary-foreground text-sm shadow-xs transition-colors hover:bg-primary/90"
          >
            Sign in again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col gap-8 px-4 py-12">
      <div className="flex flex-col items-center gap-4">
        <LuLayers className="size-12 text-muted-foreground" />
        <h1 className="text-center font-semibold text-2xl text-foreground">
          {workspaces.length
            ? "Select a workspace"
            : "Create a workspace to get started"}
        </h1>

        <div className="flex items-center gap-2">
          {!!workspaces.length && (
            <button
              type="button"
              aria-label="Refresh workspaces"
              title="Refresh workspaces"
              onClick={() => router.invalidate()}
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <LuRefreshCw className="size-4" />
            </button>
          )}
          {newWorkspaceHref && (
            <a href={newWorkspaceHref} className={buttonVariants()}>
              <LuPlus className="size-4" />
              {workspaces.length ? "New workspace" : "Create workspace"}
            </a>
          )}
        </div>

        <p className="max-w-sm text-center text-muted-foreground text-sm">
          A workspace is part of your Omni account and works across Omni
          products. Create and manage workspaces in your Omni account.
        </p>
      </div>

      {!!workspaces.length && (
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))]">
          {workspaces.map((org) => (
            <WorkspaceCard key={org.id} organization={org} />
          ))}
        </div>
      )}
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
      to="/@{$workspaceSlug}"
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

          <span className="line-clamp-2 min-w-0 break-words font-semibold text-[var(--colors-brand-primary-700)] dark:text-[var(--colors-brand-primary-400)]">
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
