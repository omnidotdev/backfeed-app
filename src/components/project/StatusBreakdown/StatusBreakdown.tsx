import { Flex } from "@omnidev/sigil";

import { app } from "lib/config";
import { SectionContainer } from "components/layout";

const StatusBreakdown = () => (
  <SectionContainer title={app.projectPage.statusBreakdown.title}>
    <Flex>Status Breakdown</Flex>
  </SectionContainer>
);

export default StatusBreakdown;
