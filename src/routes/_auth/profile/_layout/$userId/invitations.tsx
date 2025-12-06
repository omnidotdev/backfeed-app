import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/profile/_layout/$userId/invitations",
)({
  component: UserInvitationsPage,
});

function UserInvitationsPage() {
  return <div>Hello "/_auth/_profile/$userId/invitations"!</div>;
}
