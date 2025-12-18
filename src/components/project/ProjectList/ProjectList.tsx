"use client";

import { Pagination, Stack } from "@omnidev/sigil";
import { keepPreviousData } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { LuCirclePlus } from "react-icons/lu";

import { SkeletonArray } from "components/core";
import { EmptyState, ErrorBoundary } from "components/layout";
import { ProjectListItem } from "components/project";
import { useProjectsQuery } from "generated/graphql";
import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

import type { Project } from "generated/graphql";
import type { AuthUser } from "lib/util";

interface Props {
  /** Authenticated user. */
  user: AuthUser | undefined;
  /** Whether the user has necessary permissions to create projects. */
  canCreateProjects: boolean;
}

/**
 * Project list.
 */
const ProjectList = ({ user, canCreateProjects }: Props) => {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();

  const [{ page, pageSize, search }, setSearchParams] = useSearchParams();

  const { setIsOpen: setIsCreateProjectDialogOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const { data, isLoading, isError } = useProjectsQuery(
    {
      pageSize,
      offset: (page - 1) * pageSize,
      organizationSlug,
      search,
    },
    {
      placeholderData: keepPreviousData,
      select: (data) => ({
        totalCount: data?.projects?.totalCount,
        projects: data?.projects?.nodes,
      }),
    },
  );

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
            ? app.projectsPage.emptyState.organizationOwnerMessage
            : app.projectsPage.emptyState.organizationUserMessage
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
          <ProjectListItem
            key={project?.rowId}
            user={user}
            project={project as Project}
          />
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
        onPageChange={({ page }) => setSearchParams({ page })}
        mt={4}
      />
    </Stack>
  );
};

export default ProjectList;
