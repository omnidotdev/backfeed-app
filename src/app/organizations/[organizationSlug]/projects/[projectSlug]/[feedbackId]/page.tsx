import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { Comments, FeedbackDetails } from "components/feedback";
import { Page } from "components/layout";
import {
  Role,
  useCommentsQuery,
  useInfiniteCommentsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import {
  downvoteQueryOptions,
  feedbackByIdQueryOptions,
  organizationRoleQueryOptions,
  projectStatusesQueryOptions,
  upvoteQueryOptions,
} from "lib/react-query/options";
import { getQueryClient } from "lib/util";

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
    userId: session.user.rowId!,
    organizationId: feedback.project?.organization?.rowId!,
  });

  const isAdmin =
    memberByUserIdAndOrganizationId?.role === Role.Admin ||
    memberByUserIdAndOrganizationId?.role === Role.Owner;

  const queryClient = getQueryClient();

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

  queryClient.prefetchQuery(feedbackByIdQueryOptions({ rowId: feedbackId }));
  queryClient.prefetchQuery(
    organizationRoleQueryOptions({
      userId: session.user.rowId!,
      organizationId: feedback.project?.organization?.rowId!,
    })
  );
  queryClient.prefetchQuery(
    downvoteQueryOptions({
      userId: session?.user.rowId!,
      feedbackId,
    })
  );
  queryClient.prefetchQuery(
    upvoteQueryOptions({
      userId: session?.user.rowId!,
      feedbackId,
    })
  );
  // TODO: figure out if suspense works for this query
  queryClient.prefetchInfiniteQuery({
    queryKey: useInfiniteCommentsQuery.getKey({ pageSize: 5, feedbackId }),
    queryFn: useCommentsQuery.fetcher({ pageSize: 5, feedbackId }),
    initialPageParam: undefined,
  });

  if (isAdmin) {
    queryClient.prefetchQuery(
      projectStatusesQueryOptions({
        projectId: feedback.project?.rowId!,
      })
    );
  }

  return (
    <Page breadcrumbs={breadcrumbs}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FeedbackDetails feedbackId={feedbackId} />

        <Comments
          organizationId={feedback.project?.organization?.rowId!}
          feedbackId={feedbackId}
        />
      </HydrationBoundary>
    </Page>
  );
};

export default FeedbackPage;
