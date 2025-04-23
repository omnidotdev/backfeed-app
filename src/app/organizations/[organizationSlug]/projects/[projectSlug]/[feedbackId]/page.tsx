import { notFound } from "next/navigation";

import { auth } from "auth";
import { Await } from "components/core";
import { Comments, FeedbackDetails } from "components/feedback";
import { Page } from "components/layout";
import { Role } from "generated/graphql";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import {
  downvoteOptions,
  feedbackByIdOptions,
  infiniteCommentsOptions,
  organizationRoleOptions,
  projectStatusesOptions,
  upvoteOptions,
} from "lib/options";

import type { BreadcrumbRecord } from "components/core";

export const metadata = {
  title: app.feedbackPage.breadcrumb,
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

  const session = await auth();

  if (!session) notFound();

  const sdk = getSdk({ session });

  const { post: feedback } = await sdk.FeedbackById({ rowId: feedbackId });

  if (!feedback) notFound();

  const { memberByUserIdAndOrganizationId } = await sdk.OrganizationRole({
    userId: session.user?.rowId!,
    organizationId: feedback.project?.organization?.rowId!,
  });

  const isAdmin =
    memberByUserIdAndOrganizationId?.role === Role.Admin ||
    memberByUserIdAndOrganizationId?.role === Role.Owner;

  const breadcrumbs: BreadcrumbRecord[] = [
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

  return (
    // TODO: separate concerns for prefetching for loading / error state management
    <Await
      prefetch={[
        feedbackByIdOptions({ rowId: feedbackId }),
        organizationRoleOptions({
          userId: session.user.rowId!,
          organizationId: feedback.project?.organization?.rowId!,
        }),
        downvoteOptions({
          userId: session?.user?.rowId!,
          feedbackId,
        }),
        upvoteOptions({
          userId: session?.user?.rowId!,
          feedbackId,
        }),
        // NB: only prefetch project statuses for users with admin permissions
        ...(isAdmin
          ? [
              projectStatusesOptions({
                projectId: feedback.project?.rowId!,
              }),
            ]
          : []),
      ]}
      infinitePrefetch={[
        infiniteCommentsOptions({
          pageSize: 5,
          feedbackId,
        }),
      ]}
    >
      <Page breadcrumbs={breadcrumbs}>
        <FeedbackDetails feedbackId={feedbackId} />

        <Comments
          organizationId={feedback.project?.organization?.rowId!}
          feedbackId={feedbackId}
        />
      </Page>
    </Await>
  );
};

export default FeedbackPage;
