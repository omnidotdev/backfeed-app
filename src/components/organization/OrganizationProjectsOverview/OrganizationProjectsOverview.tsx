"use client";

import { Grid } from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";

import { SkeletonArray } from "components/core";
import { ErrorBoundary, SectionContainer } from "components/layout";
import { ProjectCard } from "components/organization";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";

interface OrganizationProject {
  /** Organization ID. */
  id: string;
  /** Organization name. */
  name: string;
  /** Organization description. */
  description: string;
}

const PROJECTS: OrganizationProject[] = [
  {
    id: "1",
    name: "Mobile App Feedback",
    description:
      "We are actively gathering detailed user feedback for our iOS and Android applications to enhance user experience and functionality. This includes identifying key pain points, usability issues, and feature requests from our diverse user base. Our primary focus is on improving app performance, refining navigation flows, and introducing user-driven features that align with customer needs. Additionally, we are seeking feedback on visual design updates and accessibility improvements to ensure the app meets the highest standards for all users. This project is crucial for maintaining our competitive edge in the mobile app market and fostering customer loyalty.",
  },
  {
    id: "2",
    name: "Web Platform Beta",
    description: "Beta testing feedback for the new web platform",
  },
  {
    id: "3",
    name: "Desktop Client",
    description: "User experience feedback for desktop applications",
  },
  {
    id: "4",
    name: "E-commerce Platform Upgrade",
    description:
      "Feedback for the upgraded e-commerce platform features and user flow.",
  },
  {
    id: "5",
    name: "AI Chatbot Testing",
    description: "Testing and collecting responses for our AI chatbot.",
  },
  {
    id: "6",
    name: "Enterprise CRM Feedback",
    description: "Gathering feedback on our enterprise CRM system.",
  },
];

/**
 * Organization projects overview.
 */
const OrganizationProjectsOverview = () => {
  const { isLoading, isError } = useDataState();

  return (
    <SectionContainer
      title={app.organizationPage.projects.title}
      description={app.organizationPage.projects.description}
      icon={HiOutlineFolder}
    >
      {isError ? (
        <ErrorBoundary message="Error fetching projects" h={48} p={8} />
      ) : (
        <Grid
          maxH="md"
          overflow="auto"
          // NB: The padding is necessary to prevent clipping of the card borders/box shadows
          p="1px"
          gap={6}
          columns={{ base: 1, md: 2 }}
        >
          {isLoading ? (
            <SkeletonArray count={6} h={48} borderRadius="lg" w="100%" />
          ) : (
            PROJECTS.map(({ id, name, description }) => (
              <ProjectCard
                key={id}
                id={id}
                name={name}
                description={description}
                // !!NB: explicitly set the height of the card to prevent CLS issues with loading and error states.
                h={48}
              />
            ))
          )}
        </Grid>
      )}
    </SectionContainer>
  );
};

export default OrganizationProjectsOverview;
