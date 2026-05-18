// D:\FF Foundation\foundation-heart-connect\src\components\AboutSection.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import * as LucideIcons from "lucide-react";

// Định nghĩa Interface cấu trúc Node của TipTap JSON thay cho 'any'
interface TipTapTextNode {
  type: string;
  text: string;
}

interface TipTapParagraphNode {
  type: string;
  content?: TipTapTextNode[];
  attrs?: Record<string, unknown>;
}

interface TipTapDocument {
  type: string;
  content: TipTapParagraphNode[];
}

interface CoreValueItem {
  title: string;
  description: string;
  icon?: string;
}

interface AboutContent {
  description?: string | TipTapDocument;
  mission_text?: string | TipTapDocument;
  mission_italic?: string;
  vision_items?: string[];
  vision_italic?: string;
  values?: CoreValueItem[];
}

interface SectionData {
  title: string;
  subtitle: string;
  content: AboutContent | null;
  image_url: string;
  visible: boolean;
}

const DEFAULT_ICONS = [LucideIcons.Heart, LucideIcons.Target, LucideIcons.Lightbulb, LucideIcons.Globe];

// Hàm helper phân rã chuỗi JSON an toàn với kiểu dữ liệu chặt chẽ
const parseTipTapContent = (contentData: string | TipTapDocument | undefined | null): string => {
  if (!contentData) return "";
  if (typeof contentData === "string") return contentData;
  if (typeof contentData === "object" && Array.isArray(contentData.content)) {
    try {
      return contentData.content
        .map((paragraph: TipTapParagraphNode) => {
          if (Array.isArray(paragraph.content)) {
            return paragraph.content.map((textObj: TipTapTextNode) => textObj.text).join("");
          }
          return "";
        })
        .join("\n");
    } catch (e) {
      console.error("Lỗi parse JSON:", e);
      return "";
    }
  }
  return "";
};

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [aboutData, setAboutData] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutSection = async () => {
      try {
        const { data, error } = await supabase
          .from("section_contents")
          .select("title, subtitle, content, image_url, visible")
          .eq("section_key", "about")
          .maybeSingle();

        if (error) throw error;
        if (data) {
          setAboutData(data as unknown as SectionData);
        }
      } catch (error) {
        console.error("Error loading About section data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutSection();
  }, []);

  if (loading || !aboutData || !aboutData.visible) {
    return null;
  }

  const { title, subtitle, content, image_url } = aboutData;

  // --- PHÒNG VỆ DỮ LIỆU CHẶT CHẼ (DEFENSIVE FALLBACKS) ---
  const displayTitle = title || "Quỹ Tương Lai Việt Nam";
  const displaySubtitle = subtitle || "Giá trị cốt lõi";
  
  const displayDescription = parseTipTapContent(content?.description) || 
    "Từ năm 2021, FFVN được thành lập nhằm hỗ trợ thế hệ trẻ Việt Nam thông qua giáo dục thực hành, khởi nghiệp sáng tạo, và các sáng kiến cộng đồng thiết thực.";
  
  const missionText = parseTipTapContent(content?.mission_text) || 
    "FFVN tạo điều kiện cho sinh viên được giáo dục thực hành, hỗ trợ khởi nghiệp sáng tạo, và thúc đẩy các hoạt động cộng đồng ý nghĩa nhằm phát triển toàn diện thế hệ trẻ Việt Nam.";
  
  const missionItalic = content?.mission_italic || '"Những bước đi nhỏ hôm nay tạo nền tảng cho thành công ngày mai."';

  const visionItems = Array.isArray(content?.vision_items) && content.vision_items.length > 0 
    ? content.vision_items 
    : [
        "Hỗ trợ sinh viên thông qua các chương trình học tập thực tiễn.",
        "Đầu tư vào dự án khởi nghiệp có yếu tố giáo dục, công nghệ, văn hóa.",
        "Tổ chức các hoạt động cộng đồng gắn kết và phát triển kỹ năng.",
        "Truyền cảm hứng: học để làm, học để phát triển, học để thay đổi."
      ];
      
  const visionItalic = content?.vision_italic || '"Nâng bước sinh viên Việt vươn xa."';

  const coreValues = Array.isArray(content?.values) && content.values.length > 0
    ? content.values
    : [
        { title: "Yêu thương", description: "Gắn với trách nhiệm cộng đồng và nuôi dưỡng thế hệ trẻ." },
        { title: "Phát triển", description: "Hỗ trợ tối đa các hoạt động giáo dục, khởi nghiệp và phát triển kỹ năng cho sinh viên." },
        { title: "Sáng tạo", description: "Khuyến khích tư duy đổi mới, dám thử – dám làm để tạo ra giải pháp thiết thực." },
        { title: "Bền vững", description: "Xây dựng mô hình phát triển cộng đồng lâu dài và có sức lan tỏa." }
      ];

  return (
    <section id="about" className="py-12 md:py-20 bg-gradient-to-b from-background to-warmth-soft overflow-hidden" ref={ref}>
      <div className={`container mx-auto px-4 sm:px-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Header Block */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-earth mb-4 md:mb-6 animate-fade-in">
            {displayTitle}
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed whitespace-pre-line px-2 animate-fade-in [animation-delay:0.2s]">
            {displayDescription}
          </p>
        </div>

        {/* Ảnh đại diện động */}
        {image_url && (
          <div className="w-full max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-soft h-48 sm:h-72 md:h-96 px-2">
            <img src={image_url} alt="About FFVN" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Sứ mệnh & Tầm nhìn Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16">
          {/* Card Sứ Mệnh */}
          <Card className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 md:hover:-translate-y-1">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-earth mb-3 md:mb-4">Sứ mệnh</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6 whitespace-pre-line">
                {missionText}
              </p>
              <div className="text-sm md:text-base text-hope font-semibold italic">
                {missionItalic}
              </div>
            </CardContent>
          </Card>

          {/* Card Tầm Nhìn */}
          <Card className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 md:hover:-translate-y-1">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-earth mb-3 md:mb-4">Tầm nhìn</h3>
              <ul className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6 space-y-2 md:space-y-3">
                {visionItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-hope rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="text-sm md:text-base text-hope font-semibold italic">
                {visionItalic}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tiêu đề Phân đoạn Giá trị cốt lõi */}
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-earth mb-4">{displaySubtitle}</h3>
        </div>

        {/* Grid 4 Giá trị cốt lõi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {coreValues.map((value, index) => {
            // Khử hoàn toàn lỗi ép kiểu 'any' khi truy cập key động của LucideIcons
            const iconKey = value.icon as keyof typeof LucideIcons;
            const IconComponent = value.icon && LucideIcons[iconKey]
              ? (LucideIcons[iconKey] as React.ComponentType<{ className?: string }>)
              : DEFAULT_ICONS[index % DEFAULT_ICONS.length];

            return (
              <Card key={index} className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 md:hover:scale-105 md:hover:-translate-y-2 group">
                <CardContent className="p-5 md:p-6 text-center flex flex-col items-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-hope-light to-hope rounded-full mb-3 md:mb-4 group-hover:shadow-glow transition-all duration-300 md:group-hover:rotate-6">
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-earth mb-2 md:mb-3">{value.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;