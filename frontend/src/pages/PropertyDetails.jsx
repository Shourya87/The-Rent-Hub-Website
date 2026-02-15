import { useParams } from "react-router-dom";
import { usePropertiesContext } from "@/context/PropertiesContext";
import { MapPin, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const renderInfoRows = (property) => {
  const type = property.propertyType || property.category || "Flat";

  if (type === "PG") {
    return [
      { label: "Rent", value: property.details?.rent || property.price },
      { label: "Sharing", value: property.details?.sharing || "N/A" },
      { label: "Note", value: "Contact us for more details." },
    ];
  }

  return [
    { label: "Rent", value: property.details?.rent || property.price },
    { label: "Location", value: property.details?.location || property.location },
    { label: "Floor", value: property.details?.floor || "N/A" },
    { label: "Size", value: property.details?.size || property.bhk || "N/A" },
    { label: "Flat Type", value: property.details?.flatType || "N/A" },
    { label: "Furnished", value: property.details?.furnished || "N/A" },
    { label: "Availablity", value: property.details?.availability || "N/A" },
    {
      label: "For",
      value: property.details?.occupancyFor || "N/A",
    },
    { label: "Note", value: "Contact us for more details." },
  ];
};

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

  const detailRows = renderInfoRows(property);

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

          <div>
            <h3 className="mb-3 text-xl font-semibold">Details</h3>
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
              {detailRows.map((row) => (
                <p key={row.label}>
                  <span className="font-semibold text-white">{row.label}:</span> {row.value}
                </p>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="flex-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90">
              <Phone size={16} className="mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
