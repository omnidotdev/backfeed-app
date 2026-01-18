import { Button, HStack, Icon, Input, Label } from "@omnidev/sigil";
import { LuX } from "react-icons/lu";

import Favicon from "@/components/core/Favicon";
import Field from "@/components/form/Field";
import { token } from "@/generated/panda/tokens";
import { useFieldContext } from "@/lib/hooks/useForm";

import type {
  ButtonProps,
  InputProps,
  StackProps,
  TextProps,
} from "@omnidev/sigil";
import type { StandardSchemaV1Issue } from "@tanstack/react-form";

interface Props extends InputProps {
  /** Label for the input field. */
  label?: string;
  /** Field container props. */
  containerProps?: StackProps;
  /** Error map to determine issue message(s) to render. */
  errorMap?: StandardSchemaV1Issue[];
  /** Additional props for the error component. */
  errorProps?: TextProps;
  /** Whether to display the remove field trigger. */
  displayRemoveTrigger?: boolean;
  /** Additional props to be passed to the remove field trigger. */
  removeFieldProps?: ButtonProps;
}

/**
 * URL field component for form inputs.
 * Accepts full URLs and displays favicon preview.
 */
const URLField = ({
  label,
  containerProps,
  errorMap,
  errorProps,
  displayRemoveTrigger = true,
  removeFieldProps,
  ...props
}: Props) => {
  const { handleChange, state, name } = useFieldContext<string>();

  return (
    <Field errorMap={errorMap} errorProps={errorProps} {...containerProps}>
      {label && <Label htmlFor={name}>{label}</Label>}

      <HStack>
        <Favicon url={state.value} size={5} color="foreground.subtle" />

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
          <Input
            id={name}
            placeholder="https://example.com"
            value={state.value}
            onChange={(evt) => handleChange(evt.target.value)}
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
            <Icon src={LuX} />
          </Button>
        )}
      </HStack>
    </Field>
  );
};

export default URLField;
