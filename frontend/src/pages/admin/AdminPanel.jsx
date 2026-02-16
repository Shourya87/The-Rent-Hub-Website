import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePropertiesContext } from "../../context/PropertiesContext";
import { CORE_ENTRY_PATH } from "@/constants/adminAccess";
import { adminAuth } from "@/services/adminAuth";

const CONTACT_NOTE = "Contact us for more details.";

const emptyForm = {
  title: "",
  propertyType: "Flat",
  location: "",
  image: "",
  video: "",
  highlights: "",
  featured: false,
  flatRent: "",
  floor: "",
  size: "",
  flatType: "",
  furnished: "",
  availability: "",
  occupancyFor: "",
  postedOn: "",
  propertyId: "",
  pgRent: "",
  sharing: "1",
};

const getBedsFromSize = (size) => {
  if (!size) return 1;
  const normalized = size.trim().toLowerCase();
  if (normalized === "1rk") return 1;
  const numeric = Number.parseInt(normalized, 10);
  return Number.isNaN(numeric) ? 1 : numeric;
};

const buildDescription = (form) => {
  if (form.propertyType === "PG") {
    return [
      `Rent: ${form.pgRent}`,
      `Sharing: ${form.sharing}`,
      `Posted On: ${form.postedOn || "N/A"}`,
      `Property Id: ${form.propertyId || "N/A"}`,
      CONTACT_NOTE,
    ].join("\n");
  }

  return [
    `Rent: ${form.flatRent}`,
    `Location: ${form.location}`,
    `Floor: ${form.floor}`,
    `Size: ${form.size}`,
    `Flat Type: ${form.flatType}`,
    `Furnished: ${form.furnished}`,
    `Availablity: ${form.availability}`,
    `For Student/Family/Girls/Boys/Working: ${form.occupancyFor}`,
    `Posted On: ${form.postedOn || "N/A"}`,
    `Property Id: ${form.propertyId || "N/A"}`,
    CONTACT_NOTE,
  ].join("\n");
};

export default function AdminPanel() {
  const { properties, addProperty, updateProperty, deleteProperty } = usePropertiesContext();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const sortedProperties = useMemo(() => [...properties].sort((a, b) => b.id - a.id), [properties]);

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isPG = form.propertyType === "PG";

    const payload = {
      title: form.title,
      location: form.location,
      price: Number(isPG ? form.pgRent : form.flatRent),
      beds: isPG ? 1 : getBedsFromSize(form.size),
      baths: 1,
      area: 0,
      image: form.image,
      video: form.video,
      highlights: form.highlights.split(",").map((item) => item.trim()).filter(Boolean),
      description: buildDescription(form),
      featured: form.featured,
      bhk: isPG ? "PG" : form.size,
      category: form.propertyType,
      propertyType: form.propertyType,
      details: isPG
        ? {
            rent: form.pgRent,
            sharing: form.sharing,
            contactNote: CONTACT_NOTE,
            postedOn: form.postedOn || "N/A",
            propertyId: form.propertyId || "N/A",
            video: form.video || "",
          }
        : {
            rent: form.flatRent,
            location: form.location,
            floor: form.floor,
            size: form.size,
            flatType: form.flatType,
            furnished: form.furnished,
            availability: form.availability,
            occupancyFor: form.occupancyFor,
            contactNote: CONTACT_NOTE,
            postedOn: form.postedOn || "N/A",
            propertyId: form.propertyId || "N/A",
            video: form.video || "",
          },
    };

    if (editingId) {
      await updateProperty(editingId, payload);
    } else {
      await addProperty(payload);
    }

    resetForm();
  };

  const handleLockPanel = () => {
    adminAuth.logout();
    navigate(CORE_ENTRY_PATH, { replace: true });
  };

  const handleEdit = (property) => {
    const propertyType = property.propertyType || property.category || "Flat";
    setEditingId(property.id);
    setForm({
      ...emptyForm,
      title: property.title,
      propertyType,
      location: property.location,
      image: property.image,
      video: property.video || property.details?.video || "",
      highlights: property.highlights.join(", "),
      featured: Boolean(property.featured),
      flatRent: propertyType === "Flat" ? String(property.details?.rent || property.price || "") : "",
      floor: property.details?.floor || "",
      size: property.details?.size || property.bhk || "",
      flatType: property.details?.flatType || "",
      furnished: property.details?.furnished || "",
      availability: property.details?.availability || "",
      occupancyFor: property.details?.occupancyFor || "",
      postedOn: property.details?.postedOn || "",
      propertyId: String(property.details?.propertyId || property.id || ""),
      pgRent: propertyType === "PG" ? String(property.details?.rent || property.price || "") : "",
      sharing: property.details?.sharing || "1",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 md:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <button onClick={handleLockPanel} className="rounded-lg border border-white/20 bg-black px-3 py-2 text-sm font-medium">
              Lock Panel
            </button>
          </div>
          <p className="mt-2 text-slate-300">Add, edit, and remove properties. All changes instantly update website listings.</p>
        </header>

        <section className="rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-white">{editingId ? "Edit Property" : "Add New Property"}</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input name="title" value={form.title} onChange={onChange} required placeholder="Property title" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
            <select name="propertyType" value={form.propertyType} onChange={onChange} className="rounded-lg border border-white/20 bg-black px-3 py-2" required>
              <option value="Flat">Flat</option>
              <option value="PG">PG</option>
            </select>

            <input name="location" value={form.location} onChange={onChange} required placeholder="Location" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
            <input name="image" value={form.image} onChange={onChange} placeholder="Image URL" className="rounded-lg border border-white/20 bg-black px-3 py-2" required />
            <input name="video" value={form.video} onChange={onChange} placeholder="Video URL (optional)" className="rounded-lg border border-white/20 bg-black px-3 py-2 md:col-span-2" />
            <input name="highlights" value={form.highlights} onChange={onChange} placeholder="Highlights (comma separated)" className="rounded-lg border border-white/20 bg-black px-3 py-2 md:col-span-2" />

            {form.propertyType === "Flat" ? (
              <>
                <input name="flatRent" type="number" min="0" value={form.flatRent} onChange={onChange} required placeholder="Rent" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
                <input name="floor" value={form.floor} onChange={onChange} required placeholder="Floor" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
                <input name="size" value={form.size} onChange={onChange} required placeholder="Size (1RK / 1BHK / 2BHK)" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
                <input name="flatType" value={form.flatType} onChange={onChange} required placeholder="Flat Type" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
                <input name="furnished" value={form.furnished} onChange={onChange} required placeholder="Furnished" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
                <input name="availability" value={form.availability} onChange={onChange} required placeholder="Availablity" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
                <input name="occupancyFor" value={form.occupancyFor} onChange={onChange} required placeholder="For Student/Family/Girls/Boys/Working" className="rounded-lg border border-white/20 bg-black px-3 py-2 md:col-span-2" />
                <input name="postedOn" value={form.postedOn} onChange={onChange} placeholder="Posted On" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
                <input name="propertyId" value={form.propertyId} onChange={onChange} placeholder="Property Id" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
              </>
            ) : (
              <>
                <input name="pgRent" type="number" min="0" value={form.pgRent} onChange={onChange} required placeholder="Rent" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
                <select name="sharing" value={form.sharing} onChange={onChange} className="rounded-lg border border-white/20 bg-black px-3 py-2" required>
                  <option value="1">Sharing: 1</option>
                  <option value="2">Sharing: 2</option>
                  <option value="3">Sharing: 3</option>
                </select>
                <input name="postedOn" value={form.postedOn} onChange={onChange} placeholder="Posted On" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
                <input name="propertyId" value={form.propertyId} onChange={onChange} placeholder="Property Id" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
              </>
            )}

            <div className="rounded-lg border border-white/20 bg-black/50 px-3 py-2 text-sm text-slate-300 md:col-span-2">Contact us for more details.</div>

            <label className="flex items-center gap-2 text-sm text-slate-300 md:col-span-2">
              <input type="checkbox" name="featured" checked={form.featured} onChange={onChange} />
              Mark as featured property
            </label>

            <div className="flex gap-3 md:col-span-2">
              <button type="submit" className="rounded-lg bg-linear-to-r from-orange-500 to-pink-500 px-4 py-2 font-medium text-white">
                {editingId ? "Update Property" : "Add Property"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="rounded-lg border px-4 py-2 font-medium">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-white">Existing Properties ({properties.length})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b text-slate-400">
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Location</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Property Id</th>
                  <th className="px-3 py-2">Price</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedProperties.map((property) => (
                  <tr key={property.id} className="border-b align-top">
                    <td className="px-3 py-3 font-medium text-white">{property.title}</td>
                    <td className="px-3 py-3 text-slate-300">{property.location}</td>
                    <td className="px-3 py-3 text-slate-300">{property.propertyType || property.category || "Flat"}</td>
                    <td className="px-3 py-3 text-slate-300">{property.details?.propertyId || property.id}</td>
                    <td className="px-3 py-3 text-slate-300">₹{property.price}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(property)} className="rounded border px-3 py-1">Edit</button>
                        <button onClick={() => deleteProperty(property.id)} className="rounded bg-red-600 px-3 py-1 text-white">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
