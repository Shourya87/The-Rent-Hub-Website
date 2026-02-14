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
    <section className="bg-black px-6 py-14 text-white md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Featured Properties</h2>
            <p className="mt-3 text-base text-slate-400 md:text-lg">
              Handpicked premium listings curated exclusively for you.
            </p>
          </div>

          <Link to="/listings">
            <Button className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-6 text-base text-white hover:opacity-90">
              Explore All
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
