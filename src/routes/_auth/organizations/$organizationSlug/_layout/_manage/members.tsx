import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout/_manage/members",
)({
  component: OrganizationMembersPage,
});

function OrganizationMembersPage() {
  return (
    <div>Hello "/_auth/organizations/$organizationSlug/_manage/members"!</div>
  );
}
