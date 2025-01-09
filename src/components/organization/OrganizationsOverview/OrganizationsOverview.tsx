"use client";

import { Suspense } from "react";
import { LuPlusCircle } from "react-icons/lu";

import { Page } from "components/layout";
import { OrganizationFilters, OrganizationList } from "components/organization";
import { app } from "lib/config";
import { DialogType, useDialogStore } from "lib/hooks";

const breadcrumbs = [
  {
    label: app.organizationsPage.breadcrumb,
  },
];

/**
 * Organizations overview.
 */
const OrganizationsOverview = () => {
  const { setIsOpen: setIsCreateOrganizationDialogOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: app.organizationsPage.header.title,
        description: app.organizationsPage.header.description,
        cta: [
          {
            label: app.organizationsPage.header.cta.newOrganization.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuPlusCircle />,
            onClick: () => setIsCreateOrganizationDialogOpen(true),
          },
        ],
      }}
    >
      {/* // ! NB: wrapped in a suspense boundary to avoid opting entire page into CSR. See: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
      <Suspense fallback={null}>
        <OrganizationFilters />

        <OrganizationList />
      </Suspense>
    </Page>
  );
};

export default OrganizationsOverview;
