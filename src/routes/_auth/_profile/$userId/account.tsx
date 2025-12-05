import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_profile/$userId/account")({
  component: UserAccountPage,
});

function UserAccountPage() {
  return <div>Hello "/_auth/_profile/$userId/account"!</div>;
}
