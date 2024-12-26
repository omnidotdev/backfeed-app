import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LuPlusCircle } from "react-icons/lu";

import { Page } from "components/layout";
import { OrganizationFilters, OrganizationList } from "components/organization";
import { app } from "lib/config";
import { getAuthSession } from "lib/util";

/**
 * Organizations overview page.
 */
const OrganizationsPage = async () => {
  const session = await getAuthSession();

  if (!session) notFound();

  return (
    <Page
      header={{
        title: app.organizationsPage.header.title,
        description: app.organizationsPage.header.description,
        cta: [
          {
            label: app.organizationsPage.header.cta.newOrganization.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuPlusCircle />,
          },
        ],
      }}
    >
      {/* // ! NB: wrapped in a suspense boundary to avoid opting entire page into CSR. See: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
      <Suspense>
        <OrganizationFilters />

        <OrganizationList />
      </Suspense>
    </Page>
  );
};

export default OrganizationsPage;
