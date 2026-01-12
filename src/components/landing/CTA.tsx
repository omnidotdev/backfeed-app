import { Button, Flex, Icon, Text, css } from "@omnidev/sigil";
import { FiArrowRight } from "react-icons/fi";

import signIn from "@/lib/auth/signIn";
import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";

/**
 * Final call to action section.
 */
const CTA = () => {
  const handleGetStarted = () => {
    signIn({ redirectUrl: `${BASE_URL}/dashboard` });
  };

  return (
    <Flex
      position="relative"
      direction="column"
      w="full"
      py={{ base: 20, md: 28 }}
      px={{ base: 6, md: 12 }}
      align="center"
      overflow="hidden"
      bgColor={{ base: "neutral.900", _dark: "neutral.950" }}
    >
      {/* Gradient orbs */}
      <div
        className={css({
          position: "absolute",
          top: "-30%",
          left: "10%",
          width: "500px",
          height: "500px",
          borderRadius: "full",
          background: "glow.ruby",
          filter: "blur(120px)",
          pointerEvents: "none",
        })}
      />
      <div
        className={css({
          position: "absolute",
          bottom: "-20%",
          right: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "full",
          background: "glow.magenta",
          filter: "blur(100px)",
          pointerEvents: "none",
        })}
      />

      {/* Content */}
      <Flex
        direction="column"
        align="center"
        textAlign="center"
        maxW="3xl"
        zIndex={1}
      >
        <Text
          as="h2"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          lineHeight={1.2}
          textWrap="balance"
          color="white"
          mb={6}
        >
          Ready to transform your feedback process?
        </Text>

        <Text
          fontSize={{ base: "lg", md: "xl" }}
          color="neutral.400"
          fontWeight="medium"
          maxW="xl"
          textWrap="pretty"
          mb={10}
        >
          Join thousands of teams already using {app.name} to build better
          products. Start free, no credit card required.
        </Text>

        <Flex gap={3} flexWrap="wrap" justify="center">
          <Button
            size="md"
            data-group
            onClick={handleGetStarted}
            className={css({
              fontWeight: "medium",
              boxShadow: "0 4px 12px -2px oklch(0.650 0.220 6 / 0.2)",
              transition: "all 0.2s ease",
              _hover: {
                boxShadow: "0 8px 20px -4px oklch(0.650 0.220 6 / 0.3)",
                transform: "translateY(-1px)",
              },
            })}
          >
            Get Started Free
            <Icon
              src={FiArrowRight}
              h={4}
              w={4}
              className={css({
                transition: "transform 0.2s ease",
                _groupHover: { transform: "translateX(3px)" },
              })}
            />
          </Button>

          <Button
            size="md"
            variant="outline"
            onClick={() =>
              window.open(app.docsUrl, "_blank", "noopener,noreferrer")
            }
            className="border-neutral-700 text-white font-medium transition-all duration-200 hover:border-primary hover:text-primary hover:-translate-y-px"
          >
            Read the Docs
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CTA;
