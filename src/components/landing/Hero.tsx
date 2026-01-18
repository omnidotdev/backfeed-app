import { Button, Flex, Icon, Text, VStack, css } from "@omnidev/sigil";
import { useSearch } from "@tanstack/react-router";
import {
  FiArrowDown,
  FiArrowRight,
  FiArrowUp,
  FiMessageCircle,
} from "react-icons/fi";

import signIn from "@/lib/auth/signIn";
import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";

import type { ButtonProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

// Mockup feedback items for the hero graphic
const MOCK_FEEDBACK = [
  {
    title: "Dark mode support",
    description: "Add a dark theme option for the dashboard",
    upvotes: 47,
    downvotes: 5,
    comments: 12,
    status: "In Progress",
    statusColor: "blue",
  },
  {
    title: "Export to CSV",
    description: "Allow exporting feedback data to spreadsheets",
    upvotes: 31,
    downvotes: 3,
    comments: 5,
    status: "Planned",
    statusColor: "purple",
  },
  {
    title: "Slack integration",
    description: "Get notified when new feedback is submitted",
    upvotes: 24,
    downvotes: 5,
    comments: 8,
    status: "Under Review",
    statusColor: "amber",
  },
];

interface ActionProps extends ButtonProps {
  label: {
    short: string;
    long: string;
  };
  icon?: IconType;
}

/**
 * Landing page hero section.
 */
const Hero = () => {
  const { returnTo } = useSearch({ from: "/" });

  const redirectUrl = returnTo || `${BASE_URL}/dashboard`;

  const actions: ActionProps[] = [
    {
      label: {
        short: "Start Free",
        long: "Start Collecting Feedback",
      },
      icon: FiArrowRight,
      onClick: () => signIn({ redirectUrl }),
    },
    {
      label: {
        short: "Docs",
        long: "View Docs",
      },
      variant: "outline",
      onClick: () => window.open(app.docsUrl, "_blank", "noopener,noreferrer"),
    },
  ];

  return (
    <Flex
      position="relative"
      direction="column"
      align="center"
      justify="center"
      w="full"
      minH={{ base: "calc(100vh - 5rem)", md: "85vh" }}
      overflow="hidden"
      px={6}
    >
      {/* Gradient orbs for cosmic effect */}
      <div
        className={css({
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "full",
          background: "glow.ruby",
          filter: "blur(120px)",
          opacity: { base: 0.4, _dark: 0.6 },
          pointerEvents: "none",
          animation: "pulse-glow 8s ease-in-out infinite",
        })}
      />
      <div
        className={css({
          position: "absolute",
          bottom: "-10%",
          left: "-15%",
          width: "600px",
          height: "600px",
          borderRadius: "full",
          background: "glow.magenta",
          filter: "blur(140px)",
          opacity: { base: 0.3, _dark: 0.5 },
          pointerEvents: "none",
          animation: "pulse-glow 10s ease-in-out infinite",
          animationDelay: "-3s",
        })}
      />
      <div
        className={css({
          position: "absolute",
          top: "30%",
          left: "20%",
          width: "300px",
          height: "300px",
          borderRadius: "full",
          background: "glow.ruby",
          filter: "blur(100px)",
          opacity: { base: 0.2, _dark: 0.3 },
          pointerEvents: "none",
          animation: "float 12s ease-in-out infinite",
        })}
      />

      {/* Content */}
      <VStack gap={0} maxW="4xl" zIndex={1} textAlign="center" pt={8}>
        {/* Badge */}
        <Flex
          align="center"
          gap={2}
          px={4}
          py={1.5}
          mb={6}
          borderRadius="full"
          borderWidth="1px"
          borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
          bgColor={{ base: "white/80", _dark: "neutral.900/60" }}
          backdropFilter="blur(8px)"
        >
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={{ base: "brand.primary.600", _dark: "brand.primary.400" }}
          >
            Open Source Feedback Platform
          </Text>
        </Flex>

        {/* Headline */}
        <Text
          as="h1"
          fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "7xl" }}
          fontWeight="bold"
          lineHeight={1.1}
          textWrap="balance"
          mb={6}
        >
          Feedback that drives products forward
        </Text>

        {/* Subheadline */}
        <Text
          as="h2"
          color="foreground.subtle"
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontWeight="medium"
          lineHeight={1.5}
          textWrap="pretty"
          maxW="2xl"
          mb={10}
        >
          Collect, prioritize, and act on user feedback. Build what your users
          actually want.
        </Text>

        {/* CTAs */}
        <Flex gap={4} flexWrap="wrap" justify="center">
          {actions.map(({ label, icon: ActionIcon, variant, ...rest }, idx) => (
            <Button
              key={label.long}
              size="md"
              variant={variant}
              data-group
              className={css({
                fontWeight: "medium",
                transition: "all 0.2s ease",
                ...(idx === 0 && {
                  boxShadow: "0 4px 12px -2px oklch(0.650 0.220 6 / 0.2)",
                  _hover: {
                    boxShadow: "0 8px 20px -4px oklch(0.650 0.220 6 / 0.3)",
                    transform: "translateY(-1px)",
                  },
                }),
                ...(idx === 1 && {
                  borderColor: { base: "neutral.300", _dark: "neutral.700" },
                  _hover: {
                    borderColor: "primary",
                    color: "primary",
                    transform: "translateY(-1px)",
                  },
                }),
              })}
              {...rest}
            >
              <Text display={{ base: "inline", md: "none" }}>
                {label.short}
              </Text>
              <Text display={{ base: "none", md: "inline" }}>{label.long}</Text>
              {ActionIcon && (
                <Icon
                  src={ActionIcon}
                  h={4}
                  w={4}
                  className={css({
                    transition: "transform 0.2s ease",
                    _groupHover: { transform: "translateX(4px)" },
                  })}
                />
              )}
            </Button>
          ))}
        </Flex>

        {/* Hero Graphic - Feedback Board Mockup */}
        <Flex
          direction="column"
          w="full"
          maxW="3xl"
          mt={16}
          mb={12}
          borderRadius="2xl"
          borderWidth="1px"
          borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
          bgColor={{ base: "white/90", _dark: "neutral.900/80" }}
          backdropFilter="blur(12px)"
          overflow="hidden"
          className={css({
            boxShadow: {
              base: "0 25px 50px -12px oklch(0 0 0 / 0.15)",
              _dark: "0 25px 50px -12px oklch(0 0 0 / 0.5)",
            },
          })}
        >
          {/* Header bar */}
          <Flex
            align="center"
            justify="space-between"
            px={5}
            py={3}
            borderBottomWidth="1px"
            borderColor={{ base: "neutral.100", _dark: "neutral.800" }}
            bgColor={{ base: "neutral.50", _dark: "neutral.900" }}
          >
            <Text fontSize="sm" fontWeight="medium" color="foreground.muted">
              Feature Requests
            </Text>
            <Flex
              px={2.5}
              py={1}
              borderRadius="md"
              bgColor={{ base: "brand.primary.50", _dark: "brand.primary.950" }}
            >
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color={{
                  base: "brand.primary.600",
                  _dark: "brand.primary.400",
                }}
              >
                3 items
              </Text>
            </Flex>
          </Flex>

          {/* Feedback items */}
          <Flex direction="column" p={2}>
            {MOCK_FEEDBACK.map((item, idx) => (
              <Flex
                key={item.title}
                align="flex-start"
                gap={4}
                p={4}
                borderRadius="xl"
                className={css({
                  transition: "background 0.2s ease",
                  _hover: {
                    bgColor: { base: "neutral.50", _dark: "neutral.800/50" },
                  },
                  animation: "fade-in-up 0.5s ease forwards",
                  animationDelay: `${idx * 0.1}s`,
                  opacity: 0,
                })}
              >
                {/* Vote button */}
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  minW={12}
                  py={2}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={{ base: "neutral.200", _dark: "neutral.700" }}
                  bgColor={{ base: "white", _dark: "neutral.800" }}
                  className={css({
                    transition: "all 0.2s ease",
                  })}
                >
                  <Icon
                    src={FiArrowUp}
                    w={4}
                    h={4}
                    color={{
                      base: "brand.primary.500",
                      _dark: "brand.primary.400",
                    }}
                  />
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    color="foreground.default"
                    mt={0.5}
                  >
                    {item.upvotes - item.downvotes}
                  </Text>
                  <Icon
                    src={FiArrowDown}
                    w={4}
                    h={4}
                    color="foreground.muted"
                  />
                </Flex>

                {/* Content */}
                <Flex direction="column" flex={1} gap={1}>
                  <Flex align="center" justify="space-between" gap={3}>
                    <Text
                      fontSize="md"
                      fontWeight="semibold"
                      color="foreground.default"
                      textAlign="left"
                    >
                      {item.title}
                    </Text>
                    <Flex
                      px={2.5}
                      py={1}
                      borderRadius="full"
                      bgColor={{
                        base: `${item.statusColor}.100`,
                        _dark: `${item.statusColor}.900/40`,
                      }}
                    >
                      <Text
                        fontSize="xs"
                        fontWeight="medium"
                        color={{
                          base: `${item.statusColor}.700`,
                          _dark: `${item.statusColor}.400`,
                        }}
                        whiteSpace="nowrap"
                      >
                        {item.status}
                      </Text>
                    </Flex>
                  </Flex>
                  <Text
                    fontSize="sm"
                    color="foreground.muted"
                    textAlign="left"
                    lineHeight={1.5}
                  >
                    {item.description}
                  </Text>
                  <Flex align="center" gap={1} mt={1}>
                    <Icon
                      src={FiMessageCircle}
                      w={3.5}
                      h={3.5}
                      color="foreground.subtle"
                    />
                    <Text fontSize="xs" color="foreground.subtle">
                      {item.comments} comments
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default Hero;
