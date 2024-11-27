"use client";

import { Text } from "@omnidev/sigil";
import { notFound } from "next/navigation";

import { Page } from "components/layout";
import { useAuth } from "lib/hooks";

interface Organization {
  /** Organization ID. */
  id: string;
  /** Organization name. */
  name: string;
  /** Organization type. */
  type: string;
}

const ALL_ORGANIZATIONS: Organization[] = [
  {
    id: "8af2410c-b73b-453f-a5c9-4637f5cbaffe",
    name: "Tech Innovators Inc.",
    type: "Technology",
  },
  {
    id: "c630fc16-1bb7-474f-9405-89401cce301a",
    name: "Green Future Solutions Green Future Solutions Green Future Solutions ",
    type: "Environmental Services Environmental Services Environmental Services",
  },
  {
    id: "aff499bc-516f-436c-9d87-2edfe1043061",
    name: "EduSpark Academy",
    type: "Education",
  },
  {
    id: "f13625fe-c2f9-47b7-a2b0-4e2073289122",
    name: "HealthPlus Clinics",
    type: "Healthcare",
  },
  {
    id: "99411095-e652-444a-a37c-5579dd15f463",
    name: "Urban Architects Co.",
    type: "Architecture",
  },
  {
    id: "4ee643e8-4290-4182-bd69-513f623a7415",
    name: "Creative Minds Studio",
    type: "Design",
  },
  {
    id: "076ccbba-de01-45db-b0fb-586553baaa8f",
    name: "MarketTrail Consulting",
    type: "Consulting",
  },
  {
    id: "1f7014fe-b766-4879-ae3e-f0e619397585",
    name: "Global Reach Logistics",
    type: "Logistics",
  },
  {
    id: "06157ff2-0959-4edc-87c5-5a6db8c551de",
    name: "Peak Performance Sports",
    type: "Sports Management",
  },
];

/**
 * Organizations overview page.
 */
const OrganizationsPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) notFound();

  return (
    <Page justify="center" align="center" h="full">
      <Text>Organizations</Text>
    </Page>
  );
};

export default OrganizationsPage;
