import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout/projects/$projectSlug/",
)({
  component: ProjectPage,
});

function ProjectPage() {
  return (
    <div>
      Hello "/_auth/organizations/$organizationSlug/projects/$projectSlug/"!
    </div>
  );
}
