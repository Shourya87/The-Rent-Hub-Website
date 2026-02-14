import { useState, useMemo } from "react";
import propertiesData from "../data/Properties";
import PropertyCard from "@/components/property/PropertyCard";
import { SlidersHorizontal, X } from "lucide-react";

const locationsList = [
  "Delta 1",
  "Delta 2",
  "Alpha 1",
  "Alpha 2",
  "Beta 1",
  "Beta 2",
  "Gamma 1",
  "Gamma 2",
  "Gaur City",
  "Pari Chowk",
  "Knowledge Park",
  "Techzone 4",
];

const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"];

export default function Rent() {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedBHK, setSelectedBHK] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [minPrice, setMinPrice] = useState(5000);
  const [maxPrice, setMaxPrice] = useState(80000);
  const [availability, setAvailability] = useState("Any");
  const [furnishing, setFurnishing] = useState([]);
  const [tenantType, setTenantType] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  /* ===================== FILTER LOGIC ===================== */

  const filteredProperties = useMemo(() => {
    let result = propertiesData.filter((property) => {
      const matchBHK =
        selectedBHK.length > 0
          ? selectedBHK.includes(property.bhk)
          : true;

      const matchLocation =
        selectedLocations.length > 0
          ? selectedLocations.some((loc) =>
              property.location.includes(loc)
            )
          : true;

      const matchPrice =
        property.price >= minPrice && property.price <= maxPrice;

      return matchBHK && matchLocation && matchPrice;
    });

    if (sortBy === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedBHK, selectedLocations, minPrice, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedBHK([]);
    setSelectedLocations([]);
    setMinPrice(5000);
    setMaxPrice(80000);
    setAvailability("Any");
    setFurnishing([]);
    setTenantType([]);
  };

  const toggleSelection = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-12 py-10">

      {/* ================= STICKY FILTER BAR ================= */}
      <div className="sticky top-20 z-20 bg-white border shadow-sm rounded-xl px-4 py-3 flex justify-between items-center mb-6">

        <p className="text-sm font-medium">
          {filteredProperties.length} properties found
        </p>

        <div className="flex gap-3 items-center">

          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>

          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="flex items-center gap-2 text-sm bg-black text-white px-3 py-1.5 rounded-md"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* ================= FILTER PANEL ================= */}

      <div
        className={`transition-all duration-500 overflow-hidden ${
          openFilter ? "max-h-300 opacity-100 mb-8" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border rounded-2xl shadow-lg p-4 md:p-6">

          {/* BHK + LOCATION SIDE BY SIDE */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">

            {/* BHK */}
            <div>
              <h3 className="font-semibold mb-3 text-xs uppercase">
                BHK Type
              </h3>
              {bhkOptions.map((bhk) => (
                <label
                  key={bhk}
                  className="flex items-center gap-2 mb-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedBHK.includes(bhk)}
                    onChange={() =>
                      toggleSelection(bhk, selectedBHK, setSelectedBHK)
                    }
                  />
                  {bhk}
                </label>
              ))}
            </div>

            {/* LOCATION */}
            <div>
              <h3 className="font-semibold mb-3 text-xs uppercase">
                Greater Noida
              </h3>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {locationsList.map((area) => (
                  <label
                    key={area}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(area)}
                      onChange={() =>
                        toggleSelection(
                          area,
                          selectedLocations,
                          setSelectedLocations
                        )
                      }
                    />
                    {area}
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-semibold mb-3 text-xs uppercase">
                Price Range
              </h3>

              <div className="flex gap-2 mb-3">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="border rounded px-2 py-1 w-full text-sm"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="border rounded px-2 py-1 w-full text-sm"
                />
              </div>
            </div>

            {/* AVAILABILITY */}
            <div>
              <h3 className="font-semibold mb-3 text-xs uppercase">
                Availability
              </h3>
              {["Immediate", "Within 15 Days", "After 30 Days"].map(
                (item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 mb-2"
                  >
                    <input
                      type="radio"
                      name="availability"
                      value={item}
                      checked={availability === item}
                      onChange={() => setAvailability(item)}
                    />
                    {item}
                  </label>
                )
              )}
            </div>

            {/* FURNISHING */}
            <div>
              <h3 className="font-semibold mb-3 text-xs uppercase">
                Furnishing
              </h3>
              {["Furnished", "Semi-Furnished", "Unfurnished"].map(
                (item) => (
                  <label key={item} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={furnishing.includes(item)}
                      onChange={() =>
                        toggleSelection(item, furnishing, setFurnishing)
                      }
                    />
                    {item}
                  </label>
                )
              )}
            </div>

            {/* TENANT TYPE */}
            <div>
              <h3 className="font-semibold mb-3 text-xs uppercase">
                Preferred Tenant
              </h3>
              {["Family", "Bachelor Male", "Bachelor Female"].map(
                (item) => (
                  <label key={item} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={tenantType.includes(item)}
                      onChange={() =>
                        toggleSelection(item, tenantType, setTenantType)
                      }
                    />
                    {item}
                  </label>
                )
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={resetFilters}
              className="border px-3 py-1.5 text-xs rounded-md"
            >
              Reset
            </button>
            <button
              onClick={() => setOpenFilter(false)}
              className="bg-black text-white px-3 py-1.5 text-xs rounded-md"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* ================= PROPERTY GRID ================= */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
