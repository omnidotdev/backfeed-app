"use client";

import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

import { useOrganizationQuery, useProjectBySlugQuery } from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

interface Route {
  /** The route href. */
  href: string;
  /** The route label. */
  label: string;
  /** Whether the route is visible. */
  isVisible: boolean;
  /** Whether the route is active. */
  isActive: boolean;
}

const useRoutes = () => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const { data: organization } = useOrganizationQuery(
      {
        slug: organizationSlug,
      },
      {
        enabled: !!organizationSlug,
        select: (data) => data?.organizationBySlug,
      }
    ),
    { data: project } = useProjectBySlugQuery(
      {
        slug: projectSlug,
        organizationId: organization?.rowId ?? "",
      },
      {
        enabled: !!projectSlug,
        select: (data) => data?.projectBySlugAndOrganizationId,
      }
    );

  const routes = useMemo<Route[]>(
    () => [
      {
        href: "/",
        label: app.breadcrumb,
        isVisible: pathname !== "/",
        isActive: pathname === "/",
      },
      {
        href: "/pricing",
        label: app.pricingPage.title,
        isVisible: !isAuthenticated,
        isActive: pathname === "/pricing",
      },
      {
        href: "/organizations",
        label: app.organizationsPage.breadcrumb,
        isVisible: isAuthenticated,
        isActive: pathname === "/organizations",
      },
      {
        href: `/organizations/${organizationSlug}`,
        label: organization?.name ?? organizationSlug,
        isVisible: isAuthenticated && !!organizationSlug,
        isActive: pathname === `/organizations/${organizationSlug}`,
      },
      {
        href: `/organizations/${organizationSlug}/projects`,
        label: app.projectsPage.breadcrumb,
        isVisible: isAuthenticated && !!organizationSlug,
        isActive: pathname === `/organizations/${organizationSlug}/projects`,
      },
      {
        href: `/organizations/${organizationSlug}/projects/${projectSlug}`,
        label: project?.name ?? projectSlug,
        isVisible: isAuthenticated && !!organizationSlug && !!projectSlug,
        isActive:
          pathname ===
          `/organizations/${organizationSlug}/projects/${projectSlug}`,
      },
    ],
    [
      isAuthenticated,
      organization,
      organizationSlug,
      pathname,
      project,
      projectSlug,
    ]
  );

  return routes.filter((route) => route.isVisible);
};

export default useRoutes;
