import { Button, Icon, Label, Stack } from "@omnidev/sigil";
import { withForm } from "lib/hooks";
import { useProjectFormOptions } from "lib/hooks/form";
import { getSocialMediaIcon } from "lib/util";
import { FiPlus } from "react-icons/fi";

// biome-ignore lint/suspicious/noExplicitAny: Everything is type safe within `withForm` due to `formOptions`, but generic handling in this case is extremely verbose
const UpdateSocials = ({ form }: { form: any }) => {
  const { formOptions, DEFAULT_PENDING_SOCIAL, MAX_PROJECT_SOCIALS } =
    useProjectFormOptions();

  return withForm({
    ...formOptions,
    render: ({ form: { Field, AppField } }) => (
      <Field name="projectSocials" mode="array">
        {({ state: arrayState, pushValue, removeValue }) => (
          <Stack gap={5}>
            <Label mb={-4}>Social Media</Label>

            {/* TODO: add functionality to reorder these socials. Should update the array order for project page */}
            {arrayState.value.map((social, i) => (
              <AppField
                key={`${social?.rowId}-${i}`}
                name={`projectSocials[${i}].url`}
              >
                {({ UrlField, state, setValue }) => (
                  <UrlField
                    icon={getSocialMediaIcon(state.value)}
                    removeFieldProps={{
                      // NB: disallow removing the initial field if it is in a pending state (i.e. no project socials have been created) or has been cleared
                      disabled:
                        (social?.rowId === "pending" || !state.value.length) &&
                        i === 0,
                      onClick: (evt) => {
                        evt.preventDefault();

                        // NB: if there is only one social, just reset the value to disallow removing the full field
                        social?.rowId !== "pending" &&
                        arrayState.value.length === 1
                          ? setValue("")
                          : removeValue(i);
                      },
                    }}
                    errorProps={{
                      top: -5,
                      right: 12,
                    }}
                  />
                )}
              </AppField>
            ))}

            {arrayState.value.length < MAX_PROJECT_SOCIALS && (
              <Button
                size="sm"
                variant="outline"
                w="fit"
                onClick={(evt) => {
                  evt.preventDefault();
                  pushValue(DEFAULT_PENDING_SOCIAL);
                }}
              >
                <Icon src={FiPlus} />
                Add
              </Button>
            )}
          </Stack>
        )}
      </Field>
    ),
  })({ form });
};

export default UpdateSocials;
