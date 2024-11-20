import { Flex } from "@omnidev/sigil";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

const StatusBreakdown = () => (
  <SectionContainer title={app.projectPage.statusBreakdown.title}>
    <Flex>Status Breakdown</Flex>
  </SectionContainer>
);

export default StatusBreakdown;
