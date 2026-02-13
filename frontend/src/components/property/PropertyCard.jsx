import { MapPin, BedDouble, Bath, Ruler, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300">

      {/* Image Section */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Featured Badge */}
        {property.featured && (
          <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full">
            Featured
          </span>
        )}

        {/* Verified */}
        {property.verified && (
          <span className="absolute top-4 right-4 bg-white text-black text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow">
            <ShieldCheck size={14} />
            Verified
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">

        {/* Price */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-black">
            ₹{property.price.toLocaleString()}
            <span className="text-sm text-gray-500 font-medium">
              {property.type === "Rent" && "/month"}
            </span>
          </h3>

          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
            {property.category}
          </span>
        </div>

        {/* Title */}
        <h4 className="mt-2 text-lg font-semibold text-gray-900">
          {property.title}
        </h4>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mt-2 gap-1">
          <MapPin size={14} />
          {property.location}
        </div>

        {/* Specs */}
        <div className="flex items-center justify-between mt-4 text-gray-600 text-sm">

          <div className="flex items-center gap-1">
            <BedDouble size={16} />
            {property.beds} Beds
          </div>

          <div className="flex items-center gap-1">
            <Bath size={16} />
            {property.baths} Baths
          </div>

          <div className="flex items-center gap-1">
            <Ruler size={16} />
            {property.area} sqft
          </div>

        </div>

        {/* CTA */}
        <Link
          to={`/property/${property.id}`}
          className="block mt-6 text-center bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition font-medium"
        >
          View Details
        </Link>

      </div>
    </div>
  );
}
