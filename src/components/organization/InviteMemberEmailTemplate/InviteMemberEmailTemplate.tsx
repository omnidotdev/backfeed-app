import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Markdown,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { app } from "lib/config";

const inviteMemberDetails =
  app.organizationInvitationsPage.cta.inviteMember.emailTemplate;

export interface OrganizationInvitation {
  /** Username of the person sending the invite. */
  inviterUsername: string;
  /** Email of the person sending the invite. */
  inviterEmail: string;
  /** Name of the organization the invite is for. */
  organizationName: string;
  /** Email of the person receiving the invite. */
  recipientEmail: string;
  /** URL for the invitee to accept the invitation. */
  inviteUrl?: string;
}

/**
 * Invite member to an organziation email template.
 */
const InviteMemberEmailTemplate = ({
  inviterUsername,
  inviterEmail,
  organizationName,
  recipientEmail,
  inviteUrl,
}: OrganizationInvitation) => (
  <Html>
    <Head />
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#00a3a2",
              muted: "#666666",
            },
            borderColor: {
              subtle: "#eaeaea",
            },
          },
        },
      }}
    >
      <Body className="my-auto mx-auto font-sans px-2">
        <Container className="border border-solid border-subtle rounded my-10 mx-auto p-5 max-w-md">
          <Section className="mt-8">
            <Img
              src={`${app.productionUrl}/img/logo.png`}
              alt={`${app.name} logo`}
              width={80}
              height={40}
              className="my-0 mx-auto"
            />
          </Section>

          <Heading
            as="h1"
            className="text-2xl font-normal text-center p-0 my-8 mx-0"
          >
            <Markdown>
              {inviteMemberDetails.heading.replace(
                "{organizationName}",
                organizationName,
              )}
            </Markdown>
          </Heading>

          <Text className="text-sm leading-6">
            {inviteMemberDetails.greeting} {recipientEmail},
          </Text>

          <Markdown
            markdownCustomStyles={{
              link: { textDecoration: "underline" },
              p: { fontSize: 14, lineHeight: 24 },
            }}
          >
            {inviteMemberDetails.statement
              .replace("{inviterUsername}", inviterUsername)
              .replace("{inviterEmail}", inviterEmail)
              .replace("{organizationName}", organizationName)}
          </Markdown>

          <Section className="text-center my-8">
            <Link
              className="bg-brand rounded text-white text-xs font-semibold no-underline text-center px-5 py-3"
              href={inviteUrl}
            >
              {inviteMemberDetails.cta}
            </Link>
          </Section>

          <Hr className="border border-solid border-subtle my-6 mx-0 w-full" />

          <Text className="text-muted text-xs leading-6">
            {inviteMemberDetails.disclaimer}
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default InviteMemberEmailTemplate;
