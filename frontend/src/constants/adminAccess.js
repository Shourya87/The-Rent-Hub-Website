export const CORE_ENTRY_PATH = "/core-team-entry";
export const ADMIN_PANEL_PATH = "/core-team/ops-console";

export const ADMIN_SESSION_KEY = "renthub_core_team_access";

// SHA-256 hash of the private core-team code.
export const CORE_CODE_HASH =
  import.meta.env.VITE_CORE_CODE_HASH ||
  "9b9368cf7fde04f8a8fe809dc5d347975f638d2451d3fd48a00b181df5e1f2b5";
