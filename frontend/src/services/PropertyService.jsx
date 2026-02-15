import { supabase } from "./supabaseClient"

export const getProperties = async () => {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })

  return { data, error }
}
