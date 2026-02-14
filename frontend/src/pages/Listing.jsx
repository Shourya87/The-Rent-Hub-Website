import { useSearchParams } from "react-router-dom";
import useProperties from "@/hooks/useProperties";
import PropertyCard from "@/components/property/PropertyCard";

const Listing = () => {

  const [searchParams] = useSearchParams();

  const location = searchParams.get("location") || "";
  const bhk = searchParams.get("type") || "Any BHK";

  const filters = { location, bhk };

  const properties = useProperties(filters);

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-12">

      <h1 className="text-3xl font-bold mb-6">
        Find Your Perfect Flat
      </h1>

      <p className="mb-8 text-gray-500">
        Showing {properties.length} properties
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          No properties found 😔
        </div>
      )}

    </div>
  );
};

export default Listing;
