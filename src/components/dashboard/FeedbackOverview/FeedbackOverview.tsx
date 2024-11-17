"use client";

import { useIsClient } from "@omnidev/sigil";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { FeedbackCard } from "components/dashboard";
import { token } from "generated/panda/tokens";

const getRandonInteger = () => Math.floor(Math.random() * 100);

/**
 * Feedback overview section.
 */
const FeedbackOverview = () => {
  const isClient = useIsClient();

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
      {isClient && (
        <BarChart width={500} height={400} data={DATA}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Bar
            dataKey="value"
            fill={token("colors.foreground.muted")}
            radius={10}
          />
        </BarChart>
      )}
    </FeedbackCard>
  );
};

export default FeedbackOverview;
