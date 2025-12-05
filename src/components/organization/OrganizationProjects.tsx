import { Grid } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useRouteContext } from "@tanstack/react-router";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuCirclePlus } from "react-icons/lu";

import SkeletonArray from "@/components/core/SkeletonArray";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import SectionContainer from "@/components/layout/SectionContainer";
import ProjectCard from "@/components/organization/ProjectCard";
import app from "@/lib/config/app.config";
import { organizationOptions } from "@/lib/options/organizations";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

import type { Project } from "@/generated/graphql";

interface Props {
  /** Whether the user has necessary permissions to create projects. */
  canCreateProjects: boolean;
}

/**
 * Organization projects overview.
 */
const OrganizationProjects = ({ canCreateProjects }: Props) => {
  const { organizationSlug } = useParams({
    from: "/_auth/organizations/$organizationSlug",
  });
  const { hasAdminPrivileges } = useRouteContext({
    from: "/_auth/organizations/$organizationSlug/_layout/",
  });

  const { setIsOpen: setIsCreateProjectDialogOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    ...organizationOptions({
      slug: organizationSlug,
    }),
    select: (data) => data?.organizationBySlug?.projects?.nodes,
  });

  return (
    <SectionContainer
      title={app.organizationPage.projects.title}
      description={app.organizationPage.projects.description}
      icon={HiOutlineFolder}
    >
      {isError ? (
        <ErrorBoundary message="Error fetching projects" h={48} p={8} />
      ) : (
        <Grid
          maxH="md"
          overflow="auto"
          scrollbar="hidden"
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
                to="/organizations/$organizationSlug/projects/$projectSlug"
                params={{ organizationSlug, projectSlug: project?.slug! }}
                role="group"
              >
                <ProjectCard
                  project={project as Partial<Project>}
                  // ! NB: explicitly set the height of the card to prevent CLS issues with loading and error states.
                  h={48}
                />
              </Link>
            ))
          ) : (
            <EmptyState
              message={
                hasAdminPrivileges
                  ? app.organizationPage.projects.emptyState
                      .organizationOwnerMessage
                  : app.organizationPage.projects.emptyState
                      .organizationUserMessage
              }
              action={
                hasAdminPrivileges
                  ? {
                      label: app.organizationPage.projects.emptyState.cta.label,
                      icon: LuCirclePlus,
                      onClick: () => setIsCreateProjectDialogOpen(true),
                      disabled: !canCreateProjects,
                      tooltip: app.organizationPage.projects.emptyState.tooltip,
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

export default OrganizationProjects;
