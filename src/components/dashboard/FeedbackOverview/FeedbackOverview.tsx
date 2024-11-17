"use client";

import { Skeleton, useIsClient } from "@omnidev/sigil";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { FeedbackCard } from "components/dashboard";
import { token } from "generated/panda/tokens";

const getRandonInteger = () => Math.floor(Math.random() * 100);

/**
 * Feedback overview section. Displays a bar chart that displays daily feedback volume for the past 7 days.
 */
const FeedbackOverview = () => {
  const isMounted = useIsClient();

  const DATA = [
    { name: "Mon", value: getRandonInteger() },
    { name: "Tue", value: getRandonInteger() },
    { name: "Wed", value: getRandonInteger() },
    { name: "Thu", value: getRandonInteger() },
    { name: "Fri", value: getRandonInteger() },
    { name: "Sat", value: getRandonInteger() },
    { name: "Sun", value: getRandonInteger() },
  ];

  return (
    <FeedbackCard
      title="Feedback Overview"
      contentProps={{ align: "center", justify: "center" }}
    >
      {isMounted ? (
        <ResponsiveContainer width="90%" height={400}>
          <BarChart data={DATA}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            {/* NB: the explicit width removes some unecessary spacing on the y-axis. This should be fine for 3-digit numbers, but may need to be adjusted for larger numbers. */}
            <YAxis axisLine={false} tickLine={false} width={32} />
            <Bar
              dataKey="value"
              fill={token("colors.foreground.muted")}
              radius={10}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Skeleton width="90%" height={400} />
      )}
    </FeedbackCard>
  );
};

export default FeedbackOverview;
