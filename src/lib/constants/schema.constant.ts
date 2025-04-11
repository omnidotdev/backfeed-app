import { z } from "zod";

import { app } from "lib/config";

// TODO: update `app.config.ts` references here to make them more universal

export const emptyStringAsUndefined = z.literal("").transform(() => undefined);

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, app.forms.errors.slug.regex)
  .min(3, app.forms.errors.slug.minLength)
  .max(50, app.forms.errors.slug.maxLength);

export const uuidSchema = z.string().uuid(app.forms.errors.id.format);
