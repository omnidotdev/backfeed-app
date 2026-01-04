import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";

import InviteMemberEmailTemplate from "@/components/email/InviteMemberEmailTemplate";
import app from "@/lib/config/app.config";
import { FROM_EMAIL_ADDRESS, TO_EMAIL_ADDRESS } from "@/lib/config/env.config";
import { authMiddleware } from "@/server/middleware";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailTemplate =
  app.workspaceInvitationsPage.cta.inviteMember.emailTemplate;

const inviteSchema = z.object({
  inviterUsername: z.string(),
  inviterEmail: z.email(),
  workspaceName: z.string(),
  recipientEmail: z.email(),
});

export const Route = createFileRoute("/api/invite")({
  server: {
    middleware: [authMiddleware],
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();

        const result = await inviteSchema.safeParseAsync(body);

        if (!result.success)
          return json(
            { error: result.error },
            {
              status: 500,
            },
          );

        const { inviterEmail, inviterUsername, recipientEmail, workspaceName } =
          result.data;

        const { data, error } = await resend.emails.send({
          from: `${app.organization.name} Support <${FROM_EMAIL_ADDRESS}>`,
          to: TO_EMAIL_ADDRESS || recipientEmail,
          subject: `${emailTemplate.subject.value1} ${workspaceName} ${emailTemplate.subject.value2} ${app.name}`,
          react: InviteMemberEmailTemplate({
            inviterUsername,
            inviterEmail,
            workspaceName,
            recipientEmail,
            // TODO: Route to sign in page
            inviteUrl: process.env.VITE_BASE_URL!,
          }),
        });

        if (error) return json({ error }, { status: 500 });

        return json({ data });
      },
    },
  },
});
