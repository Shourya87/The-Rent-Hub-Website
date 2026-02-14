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
    <div className="min-h-screen bg-black px-8 py-12 text-white">
      <h1 className="text-3xl font-bold md:text-4xl">Find Your Perfect Flat</h1>

      <p className="mb-8 mt-2 text-slate-400">Showing {properties.length} properties</p>

      <div className="grid gap-8 md:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {properties.length === 0 && <div className="mt-20 text-center text-slate-400">No properties found 😔</div>}
    </div>
  );
};

export default Listing;
