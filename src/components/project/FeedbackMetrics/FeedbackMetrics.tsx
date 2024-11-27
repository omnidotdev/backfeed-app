import { Flex, Text, Icon } from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";
import { PiArrowFatLineUpFill } from "react-icons/pi";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

/**
 * Feedback metrics for a project.
 */
const FeedbackMetrics = () => (
  <SectionContainer title={app.projectPage.feedbackMetrics.title}>
    <Flex justify="space-between" align="center">
      <Flex gap={2} align="center">
        <Icon src={HiOutlineFolder} />

        <Text color="foreground.muted">
          {app.projectPage.feedbackMetrics.totalFeedback}
        </Text>
      </Flex>

      <Text>69</Text>
    </Flex>

    <Flex justify="space-between" align="center">
      <Flex gap={2} align="center">
        <Icon src={PiArrowFatLineUpFill} />

        <Text color="foreground.muted">
          {app.projectPage.feedbackMetrics.totalUpvotes}
        </Text>
      </Flex>

      <Text>69</Text>
    </Flex>
  </SectionContainer>
);

export default FeedbackMetrics;
