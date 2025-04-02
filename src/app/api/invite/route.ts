import { Resend } from "resend";

import { InviteMemberEmailTemplate } from "components/organization";
import { app, isDevEnv } from "lib/config";

import type { NextRequest } from "next/server";
import type { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const invitedByEmail = searchParams.get("email")!,
    invitedByUsername = searchParams.get("username")!,
    inviteeEmail = searchParams.get("inviteeEmail")!,
    organizationName = searchParams.get("organizationName")!;

  try {
    const { data, error } = await resend.emails.send({
      from: `Backfeed Support <${isDevEnv ? "onboarding@resend.dev" : app.supportEmail}>`,
      to: isDevEnv ? "delivered@resend.dev" : inviteeEmail,
      subject: `${app.organizationMembersPage.cta.inviteMember.emailTemplate.subject.value1} ${organizationName} ${app.organizationMembersPage.cta.inviteMember.emailTemplate.subject.value2} ${app.name}`,
      react: InviteMemberEmailTemplate({
        invitedByUsername,
        invitedByEmail,
        organizationName,
        inviteeEmail,
        // TODO: Route to sign in page
        inviteLink: isDevEnv
          ? process.env.NEXT_PUBLIC_BASE_URL!
          : app.productionUrl,
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
