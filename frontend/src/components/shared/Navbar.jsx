import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Discover", path: "/" },
    { name: "Rent a Flat", path: "/rent" },
    { name: "Our Services", path: "/services" },
    { name: "About", path: "/about" },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-white/10 py-2 shadow-lg"
          : "bg-black/95 backdrop-blur-xl border-white/5 py-3"
      }`}
    >
      <div className="w-full px-6 md:px-14 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="The Rent Hub"
            className="h-10 md:h-14 object-contain"
          />
          <h1 className="ml-2 text-xl md:text-2xl font-bold tracking-tight text-white">
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
                      ? "text-white"
                      : "text-white/60 group-hover:text-white"
                  }`}
                >
                  {item.name}
                </span>

                <span
                  className={`absolute left-0 -bottom-2 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 origin-left transition-transform duration-300 ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  } w-full`}
                />
              </Link>
            );
          })}

          {/* Premium Gradient Button */}
          <Link to="/list-property">
            <Button
              className="rounded-full px-6 py-2 font-bold text-white 
              bg-gradient-to-r from-orange-500 to-pink-500 
              hover:scale-105 hover:shadow-xl 
              transition-all duration-300"
            >
              List Property
            </Button>
          </Link>
        </div>

        {/* ================= MOBILE NAV ================= */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button onClick={() => setOpen(true)}>
                <Menu className="h-7 w-7 text-white" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-black text-white w-[75%] max-w-[320px] border-l border-white/10"
            >
              {/* Mobile Logo */}
              <div className="mt-8 mb-10 text-center">
                <img
                  src="/logo.png"
                  alt="The Rent Hub"
                  className="h-10 mx-auto"
                />
                <h1 className="text-xl font-bold mt-3">
                  The RentHub Company
                </h1>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col gap-8 text-lg font-semibold text-center">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`transition ${
                      isActivePath(item.path)
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile CTA */}
                <Link
                  to="/list-property"
                  onClick={() => setOpen(false)}
                  className="mt-6 w-44 mx-auto rounded-full py-3 font-bold text-white 
                  bg-gradient-to-r from-orange-500 to-pink-500 
                  hover:scale-105 hover:shadow-lg 
                  transition-all duration-300"
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
