import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Clock, Share2, ArrowRight } from "lucide-react";

const HelpSection = () => {
  const helpMethods = [
    {
      icon: Heart,
      title: "Quyên góp",
      description: "Mỗi đồng góp đều tạo nên sự khác biệt lớn trong cuộc sống của các em nhỏ",
      features: [
        "Quyên góp một lần hoặc hàng tháng",
        "Theo dõi tiến độ sử dụng",
        "Báo cáo minh bạch định kỳ",
        "Chứng nhận từ thiện hợp lệ"
      ],
      buttonText: "Ủng hộ ngay",
      buttonVariant: "hope" as const,
      bgGradient: "from-hope/10 to-hope-light/20"
    },
    {
      icon: Clock,
      title: "Tình nguyện",
      description: "Tham gia trực tiếp vào các hoạt động, mang đến giá trị thực tế cho cộng đồng",
      features: [
        "Dạy học tại vùng cao",
        "Tham gia xây dựng trường học",
        "Hoạt động y tế cộng đồng",
        "Chương trình bảo vệ môi trường"
      ],
      buttonText: "Đăng ký tình nguyện",
      buttonVariant: "warm" as const,
      bgGradient: "from-warmth/20 to-warmth-soft/30"
    },
    {
      icon: Share2,
      title: "Chia sẻ thông tin",
      description: "Lan tỏa tinh thần yêu thương đến nhiều người hơn qua các kênh truyền thông",
      features: [
        "Chia sẻ trên mạng xã hội",
        "Kể câu chuyện cho bạn bè",
        "Tham gia sự kiện gây quỹ",
        "Trở thành đại sứ thương hiệu"
      ],
      buttonText: "Chia sẻ ngay",
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
            Cách bạn có thể giúp đỡ
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Có nhiều cách để bạn có thể đồng hành cùng chúng tôi tạo nên những thay đổi tích cực
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
            Trẻ em vùng cao đang cần sự giúp đỡ khẩn cấp
          </h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Mùa đông đang đến, các em nhỏ cần áo ấm, sách vở và đèn học. 
            Hành động ngay hôm nay để mang đến hy vọng cho các em.
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