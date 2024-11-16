"use client";

import { useIsClient, useReadLocalStorage } from "@omnidev/sigil";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { FeedbackCard } from "components/dashboard";
import { colorModeLocalStorageKey } from "components/layout";
import { token } from "generated/panda/tokens";

const getRandonInteger = () => Math.floor(Math.random() * 100);

/**
 * Feedback overview section.
 */
const FeedbackOverview = () => {
  const theme = useReadLocalStorage(colorModeLocalStorageKey),
    isClient = useIsClient();

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
            fill={
              theme === "dark"
                ? token("colors.brand.primary.900a")
                : token("colors.brand.primary.400a")
            }
          />
        </BarChart>
      )}
    </FeedbackCard>
  );
};

export default FeedbackOverview;
