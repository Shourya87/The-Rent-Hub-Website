import { Navigate } from "react-router-dom";
import { CORE_ENTRY_PATH } from "@/constants/adminAccess";
import { adminAuth } from "@/services/adminAuth";

export default function AdminRoute({ children }) {
  if (!adminAuth.isLoggedIn()) {
    return <Navigate to={CORE_ENTRY_PATH} replace />;
  }

  return children;
}
