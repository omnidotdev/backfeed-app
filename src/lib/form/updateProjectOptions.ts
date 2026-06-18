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
  // newly added links use a generated `pending-<n>-<ts>` rowId, so accept any
  // pending-prefixed id (not just the literal "pending")
  rowId: uuidSchema.or(z.string().startsWith("pending")),
  // pending links added in the form carry no projectId yet; the mutation always
  // uses the project's own rowId, so allow an empty value here so a newly added
  // link does not silently fail form validation (no save, no toast)
  projectId: uuidSchema.or(z.literal("")),
  // NB: need to allow an empty url for initial `pending` placeholder, this allows users to update other aspects of the form without needing to add a project link.
  url: urlSchema.or(z.literal("")),
  // saved links load back with `title: null` (the column is nullable), so accept
  // null/undefined here. `.optional()` alone rejects null and would silently
  // block the whole submit once an existing link is in the form (no save, no toast)
  title: z.string().nullish(),
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
