import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LogoDefault from "@/assets/logo.png";

interface MenuLink { label: string; href: string }

const defaultLinks: MenuLink[] = [
  { label: "Giới thiệu", href: "#about" },
  { label: "Dự án", href: "#projects" },
  { label: "Câu chuyện", href: "#testimonials" },
  { label: "Đồng hành", href: "#help" },
  { label: "Đối tác", href: "#partners" },
  { label: "Liên hệ", href: "#contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [data, setData] = useState<{
    logo: string;
    brand: string;
    links: MenuLink[];
    ctaLabel: string;
    ctaUrl: string;
    visible: boolean;
  }>({
    logo: LogoDefault,
    brand: "FFVN",
    links: defaultLinks,
    ctaLabel: "Ủng hộ",
    ctaUrl: "#contact",
    visible: true,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    (async () => {
      const { data: row } = await supabase
        .from("section_contents")
        .select("image_url, content, visible")
        .eq("section_key", "header")
        .maybeSingle();
      const c: any = row?.content || {};
      setData({
        logo: row?.image_url || LogoDefault,
        brand: c.brand_name || "FFVN",
        links: Array.isArray(c.menu) && c.menu.length ? c.menu : defaultLinks,
        ctaLabel: c.cta_label || "Ủng hộ",
        ctaUrl: c.cta_url || "#contact",
        visible: row?.visible ?? true,
      });
    })();
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  if (!data.visible) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a href="#" className="flex items-center space-x-3 group" onClick={() => setMobileOpen(false)}>
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-soft group-hover:shadow-glow transition-shadow duration-300 bg-white">
              <img src={data.logo} alt={`${data.brand} Logo`} className="w-full h-full object-contain" />
            </div>
            <span className={`text-lg font-bold transition-colors duration-300 ${scrolled || mobileOpen ? "text-earth" : "text-white"}`}>
              {data.brand}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {data.links.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 hover:text-hope relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-hope after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled ? "text-earth" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="hope"
              size="sm"
              className="ml-4"
              onClick={() => { if (data.ctaUrl) window.location.href = data.ctaUrl; }}
            >
              <Heart className="w-4 h-4 mr-1" />
              {data.ctaLabel}
            </Button>
          </nav>

          {/* Mobile Toggle - animated hamburger */}
          <button
            className={`lg:hidden relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
              mobileOpen
                ? "bg-hope text-white shadow-glow scale-105"
                : scrolled
                ? "bg-earth/5 text-earth hover:bg-earth/10"
                : "bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Mở menu"
          >
            <span className="sr-only">Menu</span>
            <Menu className={`w-5 h-5 absolute transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`} />
            <X className={`w-5 h-5 absolute transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`} />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-earth-dark/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[88%] max-w-sm bg-gradient-to-br from-white via-warmth-soft/40 to-warmth-soft shadow-2xl transition-transform duration-500 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-hope/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-warmth/30 blur-3xl pointer-events-none" />

          <div className="relative h-full flex flex-col pt-24 pb-8 px-7 overflow-y-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-hope font-semibold mb-2">Khám phá</p>
            <h3 className="text-2xl font-black text-earth mb-8">Cùng FFVN <br/>kiến tạo tương lai.</h3>

            <nav className="flex flex-col">
              {data.links.map((link, i) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    transitionDelay: mobileOpen ? `${120 + i * 60}ms` : "0ms",
                  }}
                  className={`group flex items-center justify-between py-4 border-b border-earth/10 text-earth font-semibold text-lg transition-all duration-500 hover:text-hope hover:pl-2 ${
                    mobileOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-hope/40 group-hover:bg-hope group-hover:scale-150 transition-all" />
                    {link.label}
                  </span>
                  <span className="text-hope opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              ))}
            </nav>

            <div
              className="mt-8 transition-all duration-500"
              style={{ transitionDelay: mobileOpen ? `${120 + data.links.length * 60}ms` : "0ms",
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              <Button
                variant="hope"
                size="lg"
                className="w-full rounded-full shadow-glow text-base py-6"
                onClick={() => { setMobileOpen(false); if (data.ctaUrl) window.location.href = data.ctaUrl; }}
              >
                <Heart className="w-5 h-5 mr-2 fill-current" />
                {data.ctaLabel}
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-4">
                Mỗi đóng góp là một bước tiến cho thế hệ trẻ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
