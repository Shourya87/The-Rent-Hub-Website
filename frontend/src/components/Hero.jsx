import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Building2, Home, ShieldCheck, Sparkles } from "lucide-react";

const quickActions = [
  {
    title: "Search Property",
    subtitle: "Verified flats in top localities",
    tone: "from-orange-500 to-pink-500",
    action: "Rent a Flat",
    onClick: (navigate) => navigate("/rent"),
    icon: Home,
  },
  {
    title: "Post your Property",
    subtitle: "Get quality leads quickly",
    tone: "from-orange-600 to-rose-600",
    action: "List Property",
    onClick: (navigate) => navigate("/list-property"),
    icon: Building2,
  },
  {
    title: "Trusted Rentals",
    subtitle: "100% owner verified + easy support",
    tone: "from-orange-700 to-pink-600",
    action: "Explore Listings",
    onClick: (navigate) => navigate("/listings"),
    icon: ShieldCheck,
  },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-black px-5 py-16 md:px-10 md:py-24">
      
      {/* Gradient Glows */}
      <div className="absolute -top-40 left-10 h-72 w-72 rounded-full bg-orange-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-pink-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Top Label */}
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
          <Sparkles size={14} className="text-orange-400" />
          Premium Rental Experience
        </div>

        {/* Heading */}
        <h1 className="text-center text-4xl font-extrabold text-white leading-tight md:text-6xl lg:text-7xl">
          Rent Smarter.
          <br />
          <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Live Better.
          </span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-white/60 md:text-lg">
          Discover verified rental homes across top localities with seamless search,
          quick listing and trusted support.
        </p>

        {/* Main CTA */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate("/rent")}
            className="rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-orange-500/20 hover:opacity-90"
          >
            Explore Properties
            <ArrowRight size={18} />
          </Button>
        </div>

        {/* Quick Action Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className={`rounded-3xl bg-gradient-to-br ${card.tone} p-[1px] transition-transform duration-300 hover:-translate-y-2`}
              >
                <div className="rounded-3xl bg-[#0f0f0f] p-6 h-full">
                  <div className="mb-3 flex items-center gap-2 text-orange-400">
                    <Icon size={18} />
                    <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                      Quick Access
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-sm text-white/60">
                    {card.subtitle}
                  </p>

                  <button
                    type="button"
                    onClick={() => card.onClick(navigate)}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                  >
                    {card.action}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Hero;
