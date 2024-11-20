import { Flex } from "@omnidev/sigil";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

/**
 * Feedback metrics for a project.
 */
const FeedbackMetrics = () => (
  <SectionContainer title={app.projectPage.feedbackMetrics.title}>
    <Flex>Feedback Stats</Flex>
  </SectionContainer>
);

export default FeedbackMetrics;
