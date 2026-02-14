import { useState } from "react";
import { Sparkles, Rocket, Building2, PhoneCall } from "lucide-react";

export default function ListProperty() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden px-6 py-20">

      {/* Ambient Gradient Glow */}
      <div className="absolute -top-60 -left-60 w-125 h-125 bg-orange-500/20 blur-[200px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-purple-600/20 blur-[180px] rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs uppercase tracking-wider border border-white/20">
            🚀 Launching Soon
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-center leading-tight">
          List Your Property
          <br />
          <span className="bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            The Right Way.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 text-lg text-center mt-6 max-w-2xl mx-auto">
          We’re building something different. Not just another portal.
          A real service — where we verify, coordinate,
          and actively manage your rental process.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:scale-105 transition duration-300">
            <Building2 className="text-orange-400 mb-4" size={28} />
            <h3 className="font-semibold text-lg mb-2">
              Manual Verification
            </h3>
            <p className="text-gray-400 text-sm">
              Every property is reviewed and verified by our team — no fake
              listings, no automation chaos.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:scale-105 transition duration-300">
            <PhoneCall className="text-pink-400 mb-4" size={28} />
            <h3 className="font-semibold text-lg mb-2">
              Active Coordination
            </h3>
            <p className="text-gray-400 text-sm">
              We talk to tenants and owners directly. Follow-ups,
              screening, scheduling — handled professionally.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:scale-105 transition duration-300">
            <Sparkles className="text-purple-400 mb-4" size={28} />
            <h3 className="font-semibold text-lg mb-2">
              Human Execution
            </h3>
            <p className="text-gray-400 text-sm">
              Not just exposure. We drive real closure,
              professionally and responsibly.
            </p>
          </div>

        </div>

        {/* Emotional Statement */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <p className="text-xl font-semibold leading-relaxed">
            Most platforms give you reach.  
            <br />
            We give you responsibility.
          </p>

          <p className="text-gray-500 mt-4">
            Big companies optimize for scale.
            <br />
            We optimize for care.
          </p>
        </div>

        {/* Email Notify Section */}
        <div className="mt-16 max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">

          {!subscribed ? (
            <>
              <h3 className="text-lg font-semibold mb-4">
                Want early access when we launch?
              </h3>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-black border border-white/20 focus:outline-none"
                />

                <button
                  type="submit"
                  className="bg-linear-to-r from-orange-500 to-pink-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
                >
                  Notify Me
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <Rocket size={40} className="text-orange-400 mb-4" />
              <h3 className="text-lg font-semibold">
                You're on the launch list.
              </h3>
              <p className="text-gray-400 mt-2 text-sm">
                We'll notify you the moment we go live.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
