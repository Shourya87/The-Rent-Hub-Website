import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/services/supabaseClient";
import { CORE_ENTRY_PATH } from "@/constants/adminAccess";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return null;

  if (!session) {
    return <Navigate to={CORE_ENTRY_PATH} replace />;
  }

  return children;
}
