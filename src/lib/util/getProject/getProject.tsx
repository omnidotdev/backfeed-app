import { request } from "graphql-request";

import { API_BASE_URL } from "lib/config";
import { ProjectDocument } from "generated/graphql";

import type { ProjectQuery, ProjectQueryVariables } from "generated/graphql";

const getProject = async (projectId: string): Promise<ProjectQuery> =>
  request({
    url: API_BASE_URL!,
    document: ProjectDocument,
    variables: { rowId: projectId } as ProjectQueryVariables,
  });

export default getProject;
