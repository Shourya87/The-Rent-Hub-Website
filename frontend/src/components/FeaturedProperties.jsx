import { Link } from "react-router-dom";
import PropertyCard from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { usePropertiesContext } from "@/context/PropertiesContext";

export default function FeaturedProperties() {
  const { properties } = usePropertiesContext();

  const featured = properties.some((property) => property.featured)
    ? properties.filter((property) => property.featured)
    : properties.slice(0, 3);

  return (
    <section className="bg-white py-10 md:py-18 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">
              Featured Properties
            </h2>
            <p className="text-gray-500 mt-3 text-base md:text-lg">
              Handpicked premium listings curated exclusively for you.
            </p>
          </div>

          <Link to="/listings">
            <Button className="bg-black text-white hover:bg-gray-900 rounded-full px-8 py-6 text-base">
              Explore All
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
