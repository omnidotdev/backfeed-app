import { request } from "graphql-request";

import { API_BASE_URL } from "lib/config";
import { OrganizationDocument } from "generated/graphql";

import type {
  OrganizationQuery,
  OrganizationQueryVariables,
} from "generated/graphql";

const getOrganization = async (
  organizationId: string
): Promise<OrganizationQuery> =>
  request({
    url: API_BASE_URL!,
    document: OrganizationDocument,
    variables: { rowId: organizationId } as OrganizationQueryVariables,
  });

export default getOrganization;
