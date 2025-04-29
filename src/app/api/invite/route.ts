import { Resend } from "resend";

import { auth } from "auth";
import { InviteMemberEmailTemplate } from "components/organization";
import {
  app,
  FROM_EMAIL_ADDRESS,
  isDevEnv,
  TO_EMAIL_ADDRESS,
} from "lib/config";

import type { OrganizationInvitation } from "components/organization";
import type { NextRequest } from "next/server";
import type { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailTemplate =
  app.organizationInvitationsPage.cta.inviteMember.emailTemplate;

/**
 * Organization invite route.
 */
export const POST = async (req: NextRequest) => {
  const session = await auth();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { inviterEmail, inviterUsername, recipientEmail, organizationName } =
      (await req.json()) as OrganizationInvitation;

    const { data, error } = await resend.emails.send({
      from: `${app.supportName} <${FROM_EMAIL_ADDRESS}>`,
      to: TO_EMAIL_ADDRESS || recipientEmail,
      subject: `${emailTemplate.subject.value1} ${organizationName} ${emailTemplate.subject.value2} ${app.name}`,
      react: InviteMemberEmailTemplate({
        inviterUsername,
        inviterEmail,
        organizationName,
        recipientEmail,
        // TODO: Route to sign in page
        inviteUrl: process.env.NEXT_PUBLIC_BASE_URL!,
      }) as ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
