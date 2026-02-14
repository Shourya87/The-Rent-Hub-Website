import { Link } from "react-router-dom";
import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";

export default function PropertyCard({ property }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950 text-white shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-orange-400/50">
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-orange-300">
            ₹{Number(property.price).toLocaleString()}
            <span className="ml-1 text-sm font-medium text-slate-400">/month</span>
          </h3>
          {property.category && (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {property.category}
            </span>
          )}
        </div>

        <h4 className="mt-2 text-lg font-semibold text-white">{property.title}</h4>

        <div className="mt-2 flex items-center gap-1 text-sm text-slate-400">
          <MapPin size={14} />
          {property.location}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
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

        <Link
          to={`/property/${property.id}`}
          className="mt-6 block rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 py-3 text-center font-medium text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
