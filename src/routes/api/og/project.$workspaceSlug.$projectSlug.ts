import { createFileRoute } from "@tanstack/react-router";
import { parse } from "graphql";
import { GraphQLClient, gql } from "graphql-request";

import { API_INTERNAL_GRAPHQL_URL } from "@/lib/config/env.config";
import { renderOgImage, resolveOrganizationId } from "@/lib/og/renderOgImage";

type OgProject = {
  name: string;
  description?: string | null;
  isPublic: boolean;
};

const OG_PROJECT_QUERY = `
  query OgProject($slug: String!, $organizationId: UUID!) {
    projectBySlugAndOrganizationId(slug: $slug, organizationId: $organizationId) {
      name
      description
      isPublic
    }
  }
`;

const fetchProject = async (
  slug: string,
  organizationId: string,
): Promise<OgProject | null> => {
  try {
    const client = new GraphQLClient(API_INTERNAL_GRAPHQL_URL!, {
      headers: { "Content-Type": "application/json" },
    });
    const document = parse(gql`${OG_PROJECT_QUERY}`);
    const data = await client.request<{
      projectBySlugAndOrganizationId?: OgProject | null;
    }>(document, { slug, organizationId });
    return data.projectBySlugAndOrganizationId ?? null;
  } catch {
    return null;
  }
};

export const Route = createFileRoute(
  "/api/og/project/$workspaceSlug/$projectSlug",
)({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { workspaceSlug, projectSlug } = params;

        const organizationId = await resolveOrganizationId(workspaceSlug);
        if (!organizationId) {
          return new Response("Not found", { status: 404 });
        }

        const project = await fetchProject(projectSlug, organizationId);
        if (!project) {
          return new Response("Not found", { status: 404 });
        }

        const imageBuffer = await renderOgImage({
          title: project.name,
          description: project.description,
          workspaceSlug,
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
