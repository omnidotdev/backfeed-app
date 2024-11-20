import { Flex } from "@omnidev/sigil";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

const ProjectInformation = () => (
  <SectionContainer title={app.projectPage.projectInformation.title}>
    <Flex>Project Information</Flex>
  </SectionContainer>
);

export default ProjectInformation;
