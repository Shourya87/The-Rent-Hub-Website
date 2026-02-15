import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CORE_ENTRY_PATH } from "@/constants/adminAccess";
import { supabase } from "@/services/supabaseClient";

export default function AdminRoute({ children }) {
  const [checkedSession, setCheckedSession] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(Boolean(data.session));
      setCheckedSession(true);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
      setCheckedSession(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!checkedSession) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={CORE_ENTRY_PATH} replace />;
  }

  return children;
}
