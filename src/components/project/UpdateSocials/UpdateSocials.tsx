import {
  Button,
  HStack,
  Icon,
  Input,
  Label,
  Stack,
  Text,
} from "@omnidev/sigil";
import { FiPlus, FiX } from "react-icons/fi";

import { FormFieldError } from "components/form";
import { token } from "generated/panda/tokens";
import { withForm } from "lib/hooks";
import { useProjectFormOptions } from "lib/hooks/form";
import { getSocialMediaIcon } from "lib/util";

// biome-ignore lint/suspicious/noExplicitAny: TODO figure out how to pass types appropriately. Everything is type safe within `withForm`, but generic handling in this case is extremely verbose
const UpdateSocials = ({ form }: { form: any }) => {
  const { formOptions, DEFAULT_PENDING_SOCIAL, MAX_PROJECT_SOCIALS } =
    useProjectFormOptions();

  return withForm({
    ...formOptions,
    render: ({ form: { Field } }) => (
      <Field name="projectSocials" mode="array">
        {({ state: arrayState, pushValue, removeValue }) => (
          <Stack>
            <HStack justify="space-between" mb={2}>
              <Label>Social Media</Label>

              <Button
                size="sm"
                variant="outline"
                disabled={arrayState.value.length >= MAX_PROJECT_SOCIALS}
                onClick={(evt) => {
                  evt.preventDefault();
                  pushValue(DEFAULT_PENDING_SOCIAL);
                }}
              >
                <Icon src={FiPlus} />
                Add
              </Button>
            </HStack>

            {/* TODO: extract logic into custom `UrlField` component that can be reused across forms */}
            {/* TODO: add functionality to reorder these socials. Should update the array order for project page */}
            {arrayState.value.map((social, i) => (
              <Field
                key={`${social?.rowId}-${i}`}
                name={`projectSocials[${i}].url`}
              >
                {({ state, handleChange, setValue }) => (
                  <HStack position="relative" my={1.5}>
                    <Icon src={getSocialMediaIcon(state.value)} />

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
                        placeholder="twitter.com/..."
                        value={state.value.replace(
                          /^(https:\/\/|http:\/\/)/i,
                          "",
                        )}
                        onChange={(evt) => {
                          const updatedValue = evt.target.value.replace(
                            /^(https:\/\/|http:\/\/)/i,
                            "",
                          );

                          handleChange(`https://${updatedValue}`);
                        }}
                        borderLeftRadius={0}
                        borderWidth={0}
                        _focus={{
                          boxShadow: "none",
                        }}
                      />
                    </HStack>

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
                      // NB: disallow removing the initial field if it is in a pending state (i.e. no project socials have been created)
                      disabled={social?.rowId === "pending" && i === 0}
                      onClick={(evt) => {
                        evt.preventDefault();

                        // NB: if there is one one social, just reset the value to disallow removing the full field
                        social?.rowId !== "pending" &&
                        arrayState.value.length === 1
                          ? setValue("")
                          : removeValue(i);
                      }}
                    >
                      <Icon src={FiX} />
                    </Button>

                    <FormFieldError
                      errors={state.meta.errorMap.onSubmit}
                      top={-5}
                      right={12}
                    />
                  </HStack>
                )}
              </Field>
            ))}
          </Stack>
        )}
      </Field>
    ),
  })({ form });
};

export default UpdateSocials;
