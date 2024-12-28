"use client";

import { Skeleton, useIsClient } from "@omnidev/sigil";
import dayjs from "dayjs";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { FeedbackCard, FeedbackTooltip } from "components/dashboard";
import { ErrorBoundary } from "components/layout";
import { useWeeklyFeedbackQuery } from "generated/graphql";
import { token } from "generated/panda/tokens";
import { useAuth } from "lib/hooks";

const oneWeekAgo = dayjs().subtract(1, "week").startOf("day").toDate();

const getFormattedDate = (diff: number) =>
  dayjs(oneWeekAgo).add(diff, "day").format("ddd");

/**
 * Feedback overview section. Displays a bar chart that displays daily feedback volume for the past 7 days.
 */
const FeedbackOverview = () => {
  const isClient = useIsClient();

  const { user } = useAuth();

  const {
    data: weeklyFeedback,
    isLoading,
    isError,
  } = useWeeklyFeedbackQuery(
    {
      userId: user?.id!,
      startDate: oneWeekAgo,
    },
    {
      enabled: !!user,
      select: (data) =>
        data?.posts?.groupedAggregates?.map((aggregate) => ({
          name: dayjs(aggregate.keys?.[0]).format("ddd"),
          total: Number(aggregate.distinctCount?.rowId),
        })),
    }
  );

  const getDailyTotal = (date: string) =>
    weeklyFeedback?.find((item) => item.name === date)?.total ?? 0;

  const DATA = [
    { name: getFormattedDate(0), total: getDailyTotal(getFormattedDate(0)) },
    { name: getFormattedDate(1), total: getDailyTotal(getFormattedDate(1)) },
    { name: getFormattedDate(2), total: getDailyTotal(getFormattedDate(2)) },
    { name: getFormattedDate(3), total: getDailyTotal(getFormattedDate(3)) },
    { name: getFormattedDate(4), total: getDailyTotal(getFormattedDate(4)) },
    { name: getFormattedDate(5), total: getDailyTotal(getFormattedDate(5)) },
    { name: getFormattedDate(6), total: getDailyTotal(getFormattedDate(6)) },
  ];

  return (
    <FeedbackCard
      title="Feedback Overview"
      contentProps={{ align: "center", justify: "center" }}
    >
      {isClient && !isLoading ? (
        isError ? (
          <ErrorBoundary
            message="Error fetching feedback overview"
            h={400}
            w="full"
          />
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={DATA}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />

              {/* NB: the explicit width removes some unecessary spacing on the y-axis. This should be fine for 3-digit numbers, but may need to be adjusted for larger numbers. */}
              <YAxis axisLine={false} tickLine={false} width={32} />

              <Tooltip
                cursor={{ fill: "transparent" }}
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
    </FeedbackCard>
  );
};

export default FeedbackOverview;
