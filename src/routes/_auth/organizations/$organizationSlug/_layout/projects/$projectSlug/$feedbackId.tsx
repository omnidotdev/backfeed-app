import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout/projects/$projectSlug/$feedbackId",
)({
  component: FeedbackPage,
});

function FeedbackPage() {
  return (
    <div>
      Hello
      "/_auth/organizations/$organizationSlug/projects/$projectSlug/$feedbackId"!
    </div>
  );
}
