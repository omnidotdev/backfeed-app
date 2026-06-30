import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import Comments from "@/components/feedback/Comments";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import PostBackReferences from "@/components/feedback/PostBackReferences";
import PostTags from "@/components/feedback/PostTags";
import ReactionBar from "@/components/feedback/ReactionBar";
import StatusTimeline from "@/components/feedback/StatusTimeline";
import StatusUpdateComposer from "@/components/feedback/StatusUpdateComposer";
import Page from "@/components/layout/Page";
import { BASE_URL } from "@/lib/config/env.config";
import {
  freeTierCommentsOptions,
  infiniteCommentsOptions,
} from "@/lib/options/comments";
import {
  feedbackByIdOptions,
  feedbackByNumberOptions,
} from "@/lib/options/feedback";
import { projectOptions, projectStatusesOptions } from "@/lib/options/projects";
import createMetaTags from "@/lib/util/createMetaTags";
import { buildFeedbackKey, parseFeedbackParam } from "@/lib/util/feedbackUrl";
import stripHtml from "@/lib/util/stripHtml";

import type { FeedbackFragment } from "@/generated/graphql";

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
)({
  loader: async ({
    context: { session, queryClient, organizationId },
    params: { workspaceSlug, projectSlug, feedbackId: feedbackParam },
    preload,
  }) => {
    const userId = session?.user?.rowId;

    const { projects } = await queryClient.ensureQueryData({
      ...projectOptions({
        organizationId,
        projectSlug,
      }),
      revalidateIfStale: true,
    });

    if (!projects?.nodes.length) throw notFound();

    const project = projects.nodes[0]!;

    const parsed = parseFeedbackParam(feedbackParam);
    if (parsed.type === "invalid") throw notFound();

    // resolve the post (and its canonical rowId) from either the legacy UUID
    // permalink or the vanity {number}-{slug} key
    let feedback: FeedbackFragment | null | undefined;
    if (parsed.type === "uuid") {
      const data = await queryClient.ensureQueryData({
        ...feedbackByIdOptions({ rowId: parsed.rowId, userId }),
        revalidateIfStale: true,
      });
      feedback = data?.post;
    } else {
      const data = await queryClient.ensureQueryData({
        ...feedbackByNumberOptions({
          projectId: project.rowId,
          number: parsed.number,
          userId,
        }),
        revalidateIfStale: true,
      });
      feedback = data?.postByProjectIdAndNumber;
      // seed the by-id cache so the page and its mutations stay keyed by rowId
      if (feedback) {
        queryClient.setQueryData(
          feedbackByIdOptions({ rowId: feedback.rowId, userId }).queryKey,
          { post: feedback },
        );
      }
    }

    if (!feedback) throw notFound();

    // redirect legacy UUID permalinks and stale title slugs to the canonical
    // key (skipped only in the theoretical case of a post without a number)
    if (feedback.number != null) {
      const canonicalKey = buildFeedbackKey({
        number: feedback.number,
        title: feedback.title,
      });
      // skip the canonical redirect during preload (hover) so it doesn't
      // navigate on hover; the real navigation still canonicalizes the URL
      if (!preload && feedbackParam !== canonicalKey) {
        throw redirect({
          to: "/workspaces/$workspaceSlug/projects/$projectSlug/$feedbackId",
          params: { workspaceSlug, projectSlug, feedbackId: canonicalKey },
          replace: true,
        });
      }
    }

    const feedbackId = feedback.rowId;

    await Promise.all([
      queryClient.ensureInfiniteQueryData({
        ...infiniteCommentsOptions({ feedbackId }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData({
        ...freeTierCommentsOptions({
          organizationId,
          projectSlug,
          feedbackId,
        }),
        revalidateIfStale: true,
      }),
    ]);

    return {
      projectName: project.name,
      feedbackId,
      feedbackTitle: feedback.title,
      feedbackDescription: stripHtml(feedback.description) || undefined,
      ogImageUrl: `${BASE_URL}/api/og/feedback/${workspaceSlug}/${projectSlug}/${feedback.number}`,
    };
  },
  head: ({ loaderData }) => {
    // surface the project in social previews: "[post] | [project] | Backfeed"
    const title =
      loaderData?.feedbackTitle && loaderData?.projectName
        ? `${loaderData.feedbackTitle} | ${loaderData.projectName}`
        : (loaderData?.feedbackTitle ?? loaderData?.projectName);

    return {
      meta: createMetaTags({
        title,
        description: loaderData?.feedbackDescription ?? undefined,
        image: loaderData?.ogImageUrl,
      }),
    };
  },
  component: FeedbackPage,
});

function FeedbackPage() {
  const {
    session,
    hasAdminPrivileges,
    organizationId,
    workspaceName,
    workspaceLogo,
  } = Route.useRouteContext();
  const { workspaceSlug, projectSlug } = Route.useParams();
  const { projectName, feedbackId } = Route.useLoaderData();

  const { data: feedback } = useQuery({
    ...feedbackByIdOptions({ rowId: feedbackId, userId: session?.user?.rowId }),
    select: (data) => data?.post,
  });

  const { data: projectStatuses } = useQuery({
    ...projectStatusesOptions({
      organizationId,
    }),
    enabled: !!hasAdminPrivileges,
    select: (data) =>
      data?.statusTemplates?.nodes.map((status) => ({
        rowId: status?.rowId,
        name: status?.name,
        displayName: status?.displayName,
        color: status?.color,
      })),
  });

  return (
    <Page
      header={{
        title: projectName,
        breadcrumbs: [
          {
            label: workspaceName,
            image: workspaceLogo,
            to: "/workspaces/$workspaceSlug",
            params: { workspaceSlug },
          },
          {
            label: projectName,
            to: "/workspaces/$workspaceSlug/projects/$projectSlug",
            params: { workspaceSlug, projectSlug },
          },
          {
            label: feedback?.number ? `#${feedback.number}` : "Feedback",
          },
        ],
      }}
    >
      <FeedbackCard
        canManageFeedback={hasAdminPrivileges}
        feedback={feedback!}
        projectStatuses={projectStatuses}
        disableHover
      />

      {/* align the reaction row under the card's voting rail (card has p-4) */}
      <div className="-mt-2 px-4">
        <ReactionBar
          postId={feedbackId}
          userId={session?.user?.rowId}
          canReact={!!session?.user?.rowId}
        />
      </div>

      {feedback?.project?.rowId && (
        <PostTags
          postId={feedbackId}
          projectId={feedback.project.rowId}
          canAssign={!!session?.user?.rowId}
        />
      )}

      {hasAdminPrivileges && feedback?.project?.rowId && (
        <StatusUpdateComposer
          postId={feedbackId}
          projectId={feedback.project.rowId}
          currentStatusId={feedback.statusTemplate?.rowId}
          statuses={projectStatuses}
          currentUser={{
            username: session?.user?.username ?? null,
            avatarUrl: session?.user?.image ?? null,
          }}
        />
      )}

      {feedback?.project?.rowId && feedback.number != null && (
        <PostBackReferences
          rowId={feedbackId}
          number={feedback.number}
          projectId={feedback.project.rowId}
          workspaceSlug={workspaceSlug}
          projectSlug={projectSlug}
        />
      )}

      <StatusTimeline postId={feedbackId} canManage={hasAdminPrivileges} />

      <Comments />
    </Page>
  );
}
