import { useParams } from "react-router-dom";
import { usePropertiesContext } from "@/context/PropertiesContext";
import { MapPin, BedDouble, Bath, Ruler, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PropertyDetails() {
  const { id } = useParams();
  const { properties } = usePropertiesContext();
  const property = properties.find((p) => p.id === Number(id));

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-2xl font-semibold text-white">
        Property not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img src={property.image} alt={property.title} className="h-112.5 w-full object-cover" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <img src={property.image} className="h-32 rounded-xl object-cover" />
            <img src={property.image} className="h-32 rounded-xl object-cover" />
            <img src={property.image} className="h-32 rounded-xl object-cover" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">{property.title}</h1>

            <p className="mt-2 flex items-center gap-2 text-slate-400">
              <MapPin size={16} />
              {property.location}
            </p>

            <div className="mt-4 text-3xl font-extrabold text-orange-300">
              ₹{property.price}
              <span className="text-base font-medium text-slate-400"> / month</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-center">
              <BedDouble className="mx-auto mb-2" size={22} />
              <p className="font-semibold">{property.beds} Beds</p>
            </div>
            <div className="text-center">
              <Bath className="mx-auto mb-2" size={22} />
              <p className="font-semibold">{property.baths} Baths</p>
            </div>
            <div className="text-center">
              <Ruler className="mx-auto mb-2" size={22} />
              <p className="font-semibold">{property.area} sqft</p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-semibold">Why choose this property?</h3>
            <div className="flex flex-wrap gap-3">
              {property.highlights?.map((item, index) => (
                <span key={index} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="flex-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90">
              <Phone size={16} className="mr-2" />
              Contact Owner
            </Button>

            <Button
              variant="outline"
              className="rounded-full border-white/30 bg-transparent text-white hover:bg-white hover:text-black"
            >
              <Heart size={16} className="mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="mb-4 text-2xl font-bold">About this Property</h2>
        <p className="leading-relaxed text-slate-300">
          {property.description ||
            "This premium verified property offers modern amenities, ample space, and is located in a prime locality with excellent connectivity and nearby essentials."}
        </p>
      </div>
    </div>
  );
}
