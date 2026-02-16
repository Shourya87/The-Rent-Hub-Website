import { createContext, useContext, useEffect, useMemo, useState } from "react";
import initialProperties from "@/data/Properties";

const STORAGE_KEY = "renthub_properties_v1";
const DATA_URL_PREFIX = "data:";

const PropertiesContext = createContext(null);

const normalizeProperty = (property, fallbackId) => {
  const beds = Number(property.beds) || 1;
  const propertyType = property.propertyType?.trim() || property.category?.trim() || "Flat";

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

const toStorageSafeProperty = (property) => ({
  ...property,
  image: property.image?.startsWith(DATA_URL_PREFIX) ? "" : property.image,
  video: property.video?.startsWith(DATA_URL_PREFIX) ? "" : property.video,
});

export function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return initialProperties.map((property, index) =>
          normalizeProperty(property, index + 1),
        );
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return initialProperties.map((property, index) =>
          normalizeProperty(property, index + 1),
        );
      }

      return parsed.map((property, index) =>
        normalizeProperty(property, property.id || index + 1),
      );
    } catch {
      return initialProperties.map((property, index) =>
        normalizeProperty(property, index + 1),
      );
    }
  });

  useEffect(() => {
    try {
      const storageSafeProperties = properties.map(toStorageSafeProperty);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storageSafeProperties));
    } catch (error) {
      console.warn(
        "Unable to persist properties to localStorage. Save media as Supabase/public URLs before refresh.",
        error,
      );
    }
  }, [properties]);

  const value = useMemo(() => {
    const addProperty = (payload) => {
      setProperties((prev) => {
        const maxId = prev.reduce((acc, item) => Math.max(acc, item.id), 0);
        const nextProperty = normalizeProperty(payload, maxId + 1);
        return [nextProperty, ...prev];
      });
    };

    const updateProperty = (id, payload) => {
      setProperties((prev) =>
        prev.map((property) =>
          property.id === id
            ? normalizeProperty({ ...property, ...payload }, property.id)
            : property,
        ),
      );
    };

    const deleteProperty = (id) => {
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
    <PropertiesContext.Provider value={value}>{children}</PropertiesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePropertiesContext() {
  const context = useContext(PropertiesContext);

  if (!context) {
    throw new Error("usePropertiesContext must be used inside PropertiesProvider");
  }

  return context;
}
