import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_manage/invitations",
)({
  component: OrganizationInvitationsPage,
});

function OrganizationInvitationsPage() {
  return (
    <div>
      Hello "/_auth/organizations/$organizationSlug/_manage/invitations"!
    </div>
  );
}
