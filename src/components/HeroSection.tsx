// D:\FF Foundation\foundation-heart-connect\src\components\HeroSection.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroDefaultImage from "@/assets/hero-image.jpg";
import defaultLogo from "@/assets/logo.png";

// Định nghĩa interface con cho các số liệu thống kê
interface StatItem {
  label: string;
  value: string;
}

// Định nghĩa cấu trúc chuẩn cho trường JSONB content
interface HeroContent {
  description?: string;
  stats?: StatItem[];
}

interface SectionData {
  title: string;
  subtitle: string;
  content: HeroContent | null; // Thay thế 'any' bằng type có cấu trúc
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
          // Ép kiểu dữ liệu an toàn từ Supabase JSONB sang Interface đã định nghĩa
          setHeroData(data as unknown as SectionData);
        }
      } catch (error) {
        console.error("Error loading Hero section data:", error);
      } finally {
        // SỬA LỖI CHÍ MẠNG: Gọi hàm thay vì gán hằng số
        setLoading(false);
      }
    };

    fetchHeroSection();
  }, []);

  // Nếu đang load dữ liệu, hoặc dữ liệu trả về cấu hình ẩn (visible = false) thì không render gì cả
  if (loading || (heroData && !heroData.visible)) {
    return null; 
  }

  // Fallback data nếu admin chưa nhập gì trong DB để tránh crash giao diện
  const title = heroData?.title || "Quỹ Tương Lai Việt Nam";
  const subtitle = heroData?.subtitle || '"Gieo hạt tri thức – Gặt mùa tương lai"';
  const bgImage = heroData?.image_url || heroDefaultImage;
  
  // Xử lý dữ liệu stats động an toàn
  const stats: StatItem[] = heroData?.content?.stats || [
    { label: "Sinh viên thụ hưởng", value: "20.000+" },
    { label: "Dự án giáo dục & khởi nghiệp", value: "50+" },
    { label: "Tỉnh thành đồng hành", value: "15+" }
  ];

  const description = heroData?.content?.description || "Hỗ trợ thế hệ trẻ Việt Nam thông qua giáo dục thực hành, khởi nghiệp sáng tạo và các sáng kiến cộng đồng thiết thực.";

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0">
        <img src={bgImage} alt="FFVN Community" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-earth/70 to-earth/20"></div>
      </div>

      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        {/* Logo & Title */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-hope to-hope-light rounded-full mb-6 shadow-glow overflow-hidden">
            <img src={defaultLogo} alt="FFVN Logo" className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{title}</h1>
        </div>

        {/* Subtitle & Description */}
        <div className="mb-12 animate-fade-in [animation-delay:0.3s]">
          <p className="text-xl md:text-2xl mb-4 text-warmth font-medium">
            {subtitle}
          </p>
          <p className="text-lg md:text-xl opacity-90">
            {description}
          </p>
        </div>

        {/* Dynamic Stats Metrics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in [animation-delay:0.9s]">
          {stats.map((stat: StatItem, index: number) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-warmth mb-2">{stat.value}</div>
              <div className="text-white/90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;