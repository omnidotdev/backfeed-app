"use client";

import { Grid } from "@omnidev/sigil";

import { FeedbackOverview, RecentFeedback } from "components/dashboard";

/**
 * Feedback section.
 */
const Feedback = () => (
  <Grid h="100%" w="100%" gap={6} columns={{ base: 1, md: 2 }}>
    <FeedbackOverview />

    <RecentFeedback />
  </Grid>
);

export default Feedback;
