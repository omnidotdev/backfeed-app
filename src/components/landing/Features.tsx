import { Flex, Grid, Icon, Text, css } from "@omnidev/sigil";
import {
  IoArrowUpCircleOutline,
  IoBarChartOutline,
  IoChatbubblesOutline,
  IoGitNetworkOutline,
} from "react-icons/io5";

const FEATURES = [
  {
    title: "Upvote & Prioritize",
    description:
      "Let users vote on what matters. See what's trending and prioritize based on real demand from your community.",
    icon: IoArrowUpCircleOutline,
  },
  {
    title: "Status Tracking",
    description:
      "Track feedback from New to Completed. Keep your community informed with visual status updates.",
    icon: IoGitNetworkOutline,
  },
  {
    title: "Threaded Discussions",
    description:
      "Dive deeper with comments and replies. Have real conversations about each piece of feedback.",
    icon: IoChatbubblesOutline,
  },
  {
    title: "Real-time Analytics",
    description:
      "See feedback trends at a glance. Weekly charts, status breakdowns, and engagement metrics to guide your decisions.",
    icon: IoBarChartOutline,
  },
];

/**
 * Landing page features section with bento grid layout.
 */
const Features = () => (
  <Flex
    direction="column"
    w="full"
    py={{ base: 16, md: 24 }}
    px={{ base: 6, md: 12 }}
    align="center"
    bgColor={{ base: "neutral.50", _dark: "neutral.950" }}
  >
    {/* Section header */}
    <Flex direction="column" align="center" textAlign="center" mb={12}>
      <Text
        fontSize={{ base: "sm", md: "md" }}
        fontWeight="semibold"
        color={{ base: "brand.primary.600", _dark: "brand.primary.400" }}
        textTransform="uppercase"
        letterSpacing="wide"
        mb={3}
      >
        Features
      </Text>

      <Text
        as="h2"
        fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
        fontWeight="bold"
        lineHeight={1.2}
        textWrap="balance"
        mb={4}
      >
        Everything you need to manage feedback
      </Text>

      <Text
        fontSize={{ base: "lg", md: "xl" }}
        color="foreground.subtle"
        fontWeight="medium"
        maxW="2xl"
        textWrap="pretty"
      >
        A comprehensive platform to collect, analyze, and act on user feedback
        effectively.
      </Text>
    </Flex>

    {/* Bento grid */}
    <Grid
      w="full"
      maxW="6xl"
      gap={4}
      columns={{ base: 1, lg: 2 }}
      gridAutoRows="minmax(220px, auto)"
    >
      {FEATURES.map(({ title, description, icon }) => (
        <Flex
          key={title}
          position="relative"
          direction="column"
          justify="space-between"
          p={{ base: 6, md: 8 }}
          borderRadius="2xl"
          borderWidth="1px"
          borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
          bgColor={{ base: "white", _dark: "neutral.900/50" }}
          overflow="hidden"
          className={css({
            backdropFilter: "blur(8px)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            _hover: {
              borderColor: {
                base: "brand.primary.300",
                _dark: "brand.primary.700",
              },
              boxShadow: {
                base: "0 20px 40px -10px oklch(0.650 0.220 6 / 0.15)",
                _dark: "0 20px 40px -10px oklch(0.650 0.220 6 / 0.25)",
              },
              transform: "translateY(-6px)",
            },
          })}
        >
          {/* Background gradient glow */}
          <div
            className={css({
              position: "absolute",
              top: "-50%",
              right: "-30%",
              width: "300px",
              height: "300px",
              borderRadius: "full",
              background: "glow.ruby",
              filter: "blur(80px)",
              opacity: { base: 0, _dark: 0 },
              pointerEvents: "none",
              transition: "opacity 0.4s ease",
              "[data-hover] &, :hover > &": {
                opacity: { base: 0.15, _dark: 0.25 },
              },
            })}
          />

          {/* Background icon */}
          <Icon
            src={icon}
            position="absolute"
            top="50%"
            right={-2}
            transform="translateY(-50%)"
            w={{ base: 28, md: 36 }}
            h={{ base: 28, md: 36 }}
            color={{
              base: "brand.primary.100",
              _dark: "brand.primary.900/30",
            }}
            opacity={{ base: 0.4, _dark: 0.2 }}
            className={css({
              transition: "all 0.4s ease",
            })}
          />

          {/* Content */}
          <Flex direction="column" zIndex={1} gap={3}>
            {/* Icon with gradient background */}
            <Flex
              align="center"
              justify="center"
              w={14}
              h={14}
              borderRadius="xl"
              bgGradient="to-br"
              gradientFrom={{
                base: "brand.primary.100",
                _dark: "brand.primary.900/60",
              }}
              gradientTo={{
                base: "brand.primary.50",
                _dark: "brand.primary.950/40",
              }}
              borderWidth="1px"
              borderColor={{
                base: "brand.primary.200",
                _dark: "brand.primary.800/50",
              }}
              className={css({
                boxShadow: {
                  base: "0 4px 12px -2px oklch(0.650 0.220 6 / 0.15)",
                  _dark: "0 4px 12px -2px oklch(0.650 0.220 6 / 0.2)",
                },
              })}
            >
              <Icon
                src={icon}
                w={7}
                h={7}
                color={{
                  base: "brand.primary.600",
                  _dark: "brand.primary.400",
                }}
              />
            </Flex>

            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              mt={2}
              letterSpacing="tight"
            >
              {title}
            </Text>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="foreground.muted"
              lineHeight={1.7}
            >
              {description}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Grid>
  </Flex>
);

export default Features;
