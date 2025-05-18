"use client";

import {
  Button,
  Divider,
  Grid,
  HStack,
  Icon,
  Input,
  Label,
  Stack,
  Text,
  sigil,
} from "@omnidev/sigil";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";

import { SectionContainer } from "components/layout";
import { UpdateStatuses } from "components/project";
import {
  useCreateProjectSocialMutation,
  useDeleteProjectSocialMutation,
  useProjectQuery,
  useUpdateProjectMutation,
  useUpdateProjectSocialMutation,
} from "generated/graphql";
import { app, isDevEnv } from "lib/config";
import {
  DEBOUNCE_TIME,
  emptyStringAsUndefined,
  projectDescriptionSchema,
  projectNameSchema,
  slugSchema,
  uuidSchema,
} from "lib/constants";
import { getSdk } from "lib/graphql";
import { useForm } from "lib/hooks";
import { generateSlug, getAuthSession, getSocialMediaIcon } from "lib/util";

import { FormFieldError } from "components/form";
import type { ProjectQuery } from "generated/graphql";
import { token } from "generated/panda/tokens";
import { FiPlus, FiX } from "react-icons/fi";

const updateProjectDetails = app.projectSettingsPage.cta.updateProject;

const MAX_PROJECT_SOCIALS = 3;

// TODO adjust schemas in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

const projectSocialSchema = z.object({
  rowId: uuidSchema.or(z.literal("pending")),
  projectId: uuidSchema,
  // NB: need to allow an empty url for inital `pending` placeholder. These are filtered out below hwoever in `updateProjectSchema` to avoid triggering mutations
  url: z.string().url().min(1).max(255).or(z.literal("")),
});

type ProjectSocial = z.infer<typeof projectSocialSchema>;

/** Schema for defining the shape of the update project form fields, as well as validating the form. */
const updateProjectSchema = z
  .object({
    name: projectNameSchema,
    description: projectDescriptionSchema,
    website: emptyStringAsUndefined.or(z.string().url().min(1).max(255)),
    // Filter out socials that don't have a URL (i.e. initial pending social)
    projectSocials: z
      .array(projectSocialSchema)
      .refine((socials) => socials.filter((social) => !!social.url.length)),
    organizationSlug: slugSchema,
    currentSlug: slugSchema,
  })
  .superRefine(async ({ name, organizationSlug, currentSlug }, ctx) => {
    const session = await getAuthSession();

    const updatedSlug = generateSlug(name);

    if (!updatedSlug?.length || currentSlug === updatedSlug || !session)
      return z.NEVER;

    const sdk = getSdk({ session });

    const { projects } = await sdk.Project({
      projectSlug: updatedSlug,
      organizationSlug,
    });

    if (projects?.nodes?.length) {
      ctx.addIssue({
        code: "custom",
        message: updateProjectDetails.fields.projectSlug.errors.duplicate,
        path: ["name"],
      });
    }
  });

/**
 * Form for updating project details.
 */
const UpdateProject = () => {
  const queryClient = useQueryClient();

  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const router = useRouter();

  const { data: project } = useProjectQuery(
    {
      projectSlug,
      organizationSlug,
    },
    {
      placeholderData: keepPreviousData,
      select: (data) => data.projects?.nodes?.[0],
    },
  );

  const DEFAULT_PENDING_SOCIAL: ProjectSocial = {
    rowId: "pending",
    projectId: project?.rowId ?? "",
    url: "",
  };

  const { mutateAsync: createProjectSocial } = useCreateProjectSocialMutation();
  const { mutateAsync: updateProjectSocial } = useUpdateProjectSocialMutation();
  const { mutateAsync: deleteProjectSocial } = useDeleteProjectSocialMutation();

  const { mutateAsync: updateProject, isPending } = useUpdateProjectMutation({
    onMutate: (variables) => {
      const { name, description, slug } = variables.patch;

      const snapshot = queryClient.getQueryData(
        useProjectQuery.getKey({ projectSlug, organizationSlug }),
      ) as ProjectQuery;

      const project = snapshot.projects?.nodes?.[0];

      queryClient.setQueryData(
        useProjectQuery.getKey({ projectSlug, organizationSlug }),
        {
          projects: {
            ...snapshot.projects,
            nodes: [
              {
                ...project,
                name,
                description,
                slug,
              },
            ],
          },
        },
      );

      // ! NB: if the slug has been updated, optimistically update the query data for that slug
      if (slug !== projectSlug) {
        queryClient.setQueryData(
          useProjectQuery.getKey({ projectSlug: slug!, organizationSlug }),
          {
            projects: {
              ...snapshot.projects,
              nodes: [
                {
                  ...project,
                  name,
                  description,
                  slug,
                },
              ],
            },
          },
        );
      }
    },
    onSettled: (data) => {
      const updatedSlug = data?.updateProject?.project?.slug;

      if (updatedSlug) {
        queryClient.invalidateQueries({
          queryKey: useProjectQuery.getKey({
            projectSlug: updatedSlug,
            organizationSlug,
          }),
        });

        // NB: If the project slug was updated, we need to invalidate the query for the old slug due to the optimistic updates from `onMutate`
        if (updatedSlug !== projectSlug) {
          queryClient.invalidateQueries({
            queryKey: useProjectQuery.getKey({
              projectSlug,
              organizationSlug,
            }),
          });
        }

        router.replace(
          `/organizations/${organizationSlug}/projects/${updatedSlug}/settings`,
        );

        reset();
      }
    },
  });

  const { handleSubmit, Field, AppField, AppForm, SubmitForm, reset } = useForm(
    {
      defaultValues: {
        name: project?.name ?? "",
        description: project?.description ?? "",
        website: project?.website ?? "",
        projectSocials: (project?.projectSocials?.nodes?.length
          ? project?.projectSocials?.nodes
          : [DEFAULT_PENDING_SOCIAL]) as ProjectSocial[],
        organizationSlug,
        currentSlug: project?.slug ?? "",
      },
      asyncDebounceMs: DEBOUNCE_TIME,
      validators: {
        onSubmitAsync: updateProjectSchema,
      },
      onSubmit: async ({ value }) => {
        const currentSocials = value.projectSocials;

        const removedSocials = project?.projectSocials.nodes.filter(
          (social) =>
            !currentSocials.some(
              (currentSocial) => currentSocial.rowId === social?.rowId,
            ),
        );

        try {
          if (removedSocials?.length) {
            await Promise.all(
              removedSocials.map((social) =>
                deleteProjectSocial({
                  socialId: social?.rowId!,
                }),
              ),
            );
          }

          await Promise.all([
            updateProject({
              rowId: project?.rowId!,
              patch: {
                name: value.name,
                description: value.description,
                slug: generateSlug(value.name)!,
                website: value.website ?? undefined,
                updatedAt: new Date(),
              },
            }),
            currentSocials.map((social) => {
              if (social.rowId === "pending") {
                createProjectSocial({
                  input: {
                    projectSocial: {
                      projectId: social.projectId,
                      url: social.url,
                    },
                  },
                });
              } else {
                updateProjectSocial({
                  rowId: social.rowId,
                  patch: {
                    url: social.url,
                  },
                });
              }
            }),
          ]);
        } catch (err) {
          if (isDevEnv) console.error(err);
        }
      },
    },
  );

  return (
    <SectionContainer
      title={updateProjectDetails.title}
      description={updateProjectDetails.description}
    >
      <sigil.form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
      >
        <Grid columns={{ base: 1, lg: 2 }} gap={8}>
          <Stack gap={4}>
            <AppField name="name">
              {({ InputField }) => (
                <InputField
                  label={updateProjectDetails.fields.projectName.label}
                />
              )}
            </AppField>

            <AppField name="description">
              {({ InputField }) => (
                <InputField
                  label={updateProjectDetails.fields.projectDescription.label}
                />
              )}
            </AppField>

            <AppField name="website">
              {({ InputField }) => (
                <InputField
                  label="Website"
                  placeholder="https://backfeed.omni.dev"
                />
              )}
            </AppField>
          </Stack>

          {/* TODO: extract with `withForm` to reduce scope of this file */}
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
        </Grid>

        <AppForm>
          <SubmitForm
            action={updateProjectDetails.action}
            isPending={isPending}
            mt={4}
          />
        </AppForm>
      </sigil.form>

      {/* TODO: when ready to implement for production, remove the development environment check */}
      <Divider display={isDevEnv ? "inline" : "none"} />

      <UpdateStatuses projectId={project?.rowId!} />
    </SectionContainer>
  );
};

export default UpdateProject;
