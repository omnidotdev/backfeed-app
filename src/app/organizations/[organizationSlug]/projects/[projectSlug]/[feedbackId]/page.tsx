import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { Comments, FeedbackDetails } from "components/feedback";
import { Page } from "components/layout";
import {
  useCommentsQuery,
  useFeedbackByIdQuery,
  useInfiniteCommentsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import { getAuthSession, getQueryClient } from "lib/util";

import type { BreadcrumbRecord } from "components/core";

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

  const [session, sdk] = await Promise.all([getAuthSession(), getSdk()]);

  if (!session?.user?.customerId || !sdk) notFound();

  const { post: feedback } = await sdk.FeedbackById({ rowId: feedbackId });

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
      queryKey: useFeedbackByIdQuery.getKey({ rowId: feedbackId }),
      queryFn: useFeedbackByIdQuery.fetcher({ rowId: feedbackId }),
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

        <Comments feedbackId={feedbackId} />
      </HydrationBoundary>
    </Page>
  );
};

export default FeedbackPage;
