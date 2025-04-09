"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
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
import { token } from "generated/panda/tokens";
import { weeklyFeedbackQueryOptions } from "lib/react-query/options";

import type { User } from "generated/graphql";

const oneWeekAgo = dayjs().subtract(1, "week").startOf("day").toDate();
const startOfToday = dayjs().startOf("day").toDate();

const getFormattedDate = (diff: number) =>
  dayjs(oneWeekAgo).add(diff, "day").format("ddd");

interface Props {
  userId: User["rowId"];
}

/**
 * Feedback overview section. Displays a bar chart that displays daily feedback volume for the past 7 days.
 */
const FeedbackOverview = ({ userId }: Props) => {
  const { data: weeklyFeedback, isError } = useSuspenseQuery(
    weeklyFeedbackQueryOptions({
      userId,
      startDate: oneWeekAgo,
      endDate: startOfToday,
    })
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

  return (
    <FeedbackSection
      title="Feedback Overview"
      maxH="xl"
      contentProps={{ align: "center", justify: "center" }}
    >
      {isError ? (
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
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              width={32}
            />

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
      )}
    </FeedbackSection>
  );
};

export default FeedbackOverview;
