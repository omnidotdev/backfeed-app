import { request } from "graphql-request";

import { OrganizationDocument } from "generated/graphql";
import app from "lib/config/app.config";
import { API_BASE_URL } from "lib/config/env.config";

import type {
  OrganizationQuery,
  OrganizationQueryVariables,
} from "generated/graphql";
import type { Metadata } from "next";
import type { ReactNode } from "react";

interface MetadataParams {
  params: { organization: string };
}

export const generateMetadata = async ({
  params,
}: MetadataParams): Promise<Metadata> => {
  const slug = params.organization;

  const organization: OrganizationQuery = await request({
    url: API_BASE_URL!,
    document: OrganizationDocument,
    variables: { slug } as OrganizationQueryVariables,
  });

  return {
    title: `${organization.findUniqueOrganization?.name} | ${app.name}`,
  };
};

const OrganizationLayout = ({ children }: { children: ReactNode }) => children;

export default OrganizationLayout;
