"use client";

import { formOptions as tanstackFormOptions } from "@tanstack/react-form";
import { keepPreviousData } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useProjectQuery } from "generated/graphql";

import type { ProjectSocial } from "lib/constants";

const MAX_PROJECT_SOCIALS = 3;

const useProjectFormOptions = () => {
  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const { data: project } = useProjectQuery(
    {
      projectSlug,
      organizationSlug,
    },
    {
      placeholderData: keepPreviousData,
      select: (data) => data.projects?.nodes?.[0],
    },
  );

  const DEFAULT_PENDING_SOCIAL: ProjectSocial = {
    rowId: "pending",
    projectId: project?.rowId ?? "",
    url: "",
  };

  const formOptions = tanstackFormOptions({
    defaultValues: {
      name: project?.name ?? "",
      description: project?.description ?? "",
      website: project?.website ?? "",
      projectSocials: (project?.projectSocials?.nodes?.length
        ? project?.projectSocials?.nodes
        : [DEFAULT_PENDING_SOCIAL]) as ProjectSocial[],
      organizationSlug,
      currentSlug: project?.slug ?? "",
    },
  });

  return { formOptions, DEFAULT_PENDING_SOCIAL, MAX_PROJECT_SOCIALS };
};

export default useProjectFormOptions;
