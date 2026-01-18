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
 * Custom hook to generate sidebar navigation items based on authentication state, current route, and available workspace/project data.
 */
const useSidebarNavigationItems = () => {
  const { session } = useRouteContext({ from: "__root__" });
  const { workspaceSlug, projectSlug } = useParams({ strict: false });
  const { pathname } = useLocation();

  // workspaceSlug in the URL is the org slug from JWT claims
  // Resolve it to organizationId to query projects
  const orgFromSlug = session?.organizations?.find(
    (org) => org.slug === workspaceSlug,
  );
  const organizationId = orgFromSlug?.id;
  // Use org name from JWT claims
  const workspaceName = orgFromSlug?.name ?? workspaceSlug;

  const { data: project } = useQuery({
    ...projectOptions({
      projectSlug: projectSlug!,
      organizationId: organizationId!,
    }),
    enabled: !!session && !!projectSlug && !!organizationId,
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
        label: app.workspacesPage.breadcrumb,
        icon: LuBuilding2,
        isCollapsible: true,
        isVisible: !!session,
        children: [
          {
            to: "/workspaces/$workspaceSlug",
            params: { workspaceSlug },
            label: workspaceName!,
            isVisible: !!workspaceSlug,
            isActive: pathname === `/workspaces/${workspaceSlug}`,
          },
          {
            label: app.projectsPage.breadcrumb,
            icon: HiOutlineFolder,
            isCollapsible: true,
            isVisible: !!session && !!workspaceSlug,
            children: [
              {
                to: "/workspaces/$workspaceSlug/projects",
                params: { workspaceSlug },
                label: app.workspacePage.header.cta.viewProjects.label,
                isVisible: true,
                isActive: pathname === `/workspaces/${workspaceSlug}/projects`,
              },
              {
                to: "/workspaces/$workspaceSlug/projects/$projectSlug",
                params: { workspaceSlug, projectSlug },
                label: project?.name ?? projectSlug!,
                isVisible: !!projectSlug,
                isActive:
                  pathname ===
                  `/workspaces/${workspaceSlug}/projects/${projectSlug}`,
              },
            ],
          },
        ],
      },
    ],
    [session, workspaceSlug, pathname, project, projectSlug, workspaceName],
  );

  return routes.filter((route) => route.isVisible);
};

export default useSidebarNavigationItems;
