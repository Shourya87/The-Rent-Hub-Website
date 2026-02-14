import { useMemo } from "react";
import properties from "../data/Properties";

const useProperties = (filters) => {

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {

      const matchLocation = filters.location
        ? property.location
            .toLowerCase()
            .includes(filters.location.toLowerCase())
        : true;

      const matchBHK = filters.bhk && filters.bhk !== "Any BHK"
        ? property.bhk === filters.bhk
        : true;

      return matchLocation && matchBHK;
    });
  }, [filters]);

  return filteredProperties;
};

export default useProperties;
