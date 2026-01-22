import { Grid } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuCirclePlus } from "react-icons/lu";

import SkeletonArray from "@/components/core/SkeletonArray";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import SectionContainer from "@/components/layout/SectionContainer";
import ProjectCard from "@/components/workspace/ProjectCard";
import app from "@/lib/config/app.config";
import { workspaceOptions } from "@/lib/options/workspaces";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

import type { Project } from "@/generated/graphql";

const workspaceLayoutRoute = getRouteApi(
  "/_public/workspaces/$workspaceSlug/_layout/",
);

interface Props {
  /** Whether the user has necessary permissions to create projects. */
  canCreateProjects: boolean;
}

/**
 * Workspace projects overview.
 */
const WorkspaceProjects = ({ canCreateProjects }: Props) => {
  const { workspaceSlug } = workspaceLayoutRoute.useParams();
  const { hasAdminPrivileges, organizationId } =
    workspaceLayoutRoute.useRouteContext();

  const { setIsOpen: setIsCreateProjectDialogOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    ...workspaceOptions({
      organizationId,
    }),
    select: (data) => data?.projects?.nodes,
  });

  return (
    <SectionContainer
      title={app.workspacePage.projects.title}
      description={app.workspacePage.projects.description}
      icon={HiOutlineFolder}
    >
      {isError ? (
        <ErrorBoundary message="Error fetching projects" h={48} p={8} />
      ) : (
        <Grid
          // NB: The padding is necessary to prevent clipping of the card borders/box shadows
          p="1px"
          gap={6}
          columns={{
            base: 1,
            md: isLoading
              ? 2
              : projects?.length
                ? Math.min(2, projects.length)
                : 1,
          }}
        >
          {isLoading ? (
            <SkeletonArray count={6} h={48} borderRadius="lg" w="100%" />
          ) : projects?.length ? (
            projects?.map((project) => (
              <Link
                key={project?.rowId}
                to="/workspaces/$workspaceSlug/projects/$projectSlug"
                params={{ workspaceSlug, projectSlug: project?.slug! }}
                role="group"
              >
                <ProjectCard
                  project={project as Partial<Project>}
                  // NB: min height ensures consistent card sizing while allowing growth for longer content
                  minH={48}
                />
              </Link>
            ))
          ) : (
            <EmptyState
              message={
                hasAdminPrivileges
                  ? app.workspacePage.projects.emptyState.workspaceOwnerMessage
                  : app.workspacePage.projects.emptyState.workspaceUserMessage
              }
              action={
                hasAdminPrivileges
                  ? {
                      label: app.workspacePage.projects.emptyState.cta.label,
                      icon: LuCirclePlus,
                      onClick: () => setIsCreateProjectDialogOpen(true),
                      disabled: !canCreateProjects,
                      tooltip: app.workspacePage.projects.emptyState.tooltip,
                    }
                  : undefined
              }
              h={48}
            />
          )}
        </Grid>
      )}
    </SectionContainer>
  );
};

export default WorkspaceProjects;
