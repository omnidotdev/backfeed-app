"use client";

import { Pagination, Stack } from "@omnidev/sigil";
import { keepPreviousData } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { LuPlusCircle } from "react-icons/lu";

import { SkeletonArray } from "components/core";
import { EmptyState, ErrorBoundary } from "components/layout";
import { ProjectListItem } from "components/project";
import { useProjectsQuery } from "generated/graphql";
import { app } from "lib/config";
import { useDebounceValue, useSearchParams } from "lib/hooks";

import type { Project } from "generated/graphql";

// TODO: remove once ownership check is implemented
const IS_ORGANIZATION_OWNER = Math.random() < 0.5;

/**
 * Project list.
 */
const ProjectList = () => {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();

  const [{ page, pageSize, search }, setSearchParams] = useSearchParams();

  const [debouncedSearch] = useDebounceValue({ value: search });

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
          IS_ORGANIZATION_OWNER
            ? app.projectsPage.emptyState.organizationOwnerMessage
            : app.projectsPage.emptyState.organizationUserMessage
        }
        action={
          IS_ORGANIZATION_OWNER
            ? {
                label: app.projectsPage.emptyState.cta.label,
                icon: LuPlusCircle,
                actionProps: {
                  variant: "outline",
                  color: "brand.primary",
                  borderColor: "brand.primary",
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
        {projects.map((project, index) => (
          <ProjectListItem
            key={project?.rowId}
            project={project as Project}
            index={index}
          />
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
