import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { LuCirclePlus } from "react-icons/lu";

import SkeletonArray from "@/components/core/SkeletonArray";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import ProjectListItem from "@/components/project/ProjectListItem";
import { Pagination } from "@/components/ui/pagination";
import app from "@/lib/config/app.config";
import { projectsOptions } from "@/lib/options/projects";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

import type { Project } from "@/generated/graphql";

const projectsRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/",
);

interface Props {
  /** Whether the user has necessary permissions to create projects. */
  canCreateProjects: boolean;
}

/**
 * Project list.
 */
const ProjectList = ({ canCreateProjects }: Props) => {
  const { organizationId } = projectsRoute.useRouteContext();
  const { workspaceSlug } = projectsRoute.useParams();
  const { page, pageSize, search } = projectsRoute.useSearch();
  const navigate = useNavigate({
    from: "/workspaces/$workspaceSlug/projects",
  });

  const { setIsOpen: setIsCreateProjectDialogOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const { data, isLoading, isError } = useQuery({
    ...projectsOptions({
      pageSize,
      offset: (page - 1) * pageSize,
      organizationId,
      search,
    }),
    placeholderData: keepPreviousData,
    select: (data) => ({
      totalCount: data?.projects?.totalCount,
      projects: data?.projects?.nodes,
    }),
  });

  const projects = data?.projects;

  if (isError)
    return (
      <ErrorBoundary message="Error fetching projects" className="min-h-48" />
    );

  if (isLoading)
    return (
      <div className="flex flex-col gap-2">
        <SkeletonArray count={6} className="h-40 rounded-sm" />
      </div>
    );

  if (!projects?.length)
    return (
      <EmptyState
        message={
          canCreateProjects
            ? app.projectsPage.emptyState.workspaceOwnerMessage
            : app.projectsPage.emptyState.workspaceUserMessage
        }
        action={
          canCreateProjects
            ? {
                label: app.projectsPage.emptyState.cta.label,
                icon: LuCirclePlus,
                onClick: () => setIsCreateProjectDialogOpen(true),
              }
            : undefined
        }
        className="min-h-64"
      />
    );

  return (
    <div className="flex h-full flex-col items-center justify-between gap-2">
      <div className="flex w-full flex-col gap-2">
        {projects.map((project) => (
          <ProjectListItem
            key={project?.rowId}
            project={project as Project}
            workspaceSlug={workspaceSlug}
          />
        ))}
      </div>

      <Pagination
        className="mt-4"
        ellipsisClassName="hidden sm:flex"
        itemClassName="hidden sm:flex"
        count={data?.totalCount ?? 0}
        pageSize={pageSize}
        defaultPage={page}
        onPageChange={({ page }) =>
          navigate({ search: (prev) => ({ ...prev, page }) })
        }
      />
    </div>
  );
};

export default ProjectList;
