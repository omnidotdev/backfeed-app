import { Pagination, Stack } from "@omnidev/sigil";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { LuCirclePlus } from "react-icons/lu";

import SkeletonArray from "@/components/core/SkeletonArray";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import ProjectListItem from "@/components/project/ProjectListItem";
import app from "@/lib/config/app.config";
import { projectsOptions } from "@/lib/options/projects";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

import type { Project } from "@/generated/graphql";

interface Props {
  /** Whether the user has necessary permissions to create projects. */
  canCreateProjects: boolean;
}

/**
 * Project list.
 */
const ProjectList = ({ canCreateProjects }: Props) => {
  const { workspaceSlug } = useParams({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/",
  });
  const { page, pageSize, search } = useSearch({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/",
  });
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
      workspaceSlug,
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
    return <ErrorBoundary message="Error fetching projects" minH={48} />;

  if (isLoading)
    return (
      <Stack>
        <SkeletonArray count={6} h={40} borderRadius="sm" />
      </Stack>
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
        minH={64}
      />
    );

  return (
    <Stack align="center" justify="space-between" h="100%">
      <Stack w="100%">
        {projects.map((project) => (
          <ProjectListItem key={project?.rowId} project={project as Project} />
        ))}
      </Stack>

      <Pagination
        ellipsisProps={{
          display: { base: "none", sm: "flex" },
        }}
        itemProps={{
          display: { base: "none", sm: "flex" },
        }}
        count={data?.totalCount ?? 0}
        pageSize={pageSize}
        defaultPage={page}
        onPageChange={({ page }) =>
          navigate({ search: (prev) => ({ ...prev, page }) })
        }
        mt={4}
      />
    </Stack>
  );
};

export default ProjectList;
