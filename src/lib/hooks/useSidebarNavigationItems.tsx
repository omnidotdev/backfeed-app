"use client";

import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuBuilding2 } from "react-icons/lu";

import { useOrganizationQuery, useProjectBySlugQuery } from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type { IconType } from "react-icons";

interface NavItem {
  /** The navigation item label. */
  label: string;
  /** Whether the navigation item is visible. */
  isVisible: boolean;
  /** The navigation item href. */
  href?: string;
  /** Whether the navigation item is active. */
  isActive?: boolean;
  /** Whether the navigation item is collapsible. */
  isCollapsible?: boolean;
  /** The navigation item children. */
  children?: NavItem[];
  /** The navigation item icon. */
  icon?: IconType;
}

/**
 * Custom hook to generate sidebar navigation items based on authentication state, current route, and available organization/project data.
 */
const useSidebarNavigationItems = () => {
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
        enabled: isAuthenticated && !!organizationSlug,
        select: (data) => data?.organizationBySlug,
      },
    ),
    { data: project } = useProjectBySlugQuery(
      {
        slug: projectSlug,
        organizationId: organization?.rowId ?? "",
      },
      {
        enabled: isAuthenticated && !!projectSlug && !!organization,
        select: (data) => data?.projectBySlugAndOrganizationId,
      },
    );

  const routes = useMemo<NavItem[]>(
    () => [
      {
        href: "/pricing",
        label: app.pricingPage.title,
        isVisible: !isAuthenticated,
        isActive: pathname === "/pricing",
      },
      {
        label: app.organizationsPage.breadcrumb,
        icon: LuBuilding2,
        isCollapsible: true,
        isVisible: isAuthenticated,
        children: [
          {
            href: "/organizations",
            label: app.dashboardPage.cta.viewOrganizations.label,
            isVisible: true,
            isActive: pathname === "/organizations",
          },
          {
            href: `/organizations/${organizationSlug}`,
            label: organization?.name ?? organizationSlug,
            isVisible: !!organizationSlug,
            isActive: pathname === `/organizations/${organizationSlug}`,
          },
          {
            label: app.projectsPage.breadcrumb,
            icon: HiOutlineFolder,
            isCollapsible: true,
            isVisible: isAuthenticated && !!organizationSlug,
            children: [
              {
                href: `/organizations/${organizationSlug}/projects`,
                label: app.organizationPage.header.cta.viewProjects.label,
                isVisible: true,
                isActive:
                  pathname === `/organizations/${organizationSlug}/projects`,
              },
              {
                href: `/organizations/${organizationSlug}/projects/${projectSlug}`,
                label: project?.name ?? projectSlug,
                isVisible: !!projectSlug,
                isActive:
                  pathname ===
                  `/organizations/${organizationSlug}/projects/${projectSlug}`,
              },
            ],
          },
        ],
      },
    ],
    [
      isAuthenticated,
      organization,
      organizationSlug,
      pathname,
      project,
      projectSlug,
    ],
  );

  return routes.filter((route) => route.isVisible);
};

export default useSidebarNavigationItems;
