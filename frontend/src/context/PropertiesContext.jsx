import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiClient } from "@/services/apiClient";

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
    beds,
    baths: Number(property.baths) || 1,
    area: Number(property.area) || 0,
    highlights: Array.isArray(property.highlights) ? property.highlights : [],
    details: property.details || null,
  };
};

export function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await apiClient.getProperties();
        setProperties(
          data.map((property, index) =>
            normalizeProperty(property, property.id || index + 1),
          ),
        );
      } catch (error) {
        console.error(error instanceof Error ? error.message : "Unable to load properties");
      }
    };

    fetchProperties();
  }, []);

  const value = useMemo(() => {
    const addProperty = async (payload) => {
      const normalized = normalizeProperty(payload);

      try {
        const created = await apiClient.createProperty(normalized);
        setProperties((prev) => [normalizeProperty(created), ...prev]);
      } catch (error) {
        console.error(error instanceof Error ? error.message : "Unable to add property");
        throw error;
      }
    };

    const updateProperty = async (id, payload) => {
      try {
        const updated = await apiClient.updateProperty(id, payload);

        setProperties((prev) =>
          prev.map((property) =>
            property.id === id ? normalizeProperty(updated, id) : property,
          ),
        );
      } catch (error) {
        console.error(error instanceof Error ? error.message : "Unable to update property");
        throw error;
      }
    };

    const deleteProperty = async (id) => {
      try {
        await apiClient.deleteProperty(id);
        setProperties((prev) => prev.filter((property) => property.id !== id));
      } catch (error) {
        console.error(error instanceof Error ? error.message : "Unable to delete property");
        throw error;
      }
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
