import { createFileRoute } from "@tanstack/react-router";
import { parse } from "graphql";
import { GraphQLClient, gql } from "graphql-request";

import { API_INTERNAL_GRAPHQL_URL } from "@/lib/config/env.config";
import { renderOgImage, resolveOrganizationId } from "@/lib/og/renderOgImage";

type OgFeedback = {
  title: string;
  description?: string | null;
  number: number;
  statusTemplate?: { displayName?: string | null } | null;
};

const OG_FEEDBACK_QUERY = `
  query OgFeedback($slug: String!, $organizationId: UUID!, $number: Int!) {
    projectBySlugAndOrganizationId(slug: $slug, organizationId: $organizationId) {
      posts(condition: { number: $number }, first: 1) {
        nodes {
          title
          description
          number
          statusTemplate {
            displayName
          }
        }
      }
    }
  }
`;

const fetchFeedback = async (
  slug: string,
  organizationId: string,
  number: number,
): Promise<OgFeedback | null> => {
  try {
    const client = new GraphQLClient(API_INTERNAL_GRAPHQL_URL!, {
      headers: { "Content-Type": "application/json" },
    });
    const document = parse(gql`${OG_FEEDBACK_QUERY}`);
    const data = await client.request<{
      projectBySlugAndOrganizationId?: {
        posts: { nodes: OgFeedback[] };
      } | null;
    }>(document, { slug, organizationId, number });
    return data.projectBySlugAndOrganizationId?.posts.nodes[0] ?? null;
  } catch {
    return null;
  }
};

export const Route = createFileRoute(
  "/api/og/feedback/$workspaceSlug/$projectSlug/$number",
)({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { workspaceSlug, projectSlug, number: numberParam } = params;

        const number = Number(numberParam);
        if (!Number.isInteger(number)) {
          return new Response("Not found", { status: 404 });
        }

        const organizationId = await resolveOrganizationId(workspaceSlug);
        if (!organizationId) {
          return new Response("Not found", { status: 404 });
        }

        const feedback = await fetchFeedback(
          projectSlug,
          organizationId,
          number,
        );
        if (!feedback) {
          return new Response("Not found", { status: 404 });
        }

        const status = feedback.statusTemplate?.displayName;
        const eyebrow = status
          ? `#${feedback.number} · ${status}`
          : `#${feedback.number}`;

        const imageBuffer = await renderOgImage({
          title: feedback.title,
          description: feedback.description,
          workspaceSlug,
          eyebrow,
        });

        return new Response(imageBuffer as unknown as BodyInit, {
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});
