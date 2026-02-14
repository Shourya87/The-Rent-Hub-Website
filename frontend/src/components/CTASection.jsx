import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="bg-black px-5 py-14 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-gradient-to-r from-orange-500/15 via-transparent to-pink-500/15 px-6 py-12 text-white md:px-16 md:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            Own a Property?
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Turn it into Income.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm text-slate-300 md:text-lg">
            Reach verified tenants instantly. Professional listing, premium visibility, and direct connections.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/list-property">
              <Button className="group rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-6 text-base text-white hover:opacity-90">
                List Property
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link to="/services">
              <Button
                variant="outline"
                className="rounded-full border-white/30 bg-transparent px-8 py-6 text-base text-white hover:bg-white hover:text-black"
              >
                Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
