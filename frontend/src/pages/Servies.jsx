import { ShieldCheck, Users, Handshake, PhoneCall, MapPin, FileText, ArrowRight } from "lucide-react";

export default function OurServices() {
  return (
    <section className="relative bg-white text-black py-14 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-125 h-125 bg-orange-500/10 blur-[140px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-125 h-125 bg-black/5 blur-[160px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">

        {/* ============ SECTION HEADING ============ */}
        <div className="text-center mb-16">
          <span className="px-4 py-1 text-xs uppercase tracking-widest bg-black text-white rounded-full">
            Our Services & USP
          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold mt-6">
            We Are Not Just a Rental Platform.
            <br />
            <span className="text-orange-500">
              We Are A Rental Support Partner.
            </span>
          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
            Most rental portals treat renting as a search task.
            We treat it as a responsibility — handled end to end.
          </p>
        </div>

        {/* ============ DIFFERENCE GRID ============ */}
        <div className="grid md:grid-cols-2 gap-12 mt-14">

          <DifferenceCard
            icon={<ShieldCheck size={26} />}
            title="Manual Verification"
            desc="We manually verify tenant suitability and property information — not just automated uploads."
          />

          <DifferenceCard
            icon={<Handshake size={26} />}
            title="Active Coordination"
            desc="We coordinate between tenant & owner to ensure smooth communication and clarity."
          />

          <DifferenceCard
            icon={<PhoneCall size={26} />}
            title="Real Follow-Ups"
            desc="We don’t just connect — we follow up until closure happens."
          />

          <DifferenceCard
            icon={<MapPin size={26} />}
            title="Ground Level Support"
            desc="We know the area. We work locally. We guide based on real conditions."
          />

          <DifferenceCard
            icon={<Users size={26} />}
            title="Hands-On Assistance"
            desc="We actively understand needs on both sides before matching."
          />

          <DifferenceCard
            icon={<FileText size={26} />}
            title="Paperwork & Process Guidance"
            desc="We guide through communication, paperwork clarification, and final agreement."
          />

        </div>

        {/* ============ BIG STATEMENT SLIDE (HIGHLIGHT) ============ */}
        <div className="mt-32 bg-black text-white rounded-3xl p-12 md:p-20 text-center shadow-2xl">

          <h3 className="text-2xl md:text-3xl font-light text-gray-400">
            Most tenants and owners don’t say:
          </h3>

          <h2 className="text-3xl md:text-5xl font-extrabold mt-4">
            “I want more listings.”
          </h2>

          <h3 className="text-2xl md:text-3xl font-light text-gray-400 mt-10">
            They say:
          </h3>

          <h2 className="text-3xl md:text-5xl font-extrabold mt-4 text-orange-500">
            “Someone please handle this properly.”
          </h2>

          <p className="mt-10 text-gray-300 text-lg">
            That gap is real. And it’s growing.
          </p>

        </div>

        {/* ============ WHAT PEOPLE REALLY WANT ============ */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold">
            What People Really Want
          </h2>

          <div className="mt-14 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

            <WantCard text="Someone Reachable" />
            <WantCard text="Someone Responsible" />
            <WantCard text="Someone Who Knows the Area" />

          </div>

          <p className="mt-12 text-gray-600 text-lg max-w-3xl mx-auto">
            Big companies optimize for scale.  
            We optimize for care.
            <br /><br />
            While they automate listings —
            we work at ground level to ensure proper execution.
          </p>
        </div>

        {/* ============ RENTAL EXPERIENCE TODAY SLIDE ============ */}
        <div className="mt-32 bg-gray-100 rounded-3xl p-12 md:p-20">

          <h2 className="text-4xl md:text-5xl font-extrabold text-center">
            The Rental Experience Today
          </h2>

          <div className="mt-14 grid md:grid-cols-2 gap-12 text-gray-700 text-lg">

            <ul className="space-y-6 list-disc list-inside">
              <li>Rental platforms offer scale, but little accountability</li>
              <li>Tenants manage follow-ups & coordination alone</li>
              <li>Owners face unreliable inquiries</li>
              <li>The process breaks due to weak communication</li>
            </ul>

            <div className="bg-white rounded-2xl p-10 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">
                How We Solve It
              </h3>

              <p>
                Active involvement from first contact to final closure.
                <br /><br />
                We don’t disappear after sharing contact details.
                We stay involved until execution is done properly.
              </p>
            </div>

          </div>
        </div>

        {/* ============ CTA SECTION ============ */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl font-bold">
            Renting Should Be Coordinated,
            <span className="text-orange-500"> Not Complicated.</span>
          </h2>

          <button className="mt-10 px-10 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition flex items-center gap-2 mx-auto">
            Experience The Difference
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}

/* ================= Components ================= */

function DifferenceCard({ icon, title, desc }) {
  return (
    <div className="border rounded-2xl p-8 hover:shadow-xl transition duration-300">
      <div className="text-orange-500 mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function WantCard({ text }) {
  return (
    <div className="bg-black text-white rounded-2xl p-10 text-xl font-semibold shadow-xl hover:scale-105 transition duration-300">
      {text}
    </div>
  );
}
