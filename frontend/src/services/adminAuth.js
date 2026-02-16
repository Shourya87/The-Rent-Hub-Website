import { getStoredAdminToken, setStoredAdminToken } from "./apiClient";

export const adminAuth = {
  isLoggedIn() {
    return Boolean(getStoredAdminToken());
  },
  login(token) {
    setStoredAdminToken(token);
  },
  logout() {
    setStoredAdminToken("");
  },
};
