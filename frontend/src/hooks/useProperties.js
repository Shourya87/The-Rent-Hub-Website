import { useMemo } from "react";
import { usePropertiesContext } from "../context/PropertiesContext";

const useProperties = (filters) => {
  const { properties } = usePropertiesContext();

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const normalizedLocation = property.location.toLowerCase();
      const normalizedBhk = (property.bhk || `${property.beds} BHK`).toLowerCase();

      const matchLocation = filters.location
        ? normalizedLocation.includes(filters.location.toLowerCase())
        : true;

      const matchBHK = filters.bhk && filters.bhk !== "Any BHK"
        ? normalizedBhk === filters.bhk.toLowerCase()
        : true;

      return matchLocation && matchBHK;
    });
  }, [filters, properties]);

  return filteredProperties;
};

export default useProperties;
