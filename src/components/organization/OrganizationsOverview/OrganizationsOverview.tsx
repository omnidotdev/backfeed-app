"use client";

import { Icon } from "@omnidev/sigil";
import { LuCirclePlus } from "react-icons/lu";

import { Page } from "components/layout";
import {
  CreateOrganization,
  OrganizationFilters,
  OrganizationList,
} from "components/organization";
import { app } from "lib/config";
import { DialogType } from "store";

import type { BreadcrumbRecord } from "components/core";

const breadcrumbs: BreadcrumbRecord[] = [
  {
    label: app.organizationsPage.breadcrumb,
  },
];

/**
 * Organizations page overview.
 */
const OrganizationsOverview = () => (
  <Page
    breadcrumbs={breadcrumbs}
    header={{
      title: app.organizationsPage.header.title,
      cta: [
        {
          label: app.organizationsPage.header.cta.newOrganization.label,
          icon: <Icon src={LuCirclePlus} />,
          dialogType: DialogType.CreateOrganization,
        },
      ],
    }}
  >
    <OrganizationFilters />

    <OrganizationList />

    {/* dialogs */}
    <CreateOrganization />
  </Page>
);

export default OrganizationsOverview;
