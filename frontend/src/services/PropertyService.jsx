import { supabase } from "./supabaseClient";

export const getProperties = async () => {
  const { data, error } = await supabase.rest.get("properties?select=*&order=created_at.desc");
  return { data, error };
};
