import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Building2, ChevronDown } from "lucide-react";

const propertyOptions = ["Any BHK", "1 BHK", "2 BHK", "3+ BHK", "PG"];

const Hero = () => {
  const [location, setLocation] = useState("");
  const [selectedType, setSelectedType] = useState("Any BHK");
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Search Button Logic
  const handleSearch = () => {
    navigate(
      `/listings?location=${encodeURIComponent(location)}&type=${encodeURIComponent(selectedType)}`,
    );
  };

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative bg-white text-black overflow-hidden py-6">
      {/* Soft Gradient Background Layer */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-100 via-white to-gray-200 pointer-events-none" />

      {/* Subtle Radial Glow */}
      <div className="absolute -top-40 -right-40 w-125 h-125 bg-black/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-100 h-100 bg-black/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-2 md:py-12">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="px-3 py-1 text-xs font-medium tracking-tight uppercase bg-black text-white rounded-full">
            Smart Rental Platform
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center leading-tight tracking-tight">
          Rent Smarter.
          <br />
          Live Better.
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-gray-600 text-lg md:text-xl text-center max-w-2xl mx-auto">
          Verified listings, instant owner connect. Experience renting the
          modern way.
        </p>

        {/* SEARCH PANEL */}
        <div className="mt-10 max-w-5xl mx-auto">
          <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-4 md:p-5 transition-all duration-300 hover:shadow-3xl">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {/* ================= LOCATION FIELD ================= */}
              <div className="flex items-center gap-3 w-full md:flex-1 bg-gray-50 focus-within:bg-white border border-gray-200 focus-within:border-black transition rounded-2xl px-4 py-3 shadow-sm">
                <MapPin size={18} className="text-gray-500 shrink-0" />

                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Enter location (e.g., Sector 62)"
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm md:text-base"
                />
              </div>

              {/* ================= PROPERTY TYPE DROPDOWN ================= */}
              <div
                ref={dropdownRef}
                className="relative w-full md:w-40 shrink-0"
              >
                <div
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 cursor-pointer hover:bg-white hover:border-black transition-all duration-200 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 size={16} className="text-gray-500" />
                    <span className="truncate">{selectedType}</span>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openDropdown ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Dropdown */}
                <div
                  className={`absolute mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden transition-all duration-200 ${
                    openDropdown
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                  }`}
                >
                  {propertyOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedType(option);
                        setOpenDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-all ${
                        selectedType === option
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* ================= SEARCH BUTTON ================= */}
              <Button
                onClick={handleSearch}
                className="w-full md:w-auto px-8 py-3 rounded-2xl bg-orange-500 text-white hover:bg-orange-600 font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Search size={16} className="mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* TRUST STATS */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-10 text-center max-w-4xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold">10K+</h3>
            <p className="text-gray-500 text-sm">Active Listings</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">5K+</h3>
            <p className="text-gray-500 text-sm">Happy Tenants</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">100%</h3>
            <p className="text-gray-500 text-sm">Verified Properties</p>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.18s ease forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
