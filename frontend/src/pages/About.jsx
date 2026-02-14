import { useEffect, useState } from "react";
import { Building2, ShieldCheck, Users2, Rocket, Star } from "lucide-react";

const stats = [
  { number: "10K+", label: "Active Listings" },
  { number: "5K+", label: "Happy Tenants" },
  { number: "100%", label: "Verified Properties" },
  { number: "50+", label: "Area Coverage" },
];

export default function AboutSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">

      {/* ================= Background Glow ================= */}
      <div className="absolute -top-40 -left-40 w-125 h-125 bg-orange-500/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-125 h-125 bg-white/5 blur-[150px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">

        {/* =============== Section Label =============== */}
        <div className="text-center mb-6">
          <span className="px-4 py-1 text-xs tracking-widest uppercase rounded-full bg-white/10 text-white">
            About The Rent Hub
          </span>
        </div>

        {/* =============== Heading =============== */}
        <h2
          className={`text-4xl md:text-6xl font-extrabold text-center leading-tight transition duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          We’re Reinventing
          <br />
          <span className="text-orange-500">
            The Way India Rents Homes
          </span>
        </h2>

        {/* =============== Description =============== */}
        <p
          className={`mt-8 max-w-3xl mx-auto text-gray-300 text-lg text-center transition duration-1000 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          The Rent Hub is built for speed, trust, and modern renters.
          We eliminate brokers, simplify discovery, and directly connect
          tenants with verified property owners — making renting smarter,
          safer, and stress-free.
        </p>

        {/* =============== Features Grid =============== */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">

          <FeatureCard
            icon={<ShieldCheck size={28} />}
            title="Verified Listings"
            desc="Every property is manually verified to ensure zero fake listings."
          />

          <FeatureCard
            icon={<Users2 size={28} />}
            title="Direct Owner Connect"
            desc="Skip the middlemen. Contact owners instantly."
          />

          <FeatureCard
            icon={<Rocket size={28} />}
            title="Fast Discovery"
            desc="Smart search & filters to find your perfect home faster."
          />

          <FeatureCard
            icon={<Building2 size={28} />}
            title="Premium Experience"
            desc="A smooth, modern, and secure renting platform."
          />

        </div>

        {/* =============== Stats Section =============== */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:bg-white/10 transition duration-300"
            >
              <h3 className="text-3xl font-bold text-orange-500">
                {stat.number}
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                {stat.label}
              </p>
            </div>
          ))}

        </div>

        {/* =============== Vision Panel =============== */}
        <div className="mt-28 bg-linear-to-r from-orange-600 via-orange-500 to-orange-400 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">

          <h3 className="text-3xl md:text-5xl font-bold">
            Our Vision
          </h3>

          <p className="mt-6 max-w-2xl mx-auto text-white/90 text-lg">
            To build India's most trusted rental ecosystem —
            powered by transparency, technology, and tenant-first innovation.
          </p>

          <button className="mt-10 px-8 py-3 rounded-full bg-white text-orange-600 font-semibold shadow-xl hover:scale-105 transition duration-300">
            Explore Properties
          </button>

        </div>
      </div>
    </section>
  );
}

/* ================= Feature Card ================= */

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl transition duration-300 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl">

      <div className="mb-5 text-orange-500">
        {icon}
      </div>

      <h4 className="text-lg font-semibold mb-2">
        {title}
      </h4>

      <p className="text-gray-400 text-sm">
        {desc}
      </p>
    </div>
  );
}
