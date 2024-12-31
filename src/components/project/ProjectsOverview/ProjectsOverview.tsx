"use client";

import { ProjectFilters, ProjectList } from "components/project";
import { useDataState } from "lib/hooks";

// NB: These are similar to the organization projects. Copied and modified for simplicity.
const PROJECTS = [
  {
    id: "1",
    name: "Mobile App Feedback",
    description:
      "We are actively gathering detailed user feedback for our iOS and Android applications to enhance user experience and functionality. This includes identifying key pain points, usability issues, and feature requests from our diverse user base. Our primary focus is on improving app performance, refining navigation flows, and introducing user-driven features that align with customer needs. Additionally, we are seeking feedback on visual design updates and accessibility improvements to ensure the app meets the highest standards for all users. This project is crucial for maintaining our competitive edge in the mobile app market and fostering customer loyalty.",
    status: "Active" as const,
  },
  {
    id: "2",
    name: "Web Platform Beta",
    description: "Beta testing feedback for the new web platform",
    status: "Beta" as const,
  },
  {
    id: "3",
    name: "Desktop Client",
    description: "User experience feedback for desktop applications",
    status: "Inactive" as const,
  },
  {
    id: "4",
    name: "E-commerce Platform Upgrade",
    description:
      "Feedback for the upgraded e-commerce platform features and user flow.",
    status: "Active" as const,
  },
  {
    id: "5",
    name: "AI Chatbot Testing",
    description: "Testing and collecting responses for our AI chatbot.",
    status: "Beta" as const,
  },
  {
    id: "6",
    name: "Enterprise CRM Feedback",
    description: "Gathering feedback on our enterprise CRM system.",
    status: "Inactive" as const,
  },
];

const ProjectsOverview = () => {
  const { isLoading, isError } = useDataState();

  return (
    <>
      <ProjectFilters isLoading={isLoading} isError={isError} />

      <ProjectList
        projects={PROJECTS}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
};

export default ProjectsOverview;
