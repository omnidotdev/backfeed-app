"use client";

import { Skeleton, useIsClient } from "@omnidev/sigil";
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
import { token } from "generated/panda/tokens";
import { useDataState } from "lib/hooks";

const getRandomInteger = () => Math.floor(Math.random() * 100);

/**
 * Feedback overview section. Displays a bar chart that displays daily feedback volume for the past 7 days.
 */
const FeedbackOverview = () => {
  const isMounted = useIsClient(),
    { isLoading, isError } = useDataState({ timeout: 600 });

  const DATA = [
    { name: "Mon", total: getRandomInteger() },
    { name: "Tue", total: getRandomInteger() },
    { name: "Wed", total: getRandomInteger() },
    { name: "Thu", total: getRandomInteger() },
    { name: "Fri", total: getRandomInteger() },
    { name: "Sat", total: getRandomInteger() },
    { name: "Sun", total: getRandomInteger() },
  ];

  return (
    <FeedbackCard
      title="Feedback Overview"
      contentProps={{ align: "center", justify: "center" }}
    >
      {isMounted && !isLoading ? (
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
