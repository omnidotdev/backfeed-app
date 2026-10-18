export {
  OrganizationProvider as WorkspaceProvider,
  useOrganization as useWorkspace,
} from "@omnidotdev/providers/react";

// Default export for backward compatibility with existing default imports
import { OrganizationProvider as WorkspaceProvider } from "@omnidotdev/providers/react";

export default WorkspaceProvider;
