import properties from "@/data/Properties"
import PropertyCard from "@/components/property/PropertyCard"

export default function Listing() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
