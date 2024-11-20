import { Flex } from "@omnidev/sigil";

import { app } from "lib/config";
import { SectionContainer } from "components/layout";

/**
 * Feedback metrics for a project.
 */
const FeedbackMetrics = () => (
  <SectionContainer title={app.projectPage.feedbackMetrics.title}>
    <Flex>Feedback Stats</Flex>
  </SectionContainer>
);

export default FeedbackMetrics;
