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
      title: "Lịch giải & sự kiện",
      description: "Cập nhật nhanh các giải chạy và hoạt động rèn luyện mới nhất",
    },
    {
      icon: Heart,
      title: "Câu chuyện truyền cảm hứng",
      description: "Những trải nghiệm đáng nhớ từ cộng đồng runner khắp nơi",
    },
    {
      icon: Users,
      title: "Cơ hội tham gia CLB",
      description: "Thông tin các buổi training, group run, meetup",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-warmth-soft">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6">
              Đăng ký thông tin liên hệ
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tham gia cộng đồng yêu chạy bộ để không bỏ lỡ giải đấu, sự kiện và
              kinh nghiệm luyện tập hữu ích mỗi tuần.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-earth mb-6">
                Vì sao bạn nên đăng ký?
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
                  <span className="font-medium text-earth">
                    Hơn 5,000 runner đã theo dõi
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cùng nhau lan tỏa tinh thần khỏe mạnh và năng động mỗi ngày
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
                        <Checkbox id="events" />
                        <Label
                          htmlFor="events"
                          className="text-sm text-muted-foreground"
                        >
                          Lịch giải & sự kiện chạy bộ
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="training" />
                        <Label
                          htmlFor="training"
                          className="text-sm text-muted-foreground"
                        >
                          Buổi training/long run hàng tuần
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="stories" />
                        <Label
                          htmlFor="stories"
                          className="text-sm text-muted-foreground"
                        >
                          Câu chuyện & kinh nghiệm từ runner
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Agreement */}
                  <div className="flex items-start space-x-2">
                    <Checkbox id="privacy" className="mt-1" />
                    <Label
                      htmlFor="privacy"
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      Tôi đồng ý với chính sách bảo mật và cho phép nhận email
                      từ Cộng đồng Runner.
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
                    Tôi muốn tham gia
                  </Button>
                </form>

                {/* Footer Note */}
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Chúng tôi cam kết bảo vệ dữ liệu và không gửi email rác.
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
