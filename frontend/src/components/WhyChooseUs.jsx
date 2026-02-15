import {
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Building2,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified & Curated",
      desc: "Only real homes. Carefully screened and quality-checked.",
    },
    {
      icon: Sparkles,
      title: "Premium Experience",
      desc: "Clean interface. Smart filtering. Effortless discovery.",
    },
    {
      icon: PhoneCall,
      title: "Human Assistance",
      desc: "Real people guiding you from search to agreement.",
    },
    {
      icon: Building2,
      title: "Owner Direct Access",
      desc: "Fast connections without unnecessary friction.",
    },
  ];

  return (
    <section className="bg-black px-5 py-14 text-white md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Why Choose <span className="text-orange-400">The RentHub Company</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400 md:text-lg">Built for a smoother, smarter rental journey.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-orange-400/40 ${
                  index % 2 !== 0 ? "md:mt-8" : ""
                }`}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-orange-500 to-pink-500 text-white">
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
