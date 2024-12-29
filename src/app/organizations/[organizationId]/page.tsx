import request from "graphql-request";
import { notFound } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuPlusCircle } from "react-icons/lu";

import { Page } from "components/layout";
import { OrganizationOverview } from "components/organization";
import { OrganizationDocument } from "generated/graphql";
import { API_BASE_URL, app } from "lib/config";
import { getAuthSession } from "lib/util";

import type {
  OrganizationQuery,
  OrganizationQueryVariables,
} from "generated/graphql";
import type { Metadata } from "next";

const fetchOrganization = async (
  organizationId: string
): Promise<OrganizationQuery> =>
  request({
    url: API_BASE_URL!,
    document: OrganizationDocument,
    variables: { rowId: organizationId } as OrganizationQueryVariables,
  });

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { organizationId } = await params;

  const { organization } = await fetchOrganization(organizationId);

  return {
    title: `${organization?.name} | ${app.name}`,
  };
};

interface Props {
  /** Organization page params. */
  params: Promise<{ organizationId: string }>;
}

/**
 * Organization overview page.
 */
const OrganizationPage = async ({ params }: Props) => {
  const { organizationId } = await params;

  const [session, { organization }] = await Promise.all([
    getAuthSession(),
    fetchOrganization(organizationId),
  ]);

  if (!session || !organization) notFound();

  return (
    <Page
      header={{
        title: organization.name!,
        description: app.organizationPage.header.description,
        cta: [
          {
            label: app.organizationPage.header.cta.viewAllProjects.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <HiOutlineFolder />,
            variant: "outline",
            // TODO: add href upon merge of https://github.com/omnidotdev/backfeed-app/pull/39
          },
          {
            label: app.organizationPage.header.cta.newProject.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuPlusCircle />,
          },
        ],
      }}
    >
      <OrganizationOverview organizationId={organizationId} />
    </Page>
  );
};

export default OrganizationPage;
