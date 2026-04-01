import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Thị Mai",
      role: "Sinh viên Học Kỳ Doanh Nghiệp",
      location: "Hà Nội",
      content: "Chương trình giúp mình được thực hành ngay tại doanh nghiệp, hiểu rõ hơn về ngành nghề mình theo đuổi và tự tin hơn khi ra trường.",
      avatar: "🎓",
      rating: 5,
    },
    {
      id: 2,
      name: "Trần Hoàng Nam",
      role: "Founder dự án khởi nghiệp",
      location: "TP. HCM",
      content: "Nhờ sự hỗ trợ của FFVN, nhóm mình đã biến ý tưởng thành sản phẩm thực tế và được kết nối với các nhà đầu tư tiềm năng.",
      avatar: "💡",
      rating: 5,
    },
    {
      id: 3,
      name: "Phạm Quỳnh Anh",
      role: "Tình nguyện viên cộng đồng",
      location: "Đà Nẵng",
      content: "Tham gia các hoạt động cộng đồng của FFVN giúp mình phát triển kỹ năng lãnh đạo và cảm nhận được giá trị của sự sẻ chia.",
      avatar: "🤝",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-warmth-soft to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6 animate-fade-in">
            Câu Chuyện Từ Cộng Đồng
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in [animation-delay:0.2s]">
            Chia sẻ từ sinh viên, tình nguyện viên và các bạn trẻ đã đồng hành cùng FFVN
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card key={t.id} className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-hope" />
              </div>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warmth fill-current" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                  "{t.content}"
                </blockquote>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{t.avatar}</div>
                  <div>
                    <div className="font-bold text-earth">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                    <div className="text-sm text-hope">📍 {t.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-hope/10 to-warmth/20 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-earth mb-2">Tác Động Của FFVN</h3>
            <p className="text-muted-foreground">Những con số kể câu chuyện về sự thay đổi</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-hope mb-2">20,000+</div>
              <div className="text-sm text-muted-foreground">Sinh viên thụ hưởng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-hope mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Dự án triển khai</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-hope mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Tỉnh thành phủ sóng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-hope mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Đối tác đồng hành</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
