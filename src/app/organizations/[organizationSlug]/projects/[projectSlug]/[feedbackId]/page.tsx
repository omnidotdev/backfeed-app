import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { Comments, FeedbackDetails } from "components/feedback";
import { Page } from "components/layout";
import {
  Role,
  useCommentsQuery,
  useDownvoteQuery,
  useFeedbackByIdQuery,
  useInfiniteCommentsQuery,
  useOrganizationRoleQuery,
  useProjectStatusesQuery,
  useUpvoteQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
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

  const [session, sdk] = await Promise.all([auth(), getSdk()]);

  if (!session || !sdk) notFound();

  const { post: feedback } = await sdk.FeedbackById({ rowId: feedbackId });

  if (!feedback) notFound();

  const { memberByUserIdAndOrganizationId } = await sdk.OrganizationRole({
    userId: session.user?.rowId!,
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

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useFeedbackByIdQuery.getKey({ rowId: feedbackId }),
      queryFn: useFeedbackByIdQuery.fetcher({ rowId: feedbackId }),
    }),
    // ! NB: only prefetch the project statuses if the user is an admin
    ...(isAdmin
      ? [
          queryClient.prefetchQuery({
            queryKey: useProjectStatusesQuery.getKey({
              projectId: feedback.project?.rowId!,
            }),
            queryFn: useProjectStatusesQuery.fetcher({
              projectId: feedback.project?.rowId!,
            }),
          }),
        ]
      : []),
    queryClient.prefetchQuery({
      queryKey: useOrganizationRoleQuery.getKey({
        userId: session.user.rowId!,
        organizationId: feedback.project?.organization?.rowId!,
      }),
      queryFn: useOrganizationRoleQuery.fetcher({
        userId: session.user.rowId!,
        organizationId: feedback.project?.organization?.rowId!,
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useDownvoteQuery.getKey({
        userId: session?.user?.rowId!,
        feedbackId,
      }),
      queryFn: useDownvoteQuery.fetcher({
        userId: session?.user?.rowId!,
        feedbackId,
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useUpvoteQuery.getKey({
        userId: session?.user?.rowId!,
        feedbackId,
      }),
      queryFn: useUpvoteQuery.fetcher({
        userId: session?.user?.rowId!,
        feedbackId,
      }),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: useInfiniteCommentsQuery.getKey({ pageSize: 5, feedbackId }),
      queryFn: useCommentsQuery.fetcher({ pageSize: 5, feedbackId }),
      initialPageParam: undefined,
    }),
  ]);

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
