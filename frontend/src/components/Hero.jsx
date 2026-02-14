import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, Building2, ChevronDown } from "lucide-react";

const propertyOptions = ["Any BHK", "1 BHK", "2 BHK", "3+ BHK", "PG"];

const Hero = () => {
  const [location, setLocation] = useState("");
  const [selectedType, setSelectedType] = useState("Any BHK");
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(
      `/listings?location=${encodeURIComponent(location)}&type=${encodeURIComponent(selectedType)}`,
    );
  };

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
    <section className="relative overflow-hidden bg-black px-6 py-20 text-white md:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ff7b1a22,transparent_40%),radial-gradient(circle_at_bottom_right,#ec489922,transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-6 flex w-fit items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.2em] text-orange-300">
          Smart Rental Platform
        </div>

        <h1 className="text-center text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
          Rent Smarter.
          <br />
          <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Live Better.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-center text-base text-slate-300 md:text-xl">
          Verified listings, instant owner connect, and a premium rental journey built for modern India.
        </p>

        <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-white/15 bg-white/5 p-4 backdrop-blur-xl md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 md:flex-1">
              <MapPin size={18} className="shrink-0 text-orange-300" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Enter location (e.g., Sector 62)"
                className="border-0 bg-transparent text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div ref={dropdownRef} className="relative w-full md:w-44">
              <div
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3"
              >
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <Building2 size={16} className="text-orange-300" />
                  <span>{selectedType}</span>
                </div>
                <ChevronDown size={16} className={`transition ${openDropdown ? "rotate-180" : ""}`} />
              </div>

              <div
                className={`absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl transition-all ${
                  openDropdown
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                {propertyOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedType(option);
                      setOpenDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm ${
                      selectedType === option
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSearch}
              className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-6 font-semibold text-white hover:opacity-90 md:w-auto"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
