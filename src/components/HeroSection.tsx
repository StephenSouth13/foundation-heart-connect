// D:\FF Foundation\foundation-heart-connect\src\components\HeroSection.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroAction {
  label: string;
  primary: boolean;
  link_type: "internal" | "external";
  url: string;
}

interface StatItem {
  label: string;
  value: string;
}

interface HeroContent {
  description: string;
  tagline?: string;
  actions?: HeroAction[];
  stats?: StatItem[];
}

interface SectionData {
  title: string;
  subtitle: string;
  content: HeroContent | null;
  image_url: string;
  visible: boolean;
}

const HeroSection = () => {
  const [heroData, setHeroData] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        const { data, error } = await supabase
          .from("section_contents")
          .select("title, subtitle, content, image_url, visible")
          .eq("section_key", "hero")
          .maybeSingle();

        if (error) throw error;
        if (data) {
          setHeroData(data as unknown as SectionData);
        }
      } catch (error) {
        console.error("Error loading Hero section data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSection();
  }, []);

  // Bảo mật & Tối ưu: Nếu ẩn hoặc đang load thì triệt tiêu render vùng DOM này
  if (loading || !heroData || !heroData.visible) {
    return null; 
  }

  const { title, subtitle, image_url, content } = heroData;
  const stats = content?.stats || [];
  const actions = content?.actions || [];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-earth-dark">
      {/* Media Canvas Area */}
      {image_url && (
        <div className="absolute inset-0 z-0">
          <img 
            src={image_url} 
            alt={title || "FFVN Foundation"} 
            className="w-full h-full object-cover transition-opacity duration-700"
            loading="eager"
          />
          {/* Lớp phủ gradient chuẩn điện ảnh tăng tương phản cho text trắng */}
          <div className="absolute inset-0 bg-gradient-to-t from-earth-dark via-earth-dark/60 to-earth-dark/30"></div>
        </div>
      )}

      {/* Content Canvas */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-screen pt-16">
        
        {/* Tagline (Nhãn nhỏ phía trên tiêu đề) */}
        {content?.tagline && (
          <span className="inline-block text-xs md:text-sm font-semibold tracking-widest text-hope uppercase bg-hope/10 px-4 py-1.5 rounded-full mb-6 border border-hope/20 animate-fade-in">
            {content.tagline}
          </span>
        )}

        {/* Tiêu đề chính lớn */}
        {title && (
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 max-w-4xl text-balance drop-shadow-md animate-fade-in [animation-delay:0.2s]">
            {title}
          </h1>
        )}

        {/* Slogan / Phụ đề */}
        {subtitle && (
          <p className="text-lg sm:text-xl md:text-2xl font-medium mb-4 text-warmth text-balance max-w-2xl animate-fade-in [animation-delay:0.4s]">
            {subtitle}
          </p>
        )}

        {/* Mô tả chi tiết diện rộng */}
        {content?.description && (
          <p className="text-sm sm:text-base md:text-lg opacity-85 max-w-3xl text-balance mb-10 leading-relaxed animate-fade-in [animation-delay:0.6s]">
            {content.description}
          </p>
        )}

        {/* Khối Actions Button (CTA) động */}
        {actions.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-in [animation-delay:0.8s]">
            {actions.map((action, idx) => (
              <Button
                key={idx}
                size="lg"
                variant={action.primary ? "default" : "outline"}
                className={`rounded-full px-8 py-6 text-base font-semibold transition-transform active:scale-95 ${
                  action.primary 
                    ? "bg-hope hover:bg-hope/95 text-white shadow-glow" 
                    : "bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
                }`}
                onClick={() => {
                  if (action.link_type === "external") {
                    window.open(action.url, "_blank", "noopener,noreferrer");
                  } else {
                    window.location.href = action.url;
                  }
                }}
              >
                {action.primary && <Heart className="w-4 h-4 mr-2 fill-current" />}
                {action.label}
                {!action.primary && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            ))}
          </div>
        )}

        {/* Khối chỉ số thống kê Metrics công khai */}
        {stats.length > 0 && (
          <div className="w-full max-w-4xl mt-auto pb-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-10 animate-fade-in [animation-delay:1s]">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group px-4">
                <div className="text-3xl md:text-5xl font-black text-warmth mb-2 tracking-tight transition-transform group-hover:scale-105 duration-300">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-medium text-white/70 tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chỉ báo cuộn xuống thông minh */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block opacity-40 hover:opacity-100 transition-opacity">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1 cursor-pointer">
          <div className="w-1.5 h-2.5 bg-white rounded-full animate-scroll-down"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;