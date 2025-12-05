import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout/projects/$projectSlug/settings",
)({
  component: ProjectSettingsPage,
});

function ProjectSettingsPage() {
  return (
    <div>
      Hello
      "/_auth/organizations/$organizationSlug/projects/$projectSlug/settings"!
    </div>
  );
}
