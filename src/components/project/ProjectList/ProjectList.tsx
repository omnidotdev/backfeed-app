"use client";

import { Pagination, Stack } from "@omnidev/sigil";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { LuCirclePlus } from "react-icons/lu";

import { SkeletonArray } from "components/core";
import { EmptyState, ErrorBoundary } from "components/layout";
import { ProjectListItem } from "components/project";
import { app } from "lib/config";
import { useAuth, useOrganizationMembership, useSearchParams } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { projectsQueryOptions } from "lib/react-query/options";
import { DialogType } from "store";

import type { Organization, Project } from "generated/graphql";

interface Props {
  /** Organization ID. */
  organizationId: Organization["rowId"];
}

/**
 * Project list.
 */
const ProjectList = ({ organizationId }: Props) => {
  const { user } = useAuth();

  const { organizationSlug } = useParams<{ organizationSlug: string }>();

  const { isOwner } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId: organizationId,
  });

  const [{ page, pageSize, search }, setSearchParams] = useSearchParams();

  const { setIsOpen: setIsCreateProjectDialogOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const { data, isLoading, isError } = useQuery({
    ...projectsQueryOptions({
      pageSize,
      offset: (page - 1) * pageSize,
      organizationSlug,
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
                  onMouseDown: () => setIsCreateProjectDialogOpen(true),
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
        // @ts-ignore: TODO: fix prop definition upstream (omit `index`)
        ellipsisProps={{
          display: { base: "none", sm: "flex" },
        }}
        // @ts-ignore: TODO: fix prop definition upstream (omit `type` and `value`)
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
