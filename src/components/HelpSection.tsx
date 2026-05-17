import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";

interface Method {
  icon?: string;
  title: string;
  description: string;
  features?: string[];
  buttonText?: string;
  buttonVariant?: "hope" | "warm" | "outline" | "default";
  bgGradient?: string;
  url?: string;
}
interface CTA {
  title?: string;
  description?: string;
  primary_label?: string;
  primary_url?: string;
  secondary_label?: string;
  secondary_url?: string;
}

const defaultMethods: Method[] = [
  { icon: "Heart", title: "Đồng hành cùng phát triển", description: "Tạo môi trường để sinh viên học hỏi, thực hành và trưởng thành qua các dự án thực tế.", features: ["Theo dõi tiến độ triển khai dự án sinh viên","Hướng dẫn kỹ năng và tư duy đổi mới sáng tạo","Giới thiệu dự án sinh viên đến doanh nghiệp, tổ chức","Kết nối nguồn lực hỗ trợ triển khai cho dự án thật"], buttonText: "Đăng ký đồng hành", buttonVariant: "hope", bgGradient: "from-hope/10 to-hope-light/20" },
  { icon: "Clock", title: "Chia sẻ tri thức", description: "Đồng hành cùng sinh viên qua những buổi chia sẻ, huấn luyện và mentoring chuyên môn.", features: ["Mentoring trực tiếp, cố vấn phát triển cá nhân/dự án","Góp ý, phản hồi giúp hoàn thiện sản phẩm","Cùng sinh viên ứng dụng kiến thức vào giải pháp thực tế","Lan tỏa giá trị giáo dục thực hành"], buttonText: "Đăng ký chia sẻ tri thức", buttonVariant: "warm", bgGradient: "from-warmth/20 to-warmth-soft/30" },
  { icon: "Share2", title: "Kết nối cộng đồng", description: "Lan tỏa tinh thần yêu thương, truyền thông những câu chuyện thay đổi tích cực và tổ chức sự kiện giáo dục.", features: ["Cùng tổ chức các sự kiện giáo dục và phát triển cộng đồng","Truyền thông, lan tỏa những câu chuyện thay đổi tích cực","Ghi nhận, lan tỏa các kết quả thực hành tốt","Lan tỏa tinh thần phát triển bền vững"], buttonText: "Tham gia kết nối cộng đồng", buttonVariant: "outline", bgGradient: "from-secondary/30 to-accent/20" },
];

const defaultCTA: CTA = {
  title: "Sinh viên cần sự đồng hành để trưởng thành trong môi trường thật",
  description: "Tại Future Fund Vietnam mỗi hành trình học tập là một dự án thật – nơi sinh viên được học, làm và cống hiến cùng cộng đồng. Hãy cùng chúng tôi tạo nên những trải nghiệm mang giá trị thật cho thế hệ trẻ.",
  primary_label: "Quyên góp khẩn cấp",
  primary_url: "#contact",
  secondary_label: "Tìm hiểu thêm",
  secondary_url: "#about",
};

const HelpSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [data, setData] = useState<{ title: string; subtitle: string; methods: Method[]; cta: CTA; visible: boolean } | null>(null);

  useEffect(() => {
    (async () => {
      const { data: row } = await supabase
        .from("section_contents")
        .select("title, subtitle, content, visible")
        .eq("section_key", "help")
        .maybeSingle();
      const c: any = row?.content || {};
      setData({
        title: row?.title || "Cách bạn có thể đồng hành cùng sinh viên",
        subtitle: row?.subtitle || "Hãy đồng hành cùng chúng tôi để được học hỏi, trải nghiệm và mang đến những thay đổi tích cực cho cộng đồng.",
        methods: Array.isArray(c.methods) && c.methods.length ? c.methods : defaultMethods,
        cta: { ...defaultCTA, ...(c.cta || {}) },
        visible: row?.visible ?? true,
      });
    })();
  }, []);

  if (!data || !data.visible) return null;

  return (
    <section id="help" className="py-20 bg-background" ref={ref}>
      <div className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6">{data.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{data.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {data.methods.map((method, index) => {
            const Icon = (method.icon && (LucideIcons as any)[method.icon]) || LucideIcons.Heart;
            return (
              <Card key={index} className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 hover:scale-105 group overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${method.bgGradient || "from-hope/10 to-hope-light/20"} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
                <CardContent className="p-8 relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-hope-light to-hope rounded-full mb-6 group-hover:shadow-glow transition-all duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-earth mb-4 group-hover:text-hope transition-colors">{method.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{method.description}</p>
                  {method.features && (
                    <ul className="space-y-3 mb-8">
                      {method.features.map((f, idx) => (
                        <li key={idx} className="flex items-start text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-hope rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button
                    variant={(method.buttonVariant as any) || "hope"}
                    className="w-full group-hover:scale-105 transition-transform duration-300"
                    size="lg"
                    onClick={() => method.url && (window.location.href = method.url)}
                  >
                    {method.buttonText || "Tham gia"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-hope to-hope-light rounded-2xl p-8 text-center text-white shadow-glow">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">{data.cta.title}</h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto whitespace-pre-line">{data.cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {data.cta.primary_label && (
              <Button variant="warm" size="lg" className="text-lg px-8" onClick={() => data.cta.primary_url && (window.location.href = data.cta.primary_url)}>
                <LucideIcons.Heart className="w-5 h-5 mr-2" />
                {data.cta.primary_label}
              </Button>
            )}
            {data.cta.secondary_label && (
              <Button variant="outline" size="lg" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-hope" onClick={() => data.cta.secondary_url && (window.location.href = data.cta.secondary_url)}>
                {data.cta.secondary_label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
