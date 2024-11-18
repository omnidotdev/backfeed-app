import { app } from "lib/config";

import type { Metadata } from "next";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface MetadataParams {
  params: Promise<{ organizationId: string }>;
}

export const generateMetadata = async ({
  params,
}: MetadataParams): Promise<Metadata> => {
  const { organizationId } = await params;

  // TODO: Hook up when fething data here.
  // const organization: OrganizationQuery = await request({
  //   url: API_BASE_URL!,
  //   document: OrganizationDocument,
  //   variables: { slug } as OrganizationQueryVariables,
  // });

  return {
    title: `${organizationId} | ${app.name}`,
  };
};

const OrganizationLayout = ({ children }: Props) => children;

export default OrganizationLayout;
