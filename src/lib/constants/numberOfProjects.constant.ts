/**
 * The maximum number of projects a user can create if the workspace has lower than a team tier subscription.
 */
// FALLBACK ONLY — source of truth is Omni API plan_feature (kind="operational") via Aether entitlements
const MAX_NUMBER_OF_PROJECTS = 10;

export default MAX_NUMBER_OF_PROJECTS;
