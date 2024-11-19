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
  /** Quantity of total feedback. */
  totalFeedback: number;
  /** Quantity of active users. */
  activeUsers: number;
  /** Timestamp when the organization was last updated. */
  lastUpdated: string;
}

export const PROJECTS: OrganizationProject[] = [
  {
    id: "1",
    name: "Mobile App Feedback",
    description:
      "We are actively gathering detailed user feedback for our iOS and Android applications to enhance user experience and functionality. This includes identifying key pain points, usability issues, and feature requests from our diverse user base. Our primary focus is on improving app performance, refining navigation flows, and introducing user-driven features that align with customer needs. Additionally, we are seeking feedback on visual design updates and accessibility improvements to ensure the app meets the highest standards for all users. This project is crucial for maintaining our competitive edge in the mobile app market and fostering customer loyalty.",
    totalFeedback: 234,
    activeUsers: 1200,
    lastUpdated: "2024-11-05T18:40:27.761Z",
  },
  {
    id: "2",
    name: "Web Platform Beta",
    description: "Beta testing feedback for the new web platform",
    totalFeedback: 567,
    activeUsers: 890,
    lastUpdated: "2024-11-17T18:40:27.761Z",
  },
  {
    id: "3",
    name: "Desktop Client",
    description: "User experience feedback for desktop applications",
    totalFeedback: 123,
    activeUsers: 450,
    lastUpdated: "2024-11-12T18:40:27.761Z",
  },
  {
    id: "4",
    name: "E-commerce Platform Upgrade",
    description:
      "Feedback for the upgraded e-commerce platform features and user flow.",
    totalFeedback: 345,
    activeUsers: 1000,
    lastUpdated: "2024-11-14T12:00:00.000Z",
  },
  {
    id: "5",
    name: "AI Chatbot Testing",
    description: "Testing and collecting responses for our AI chatbot.",
    totalFeedback: 678,
    activeUsers: 650,
    lastUpdated: "2024-11-16T15:30:00.000Z",
  },
  {
    id: "6",
    name: "Enterprise CRM Feedback",
    description: "Gathering feedback on our enterprise CRM system.",
    totalFeedback: 89,
    activeUsers: 300,
    lastUpdated: "2024-11-10T09:45:00.000Z",
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
        <ErrorBoundary message="Error fetching recent feedback" h={32} />
      ) : (
        <Grid
          h="428px"
          overflow="auto"
          // NB: The 1px padding is necessary to prevet clipping of the card borders / box shadows.
          p="1px"
          gap={6}
          columns={{ base: 1, lg: 2 }}
        >
          {isLoading ? (
            <SkeletonArray count={5} h="200px" borderRadius="lg" w="100%" />
          ) : (
            PROJECTS.map(
              ({
                id,
                name,
                description,
                totalFeedback,
                activeUsers,
                lastUpdated,
              }) => (
                <ProjectCard
                  key={id}
                  name={name}
                  description={description}
                  totalFeedback={totalFeedback}
                  activeUsers={activeUsers}
                  lastUpdated={lastUpdated}
                />
              )
            )
          )}
        </Grid>
      )}
    </SectionContainer>
  );
};

export default OrganizationProjectsOverview;
