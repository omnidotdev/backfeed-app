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

interface Props {
  /** Username of the inviter. */
  invitedByUsername: string;
  /** Email of the inviter. */
  invitedByEmail: string;
  /** Organization name. */
  organizationName: string;
  /** Email of the invitee. */
  inviteeEmail: string;
  /** Invite link. */
  inviteLink: string;
}

// TODO: add all static text to config file.

/**
 * Invite member to an organziation email template.
 */
const InviteMemberEmailTemplate = ({
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteeEmail,
  inviteLink,
}: Props) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans px-2">
        <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
          <Section className="mt-[32px]">
            <Img
              src="https://localhost:3000/img/logo.png"
              alt={`${app.name} logo`}
              width={80}
              height={40}
              className="my-0 mx-auto"
            />
          </Section>

          <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            Join <strong>{organizationName}</strong> on{" "}
            <strong>{app.name}</strong>
          </Heading>

          <Text className="text-black text-[14px] leading-[24px]">
            Hello {inviteeEmail},
          </Text>

          <Text className="text-black text-[14px] leading-[24px]">
            <strong>{invitedByUsername}</strong> (
            <Link
              href={`mailto:${invitedByEmail}`}
              className="text-blue-600 no-underline"
            >
              {invitedByEmail}
            </Link>
            ) has invited you to the <strong>{organizationName}</strong>{" "}
            organization on <strong>{app.name}</strong>.
          </Text>

          <Section className="text-center mt-[32px] mb-[32px]">
            <Link
              className="bg-[#00a3a2] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
              href={inviteLink}
            >
              Join the organization
            </Link>
          </Section>

          <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

          <Text className="text-[#666666] text-[12px] leading-[24px]">
            If you were not expecting this invitation, you can ignore this
            email. If you are concerned about your account's safety, please
            reply to this email to get in touch with us.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default InviteMemberEmailTemplate;
