import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout/_manage/settings",
)({
  component: OrganizationSettingsPage,
});

function OrganizationSettingsPage() {
  return (
    <div>Hello "/_auth/organizations/$organizationSlug/_manage/settings"!</div>
  );
}
