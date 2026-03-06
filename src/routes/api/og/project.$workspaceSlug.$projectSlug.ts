import { readFileSync } from "node:fs";
import { join } from "node:path";

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

// Omni logo SVG (matches docs/website pattern)
const OMNI_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path fill="#1a1a1a" d="m305.55,251.06c-2.25,39.89-22.63,78.45-54.97,102.2-.02,0-.03.02-.05.03-35.35,24.87-81.6,30.43-121.78,16.38-.35-.12-.7-.25-1.04-.37-26.04-9.8-49.08-27.59-64.36-51.03-.35-.54-.7-1.07-1.03-1.61-.36-.56-.7-1.12-1.04-1.68-.84-1.36-1.63-2.74-2.4-4.14-.38-.69-.78-1.4-1.15-2.11,99.71,81.94,249.46-2.53,229.47-130.45,14.13,22.6,19.75,47.95,18.34,72.79Z"/><path fill="#1a1a1a" d="m350.16,291.36c-13.92,38.42-46.39,68.99-85.59,80.61-13.5,4.1-27.59,5.99-41.62,5.63,120.83-45.38,122.54-217.31,1.77-263.96,90.07-3.14,158.73,93.67,125.44,177.72Z"/><path fill="#1a1a1a" d="m262.5,264.7c-9.91,16.9-21.83,30.36-35.02,40.65-.02,0-.03.02-.04.02-26.31,19.55-59.7,28.4-92.15,25.76-33.37-3.58-65.28-19.48-87.77-44.61-.03-.02-.05-.05-.08-.09-.53-.65-1.06-1.3-1.59-1.96-18.67-22.2-29.25-50.51-30.41-79.28-.29-11.18.77-22.92,3.39-35.14,3.2-13.74,8.61-26.88,15.94-38.84-21.52,126.87,127.51,214.92,227.72,133.49Z"/><path fill="#1a1a1a" d="m175.28,286.51c-24.18-.77-45.05-6.12-62.62-14.81-29.99-16.17-53.17-44.03-64.23-76.15,0,0,0-.02,0-.02-9.94-32.31-7.74-68.25,6.53-98.97,13.75-28.49,38.28-51.08,67.17-63.51,0,0,.02,0,.03-.02,15.92-6.35,34.22-10.1,54.90-10.48-120.82,45.36-122.54,217.31-1.77,263.95Z"/><path fill="#1a1a1a" d="m342.25,91.43c-99.69-81.94-249.46,2.54-229.47,130.46-31.13-49.86-20.92-113.06,14.77-154.66.63-.73,1.26-1.45,1.89-2.16,18.88-21.08,44.46-36.24,74.56-40.69,54.31-10.05,112.48,18.21,138.25,67.05Z"/><path fill="#1a1a1a" d="m381.15,230.1h0c-3.19,13.74-8.6,26.89-15.94,38.84,21.54-126.89-127.52-214.91-227.71-133.49C214.51,4.1,413.07,81.17,381.15,230.1Z"/></svg>`;

let fontCache: ArrayBuffer | null = null;
let logoCache: string | null = null;

const fetchFont = async (): Promise<ArrayBuffer> => {
  if (fontCache) return fontCache;

  const response = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff",
  );
  fontCache = await response.arrayBuffer();

  return fontCache;
};

const getLogoDataUri = (): string => {
  if (logoCache) return logoCache;

  const logoPath = join(process.cwd(), "public", "img", "logo.png");
  const logoBuffer = readFileSync(logoPath);
  logoCache = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return logoCache;
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
  const logoDataUri = getLogoDataUri();

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
            "linear-gradient(135deg, #ffffff 0%, #fff5f5 50%, #ffe4e6 100%)",
          fontFamily: "Inter",
          color: "#1a1a1a",
        },
        children: [
          // Top: Omni logo + "Omni" text
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "16px",
              },
              children: [
                {
                  type: "img",
                  props: {
                    src: `data:image/svg+xml,${encodeURIComponent(OMNI_LOGO_SVG)}`,
                    alt: "",
                    width: 48,
                    height: 48,
                    style: { borderRadius: "10px" },
                  },
                },
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize: "28px",
                      color: "#1a1a1a",
                      opacity: 0.9,
                    },
                    children: "Omni",
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
                            color: "rgba(26, 26, 26, 0.6)",
                            lineHeight: 1.4,
                            maxWidth: "90%",
                          },
                          children:
                            project.description.length > 120
                              ? `${project.description.slice(0, 120)}...`
                              : project.description,
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
          // Bottom: Backfeed logo + name + domain
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
                        type: "img",
                        props: {
                          src: logoDataUri,
                          alt: "",
                          width: 36,
                          height: 36,
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
                            color: "rgba(26, 26, 26, 0.4)",
                          },
                          children: workspaceSlug,
                        },
                      },
                    ],
                  },
                },
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize: "20px",
                      color: "rgba(26, 26, 26, 0.4)",
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
