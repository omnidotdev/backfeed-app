import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { Comments, FeedbackDetails } from "components/feedback";
import { Page } from "components/layout";
import {
  Role,
  useCommentsQuery,
  useFeedbackByIdQuery,
  useInfiniteCommentsQuery,
  useOrganizationRoleQuery,
  useProjectStatusesQuery,
} from "generated/graphql";
import { getOrganization } from "lib/actions";
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

  const session = await auth();

  if (!session) notFound();

  const organization = await getOrganization({ organizationSlug });

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
      // href: `/organizations/${organizationSlug}/projects/${projectSlug}`,
      subItems: organization?.projects?.nodes?.length
        ? organization?.projects?.nodes
            .filter((p) => p?.slug !== projectSlug)
            .map((project) => ({
              label: project!.name,
              href: `/organizations/${organizationSlug}/projects/${project!.slug}`,
            }))
        : undefined,
      nestedSubItems: organization?.projects?.nodes?.length
        ? organization?.projects?.nodes
            .filter((p) => p?.slug !== projectSlug)
            .map((project) => ({
              label: project!.name,
              href: `/organizations/${organizationSlug}/projects/${project!.slug}`,
            }))
        : undefined,
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
