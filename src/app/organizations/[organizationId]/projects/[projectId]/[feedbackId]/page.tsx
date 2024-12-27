import { notFound } from "next/navigation";

import { Comments, FeedbackDetails } from "components/feedback";
import { Page } from "components/layout";
import { app } from "lib/config";
import { getAuthSession } from "lib/util";

import type { Feedback } from "components/feedback";

interface Props {
  /** Feedback page params. */
  params: Promise<{
    organizationId: string;
    projectId: string;
    feedbackId: string;
  }>;
}

/**
 * Feedback overview page.
 */
const FeedbackPage = async ({ params }: Props) => {
  const { organizationId, projectId, feedbackId } = await params;
  const session = await getAuthSession();

  const FEEDBACK: Feedback = {
    id: feedbackId,
    title: "I Still Like Turtles",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-08-24T00:00:00.000Z",
    status: "Planned",
    upvotes: 420,
    downvotes: 69,
    user: {
      id: "1",
      firstName: "Back",
      lastName: "Feed",
    },
  };

  const breadcrumbs = [
    {
      label: app.organizationsPage.breadcrumb,
      href: "/organizations",
    },
    {
      // TODO: Use actual organization name here instead of ID
      label: organizationId,
      href: `/organizations/${organizationId}`,
    },
    {
      label: app.projectsPage.breadcrumb,
      href: `/organizations/${organizationId}/projects`,
    },
    {
      // TODO: Use actual project name here instead of ID
      label: projectId,
      href: `/organizations/${organizationId}/projects/${projectId}`,
    },
    {
      label: app.feedbackPage.breadcrumb,
    },
  ];

  if (!session) notFound();

  return (
    <Page breadcrumbs={breadcrumbs}>
      <FeedbackDetails feedback={FEEDBACK} />

      <Comments />
    </Page>
  );
};

export default FeedbackPage;
