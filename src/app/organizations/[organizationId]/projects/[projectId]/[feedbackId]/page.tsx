import { notFound } from "next/navigation";

import { Comments, FeedbackDetails } from "components/feedback";
import { Page } from "components/layout";
import { app } from "lib/config";
import { getAuthSession, getFeedbackById } from "lib/util";

export const metadata = {
  title: `${app.feedbackPage.breadcrumb} | ${app.name}`,
};

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

  const [session, { post: feedback }] = await Promise.all([
    getAuthSession(),
    getFeedbackById(feedbackId),
  ]);

  const breadcrumbs = [
    {
      label: app.organizationsPage.breadcrumb,
      href: "/organizations",
    },
    {
      // TODO: Use actual organization name here instead of ID
      label: feedback?.project?.organization?.name ?? organizationId,
      href: `/organizations/${organizationId}`,
    },
    {
      label: app.projectsPage.breadcrumb,
      href: `/organizations/${organizationId}/projects`,
    },
    {
      // TODO: Use actual project name here instead of ID
      label: feedback?.project?.name ?? projectId,
      href: `/organizations/${organizationId}/projects/${projectId}`,
    },
    {
      label: app.feedbackPage.breadcrumb,
    },
  ];

  if (!session || !feedback) notFound();

  return (
    <Page breadcrumbs={breadcrumbs}>
      <FeedbackDetails feedbackId={feedbackId} />

      <Comments feedbackId={feedbackId} />
    </Page>
  );
};

export default FeedbackPage;
