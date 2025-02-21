"use client";

import { Pagination, Stack } from "@omnidev/sigil";
import { keepPreviousData } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { LuCirclePlus } from "react-icons/lu";

import { SkeletonArray } from "components/core";
import { EmptyState, ErrorBoundary } from "components/layout";
import { ProjectListItem } from "components/project";
import { useOrganizationQuery, useProjectsQuery } from "generated/graphql";
import { app } from "lib/config";
import {
  useAuth,
  useDebounceValue,
  useOrganizationMembership,
  useSearchParams,
} from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

import type { Project } from "generated/graphql";

/**
 * Project list.
 */
const ProjectList = () => {
  const { user } = useAuth();

  const { organizationSlug } = useParams<{ organizationSlug: string }>();

  const { data: organizationId } = useOrganizationQuery(
    {
      slug: organizationSlug,
    },
    {
      select: (data) => data?.organizationBySlug?.rowId,
    }
  );

  const { isOwner } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId: organizationId,
  });

  const [{ page, pageSize, search }, setSearchParams] = useSearchParams();

  const [debouncedSearch] = useDebounceValue({ value: search });

  const { setIsOpen: setIsCreateProjectDialogOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const { data, isLoading, isError } = useProjectsQuery(
    {
      pageSize,
      offset: (page - 1) * pageSize,
      organizationSlug,
      search: debouncedSearch,
    },
    {
      placeholderData: keepPreviousData,
      select: (data) => ({
        totalCount: data?.projects?.totalCount,
        projects: data?.projects?.nodes,
      }),
    }
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
          isOwner
            ? app.projectsPage.emptyState.organizationOwnerMessage
            : app.projectsPage.emptyState.organizationUserMessage
        }
        action={
          isOwner
            ? {
                label: app.projectsPage.emptyState.cta.label,
                icon: LuCirclePlus,
                actionProps: {
                  variant: "outline",
                  color: "brand.primary",
                  borderColor: "brand.primary",
                  onClick: () => setIsCreateProjectDialogOpen(true),
                },
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
