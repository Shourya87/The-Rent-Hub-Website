import { useParams } from "react-router-dom";
import properties from "@/data/Properties";
import { MapPin, BedDouble, Bath, Ruler, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === Number(id));

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Property not found
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">

      {/* ===== Top Section ===== */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-10">

        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="rounded-3xl overflow-hidden border">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-112.5 object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <img src={property.image} className="rounded-xl h-32 object-cover" />
            <img src={property.image} className="rounded-xl h-32 object-cover" />
            <img src={property.image} className="rounded-xl h-32 object-cover" />
          </div>
        </div>

        {/* Details Panel */}
        <div className="space-y-6">

          {/* Title + Price */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {property.title}
            </h1>

            <p className="flex items-center gap-2 text-gray-500 mt-2">
              <MapPin size={16} />
              {property.location}
            </p>

            <div className="mt-4 text-3xl font-extrabold text-black">
              ₹{property.price}
              <span className="text-base font-medium text-gray-500">
                {" "} / month
              </span>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-6 bg-gray-50 p-6 rounded-2xl border">
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

          {/* Highlights */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Why choose this property?
            </h3>
            <div className="flex flex-wrap gap-3">
              {property.highlights?.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm border"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-4">
            <Button className="flex-1 bg-black text-white rounded-full hover:bg-gray-800">
              <Phone size={16} className="mr-2" />
              Contact Owner
            </Button>

            <Button
              variant="outline"
              className="rounded-full border-black hover:bg-black hover:text-white"
            >
              <Heart size={16} className="mr-2" />
              Save
            </Button>
          </div>

        </div>
      </div>

      {/* ===== Description Section ===== */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-4">
          About this Property
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {property.description ||
            "This premium verified property offers modern amenities, ample space, and is located in a prime locality with excellent connectivity and nearby essentials."}
        </p>
      </div>

    </div>
  );
}
