import { Flex } from "@omnidev/sigil";

import { FeedbackOverview, RecentFeedback } from "components/dashboard";

const Feedback = () => (
  <Flex h="100%" w="100%" align="center" gap={6}>
    <FeedbackOverview />

    <RecentFeedback />
  </Flex>
);

export default Feedback;
