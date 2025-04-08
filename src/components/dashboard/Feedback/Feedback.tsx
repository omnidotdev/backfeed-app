"use client";

import { Grid } from "@omnidev/sigil";

import { FeedbackOverview, RecentFeedback } from "components/dashboard";

import type { User } from "generated/graphql";

interface Props {
  userId: User["rowId"];
}

/**
 * Feedback section.
 */
const Feedback = ({ userId }: Props) => (
  <Grid h="100%" w="100%" gap={6} columns={{ base: 1, xl: 2 }}>
    <FeedbackOverview userId={userId} />

    <RecentFeedback userId={userId} />
  </Grid>
);

export default Feedback;
