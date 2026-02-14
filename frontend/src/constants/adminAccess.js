export const CORE_ENTRY_PATH = "/core-team-entry";
export const ADMIN_PANEL_PATH = "/core-team/ops-console";

export const ADMIN_SESSION_KEY = "renthub_core_team_access";

// SHA-256 hash of the private core-team code.
export const CORE_CODE_HASH =
  import.meta.env.VITE_CORE_CODE_HASH ||
  "afce8e5f1a417ba80f24cad379f88124017ebf6a1f2648bce904ad0f8f5f4ee4";
