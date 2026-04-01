import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Heart, Users, Newspaper } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const NewsletterSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const benefits = [
    { icon: Newspaper, title: "Tin tức dự án", description: "Cập nhật các chương trình giáo dục, khởi nghiệp và cộng đồng mới nhất" },
    { icon: Heart, title: "Câu chuyện truyền cảm hứng", description: "Những hành trình thay đổi tích cực từ sinh viên và cộng đồng" },
    { icon: Users, title: "Cơ hội tham gia", description: "Thông tin tuyển tình nguyện viên, mentor và đối tác đồng hành" },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-warmth-soft">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6 animate-fade-in">Đăng ký nhận tin</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in [animation-delay:0.2s]">
              Theo dõi các hoạt động giáo dục, khởi nghiệp và cộng đồng của FFVN để không bỏ lỡ cơ hội đồng hành.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-earth mb-6">Vì sao bạn nên đăng ký?</h3>
              <div className="space-y-6">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-hope-light to-hope rounded-full flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300">
                      <b.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-earth mb-1">{b.title}</h4>
                      <p className="text-muted-foreground">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-hope/10 to-warmth/20 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Mail className="w-5 h-5 text-hope" />
                  <span className="font-medium text-earth">Hơn 5,000 người đã đồng hành</span>
                </div>
                <p className="text-sm text-muted-foreground">Cùng nhau lan tỏa giá trị giáo dục và phát triển cộng đồng</p>
              </div>
            </div>

            <Card className="bg-card shadow-warm border-0 hover:shadow-glow transition-shadow duration-500">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-earth mb-6 text-center">Đăng ký ngay</h3>
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-earth font-medium">Họ và tên *</Label>
                    <Input id="name" placeholder="Nhập họ và tên" className="mt-2 border-border focus:border-hope" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-earth font-medium">Email *</Label>
                    <Input id="email" type="email" placeholder="example@email.com" className="mt-2 border-border focus:border-hope" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-earth font-medium">Số điện thoại</Label>
                    <Input id="phone" placeholder="0123 456 789" className="mt-2 border-border focus:border-hope" />
                  </div>
                  <div>
                    <Label className="text-earth font-medium mb-3 block">Bạn quan tâm đến:</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="edu" />
                        <Label htmlFor="edu" className="text-sm text-muted-foreground">Chương trình giáo dục thực hành</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="startup" />
                        <Label htmlFor="startup" className="text-sm text-muted-foreground">Khởi nghiệp sáng tạo & mentoring</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="community" />
                        <Label htmlFor="community" className="text-sm text-muted-foreground">Hoạt động cộng đồng & tình nguyện</Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="privacy" className="mt-1" />
                    <Label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed">
                      Tôi đồng ý với chính sách bảo mật và cho phép nhận thông tin từ FFVN.
                    </Label>
                  </div>
                  <Button type="submit" variant="hope" size="lg" className="w-full hover:scale-105 transition-transform">
                    <Heart className="w-5 h-5 mr-2" />
                    Tôi muốn đồng hành
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-4">Chúng tôi cam kết bảo vệ dữ liệu và không gửi email rác.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
