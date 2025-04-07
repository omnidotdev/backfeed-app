import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { app } from "lib/config";

const inviteMemberDetails =
  app.organizationMembersPage.cta.inviteMember.emailTemplate;

interface OrganizationInvitation {
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

    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans px-2">
        <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
          <Section className="mt-[32px]">
            <Img
              src={`${app.productionUrl}/img/logo.png`}
              alt={`${app.name} logo`}
              width={80}
              height={40}
              className="my-0 mx-auto"
            />
          </Section>

          <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            {inviteMemberDetails.heading.value1}{" "}
            <strong>{organizationName}</strong>{" "}
            {inviteMemberDetails.heading.value2} <strong>{app.name}</strong>
          </Heading>

          <Text className="text-black text-[14px] leading-[24px]">
            {inviteMemberDetails.greeting} {recipientEmail},
          </Text>

          <Text className="text-black text-[14px] leading-[24px]">
            <strong>{inviterUsername}</strong> (
            <Link
              href={`mailto:${inviterEmail}`}
              className="text-blue-600 no-underline"
            >
              {inviterEmail}
            </Link>
            ) {inviteMemberDetails.statement.value1}{" "}
            <strong>{organizationName}</strong>{" "}
            {inviteMemberDetails.statement.value2} <strong>{app.name}</strong>.
          </Text>

          <Section className="text-center mt-[32px] mb-[32px]">
            <Link
              className="bg-[#00a3a2] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
              href={inviteUrl}
            >
              {inviteMemberDetails.cta}
            </Link>
          </Section>

          <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

          <Text className="text-[#666666] text-[12px] leading-[24px]">
            {inviteMemberDetails.disclaimer}
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default InviteMemberEmailTemplate;
