import { createContext, useContext, useEffect, useMemo, useState } from "react";
import initialProperties from "@/data/Properties";
import { supabase } from "@/lib/supabase";

const PropertiesContext = createContext(null);

const normalizeProperty = (property, fallbackId) => {
  const beds = Number(property.beds) || 1;
  const propertyType =
    property.propertyType?.trim() || property.category?.trim() || "Flat";

  return {
    id: Number(property.id) || fallbackId,
    title: property.title?.trim() || "Untitled Property",
    location: property.location?.trim() || "Unknown Location",
    price: Number(property.price) || 0,
    image:
      property.image?.trim() ||
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1200&auto=format&fit=crop",
    video: property.video?.trim() || property.details?.video?.trim() || "",
    description:
      property.description?.trim() ||
      "Property details will be shared by the admin.",
    featured: Boolean(property.featured),
    bhk: property.bhk?.trim() || `${beds} BHK`,
    category: propertyType,
    propertyType,
    details: property.details || null,
  };
};

export function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error(error.message);
        return;
      }

      setProperties(
        data.map((property, index) =>
          normalizeProperty(property, property.id || index + 1),
        ),
      );
    };

    fetchProperties();
  }, []);

  const value = useMemo(() => {
    const addProperty = async (payload) => {
      const normalized = normalizeProperty(payload);

      const { data, error } = await supabase
        .from("properties")
        .insert([normalized])
        .select()
        .single();

      if (error) {
        console.error(error.message);
        return;
      }

      setProperties((prev) => [data, ...prev]);
    };

    const updateProperty = async (id, payload) => {
      const { data, error } = await supabase
        .from("properties")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error(error.message);
        return;
      }

      setProperties((prev) =>
        prev.map((property) => (property.id === id ? data : property)),
      );
    };

    const deleteProperty = async (id) => {
      const { error } = await supabase.from("properties").delete().eq("id", id);

      if (error) {
        console.error(error.message);
        return;
      }

      setProperties((prev) => prev.filter((property) => property.id !== id));
    };

    return {
      properties,
      addProperty,
      updateProperty,
      deleteProperty,
    };
  }, [properties]);

  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePropertiesContext() {
  const context = useContext(PropertiesContext);

  if (!context) {
    throw new Error(
      "usePropertiesContext must be used inside PropertiesProvider",
    );
  }

  return context;
}
