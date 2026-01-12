import { Flex, Text } from "@omnidev/sigil";

/**
 * Social proof section - simplified for early stage.
 */
const SocialProof = () => (
  <Flex
    direction="column"
    w="full"
    py={{ base: 12, md: 16 }}
    px={{ base: 6, md: 12 }}
    align="center"
    bgColor="background.default"
  >
    <Flex
      gap={{ base: 4, md: 8 }}
      align="center"
      justify="center"
      flexWrap="wrap"
    >
      <Flex
        align="center"
        gap={2}
        px={4}
        py={2}
        borderRadius="full"
        borderWidth="1px"
        borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
        bgColor={{ base: "neutral.50", _dark: "neutral.900/50" }}
      >
        <Text fontSize="sm" fontWeight="medium" color="foreground.muted">
          Open Source
        </Text>
      </Flex>

      <Flex
        align="center"
        gap={2}
        px={4}
        py={2}
        borderRadius="full"
        borderWidth="1px"
        borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
        bgColor={{ base: "neutral.50", _dark: "neutral.900/50" }}
      >
        <Text fontSize="sm" fontWeight="medium" color="foreground.muted">
          Self-hostable
        </Text>
      </Flex>

      <Flex
        align="center"
        gap={2}
        px={4}
        py={2}
        borderRadius="full"
        borderWidth="1px"
        borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
        bgColor={{ base: "neutral.50", _dark: "neutral.900/50" }}
      >
        <Text fontSize="sm" fontWeight="medium" color="foreground.muted">
          Privacy-first
        </Text>
      </Flex>

      <Flex
        align="center"
        gap={2}
        px={4}
        py={2}
        borderRadius="full"
        borderWidth="1px"
        borderColor={{ base: "green.200", _dark: "green.900" }}
        bgColor={{ base: "green.50", _dark: "green.950/50" }}
      >
        <Flex
          w={2}
          h={2}
          borderRadius="full"
          bgColor={{ base: "green.500", _dark: "green.400" }}
        />
        <Text
          fontSize="sm"
          fontWeight="medium"
          color={{ base: "green.700", _dark: "green.400" }}
        >
          99.9% Uptime
        </Text>
      </Flex>
    </Flex>
  </Flex>
);

export default SocialProof;
