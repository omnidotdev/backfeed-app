import { useQuery } from "@tanstack/react-query";
import {
  useLocation,
  useParams,
  useRouteContext,
} from "@tanstack/react-router";
import { useMemo } from "react";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuBuilding2 } from "react-icons/lu";

import app from "@/lib/config/app.config";
import { organizationOptions } from "@/lib/options/organizations";
import { projectOptions } from "@/lib/options/projects";

import type { LinkOptions } from "@tanstack/react-router";
import type { IconType } from "react-icons";

interface NavItem extends Omit<LinkOptions, "href"> {
  /** Label for the navigation item. */
  label: string;
  /** Whether the navigation item is visible. */
  isVisible: boolean;
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

  const { data: organization } = useQuery({
      ...organizationOptions({
        slug: organizationSlug!,
      }),
      enabled: !!session && !!organizationSlug,
      select: (data) => data?.organizationBySlug,
    }),
    { data: project } = useQuery({
      ...projectOptions({
        projectSlug: projectSlug!,
        organizationSlug: organizationSlug!,
      }),
      enabled: !!session && !!projectSlug && !!organization,
      select: (data) => data?.projects?.nodes[0],
    });

  const routes = useMemo<NavItem[]>(
    () => [
      {
        to: "/pricing",
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
            to: "/organizations",
            label: app.dashboardPage.cta.viewOrganizations.label,
            isVisible: true,
            isActive: pathname === "/organizations",
          },
          {
            to: "/organizations/$organizationSlug",
            params: { organizationSlug },
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
                to: "/organizations/$organizationSlug/projects",
                params: { organizationSlug },
                label: app.organizationPage.header.cta.viewProjects.label,
                isVisible: true,
                isActive:
                  pathname === `/organizations/${organizationSlug}/projects`,
              },
              {
                to: "/organizations/$organizationSlug/projects/$projectSlug",
                params: { organizationSlug, projectSlug },
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
