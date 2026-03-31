import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, Heart, Globe } from "lucide-react";

const AboutSection = () => {
  const values = [
    { icon: Heart, title: "Yêu thương", description: "Gắn với trách nhiệm cộng đồng và nuôi dưỡng thế hệ trẻ." },
    { icon: Target, title: "Phát triển", description: "Hỗ trợ tối đa các hoạt động giáo dục, khởi nghiệp và phát triển kỹ năng cho sinh viên." },
    { icon: Lightbulb, title: "Sáng tạo", description: "Khuyến khích tư duy đổi mới, dám thử – dám làm để tạo ra giải pháp thiết thực." },
    { icon: Globe, title: "Bền vững", description: "Xây dựng mô hình phát triển cộng đồng lâu dài và có sức lan tỏa." },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-warmth-soft">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6 animate-fade-in">
            Quỹ Tương Lai Việt Nam
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in [animation-delay:0.2s]">
            Từ năm 2021, FFVN được thành lập nhằm hỗ trợ thế hệ trẻ Việt Nam thông qua giáo dục thực hành, khởi nghiệp sáng tạo, và các sáng kiến cộng đồng thiết thực.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 hover:-translate-y-1">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-earth mb-4">Sứ mệnh</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                FFVN tạo điều kiện cho sinh viên được giáo dục thực hành, hỗ trợ khởi nghiệp sáng tạo, và thúc đẩy các hoạt động cộng đồng ý nghĩa nhằm phát triển toàn diện thế hệ trẻ Việt Nam.
              </p>
              <div className="text-hope font-semibold italic">
                "Những bước đi nhỏ hôm nay tạo nền tảng cho thành công ngày mai."
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 hover:-translate-y-1">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-earth mb-4">Tầm nhìn</h3>
              <ul className="text-muted-foreground leading-relaxed mb-6 space-y-3">
                <li className="flex items-start"><span className="w-2 h-2 bg-hope rounded-full mr-3 mt-2 flex-shrink-0"></span>Hỗ trợ sinh viên thông qua các chương trình học tập thực tiễn.</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-hope rounded-full mr-3 mt-2 flex-shrink-0"></span>Đầu tư vào dự án khởi nghiệp có yếu tố giáo dục, công nghệ, văn hóa.</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-hope rounded-full mr-3 mt-2 flex-shrink-0"></span>Tổ chức các hoạt động cộng đồng gắn kết và phát triển kỹ năng.</li>
                <li className="flex items-start"><span className="w-2 h-2 bg-hope rounded-full mr-3 mt-2 flex-shrink-0"></span>Truyền cảm hứng: học để làm, học để phát triển, học để thay đổi.</li>
              </ul>
              <div className="text-hope font-semibold italic">
                "Nâng bước sinh viên Việt vươn xa."
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-earth mb-6">Giá trị cốt lõi</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 hover:scale-105 hover:-translate-y-2 group">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-hope-light to-hope rounded-full mb-4 group-hover:shadow-glow transition-all duration-300 group-hover:rotate-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-earth mb-3">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
