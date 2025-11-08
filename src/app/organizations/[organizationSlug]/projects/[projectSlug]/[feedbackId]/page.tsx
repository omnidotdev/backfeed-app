import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { Comments, FeedbackDetails } from "components/feedback";
import { Page } from "components/layout";
import {
  useCommentsQuery,
  useFeedbackByIdQuery,
  useInfiniteCommentsQuery,
  useOrganizationRoleQuery,
} from "generated/graphql";
import { getFeedback } from "lib/actions";
import { app } from "lib/config";
import { freeTierCommentsOptions } from "lib/options";
import { getQueryClient } from "lib/util";

import type { BreadcrumbRecord } from "components/core";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: app.feedbackPage.breadcrumb,
};

/**
 * Feedback overview page.
 */
const FeedbackPage = async ({
  params,
}: PageProps<"/organizations/[organizationSlug]/projects/[projectSlug]/[feedbackId]">) => {
  const { organizationSlug, projectSlug, feedbackId } = await params;

  const session = await auth();

  if (!session) notFound();

  const feedback = await getFeedback({ feedbackId });

  if (!feedback) notFound();

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
      queryKey: useFeedbackByIdQuery.getKey({
        rowId: feedbackId,
        userId: session.user.rowId,
      }),
      queryFn: useFeedbackByIdQuery.fetcher({
        rowId: feedbackId,
        userId: session.user.rowId,
      }),
    }),
    queryClient.prefetchQuery(
      freeTierCommentsOptions({ projectSlug, organizationSlug, feedbackId }),
    ),
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
    queryClient.prefetchInfiniteQuery({
      queryKey: useInfiniteCommentsQuery.getKey({ feedbackId }),
      queryFn: useCommentsQuery.fetcher({ feedbackId }),
      initialPageParam: undefined,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page breadcrumbs={breadcrumbs}>
        <FeedbackDetails user={session.user} feedbackId={feedbackId} />

        <Comments
          user={session.user}
          organizationId={feedback.project?.organization?.rowId!}
          feedbackId={feedbackId}
        />
      </Page>
    </HydrationBoundary>
  );
};

export default FeedbackPage;
