import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/profile/$userId/_layout/organizations",
)({
  component: UserOrganizationsPage,
});

function UserOrganizationsPage() {
  return <div>Hello "/_auth/_profile/$userId/organizations"!</div>;
}
