import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { usePropertiesContext } from "@/context/PropertiesContext";
import { Bed, Bath, Expand, Heart, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
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
      label: "For Student/Family/Girls/Boys/Working",
      value: property.details?.occupancyFor || "N/A",
    },
    { label: "Note", value: "Contact us for more details." },
  ];
};

export default function PropertyDetails() {
  const { id } = useParams();
  const { properties } = usePropertiesContext();
  const property = properties.find((p) => p.id === Number(id));

  const galleryImages = useMemo(
    () => [property?.image, property?.image, property?.image].filter(Boolean),
    [property?.image]
  );
  const [activeImage, setActiveImage] = useState(property?.image || "");

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-2xl font-semibold text-white">
        Property not found
      </div>
    );
  }

  const detailRows = renderInfoRows(property);
  const quickFacts = [
    { icon: Bed, label: "Bedrooms", value: property.beds || "N/A" },
    { icon: Bath, label: "Bathrooms", value: property.baths || "N/A" },
    { icon: Expand, label: "Area", value: property.area ? `${property.area} sq.ft` : "N/A" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-14">
        <div className="space-y-5">
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <img
              src={activeImage || property.image}
              alt={property.title}
              className="h-[480px] w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/55 px-4 py-1.5 text-xs font-medium text-slate-100 backdrop-blur-md">
              Verified Listing
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur-sm">
              <p className="text-sm text-slate-200">{property.description || "A premium home in a well-connected neighborhood."}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(image)}
                className={`overflow-hidden rounded-xl border transition ${
                  activeImage === image ? "border-orange-400" : "border-white/10 hover:border-white/40"
                }`}
              >
                <img
                  src={image}
                  alt={`${property.title} preview ${index + 1}`}
                  className="h-28 w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {(property.highlights || []).map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                >
                  {highlight}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-bold leading-tight md:text-4xl">{property.title}</h1>

            <p className="mt-2 flex items-center gap-2 text-slate-400">
              <MapPin size={16} />
              {property.location}
            </p>

            <div className="mt-5 text-4xl font-extrabold text-orange-300">
              ₹{property.price}
              <span className="text-base font-medium text-slate-400"> / month</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                {fact.icon({ size: 17, className: "mb-2 text-orange-300" })}
                <p className="text-xs text-slate-400">{fact.label}</p>
                <p className="text-base font-semibold text-white">{fact.value}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="mb-3 text-xl font-semibold">Property Details</h3>
            <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-slate-200">
              {detailRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-start justify-between gap-3 border-b border-white/5 pb-2 last:border-0 last:pb-0"
                >
                  <p className="font-medium text-slate-400">{row.label}</p>
                  <p className="text-right font-semibold text-white">{row.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 pt-2 sm:grid-cols-[1fr_auto]">
            <Button className="flex-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90">
              <Phone size={16} className="mr-2" />
              Contact Us
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <Heart size={16} className="mr-2" />
              Save
            </Button>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            <p className="flex items-center gap-2 font-semibold">
              <ShieldCheck size={16} />
              Verified by RentHub
            </p>
            <p className="mt-2 text-emerald-50/90">
              <Sparkles size={14} className="mr-1 inline-block" />
              Listing details are reviewed by our team for higher authenticity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
