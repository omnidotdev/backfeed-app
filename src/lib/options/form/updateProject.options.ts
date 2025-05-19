import { formOptions } from "@tanstack/react-form";

import type { ProjectSocial } from "components/project";
import type { ProjectFragment } from "generated/graphql";

interface Options {
  project?: ProjectFragment;
}

const updateProjectFormOptions = ({ project }: Options = {}) => {
  const DEFAULT_PENDING_SOCIAL: ProjectSocial = {
    rowId: "pending",
    projectId: project?.rowId ?? "",
    url: "",
  };

  return formOptions({
    defaultValues: {
      name: project?.name ?? "",
      description: project?.description ?? "",
      website: project?.website ?? "",
      projectSocials: (project?.projectSocials?.nodes?.length
        ? project?.projectSocials?.nodes
        : [DEFAULT_PENDING_SOCIAL]) as ProjectSocial[],
      organizationSlug: project?.organization?.slug ?? "",
      currentSlug: project?.slug ?? "",
    },
  });
};

export default updateProjectFormOptions;
