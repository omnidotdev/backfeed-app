import {
  useLocation,
  useParams,
  useRouteContext,
} from "@tanstack/react-router";
import { useMemo } from "react";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuBuilding2 } from "react-icons/lu";

import {
  useOrganizationQuery,
  useProjectBySlugQuery,
} from "@/generated/graphql";
import app from "@/lib/config/app.config";

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
  const { session } = useRouteContext({ strict: false });
  const { organizationSlug, projectSlug } = useParams({ strict: false });
  const { pathname } = useLocation();

  const { data: organization } = useOrganizationQuery(
      {
        slug: organizationSlug!,
      },
      {
        enabled: !!session && !!organizationSlug,
        select: (data) => data?.organizationBySlug,
      },
    ),
    { data: project } = useProjectBySlugQuery(
      {
        slug: projectSlug!,
        organizationId: organization?.rowId ?? "",
      },
      {
        enabled: !!session && !!projectSlug && !!organization,
        select: (data) => data?.projectBySlugAndOrganizationId,
      },
    );

  const routes = useMemo<NavItem[]>(
    () => [
      {
        href: "/pricing",
        label: app.pricingPage.title,
        isVisible: true,
        isActive: pathname === "/pricing",
      },
      {
        label: app.organizationsPage.breadcrumb,
        icon: LuBuilding2,
        isCollapsible: true,
        isVisible: !!session,
        children: [
          {
            href: "/organizations",
            label: app.dashboardPage.cta.viewOrganizations.label,
            isVisible: true,
            isActive: pathname === "/organizations",
          },
          {
            href: `/organizations/${organizationSlug}`,
            label: organization?.name ?? organizationSlug!,
            isVisible: !!organizationSlug,
            isActive: pathname === `/organizations/${organizationSlug}`,
          },
          {
            label: app.projectsPage.breadcrumb,
            icon: HiOutlineFolder,
            isCollapsible: true,
            isVisible: !!session && !!organizationSlug,
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
                label: project?.name ?? projectSlug!,
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
    [session, organization, organizationSlug, pathname, project, projectSlug],
  );

  return routes.filter((route) => route.isVisible);
};

export default useSidebarNavigationItems;
