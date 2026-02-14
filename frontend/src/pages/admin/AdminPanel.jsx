import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePropertiesContext } from "@/context/PropertiesContext";
import { ADMIN_SESSION_KEY, CORE_ENTRY_PATH } from "@/constants/adminAccess";

const emptyForm = {
  title: "",
  location: "",
  price: "",
  beds: "",
  baths: "",
  area: "",
  image: "",
  highlights: "",
  description: "",
  featured: false,
};

export default function AdminPanel() {
  const { properties, addProperty, updateProperty, deleteProperty } = usePropertiesContext();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const sortedProperties = useMemo(
    () => [...properties].sort((a, b) => b.id - a.id),
    [properties],
  );

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      beds: Number(form.beds),
      baths: Number(form.baths),
      area: Number(form.area),
      highlights: form.highlights
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      bhk: `${Number(form.beds)} BHK`,
    };

    if (editingId) {
      updateProperty(editingId, payload);
    } else {
      addProperty(payload);
    }

    resetForm();
  };


  const handleLockPanel = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    navigate(CORE_ENTRY_PATH, { replace: true });
  };

  const handleEdit = (property) => {
    setEditingId(property.id);
    setForm({
      title: property.title,
      location: property.location,
      price: String(property.price),
      beds: String(property.beds),
      baths: String(property.baths),
      area: String(property.area),
      image: property.image,
      highlights: property.highlights.join(", "),
      description: property.description,
      featured: Boolean(property.featured),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 md:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <button
              onClick={handleLockPanel}
              className="rounded-lg border border-white/20 bg-black px-3 py-2 text-sm font-medium"
            >
              Lock Panel
            </button>
          </div>
          <p className="mt-2 text-slate-300">
            Add, edit, and remove properties. All changes instantly update website listings.
          </p>
        </header>

        <section className="rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-white">
            {editingId ? "Edit Property" : "Add New Property"}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input name="title" value={form.title} onChange={onChange} required placeholder="Property title" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
            <input name="location" value={form.location} onChange={onChange} required placeholder="Location" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
            <input name="price" type="number" min="0" value={form.price} onChange={onChange} required placeholder="Price per month" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
            <input name="beds" type="number" min="1" value={form.beds} onChange={onChange} required placeholder="Beds" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
            <input name="baths" type="number" min="1" value={form.baths} onChange={onChange} required placeholder="Baths" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
            <input name="area" type="number" min="100" value={form.area} onChange={onChange} required placeholder="Area (sqft)" className="rounded-lg border border-white/20 bg-black px-3 py-2" />
            <input name="image" value={form.image} onChange={onChange} placeholder="Image URL" className="rounded-lg border border-white/20 bg-black px-3 py-2 md:col-span-2" />
            <input name="highlights" value={form.highlights} onChange={onChange} placeholder="Highlights (comma separated)" className="rounded-lg border border-white/20 bg-black px-3 py-2 md:col-span-2" />
            <textarea name="description" value={form.description} onChange={onChange} required placeholder="Property description" className="min-h-24 rounded-lg border border-white/20 bg-black px-3 py-2 md:col-span-2" />

            <label className="flex items-center gap-2 text-sm text-slate-700 md:col-span-2">
              <input type="checkbox" name="featured" checked={form.featured} onChange={onChange} />
              Mark as featured property
            </label>

            <div className="flex gap-3 md:col-span-2">
              <button type="submit" className="rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2 font-medium text-white">
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
                  <th className="px-3 py-2">Price</th>
                  <th className="px-3 py-2">Beds/Baths</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedProperties.map((property) => (
                  <tr key={property.id} className="border-b align-top">
                    <td className="px-3 py-3 font-medium text-white">{property.title}</td>
                    <td className="px-3 py-3 text-slate-300">{property.location}</td>
                    <td className="px-3 py-3 text-slate-300">₹{property.price}</td>
                    <td className="px-3 py-3 text-slate-300">{property.beds} / {property.baths}</td>
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
