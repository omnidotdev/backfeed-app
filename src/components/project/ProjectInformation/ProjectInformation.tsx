import { Flex } from "@omnidev/sigil";

import { app } from "lib/config";
import { SectionContainer } from "components/layout";

const ProjectInformation = () => (
  <SectionContainer title={app.projectPage.projectInformation.title}>
    <Flex>Project Information</Flex>
  </SectionContainer>
);

export default ProjectInformation;
