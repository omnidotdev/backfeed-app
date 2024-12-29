import { notFound } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuPlusCircle } from "react-icons/lu";

import { Page } from "components/layout";
import { OrganizationOverview } from "components/organization";
import { app } from "lib/config";
import { getAuthSession } from "lib/util";

interface Props {
  /** Organization page params. */
  params: Promise<{ organizationId: string }>;
}

/**
 * Organization overview page.
 */
const OrganizationPage = async ({ params }: Props) => {
  const { organizationId } = await params;

  const session = await getAuthSession();

  // TODO: when data is streamed in, this condition should be updated to check for the existence of the organization
  if (!session) notFound();

  return (
    <Page
      header={{
        title: organizationId,
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
      <OrganizationOverview />
    </Page>
  );
};

export default OrganizationPage;
