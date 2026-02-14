import { Navigate } from "react-router-dom";
import { ADMIN_SESSION_KEY, CORE_ENTRY_PATH } from "@/constants/adminAccess";

export default function AdminRoute({ children }) {
  const isUnlocked = sessionStorage.getItem(ADMIN_SESSION_KEY) === "granted";

  if (!isUnlocked) {
    return <Navigate to="/" replace state={{ from: CORE_ENTRY_PATH }} />;
  }

  return children;
}
