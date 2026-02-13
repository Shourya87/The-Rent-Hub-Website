import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Building2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-white text-black overflow-hidden">

      {/* Soft Gradient Background Layer */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-100 via-white to-gray-200 pointer-events-none" />

      {/* Subtle Radial Glow */}
      <div className="absolute -top-40 -right-40 w-125 h-125 bg-black/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-100 h-100 bg-black/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="px-4 py-1 text-xs font-medium tracking-wide uppercase bg-black text-white rounded-full">
            India's Smart Rental Platform
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
          Verified listings, instant owner connect, zero brokerage.
          Experience renting the modern way.
        </p>

        {/* Toggle Buttons */}
        <div className="flex justify-center mt-10">
          <div className="bg-gray-100 p-1 rounded-full flex gap-2 shadow-inner">
            <button className="px-6 py-2 rounded-full bg-black text-white text-sm font-medium transition">
              Rent
            </button>
            <button className="px-6 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-black transition">
              Buy
            </button>
          </div>
        </div>

        {/* Glass Search Panel */}
        <div className="mt-12 bg-white border border-gray-200 shadow-xl rounded-2xl p-4 md:p-6 max-w-5xl mx-auto">

          <div className="flex flex-col md:flex-row gap-4 items-center">

            {/* Location */}
            <div className="flex items-center gap-3 w-full border rounded-xl px-4 py-4 bg-gray-50">
              <MapPin size={18} className="text-gray-500" />
              <Input
                placeholder="Enter city or locality"
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {/* Property Type */}
            <div className="flex items-center gap-3 w-full border rounded-xl px-4 py-4 bg-gray-50">
              <Building2 size={18} className="text-gray-500" />
              <Input
                placeholder="Property type (2BHK, Flat, etc.)"
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {/* Search Button */}
            <Button className="w-full md:w-auto px-10 py-6 rounded-xl bg-black text-white hover:bg-gray-800 text-base font-semibold transition">
              <Search className="mr-2" size={18} />
              Search
            </Button>
          </div>
        </div>

        {/* Trust Stats Section */}
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
    </section>
  );
};

export default Hero;
