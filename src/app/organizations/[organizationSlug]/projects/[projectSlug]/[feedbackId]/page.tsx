import { notFound } from "next/navigation";

import { Comments, FeedbackDetails } from "components/feedback";
import { Page } from "components/layout";
import { app } from "lib/config";
import { sdk } from "lib/graphql";
import { getAuthSession } from "lib/util";

export const metadata = {
  title: `${app.feedbackPage.breadcrumb} | ${app.name}`,
};

interface Props {
  /** Feedback page params. */
  params: Promise<{
    organizationSlug: string;
    projectSlug: string;
    feedbackId: string;
  }>;
}

/**
 * Feedback overview page.
 */
const FeedbackPage = async ({ params }: Props) => {
  const { organizationSlug, projectSlug, feedbackId } = await params;

  const [session, { post: feedback }] = await Promise.all([
    getAuthSession(),
    sdk.FeedbackById({ rowId: feedbackId }),
  ]);

  const breadcrumbs = [
    {
      label: app.organizationsPage.breadcrumb,
      href: "/organizations",
    },
    {
      label: feedback?.project?.organization?.name ?? organizationSlug,
      href: `/organizations/${organizationSlug}`,
    },
    {
      label: app.projectsPage.breadcrumb,
      href: `/organizations/${organizationSlug}/projects`,
    },
    {
      label: feedback?.project?.name ?? projectSlug,
      href: `/organizations/${organizationSlug}/projects/${projectSlug}`,
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
