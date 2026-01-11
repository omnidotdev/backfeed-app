import { Flex, Icon, Text } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "@tanstack/react-router";
import { HiOutlineFolder } from "react-icons/hi2";
import { TbHeartbeat } from "react-icons/tb";

import SectionContainer from "@/components/layout/SectionContainer";
import app from "@/lib/config/app.config";
import { projectMetricsOptions } from "@/lib/options/projects";

/**
 * Feedback metrics for a project.
 */
const FeedbackMetrics = () => {
  const { projectId } = useLoaderData({
    from: "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
  });

  const { data: projectMetrics, isError } = useQuery({
    ...projectMetricsOptions({ projectId }),
    select: (data) => ({
      totalFeedback: data?.project?.posts.totalCount,
      // TODO: discuss adjusting this. Could include comments + replies, would have to add appropriate invalidations as well
      totalEngagement:
        (data?.upvotes?.totalCount ?? 0) + (data?.downvotes?.totalCount ?? 0),
    }),
  });

  const metrics = [
    {
      title: app.projectPage.feedbackMetrics.totalFeedback,
      icon: HiOutlineFolder,
      value: projectMetrics?.totalFeedback ?? 0,
    },
    {
      title: app.projectPage.feedbackMetrics.totalEngagement,
      icon: TbHeartbeat,
      value: projectMetrics?.totalEngagement ?? 0,
    },
  ];

  return (
    <SectionContainer
      title={app.projectPage.feedbackMetrics.title}
      titleProps={{ fontSize: "md" }}
    >
      {metrics.map(({ title, icon, value }) => (
        <Flex key={title} justify="space-between" align="center">
          <Flex gap={2} align="center">
            <Icon src={icon} />

            <Text color="foreground.muted" fontSize="sm">
              {title}
            </Text>
          </Flex>

          <Text fontSize="sm" textAlign="right">
            {isError ? 0 : value}
          </Text>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default FeedbackMetrics;
