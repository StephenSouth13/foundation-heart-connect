import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Clock, Share2, ArrowRight } from "lucide-react";

const HelpSection = () => {
  const helpMethods = [
    {
      icon: Heart, // Giữ icon, có thể cân nhắc thay bằng icon phù hợp hơn như Users, Handshake, Connect
      title: "Đồng hành cùng phát triển",
      description: "Tạo môi trường để sinh viên học hỏi, thực hành và trưởng thành qua các dự án thực tế.",
      features: [
        "Theo dõi tiến độ triển khai dự án sinh viên",
        "Hướng dẫn kỹ năng và tư duy đổi mới sáng tạo",
        "Giới thiệu dự án sinh viên đến doanh nghiệp, tổ chức",
        "Kết nối nguồn lực hỗ trợ triển khai cho dự án thật"
      ],
      buttonText: "Đăng ký đồng hành",
      buttonVariant: "hope" as const,
      bgGradient: "from-hope/10 to-hope-light/20"
    },
    {
      icon: Clock, // Giữ icon, có thể cân nhắc thay bằng icon phù hợp hơn như BookOpen, Lightbulb, UserCheck
      title: "Chia sẻ tri thức",
      description: "Đồng hành cùng sinh viên qua những buổi chia sẻ, huấn luyện và mentoring chuyên môn.",
      features: [
        "Mentoring trực tiếp, cố vấn phát triển cá nhân/dự án",
        "Góp ý, phản hồi giúp hoàn thiện sản phẩm",
        "Cùng sinh viên ứng dụng kiến thức vào giải pháp thực tế",
        "Lan tỏa giá trị giáo dục thực hành"
      ],
      buttonText: "Đăng ký chia sẻ tri thức",
      buttonVariant: "warm" as const,
      bgGradient: "from-warmth/20 to-warmth-soft/30"
    },
    {
      icon: Share2,
      title: "Kết nối cộng đồng",
      description: "Lan tỏa tinh thần yêu thương, truyền thông những câu chuyện thay đổi tích cực và tổ chức sự kiện giáo dục.",
      features: [
        "Cùng tổ chức các sự kiện giáo dục và phát triển cộng đồng",
        "Truyền thông, lan tỏa những câu chuyện thay đổi tích cực",
        "Ghi nhận, lan tỏa các kết quả thực hành tốt",
        "Lan tỏa tinh thần phát triển bền vững"
      ],
      buttonText: "Tham gia kết nối cộng đồng",
      buttonVariant: "outline" as const,
      bgGradient: "from-secondary/30 to-accent/20"
    }
  ];
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6">
            Cách bạn có thể đồng hành cùng sinh viên
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hãy đồng hành cùng chúng tôi để được học hỏi, trải nghiệm và mang đến những thay đổi tích cực cho cộng đồng.
          </p>
        </div>

        {/* Help Methods Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {helpMethods.map((method, index) => (
            <Card 
              key={index}
              className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 hover:scale-105 group overflow-hidden relative"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${method.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
              
              <CardContent className="p-8 relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-hope-light to-hope rounded-full mb-6 group-hover:shadow-glow transition-all duration-300">
                  <method.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-earth mb-4 group-hover:text-hope transition-colors">
                  {method.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {method.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {method.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-hope rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  variant={method.buttonVariant} 
                  className="w-full group-hover:scale-105 transition-transform duration-300"
                  size="lg"
                >
                  {method.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Call to Action */}
        <div className="bg-gradient-to-r from-hope to-hope-light rounded-2xl p-8 text-center text-white shadow-glow">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Sinh viên cần sự đồng hành để trưởng thành trong môi trường thật

          </h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Tại Future Fund Vietnam mỗi hành trình học tập là một dự án thật – nơi sinh viên được học, làm và cống hiến cùng cộng đồng.
 Hãy cùng chúng tôi tạo nên những trải nghiệm mang giá trị thật cho thế hệ trẻ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="warm" size="lg" className="text-lg px-8">
              <Heart className="w-5 h-5 mr-2" />
              Quyên góp khẩn cấp
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-hope">
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;