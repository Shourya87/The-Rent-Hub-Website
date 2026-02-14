import { motion } from "framer-motion";
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
    <section className="relative bg-white py-12 md:py-24 overflow-hidden">

      <div className="max-w-6xl mx-auto px-5 md:px-12">

        {/* Heading */}
        <div className="text-left md:text-center max-w-xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-semibold tracking-tight">
            Why Choose <span className="text-gray-400">The RentHub Company</span>
          </h2>

          <p className="mt-3 text-gray-500 text-sm md:text-lg">
            Built for a smoother, smarter rental journey.
          </p>
        </div>


        {/* MOBILE – Horizontal Snap Scroll */}
        <div className="mt-10 md:hidden overflow-x-auto no-scrollbar">
          <div className="flex gap-4 snap-x snap-mandatory">

            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  whileTap={{ scale: 0.96 }}
                  className="min-w-[85%] snap-center bg-black text-white rounded-2xl p-6 relative"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-black mb-5">
                    <Icon size={18} />
                  </div>

                  <h3 className="text-lg font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}

          </div>
        </div>



        {/* DESKTOP – Offset Modern Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 mt-16">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`border border-gray-200 rounded-3xl p-10 transition duration-300 hover:shadow-2xl bg-white ${
                  index % 2 !== 0 ? "mt-10" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center mb-6">
                  <Icon size={20} />
                </div>

                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
