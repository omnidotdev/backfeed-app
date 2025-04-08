"use client";

import { Grid } from "@omnidev/sigil";
import { useSuspenseQuery } from "@tanstack/react-query";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuCirclePlus } from "react-icons/lu";

import { Link } from "components/core";
import { EmptyState, ErrorBoundary, SectionContainer } from "components/layout";
import { ProjectCard } from "components/organization";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { organizationQueryOptions } from "lib/react-query/options";
import { DialogType } from "store";

import type { Organization, Project } from "generated/graphql";

interface Props {
  /** Organization slug. */
  organizationSlug: Organization["slug"];
}

/**
 * Organization projects overview.
 */
const OrganizationProjects = ({ organizationSlug }: Props) => {
  const { isLoading: isAuthLoading } = useAuth();

  const { setIsOpen: setIsCreateProjectDialogOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const { data: projects, isError } = useSuspenseQuery({
    ...organizationQueryOptions({
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
            md: projects?.length ? Math.min(2, projects.length) : 1,
          }}
        >
          {projects?.length ? (
            projects?.map((project) => (
              <Link
                key={project?.rowId}
                href={`/organizations/${organizationSlug}/projects/${project?.slug}`}
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
              message={app.organizationPage.projects.emptyState.message}
              action={{
                label: app.organizationPage.projects.emptyState.cta.label,
                icon: LuCirclePlus,
                actionProps: {
                  variant: "outline",
                  color: "brand.primary",
                  borderColor: "brand.primary",
                  onMouseDown: () => setIsCreateProjectDialogOpen(true),
                  disabled: isAuthLoading,
                },
              }}
              h={48}
            />
          )}
        </Grid>
      )}
    </SectionContainer>
  );
};

export default OrganizationProjects;
