import { Button, HStack, Icon, Input, Label, Text } from "@omnidev/sigil";
import { FiX } from "react-icons/fi";

import { Field } from "components/form";
import { token } from "generated/panda/tokens";
import { useFieldContext } from "lib/hooks";

import type { ButtonProps, InputProps, StackProps } from "@omnidev/sigil";
import type { FormFieldErrorProps } from "components/form";
import type { IconType } from "react-icons";

interface Props extends InputProps {
  /** URL icon. */
  icon: IconType;
  /** Label for the input field. */
  label?: string;
  /** Field container props. */
  containerProps?: StackProps;
  /** Additional props for the error component. */
  errorProps?: Partial<FormFieldErrorProps>;
  /** Whether to display the remove field trigger. */
  displayRemoveTrigger?: boolean;
  /** Additional props to be passed to the remove field trigger. */
  removeFieldProps?: ButtonProps;
}

/**
 * URL field component for form inputs.
 */
const URLField = ({
  icon,
  label,
  containerProps,
  errorProps,
  displayRemoveTrigger = true,
  removeFieldProps,
  ...props
}: Props) => {
  const { handleChange, state, name } = useFieldContext<string>();

  return (
    <Field errorProps={errorProps} {...containerProps}>
      {label && <Label htmlFor={name}>{label}</Label>}

      <HStack>
        <Icon src={icon} />

        <HStack
          gap={0}
          flex={1}
          overflow="hidden"
          borderWidth="1px"
          borderRadius="sm"
          borderColor="border.subtle"
          transitionDuration="normal"
          transitionProperty="box-shadow, border-color"
          transitionTimingFunction="default"
          _focusWithin={{
            borderColor: "accent.default",
            boxShadow: `0 0 0 1px ${token("colors.accent.default")}`,
          }}
        >
          <Text p={2} bgColor="background.subtle">
            https://
          </Text>

          <Input
            id={name}
            placeholder="github.com/..."
            value={state.value.replace(/^(https:\/\/|http:\/\/)/i, "")}
            onChange={(evt) => {
              const updatedValue = evt.target.value.replace(
                /^(https:\/\/|http:\/\/)/i,
                "",
              );

              updatedValue.length
                ? handleChange(`https://${updatedValue}`)
                : handleChange("");
            }}
            borderLeftRadius={0}
            borderWidth={0}
            _focus={{
              boxShadow: "none",
            }}
            {...props}
          />
        </HStack>

        {displayRemoveTrigger && (
          <Button
            variant="icon"
            bgColor="transparent"
            color={{
              base: "foreground.subtle",
              _hover: {
                base: "omni.ruby",
                _disabled: "foreground.subtle",
              },
            }}
            opacity={{ _disabled: 0.8 }}
            {...removeFieldProps}
          >
            <Icon src={FiX} />
          </Button>
        )}
      </HStack>
    </Field>
  );
};

export default URLField;
