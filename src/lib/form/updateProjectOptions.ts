import { formOptions } from "@tanstack/react-form";
import { z } from "zod";

import app from "@/lib/config/app.config";
import {
  projectDescriptionSchema,
  projectNameSchema,
  projectPrefixSchema,
  slugSchema,
  urlSchema,
  uuidSchema,
} from "@/lib/constants/schema.constant";
import getSdk from "@/lib/graphql/getSdk";
import generateSlug from "@/lib/util/generateSlug";
import { fetchSession } from "@/server/functions/auth";

const updateProjectDetails = app.projectSettingsPage.cta.updateProject;

// TODO adjust schemas in this file after closure on https://linear.app/omnidev/issue/OMNI-166/strategize-runtime-and-server-side-validation-approach and https://linear.app/omnidev/issue/OMNI-167/refine-validation-schemas

const projectLinkSchema = z.object({
  rowId: uuidSchema.or(z.literal("pending")),
  projectId: uuidSchema,
  // NB: need to allow an empty url for initial `pending` placeholder, this allows users to update other aspects of the form without needing to add a project link.
  url: urlSchema.or(z.literal("")),
  title: z.string().optional(),
  order: z.number(),
});

export type ProjectLink = z.infer<typeof projectLinkSchema>;

/** Schema for defining the shape of the update project form fields, as well as validating the form. */
const updateProjectSchema = z
  .object({
    name: projectNameSchema,
    description: projectDescriptionSchema,
    prefix: projectPrefixSchema,
    projectLinks: z.array(projectLinkSchema),
    organizationId: z.string(),
    currentSlug: slugSchema,
  })
  .superRefine(
    async ({ name, organizationId, currentSlug, projectLinks }, ctx) => {
      const uniqueLinks = new Set();

      for (const link of projectLinks) {
        const url = link.url;

        if (url && uniqueLinks.has(url)) {
          ctx.addIssue({
            code: "custom",
            message: updateProjectDetails.fields.projectLinks.errors.unique,
            path: ["projectLinks", projectLinks.indexOf(link), "url"],
          });
        } else if (url) {
          uniqueLinks.add(url);
        }
      }

      const { session } = await fetchSession();

      const updatedSlug = generateSlug(name);

      if (!updatedSlug?.length || currentSlug === updatedSlug || !session)
        return z.NEVER;

      const sdk = await getSdk();

      const { projects } = await sdk.Project({
        projectSlug: updatedSlug,
        organizationId,
      });

      if (projects?.nodes?.length) {
        ctx.addIssue({
          code: "custom",
          message: updateProjectDetails.fields.projectSlug.errors.duplicate,
          path: ["name"],
        });
      }
    },
  );

export const updateProjectOptions = formOptions({
  defaultValues: {} as z.input<typeof updateProjectSchema>,
  validators: {
    onSubmitAsync: updateProjectSchema,
  },
});
