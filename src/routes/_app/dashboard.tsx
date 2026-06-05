import { createFileRoute, redirect } from "@tanstack/react-router";

import FeedbackSection from "@/components/dashboard/FeedbackSection";
import RecentFeedback from "@/components/dashboard/RecentFeedback";
import Page from "@/components/layout/Page";
import PinnedWorkspaces from "@/components/workspace/PinnedWorkspaces";
import app from "@/lib/config/app.config";
import { recentFeedbackOptions } from "@/lib/options/dashboard";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute("/_app/dashboard")({
  beforeLoad: async ({ context: { session }, location }) => {
    if (!session?.user.rowId) {
      throw redirect({
        to: "/",
        search: { returnTo: location.href },
      });
    }

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
        title: session?.user?.name
          ? `${app.dashboardPage.welcomeMessage}, ${session.user.name}!`
          : `${app.dashboardPage.welcomeMessage}!`,
        description: app.dashboardPage.description,
      }}
    >
      <div className="flex flex-col gap-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Workspaces Section */}
          <FeedbackSection
            title="Your Workspaces"
            style={{ minHeight: "18rem" }}
            contentClassName="p-4"
          >
            <PinnedWorkspaces />
          </FeedbackSection>

          {/* Recent Feedback Section */}
          <RecentFeedback minH={72} />
        </div>
      </div>
    </Page>
  );
}
