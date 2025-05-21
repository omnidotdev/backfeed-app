"use client";

import { Button, Icon, Label, Stack } from "@omnidev/sigil";
import { Reorder } from "motion/react";
import { FiPlus } from "react-icons/fi";

import { ReorderItem } from "components/core";
import { withForm } from "lib/hooks";
import { updateProjectFormOptions } from "lib/options/form";
import { getSocialMediaIcon } from "lib/util";

const MAX_PROJECT_SOCIALS = 4;

/**
 * Update Socials form. This is a child form for Update Project and expects the same shape for default values.
 */
const UpdateSocials = withForm({
  ...updateProjectFormOptions(),
  props: {
    projectId: "",
  },
  render: ({ form: { Field, AppField }, projectId }) => {
    const DEFAULT_PENDING_SOCIAL = {
      rowId: "pending",
      projectId,
      url: "",
    };

    return (
      <Field name="projectSocials" mode="array">
        {({ state: arrayState, pushValue, removeValue, setValue }) => (
          <Stack gap={5}>
            <Label mb={-4}>Social Media</Label>

            <Reorder.Group
              values={arrayState.value}
              onReorder={setValue}
              style={{
                display: "grid",
                gap: 16,
              }}
            >
              {arrayState.value.map((social, i) => (
                <ReorderItem
                  key={`${social?.rowId}-${i}`}
                  value={social}
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <AppField name={`projectSocials[${i}].url`}>
                    {({ UrlField, state, setValue }) => (
                      <UrlField
                        icon={getSocialMediaIcon(state.value)}
                        containerProps={{
                          flex: 1,
                        }}
                        removeFieldProps={{
                          // NB: disallow removing the initial field if it is in a pending state (i.e. no project socials have been created) or has been cleared
                          disabled:
                            (social?.rowId === "pending" ||
                              !state.value.length) &&
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
                </ReorderItem>
              ))}
            </Reorder.Group>

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
    );
  },
});

export default UpdateSocials;
