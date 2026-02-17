import { useParams } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePropertiesContext } from "../context/PropertiesContext";
import { getSupabasePublicUrl } from "@/lib/supabase";

const WHATSAPP_NUMBER = "919217566061";

const resolveDisplayUrl = (value = "") => {
  if (!value) {
    return "";
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return getSupabasePublicUrl(value);
};

const renderInfoRows = (property) => {
  const type = property.propertyType || property.category || "Flat";

  if (type === "PG") {
    return [
      { label: "Rent", value: property.details?.rent || property.price },
      { label: "Sharing", value: property.details?.sharing || "N/A" },
      { label: "Posted On", value: property.details?.postedOn || "N/A" },
      { label: "Property Id", value: property.details?.propertyId || property.id },
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
    { label: "For", value: property.details?.occupancyFor || "N/A" },
    { label: "Posted On", value: property.details?.postedOn || "N/A" },
    { label: "Property Id", value: property.details?.propertyId || property.id },
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

  const imageUrl = resolveDisplayUrl(property.image || property.imageKey);
  const videoUrl = resolveDisplayUrl(property.video || property.videoKey);
  const detailRows = renderInfoRows(property);

  const message = `
Hi The RentHub Company Team

I am interested in this property:

Title: ${property.title}
Property ID: ${property.details?.propertyId || property.id}

Please share more details.
`;

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 md:items-stretch">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              {videoUrl ? (
                <video
                  src={videoUrl}
                  controls
                  className="h-full max-h-128 min-h-80 w-full rounded-3xl object-cover"
                />
              ) : (
                <img
                  src={imageUrl}
                  alt={`${property.title} primary preview`}
                  className="h-full max-h-128 min-h-80 w-full rounded-3xl object-cover"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[imageUrl, imageUrl, imageUrl, imageUrl].map((imageSrc, idx) => (
                <div
                  key={`${property.id}-thumb-${idx}`}
                  className="overflow-hidden rounded-2xl border border-white/10"
                >
                  <img
                    src={imageSrc}
                    alt={`${property.title} image ${idx + 1}`}
                    className="h-full min-h-38 w-full object-cover"
                  />
                </div>
              ))}
            </div>
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
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-5 text-[15px] text-slate-200">
              {detailRows.map((row) => (
                <p key={row.label}>
                  <span className="font-semibold text-white">{row.label}:</span> {row.value}
                </p>
              ))}

              <p className="mt-6 text-[16px] text-slate-400">Contact us for more details.</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              asChild
              className="flex-1 rounded-full bg-linear-to-r from-orange-500 to-pink-500 text-white hover:opacity-90"
            >
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <Phone size={16} className="mr-2" />
                Contact Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
