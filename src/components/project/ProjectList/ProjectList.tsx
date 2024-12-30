"use client";

import { Pagination, Stack } from "@omnidev/sigil";
import { keepPreviousData } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { SkeletonArray } from "components/core";
import { ErrorBoundary } from "components/layout";
import { ProjectListItem } from "components/project";
import { useProjectsQuery } from "generated/graphql";
import { useDebounceValue, useSearchParams } from "lib/hooks";

import type { Project } from "generated/graphql";

/**
 * Project list.
 * TODO: apply either infinite scroll or pagination for the list once data fetching is implemented.
 */
const ProjectList = () => {
  const { organizationId } = useParams<{ organizationId: string }>();

  const [{ page, pageSize, search }, setSearchParams] = useSearchParams();

  const [debouncedSearch] = useDebounceValue({ value: search });

  const { data, isLoading, isError } = useProjectsQuery(
    {
      pageSize,
      offset: (page - 1) * pageSize,
      organizationId,
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

  if (isError)
    return <ErrorBoundary message="Error fetching projects" minH={48} />;

  if (isLoading)
    return (
      <Stack>
        <SkeletonArray count={6} h={40} borderRadius="sm" />
      </Stack>
    );

  return (
    <Stack align="center" justify="space-between" h="100%">
      <Stack w="100%">
        {data?.projects?.map((project, index) => (
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
