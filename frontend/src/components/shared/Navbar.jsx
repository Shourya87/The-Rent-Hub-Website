import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Discover", path: "/" },
    { name: "Rent Flat", path: "/rent" },
    { name: "Our Services", path: "/services" },
    { name: "About", path: "/about" },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white shadow-md border-gray-200 py-2"
          : "bg-white/95 backdrop-blur-md border-gray-100 py-3"
      }`}
    >
      <div className="w-full px-6 md:px-14 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logotransparent.png"
            alt="The Rent Hub"
            className="h-12 md:h-16 object-contain"
          />
          <h1 className="ml-2 text-xl md:text-3xl font-bold tracking-tight text-black">
            The RentHub Company
          </h1>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden md:flex items-center gap-12 text-[16px] font-semibold tracking-wide">
          {navItems.map((item) => {
            const isActive = isActivePath(item.path);

            return (
              <Link key={item.path} to={item.path} className="relative group">
                <span
                  className={`transition duration-200 ${
                    isActive
                      ? "text-black"
                      : "text-gray-500 group-hover:text-black"
                  }`}
                >
                  {item.name}
                </span>

                <span
                  className={`absolute left-0 -bottom-2 h-0.5 bg-black origin-left transition-transform duration-200 ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  } w-full`}
                />
              </Link>
            );
          })}

          {/* ===== FIXED LIST PROPERTY BUTTON ===== */}
          <Link to="/list-property">
            <Button
              className={`rounded-full px-6 py-2 font-bold transition ${
                isActivePath("/list-property")
                  ? "bg-black text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              List Property
            </Button>
          </Link>
        </div>

        {/* ================= MOBILE NAV ================= */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button>
                <Menu className="h-7 w-7 text-black" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-white text-black w-[75%] max-w-[320px] border-l border-gray-200"
            >
              {/* Logo */}
              <div className="mt-8 mb-10 text-center">
                <img
                  src="/logotransparent.png"
                  alt="The Rent Hub"
                  className="h-10 mx-auto"
                />
                <h1 className="text-xl font-bold text-black mt-2">
                  The RentHub Company
                </h1>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-8 text-lg font-semibold text-center">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`transition ${
                      isActivePath(item.path)
                        ? "text-black"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* FIXED MOBILE LIST PROPERTY LINK */}
                <Link
                  to="/list-property"
                  className="mt-6 w-44 mx-auto bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800 transition"
                >
                  List Property
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
