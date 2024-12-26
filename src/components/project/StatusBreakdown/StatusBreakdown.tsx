"use client";

import { Badge, Flex, Text } from "@omnidev/sigil";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

// TODO: Discuss status breakdown and how they should appear as badges when appropriate..

/**
 * Status breakdown for a project.
 */
const StatusBreakdown = () => (
  <SectionContainer title={app.projectPage.statusBreakdown.title}>
    <Flex justifyContent="space-between" align="center">
      <Badge>{app.projectPage.statusBreakdown.status.new}</Badge>

      <Text>69</Text>
    </Flex>

    <Flex justifyContent="space-between" align="center">
      <Badge>{app.projectPage.statusBreakdown.status.planned}</Badge>

      <Text>69</Text>
    </Flex>

    <Flex justifyContent="space-between" align="center">
      <Badge>{app.projectPage.statusBreakdown.status.inProgress}</Badge>

      <Text>69</Text>
    </Flex>

    <Flex justifyContent="space-between" align="center">
      <Badge>{app.projectPage.statusBreakdown.status.completed}</Badge>

      <Text>69</Text>
    </Flex>
  </SectionContainer>
);

export default StatusBreakdown;
