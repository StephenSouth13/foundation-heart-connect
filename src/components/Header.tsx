import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import Logo from "@/assets/logo.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Giới thiệu", href: "#about" },
    { label: "Dự án", href: "#projects" },
    { label: "Câu chuyện", href: "#testimonials" },
    { label: "Đồng hành", href: "#help" },
    { label: "Đối tác", href: "#partners" },
    { label: "Liên hệ", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-soft group-hover:shadow-glow transition-shadow duration-300">
            <img src={Logo} alt="FFVN Logo" className="w-full h-full object-contain" />
          </div>
          <span
            className={`text-lg font-bold transition-colors duration-300 ${
              scrolled ? "text-earth" : "text-white"
            }`}
          >
            FFVN
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-hope relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-hope after:transition-all after:duration-300 hover:after:w-full ${
                scrolled ? "text-earth" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button variant="hope" size="sm" className="ml-4">
            <Heart className="w-4 h-4 mr-1" />
            Ủng hộ
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className={`w-6 h-6 ${scrolled ? "text-earth" : "text-white"}`} />
          ) : (
            <Menu className={`w-6 h-6 ${scrolled ? "text-earth" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t animate-fade-in">
          <nav className="container mx-auto px-6 py-4 flex flex-col space-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-earth font-medium py-2 hover:text-hope transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button variant="hope" size="sm" className="w-full mt-2">
              <Heart className="w-4 h-4 mr-1" />
              Ủng hộ
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
