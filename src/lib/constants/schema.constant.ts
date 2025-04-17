import { z } from "zod";

import { app } from "lib/config";

// TODO: discuss where we want to utilize this regex.
export const standardRegex = /^[\p{L}\p{N}\s]+$/u;

const emptyStringAsUndefined = z.literal("").transform(() => undefined);

export const slugSchema = z
  .string()
  .regex(standardRegex, app.forms.errors.slug.regex)
  .min(3, app.forms.errors.slug.minLength)
  .max(50, app.forms.errors.slug.maxLength);

export const uuidSchema = z.string().uuid(app.forms.errors.id.format);

export const organizationSchema = z
  .string()
  .trim()
  .regex(
    standardRegex,
    app.dashboardPage.cta.newOrganization.organizationName.errors.invalidFormat
  )
  .min(
    3,
    app.dashboardPage.cta.newOrganization.organizationName.errors.minLength
  )
  .max(
    90,
    app.dashboardPage.cta.newOrganization.organizationName.errors.maxLength
  );

export const titleSchema = z
  .string()
  .trim()
  .regex(
    standardRegex,
    app.projectPage.projectFeedback.createFeedback.errors.invalid
  )
  .min(3, app.projectPage.projectFeedback.createFeedback.errors.minTitleLength)
  .max(
    90,
    app.projectPage.projectFeedback.createFeedback.errors.maxTitleLength
  );

export const projectNameSchema = z
  .string()
  .trim()
  .regex(
    standardRegex,
    app.dashboardPage.cta.newProject.projectName.errors.invalid
  )
  .min(3, app.dashboardPage.cta.newProject.projectName.errors.minLength)
  .max(60, app.dashboardPage.cta.newProject.projectName.errors.maxLength);

const updateProjectDetails = app.projectSettingsPage.cta.updateProject;

export const projectDescriptionSchema = emptyStringAsUndefined.or(
  z
    .string()
    .trim()
    .min(10, updateProjectDetails.fields.projectDescription.errors.minLength)
    .max(240, updateProjectDetails.fields.projectDescription.errors.maxLength)
);

// TODO: It looks like projectDescriptionSchema is set up very similarly to projectFeedbackDescriptionSchema. Discuss picking one and using in both places.
const MAX_DESCRIPTION_LENGTH = 240;
export const projectFeedbackDescriptionSchema = z
  .string()
  .trim()
  .min(
    10,
    app.projectPage.projectFeedback.createFeedback.errors.minDescriptionLength
  )
  .max(
    MAX_DESCRIPTION_LENGTH,
    app.projectPage.projectFeedback.createFeedback.errors.maxDescriptionLength
  );

const updateProjectStatuses = app.projectSettingsPage.cta.updateProjectStatuses;

export const statusNameSchema = z
  .string()
  .trim()
  .regex(standardRegex, updateProjectStatuses.fields.status.errors.invalid)
  .min(3, updateProjectStatuses.fields.status.errors.minLength)
  .max(20, updateProjectStatuses.fields.status.errors.maxLength);

export const statusDescriptionSchema = z
  .string()
  .trim()
  .min(10, updateProjectStatuses.fields.description.errors.minLength)
  .max(40, updateProjectStatuses.fields.description.errors.maxLength);

export const statusColorSchema = z
  .string()
  .startsWith("#", updateProjectStatuses.fields.color.errors.startsWith)
  .length(7, updateProjectStatuses.fields.color.errors.length);
