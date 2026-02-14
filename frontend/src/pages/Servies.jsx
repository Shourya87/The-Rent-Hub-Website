import {
  ShieldCheck,
  Handshake,
  PhoneCall,
  MapPin,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function Services() {
  return (
    <section className="min-h-screen bg-black px-6 py-20 text-white md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-orange-300">
            Services & USP
          </span>

          <h2 className="mt-6 text-4xl font-extrabold md:text-6xl">
            We Are Not Just a Rental Platform.
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              We Are A Rental Support Partner.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            Most rental portals treat renting as a search task. We treat it as a responsibility — handled end to end.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <DifferenceCard icon={<ShieldCheck size={26} />} title="Manual Verification" desc="We manually verify tenant suitability and property information — not just automated uploads." />
          <DifferenceCard icon={<Handshake size={26} />} title="Active Coordination" desc="We coordinate between tenant & owner to ensure smooth communication and clarity." />
          <DifferenceCard icon={<PhoneCall size={26} />} title="Real Follow-Ups" desc="We don’t just connect — we follow up until closure happens." />
          <DifferenceCard icon={<MapPin size={26} />} title="Ground Level Support" desc="We know the area. We work locally. We guide based on real conditions." />
          <DifferenceCard icon={<Users size={26} />} title="Hands-On Assistance" desc="We actively understand needs on both sides before matching." />
          <DifferenceCard icon={<FileText size={26} />} title="Paperwork & Process Guidance" desc="We guide through communication, paperwork clarification, and final agreement." />
        </div>

        <div className="mt-24 rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
          <h3 className="text-2xl font-light text-slate-300 md:text-3xl">Most tenants and owners don’t say:</h3>
          <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">“I want more listings.”</h2>
          <h3 className="mt-10 text-2xl font-light text-slate-300 md:text-3xl">They say:</h3>
          <h2 className="mt-4 text-3xl font-extrabold text-orange-400 md:text-5xl">“Someone please handle this properly.”</h2>
          <p className="mt-10 text-lg text-slate-300">That gap is real. And it’s growing.</p>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold">Renting Should Be Coordinated, <span className="text-orange-400">Not Complicated.</span></h2>
          <button className="mx-auto mt-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-10 py-4 font-semibold text-white">
            Experience The Difference
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function DifferenceCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-orange-400/50">
      <div className="mb-4 text-orange-400">{icon}</div>
      <h4 className="mb-3 text-xl font-semibold">{title}</h4>
      <p className="text-slate-300">{desc}</p>
    </div>
  );
}
