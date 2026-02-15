import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Building2, Home, ShieldCheck, Sparkles } from "lucide-react";

const quickActions = [
  {
    title: "Search Property",
    subtitle: "Verified flats in top localities",
    tone: "from-pink-600 to-rose-500",
    action: "Rent a Flat",
    onClick: (navigate) => navigate("/rent"),
    icon: Home,
  },
  {
    title: "Post your Property",
    subtitle: "Get quality leads quickly",
    tone: "from-amber-700 to-rose-700",
    action: "List Property",
    onClick: (navigate) => navigate("/list-property"),
    icon: Building2,
  },
  {
    title: "Trusted Rentals",
    subtitle: "100% owner verified + easy support",
    tone: "from-indigo-600 to-violet-600",
    action: "Explore Listings",
    onClick: (navigate) => navigate("/listings"),
    icon: ShieldCheck,
  },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-slate-50 px-5 py-14 md:px-10 md:py-20">
      <div className="absolute -top-24 -left-16 h-56 w-56 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
          <Sparkles size={14} className="text-pink-500" />
          New style rental experience
        </div>

        <h1 className="text-center text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
          Find your next home,
          <br />
          <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
            faster & smarter.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-center text-sm text-slate-600 md:text-lg">
          Inspired by modern mobile card layouts — now focused on quick actions so users can jump directly to
          rental discovery.
        </p>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate("/rent")}
            className="rounded-2xl bg-gradient-to-r from-pink-600 to-indigo-600 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-pink-200 hover:opacity-95"
          >
            Go to Rent a Flat
            <ArrowRight size={18} />
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className={`rounded-3xl bg-gradient-to-br ${card.tone} p-6 text-white shadow-xl transition-transform duration-300 hover:-translate-y-1`}
              >
                <div className="mb-3 flex items-center gap-2 text-white/90">
                  <Icon size={18} />
                  <span className="text-xs font-semibold uppercase tracking-[0.15em]">Quick Access</span>
                </div>
                <h3 className="text-3xl font-extrabold leading-tight">{card.title}</h3>
                <p className="mt-2 text-sm text-white/90">{card.subtitle}</p>
                <button
                  type="button"
                  onClick={() => card.onClick(navigate)}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm hover:bg-white/30"
                >
                  {card.action}
                  <ArrowRight size={16} />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
