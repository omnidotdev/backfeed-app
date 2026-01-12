import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

import { useCreateStatusTemplateMutation } from "@/generated/graphql";
import { DEFAULT_STATUS_TEMPLATES } from "@/lib/constants/defaultStatusTemplates.constant";
import { projectStatusesOptions } from "@/lib/options/projects";

interface UseEnsureStatusTemplatesOptions {
  workspaceId: string | undefined;
  hasAdminPrivileges: boolean;
  enabled?: boolean;
}

interface UseEnsureStatusTemplatesResult {
  /** The default status template ID to use for new feedback */
  defaultStatusTemplateId: string | undefined;
  /** Whether templates are currently being loaded or created */
  isLoading: boolean;
  /** Whether templates are ready to use */
  isReady: boolean;
  /** Error message if template creation failed */
  error: string | null;
}

const MAX_POLL_ATTEMPTS = 5;
const POLL_INTERVAL_MS = 1000;

/**
 * Hook to ensure status templates exist for a workspace.
 *
 * Handles two scenarios:
 * 1. Race condition: Templates being seeded async - polls until available
 * 2. Legacy workspaces: No templates exist - creates defaults (admin only)
 */
export function useEnsureStatusTemplates({
  workspaceId,
  hasAdminPrivileges,
  enabled = true,
}: UseEnsureStatusTemplatesOptions): UseEnsureStatusTemplatesResult {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollCountRef = useRef(0);
  const hasAttemptedCreation = useRef(false);

  const { mutateAsync: createStatusTemplate } =
    useCreateStatusTemplateMutation();

  // Query for existing templates with polling capability
  const { data: templates, isLoading: isQueryLoading } = useQuery({
    ...projectStatusesOptions({ workspaceId: workspaceId! }),
    enabled: !!workspaceId && enabled,
    select: (data) => data?.statusTemplates?.nodes ?? [],
    refetchInterval: (query) => {
      // Note: query.state.data is the raw data before select
      const rawData = query.state.data;
      const nodes = rawData?.statusTemplates?.nodes;
      // Stop polling if we have templates or exceeded max attempts
      if (nodes && nodes.length > 0) return false;
      if (pollCountRef.current >= MAX_POLL_ATTEMPTS) return false;
      return POLL_INTERVAL_MS;
    },
  });

  // Track poll attempts
  useEffect(() => {
    if (templates && templates.length === 0 && !isCreating) {
      pollCountRef.current += 1;
    } else if (templates && templates.length > 0) {
      pollCountRef.current = 0;
    }
  }, [templates, isCreating]);

  // Auto-create templates if polling exhausted and user has admin privileges
  const createDefaultTemplates = useCallback(async () => {
    if (!workspaceId || hasAttemptedCreation.current) {
      return;
    }

    hasAttemptedCreation.current = true;
    setIsCreating(true);
    setError(null);

    try {
      // Create templates sequentially to maintain sort order
      for (const template of DEFAULT_STATUS_TEMPLATES) {
        await createStatusTemplate({
          input: {
            statusTemplate: {
              workspaceId,
              name: template.name,
              displayName: template.displayName,
              color: template.color,
              description: template.description,
              sortOrder: template.sortOrder,
            },
          },
        });
      }

      // Invalidate and refetch
      await queryClient.invalidateQueries({
        queryKey: ["ProjectStatuses"],
      });
    } catch (err) {
      console.error(
        "[useEnsureStatusTemplates] Failed to create templates:",
        err,
      );
      // Only show error if user should have been able to create templates
      if (hasAdminPrivileges) {
        setError("Failed to create status templates. Please try again.");
      }
      hasAttemptedCreation.current = false; // Allow retry
    } finally {
      setIsCreating(false);
    }
  }, [workspaceId, hasAdminPrivileges, createStatusTemplate, queryClient]);

  // Trigger creation after polling exhausted - try for admins
  useEffect(() => {
    if (
      pollCountRef.current >= MAX_POLL_ATTEMPTS &&
      templates &&
      templates.length === 0 &&
      hasAdminPrivileges &&
      !isCreating &&
      !hasAttemptedCreation.current
    ) {
      createDefaultTemplates();
    }
  }, [templates, hasAdminPrivileges, isCreating, createDefaultTemplates]);

  // Derive default status template ID
  const defaultStatusTemplateId = (() => {
    if (!templates || templates.length === 0) return undefined;
    // Find "open" template or fall back to first
    const openTemplate = templates.find((t) => t?.name === "open");
    return openTemplate?.rowId ?? templates[0]?.rowId;
  })();

  const isLoading = isQueryLoading || isCreating;
  const isReady = !!defaultStatusTemplateId && !isLoading;

  return {
    defaultStatusTemplateId,
    isLoading,
    isReady,
    error,
  };
}
