import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative bg-white py-14 md:py-28 px-5 md:px-12 overflow-hidden">

      {/* Soft Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-black text-white px-6 md:px-16 py-12 md:py-20 overflow-hidden"
        >

          {/* Floating Blur Accent */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-white/5 blur-3xl rounded-full pointer-events-none" />

          <div className="relative text-center">

            <h2 className="text-2xl md:text-5xl font-semibold tracking-tight leading-tight">
              Own a Property?
              <br />
              <span className="text-gray-400">
                Turn it into Income.
              </span>
            </h2>

            <p className="mt-4 md:mt-6 text-gray-300 text-sm md:text-lg max-w-2xl mx-auto">
              Reach verified tenants instantly. Professional listing,
              premium visibility, and direct connections.
            </p>

            <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">

              {/* Primary Button */}
              <Button className="group bg-white text-black px-8 py-6 text-sm md:text-base rounded-full hover:bg-gray-200 transition flex items-center gap-2">
                List Property
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </Button>

              {/* Secondary Button */}
              <Button
                variant="outline"
                className="border-white text-white px-8 py-6 text-sm md:text-base rounded-full hover:bg-white hover:text-black transition"
              >
                See How It Works
              </Button>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
