import { createFileRoute } from "@tanstack/react-router";
import { parse } from "graphql";
import { GraphQLClient, gql } from "graphql-request";
import satori from "satori";
import sharp from "sharp";

import {
  API_INTERNAL_GRAPHQL_URL,
  AUTH_BASE_URL,
} from "@/lib/config/env.config";

import type { ReactNode } from "react";

const WIDTH = 1200;
const HEIGHT = 630;
const ACCENT = "#F05252";

let fontCache: ArrayBuffer | null = null;

const fetchFont = async (): Promise<ArrayBuffer> => {
  if (fontCache) return fontCache;

  const response = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff",
  );
  fontCache = await response.arrayBuffer();

  return fontCache;
};

const resolveOrganizationId = async (slug: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `${AUTH_BASE_URL}/api/organization/by-slug/${encodeURIComponent(slug)}`,
    );
    if (!response.ok) return null;
    const org = await response.json();
    return org?.id ?? null;
  } catch {
    return null;
  }
};

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

const renderOgImage = async (
  project: OgProject,
  workspaceSlug: string,
): Promise<Uint8Array> => {
  const fontData = await fetchFont();

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background:
            "linear-gradient(145deg, #ffffff 0%, #fff5f5 50%, #ffe4e6 100%)",
          fontFamily: "Inter",
          color: "#1a1a1a",
        },
        children: [
          // Top: workspace badge
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "12px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: ACCENT,
                    },
                  },
                },
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize: "20px",
                      color: "#666666",
                      letterSpacing: "0.05em",
                    },
                    children: workspaceSlug,
                  },
                },
              ],
            },
          },
          // Middle: project name + description
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                flex: 1,
                justifyContent: "center",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "72px",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    },
                    children:
                      project.name.length > 30
                        ? `${project.name.slice(0, 30)}...`
                        : project.name,
                  },
                },
                ...(project.description
                  ? [
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: "28px",
                            color: "#666666",
                            lineHeight: 1.4,
                          },
                          children:
                            project.description.length > 100
                              ? `${project.description.slice(0, 100)}...`
                              : project.description,
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
          // Bottom: Backfeed branding
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    },
                    children: [
                      {
                        type: "span",
                        props: {
                          style: { fontSize: "28px" },
                          children: "\uD83D\uDCE3",
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            fontSize: "24px",
                            fontWeight: 700,
                            color: "#1a1a1a",
                          },
                          children: "Backfeed",
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            fontSize: "20px",
                            color: "#999999",
                          },
                          children: "by Omni",
                        },
                      },
                    ],
                  },
                },
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize: "18px",
                      color: "#999999",
                    },
                    children: "backfeed.omni.dev",
                  },
                },
              ],
            },
          },
        ],
      },
    } as ReactNode,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );

  const buffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
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

        const imageBuffer = await renderOgImage(project, workspaceSlug);

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
