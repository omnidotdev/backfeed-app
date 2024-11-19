import { Button, Flex, Icon, Stack, Text } from "@omnidev/sigil";

import type { ButtonProps, FlexProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface ActionButton extends ButtonProps {
  /** Button label. */
  label: string;
  /** Button icon. */
  icon: IconType;
}

interface Props extends FlexProps {
  /** Header section title. */
  title: string;
  /** Header section description. */
  description: string;
  /** Header section call to action buttons. */
  cta: ActionButton[];
  /** Header section greeting message. */
  greeting?: string;
}

/**
 * Page header. Used to display a title, description, and action buttons for each page.
 */
const PageHeader = ({ title, description, cta, greeting, ...rest }: Props) => (
  <Flex direction="column" w="100%" {...rest}>
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "flex-start", md: "center" }}
      justify="space-between"
      gap={4}
    >
      <Stack>
        <Text as="h1" fontSize="3xl" fontWeight="semibold" lineHeight={1.3}>
          {greeting ? `${greeting}, ${title}!` : title}
        </Text>

        <Text
          as="h2"
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="medium"
          color="foreground.subtle"
        >
          {description}
        </Text>
      </Stack>

      <Flex
        gap={4}
        width={{ base: "full", md: "auto" }}
        direction={{ base: "column", sm: "row" }}
      >
        {cta.map(({ label, icon, ...rest }) => (
          <Button
            key={label}
            size="sm"
            width={{ base: "full", md: "auto" }}
            {...rest}
          >
            <Icon src={icon} w={4} h={4} />

            <Text>{label}</Text>
          </Button>
        ))}
      </Flex>
    </Flex>
  </Flex>
);

export default PageHeader;
