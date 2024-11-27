"use client";

import { Stack, useDebounceValue } from "@omnidev/sigil";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ProjectListItem } from "components/project";
import { useSearchParams } from "lib/hooks";

export interface Project {
  /** Project ID. */
  id: string;
  /** Project name. */
  name: string;
  /** Project description. */
  description: string;
  /** Project status. */
  status: "Active" | "Beta" | "Inactive";
}

// NB: These are similar to the organization projects. Copied and modified for simplicity.
const PROJECTS: Project[] = [
  {
    id: "1",
    name: "Mobile App Feedback",
    description:
      "We are actively gathering detailed user feedback for our iOS and Android applications to enhance user experience and functionality. This includes identifying key pain points, usability issues, and feature requests from our diverse user base. Our primary focus is on improving app performance, refining navigation flows, and introducing user-driven features that align with customer needs. Additionally, we are seeking feedback on visual design updates and accessibility improvements to ensure the app meets the highest standards for all users. This project is crucial for maintaining our competitive edge in the mobile app market and fostering customer loyalty.",
    status: "Active",
  },
  {
    id: "2",
    name: "Web Platform Beta",
    description: "Beta testing feedback for the new web platform",
    status: "Beta",
  },
  {
    id: "3",
    name: "Desktop Client",
    description: "User experience feedback for desktop applications",
    status: "Inactive",
  },
  {
    id: "4",
    name: "E-commerce Platform Upgrade",
    description:
      "Feedback for the upgraded e-commerce platform features and user flow.",
    status: "Active",
  },
  {
    id: "5",
    name: "AI Chatbot Testing",
    description: "Testing and collecting responses for our AI chatbot.",
    status: "Beta",
  },
  {
    id: "6",
    name: "Enterprise CRM Feedback",
    description: "Gathering feedback on our enterprise CRM system.",
    status: "Inactive",
  },
];

/**
 * Project list.
 */
const ProjectList = () => {
  const [{ search, status }] = useSearchParams();

  const [debouncedSearch] = useDebounceValue(search, 300);

  const { organizationId } = useParams<{ organizationId: string }>();

  return (
    <Stack>
      {/* TODO: update logic handler / filters once data fetching is implemented */}
      {PROJECTS.filter((project) => (status ? project.status === status : true))
        .filter((project) =>
          project.name.toLowerCase().includes(debouncedSearch)
        )
        .map((project) => (
          <Link
            key={project.id}
            href={`/organizations/${organizationId}/projects/${project.id}`}
          >
            <ProjectListItem {...project} />
          </Link>
        ))}
    </Stack>
  );
};

export default ProjectList;
