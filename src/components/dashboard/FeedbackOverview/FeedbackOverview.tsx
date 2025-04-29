"use client";

import { Skeleton } from "@omnidev/sigil";
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

import { FeedbackSection, FeedbackTooltip } from "components/dashboard";
import { ErrorBoundary } from "components/layout";
import { useWeeklyFeedbackQuery } from "generated/graphql";
import { token } from "generated/panda/tokens";
import { useAuth, useViewportSize } from "lib/hooks";

interface Props {
  /** Start of day from one week ago. */
  oneWeekAgo: Date;
}

/**
 * Feedback overview section. Displays a bar chart that displays daily feedback volume for the past 7 days.
 */
const FeedbackOverview = ({ oneWeekAgo }: Props) => {
  const isLargeViewport = useViewportSize({ minWidth: "64em" });

  const getFormattedDate = (diff: number) =>
    dayjs(oneWeekAgo).add(diff, "day").format("ddd");

  const { user } = useAuth();

  const {
    data: weeklyFeedback,
    isLoading,
    isError,
  } = useWeeklyFeedbackQuery(
    {
      userId: user?.rowId!,
      startDate: oneWeekAgo,
    },
    {
      enabled: !!user?.rowId,
      select: (data) =>
        data?.posts?.groupedAggregates?.map((aggregate) => ({
          name: dayjs(aggregate.keys?.[0]).format("ddd"),
          total: Number(aggregate.distinctCount?.rowId),
        })),
    },
  );

  const getDailyTotal = (date: string) =>
    weeklyFeedback?.find((item) => item.name === date)?.total ?? 0;

  const DATA = Array.from({ length: 7 }).map((_, index) => {
    const date = getFormattedDate(index);

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
                content={<FeedbackTooltip />}
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
