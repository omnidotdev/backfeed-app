import { Skeleton } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import FeedbackSection from "@/components/dashboard/FeedbackSection";
import FeedbackTooltip from "@/components/dashboard/FeedbackTooltip";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { token } from "@/generated/panda/tokens";
import useViewportSize from "@/lib/hooks/useViewportSize";
import { weeklyFeedbackOptions } from "@/lib/options/dashboard";

interface Props {
  /** Start of day from one week ago. */
  oneWeekAgo: Date;
}

/**
 * Feedback overview section. Displays a bar chart that displays daily feedback volume for the past 7 days.
 */
const FeedbackOverview = ({ oneWeekAgo }: Props) => {
  const { session } = useRouteContext({ from: "/_auth/dashboard" });
  const isLargeViewport = useViewportSize({
    minWidth: token("breakpoints.lg"),
  });

  // Get org IDs from session for filtering
  const organizationIds = session?.organizations?.map((org) => org.id) ?? [];

  const getFormattedDate = (diff: number) =>
    dayjs(oneWeekAgo).add(diff, "day").format("ddd");

  const {
    data: weeklyFeedback,
    isLoading,
    isError,
  } = useQuery({
    ...weeklyFeedbackOptions({
      organizationIds,
      startDate: oneWeekAgo,
    }),
    select: (data) =>
      data?.posts?.groupedAggregates?.map((aggregate) => ({
        name: dayjs(aggregate.keys?.[0]).utc().format("ddd"),
        total: Number(aggregate.distinctCount?.rowId),
      })),
    enabled: organizationIds.length > 0,
  });

  const getDailyTotal = (date: string) =>
    weeklyFeedback?.find((item) => item.name === date)?.total ?? 0;

  const DATA = Array.from({ length: 7 }).map((_, index) => {
    const date = getFormattedDate(index + 1);

    return {
      name: date,
      total: getDailyTotal(date),
    };
  });

  const DISPLAYED_DATA = useMemo(
    () => (isLargeViewport ? DATA : DATA.slice(3)),
    [isLargeViewport, DATA],
  );

  return (
    <FeedbackSection
      title="Feedback Overview"
      maxH="xl"
      contentProps={{
        align: "center",
        justify: "center",
        p: 2,
      }}
    >
      {!isLoading ? (
        isError ? (
          <ErrorBoundary
            message="Error fetching feedback overview"
            h={400}
            w="full"
          />
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={DISPLAYED_DATA}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />

              {/* NB: the explicit width removes some unecessary spacing on the y-axis. This should be fine for 3-digit numbers, but may need to be adjusted for larger numbers. */}
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                width={32}
              />

              <Tooltip
                cursor={{ fill: "transparent" }}
                isAnimationActive={false}
                content={(props) => <FeedbackTooltip {...props} />}
              />

              <Bar
                dataKey="total"
                fill={token("colors.foreground.muted")}
                radius={10}
              />
            </BarChart>
          </ResponsiveContainer>
        )
      ) : (
        <Skeleton width="full" height={400} />
      )}
    </FeedbackSection>
  );
};

export default FeedbackOverview;
