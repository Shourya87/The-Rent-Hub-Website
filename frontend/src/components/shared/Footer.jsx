import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-4 md:px-14">
        <div>
          <img src="/logo.png" alt="The Rent Hub" className="mb-6 h-14" />

          <p className="text-sm leading-relaxed text-slate-400">
            The Rent Hub is a modern real estate platform helping tenants and property owners connect seamlessly with verified listings and hassle free experience.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link to="/" className="hover:text-orange-300">Discover</Link></li>
            <li><Link to="/rent" className="hover:text-orange-300">Rent Flat</Link></li>
            <li><Link to="/services" className="hover:text-orange-300">Our Services</Link></li>
            <li><Link to="/about" className="hover:text-orange-300">About</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold">Services</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="hover:text-orange-300">Property Listing</li>
            <li className="hover:text-orange-300">Tenant Assistance</li>
            <li className="hover:text-orange-300">Commercial Spaces</li>
            <li className="hover:text-orange-300">Owner Management</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold">Contact</h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-center gap-3 hover:text-orange-300"><Phone size={16} /> +91 9217566061</li>
            <li className="flex items-center gap-3 hover:text-orange-300"><Mail size={16} /> support@therenthub.in</li>
            <li className="flex items-center gap-3 hover:text-orange-300"><MapPin size={16} />Greater Noida, Uttar Pradesh, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
        © 2026 The Rent Hub Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
