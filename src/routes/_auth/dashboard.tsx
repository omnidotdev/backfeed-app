import { Grid, Stack } from "@omnidev/sigil";
import { createFileRoute } from "@tanstack/react-router";

import FeedbackSection from "@/components/dashboard/FeedbackSection";
import RecentFeedback from "@/components/dashboard/RecentFeedback";
import Page from "@/components/layout/Page";
import PinnedWorkspaces from "@/components/workspace/PinnedWorkspaces";
import app from "@/lib/config/app.config";
import { recentFeedbackOptions } from "@/lib/options/dashboard";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute("/_auth/dashboard")({
  beforeLoad: async ({ context: { session } }) => {
    if (!session?.user.rowId) return;

    // Get user's org IDs from JWT claims
    const organizationIds = session.organizations?.map((o) => o.id) ?? [];

    return { organizationIds };
  },
  loader: async ({ context }) => {
    const { session, queryClient } = context;
    // organizationIds comes from beforeLoad return value
    const organizationIds =
      (context as { organizationIds?: string[] }).organizationIds ??
      session?.organizations?.map((o) => o.id) ??
      [];

    await queryClient.ensureInfiniteQueryData({
      ...recentFeedbackOptions({
        organizationIds,
      }),
      revalidateIfStale: true,
    });

    return { organizationIds };
  },
  head: () => ({ meta: createMetaTags({ title: "Dashboard" }) }),
  component: DashboardPage,
});

function DashboardPage() {
  const { session } = Route.useRouteContext();

  return (
    <Page
      header={{
        title: `${app.dashboardPage.welcomeMessage}, ${session?.user?.username}!`,
        description: app.dashboardPage.description,
      }}
    >
      <Stack gap={6}>
        {/* Main Content Grid */}
        <Grid gap={6} columns={{ base: 1, lg: 2 }}>
          {/* Workspaces Section */}
          <FeedbackSection
            title="Your Workspaces"
            minH={72}
            contentProps={{ p: 4 }}
          >
            <PinnedWorkspaces />
          </FeedbackSection>

          {/* Recent Feedback Section */}
          <RecentFeedback minH={72} />
        </Grid>
      </Stack>
    </Page>
  );
}
