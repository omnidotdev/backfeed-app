import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/projects/",
)({
  component: ProjectsPage,
});

function ProjectsPage() {
  return <div>Hello "/_auth/organizations/$organizationSlug/projects/"!</div>;
}
