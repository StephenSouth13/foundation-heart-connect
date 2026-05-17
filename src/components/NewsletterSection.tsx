import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Heart } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";

interface Benefit { title: string; description: string; icon?: string }

const defaultBenefits: Benefit[] = [
  { icon: "Newspaper", title: "Tin tức dự án", description: "Cập nhật các chương trình giáo dục, khởi nghiệp và cộng đồng mới nhất" },
  { icon: "Heart", title: "Câu chuyện truyền cảm hứng", description: "Những hành trình thay đổi tích cực từ sinh viên và cộng đồng" },
  { icon: "Users", title: "Cơ hội tham gia", description: "Thông tin tuyển tình nguyện viên, mentor và đối tác đồng hành" },
];

const NewsletterSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data: row } = await supabase
        .from("section_contents")
        .select("title, subtitle, content, visible")
        .eq("section_key", "newsletter")
        .maybeSingle();
      const c: any = row?.content || {};
      setData({
        title: row?.title || "Đăng ký nhận tin",
        subtitle: row?.subtitle || "Theo dõi các hoạt động giáo dục, khởi nghiệp và cộng đồng của FFVN để không bỏ lỡ cơ hội đồng hành.",
        benefits_title: c.benefits_title || "Vì sao bạn nên đăng ký?",
        benefits: Array.isArray(c.benefits) && c.benefits.length ? c.benefits : defaultBenefits,
        counter_text: c.counter_text || "Hơn 5,000 người đã đồng hành",
        counter_subtext: c.counter_subtext || "Cùng nhau lan tỏa giá trị giáo dục và phát triển cộng đồng",
        form_title: c.form_title || "Đăng ký ngay",
        submit_label: c.submit_label || "Tôi muốn đồng hành",
        privacy_note: c.privacy_note || "Chúng tôi cam kết bảo vệ dữ liệu và không gửi email rác.",
        visible: row?.visible ?? true,
      });
    })();
  }, []);

  if (!data || !data.visible) return null;

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-warmth-soft" ref={ref}>
      <div className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6 animate-fade-in">{data.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in [animation-delay:0.2s]">{data.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-earth mb-6">{data.benefits_title}</h3>
              <div className="space-y-6">
                {data.benefits.map((b: Benefit, i: number) => {
                  const Icon = (b.icon && (LucideIcons as any)[b.icon]) || Heart;
                  return (
                    <div key={i} className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-hope-light to-hope rounded-full flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-earth mb-1">{b.title}</h4>
                        <p className="text-muted-foreground">{b.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-hope/10 to-warmth/20 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Mail className="w-5 h-5 text-hope" />
                  <span className="font-medium text-earth">{data.counter_text}</span>
                </div>
                <p className="text-sm text-muted-foreground">{data.counter_subtext}</p>
              </div>
            </div>

            <Card className="bg-card shadow-warm border-0 hover:shadow-glow transition-shadow duration-500">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-earth mb-6 text-center">{data.form_title}</h3>
                <form className="space-y-6">
                  <div><Label htmlFor="name">Họ và tên *</Label><Input id="name" placeholder="Nhập họ và tên" className="mt-2" /></div>
                  <div><Label htmlFor="email">Email *</Label><Input id="email" type="email" placeholder="example@email.com" className="mt-2" /></div>
                  <div><Label htmlFor="phone">Số điện thoại</Label><Input id="phone" placeholder="0123 456 789" className="mt-2" /></div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="privacy" className="mt-1" />
                    <Label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed">Tôi đồng ý với chính sách bảo mật và cho phép nhận thông tin từ FFVN.</Label>
                  </div>
                  <Button type="submit" variant="hope" size="lg" className="w-full hover:scale-105 transition-transform">
                    <Heart className="w-5 h-5 mr-2" />{data.submit_label}
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-4">{data.privacy_note}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
