import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, Heart, Globe } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Yêu thương",
      description: "Lan tỏa tình yêu thương đến mọi miền đất nước"
    },
    {
      icon: Target,
      title: "Hiệu quả",
      description: "Tối ưu hóa nguồn lực để tạo ra tác động tích cực nhất"
    },
    {
      icon: Lightbulb,
      title: "Sáng tạo",
      description: "Đổi mới phương pháp tiếp cận các vấn đề xã hội"
    },
    {
      icon: Globe,
      title: "Bền vững",
      description: "Xây dựng giải pháp lâu dài cho cộng đồng"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-warmth-soft">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6">
            Về F Foundation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Từ năm 2015, chúng tôi đã đồng hành cùng hơn 20.000 trẻ em vùng cao, 
            mang đến hy vọng và cơ hội phát triển cho các cộng đồng khó khăn trên khắp Việt Nam.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-earth mb-4">Sứ mệnh</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Tạo ra những thay đổi tích cực và bền vững trong cuộc sống của trẻ em và 
                cộng đồng thông qua các chương trình giáo dục, y tế và bảo vệ môi trường.
              </p>
              <div className="text-hope font-semibold">
                "Mỗi hành động nhỏ đều có thể tạo nên sự khác biệt lớn"
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-earth mb-4">Tầm nhìn</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Trở thành tổ chức phi lợi nhuận hàng đầu Việt Nam, góp phần xây dựng 
                một xã hội công bằng nơi mọi trẻ em đều có cơ hội phát triển toàn diện.
              </p>
              <div className="text-hope font-semibold">
                "Tương lai tươi sáng cho mọi trẻ em Việt Nam"
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-earth mb-6">Giá trị cốt lõi</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Những giá trị định hướng mọi hoạt động của chúng tôi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card 
              key={index} 
              className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 hover:scale-105 group"
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-hope-light to-hope rounded-full mb-4 group-hover:shadow-glow transition-all duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-earth mb-3">
                  {value.title}
                </h4>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;