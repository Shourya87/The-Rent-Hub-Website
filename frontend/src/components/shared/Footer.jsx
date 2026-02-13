import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-gray-200">

      <div className="max-w-7xl mx-auto px-6 md:px-14 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <img
            src="/logotransparent.png"
            alt="The Rent Hub"
            className="h-12 mb-6"
          />

          <p className="text-gray-600 leading-relaxed text-sm">
            The Rent Hub is a modern real estate platform helping tenants and
            property owners connect seamlessly with verified listings and
            zero hassle experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-5">Quick Links</h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li>
              <Link to="/" className="hover:text-black transition">
                Discover
              </Link>
            </li>
            <li>
              <Link to="/rent" className="hover:text-black transition">
                Rent Flat
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-black transition">
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black transition">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-lg mb-5">Services</h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li>Property Listing</li>
            <li>Tenant Assistance</li>
            <li>Commercial Spaces</li>
            <li>Owner Management</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-5">Contact</h3>

          <div className="space-y-4 text-gray-600 text-sm">

            <div className="flex items-center gap-3">
              <Phone size={16} />
              <span>+91 800-RENTHUB</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={16} />
              <span>support@therenthub.in</span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={16} />
              <span>Noida, Uttar Pradesh, India</span>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} The Rent Hub Company. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
