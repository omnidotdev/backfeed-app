import { request } from "graphql-request";

import { OrganizationDocument } from "generated/graphql";
import { API_BASE_URL, app } from "lib/config";

import type {
  OrganizationQuery,
  OrganizationQueryVariables,
} from "generated/graphql";
import type { Metadata } from "next";
import type { ReactNode } from "react";

interface MetadataParams {
  params: Promise<{ organization: string }>;
}

export const generateMetadata = async ({
  params,
}: MetadataParams): Promise<Metadata> => {
  const { organization: slug } = await params;

  const organization: OrganizationQuery = await request({
    url: API_BASE_URL!,
    document: OrganizationDocument,
    variables: { slug } as OrganizationQueryVariables,
  });

  return {
    title: `${organization.organizationBySlug?.name} | ${app.name}`,
  };
};

const OrganizationLayout = ({ children }: { children: ReactNode }) => children;

export default OrganizationLayout;
