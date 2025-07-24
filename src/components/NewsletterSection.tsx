import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Heart, Users, Newspaper } from "lucide-react";

const NewsletterSection = () => {
  const benefits = [
    {
      icon: Newspaper,
      title: "Tin tức mới nhất",
      description: "Cập nhật tiến độ dự án và hoạt động"
    },
    {
      icon: Heart,
      title: "Câu chuyện cảm động",
      description: "Những câu chuyện thực tế từ người thụ hưởng"
    },
    {
      icon: Users,
      title: "Cơ hội tình nguyện",
      description: "Thông báo về các hoạt động sắp tới"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-warmth-soft">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6">
              Đăng ký nhận tin
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tham gia cộng đồng F Foundation để nhận thông tin mới nhất và cơ hội đóng góp
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-earth mb-6">
                Tại sao nên đăng ký?
              </h3>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-hope-light to-hope rounded-full flex items-center justify-center shadow-soft">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-earth mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-hope/10 to-warmth/20 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Mail className="w-5 h-5 text-hope" />
                  <span className="font-medium text-earth">Đã có 5,000+ người đăng ký</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Tham gia cộng đồng những người quan tâm đến hoạt động xã hội
                </p>
              </div>
            </div>

            {/* Registration Form */}
            <Card className="bg-card shadow-warm border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-earth mb-6 text-center">
                  Đăng ký ngay hôm nay
                </h3>

                <form className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <Label htmlFor="name" className="text-earth font-medium">
                      Họ và tên *
                    </Label>
                    <Input 
                      id="name"
                      placeholder="Nhập họ và tên của bạn"
                      className="mt-2 border-border focus:border-hope"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <Label htmlFor="email" className="text-earth font-medium">
                      Email *
                    </Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      className="mt-2 border-border focus:border-hope"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <Label htmlFor="phone" className="text-earth font-medium">
                      Số điện thoại
                    </Label>
                    <Input 
                      id="phone"
                      placeholder="0123 456 789"
                      className="mt-2 border-border focus:border-hope"
                    />
                  </div>

                  {/* Interests */}
                  <div>
                    <Label className="text-earth font-medium mb-3 block">
                      Bạn quan tâm đến:
                    </Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="donate" />
                        <Label htmlFor="donate" className="text-sm text-muted-foreground">
                          Thông tin quyên góp
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="volunteer" />
                        <Label htmlFor="volunteer" className="text-sm text-muted-foreground">
                          Hoạt động tình nguyện
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="updates" />
                        <Label htmlFor="updates" className="text-sm text-muted-foreground">
                          Cập nhật dự án
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Agreement */}
                  <div className="flex items-start space-x-2">
                    <Checkbox id="privacy" className="mt-1" />
                    <Label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed">
                      Tôi đồng ý với chính sách bảo mật và cho phép F Foundation 
                      gửi thông tin qua email
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    variant="hope" 
                    size="lg" 
                    className="w-full"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Tôi muốn đồng hành
                  </Button>
                </form>

                {/* Footer Note */}
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Chúng tôi cam kết không spam và bảo vệ thông tin cá nhân của bạn
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;