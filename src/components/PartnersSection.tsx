import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";

interface Partner { name: string; logo_url: string; link?: string; position?: string }

const defaultPartners: Partner[] = [
  { name: "MSC", logo_url: "/MSC.png", link: "https://msc.edu.vn" },
  { name: "Smentor", logo_url: "/Smentor.png", link: "#" },
  { name: "VSM – Vietnam Student Marathon", logo_url: "/logovsm.png", link: "https://vsm.org.vn" },
  { name: "Smar", logo_url: "/Smar.png", link: "https://smar.vn" },
  { name: "ACTION Media", logo_url: "/LOGO-ACTION.png", link: "#" },
  { name: "Học Kỳ Doanh Nghiệp", logo_url: "/HKDN.png", link: "#" },
];

export default function PartnersSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [data, setData] = useState<{ title: string; subtitle: string; logos: Partner[]; visible: boolean } | null>(null);

  useEffect(() => {
    (async () => {
      const { data: row } = await supabase
        .from("section_contents")
        .select("title, subtitle, content, visible")
        .eq("section_key", "partners")
        .maybeSingle();
      const c: any = row?.content || {};
      setData({
        title: row?.title || "Các Dự Án Cộng Đồng",
        subtitle: row?.subtitle || "FFVN đầu tư vào các dự án cộng đồng nhằm trao quyền cho giới trẻ, giúp các bạn phát triển kỹ năng và lan tỏa giá trị tích cực.",
        logos: Array.isArray(c.logos) && c.logos.length ? c.logos : defaultPartners,
        visible: row?.visible ?? true,
      });
    })();
  }, []);

  if (!data || !data.visible) return null;

  return (
    <section id="partners" className="py-20 bg-gradient-to-b from-warmth-soft via-background to-warmth-soft" ref={ref}>
      <div className={`container mx-auto px-4 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-extrabold text-earth mb-4 tracking-tight">{data.title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed">{data.subtitle}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center">
          {data.logos.map((p, i) => (
            <a key={i} href={p.link || "#"} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center">
              <div className="w-40 h-24 flex items-center justify-center bg-card shadow-soft rounded-xl p-4 transition duration-300 transform group-hover:scale-105 group-hover:shadow-warm">
                {p.logo_url ? (
                  <img
                    src={p.logo_url}
                    alt={p.name}
                    loading="lazy"
                    className="max-h-20 max-w-full"
                    style={{ objectFit: "contain", objectPosition: p.position || "center" }}
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">{p.name}</span>
                )}
              </div>
              <span className="mt-4 text-earth font-medium group-hover:text-hope transition-colors duration-300">{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
