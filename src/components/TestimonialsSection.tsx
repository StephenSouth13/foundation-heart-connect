import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";

interface TItem {
  name: string;
  role: string;
  location?: string;
  content: string;
  avatar?: string;
  rating?: number;
}
interface IStat { value: string; label: string }

const defaultItems: TItem[] = [
  { name: "Nguyễn Thị Mai", role: "Sinh viên Học Kỳ Doanh Nghiệp", location: "Hà Nội", content: "Chương trình giúp mình được thực hành ngay tại doanh nghiệp, hiểu rõ hơn về ngành nghề mình theo đuổi và tự tin hơn khi ra trường.", avatar: "🎓", rating: 5 },
  { name: "Trần Hoàng Nam", role: "Founder dự án khởi nghiệp", location: "TP. HCM", content: "Nhờ sự hỗ trợ của FFVN, nhóm mình đã biến ý tưởng thành sản phẩm thực tế và được kết nối với các nhà đầu tư tiềm năng.", avatar: "💡", rating: 5 },
  { name: "Phạm Quỳnh Anh", role: "Tình nguyện viên cộng đồng", location: "Đà Nẵng", content: "Tham gia các hoạt động cộng đồng của FFVN giúp mình phát triển kỹ năng lãnh đạo và cảm nhận được giá trị của sự sẻ chia.", avatar: "🤝", rating: 5 },
];
const defaultStats: IStat[] = [
  { value: "20,000+", label: "Sinh viên thụ hưởng" },
  { value: "50+", label: "Dự án triển khai" },
  { value: "15+", label: "Tỉnh thành phủ sóng" },
  { value: "100+", label: "Đối tác đồng hành" },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [data, setData] = useState<{ title: string; subtitle: string; items: TItem[]; stats: IStat[]; impact_title: string; impact_subtitle: string; visible: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: row } = await supabase
        .from("section_contents")
        .select("title, subtitle, content, visible")
        .eq("section_key", "testimonials")
        .maybeSingle();
      const c: any = row?.content || {};
      setData({
        title: row?.title || "Câu Chuyện Từ Cộng Đồng",
        subtitle: row?.subtitle || "Chia sẻ từ sinh viên, tình nguyện viên và các bạn trẻ đã đồng hành cùng FFVN",
        items: Array.isArray(c.items) && c.items.length ? c.items : defaultItems,
        stats: Array.isArray(c.impact_stats) && c.impact_stats.length ? c.impact_stats : defaultStats,
        impact_title: c.impact_title || "Tác Động Của FFVN",
        impact_subtitle: c.impact_subtitle || "Những con số kể câu chuyện về sự thay đổi",
        visible: row?.visible ?? true,
      });
      setLoading(false);
    })();
  }, []);

  if (loading || !data || !data.visible) return null;

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-warmth-soft to-background" ref={ref}>
      <div className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6 animate-fade-in">{data.title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in [animation-delay:0.2s]">{data.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {data.items.map((t, i) => (
            <Card key={i} className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-hope" />
              </div>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {Array.from({ length: t.rating || 5 }).map((_, k) => (
                    <Star key={k} className="w-5 h-5 text-warmth fill-current" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground leading-relaxed mb-6 relative z-10">"{t.content}"</blockquote>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{t.avatar || "🌟"}</div>
                  <div>
                    <div className="font-bold text-earth">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                    {t.location && <div className="text-sm text-hope">📍 {t.location}</div>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {data.stats.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-hope/10 to-warmth/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-earth mb-2">{data.impact_title}</h3>
              <p className="text-muted-foreground">{data.impact_subtitle}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {data.stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-hope mb-2">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
