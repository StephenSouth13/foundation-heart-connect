import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, Heart, Globe } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Yêu thương",
      description: "Gắn với trách nhiệm cộng đồng và nuôi dưỡng thế hệ trẻ."
    },
    {
      icon: Target,
      title: "Hiệu quả",
      description: "Quản lý và sử dụng đúng mục tiêu để hỗ trợ tối đa các hoạt động giáo dục, khởi nghiệp và rèn luyện thể chất cho sinh viên."
    },
    {
      icon: Lightbulb,
      title: "Sáng tạo",
      description: "Tập trung vào phương pháp giáo dục – khởi nghiệp – thể chất"
    },
    {
      icon: Globe,
      title: "Bền vững",
      description: "Mô hình tài chính và phát triển lâu dài cộng đồng."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-warmth-soft">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6">
            Future Fund VietNam
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            “Từ năm 2023, Quỹ Tương Lai Việt Nam (FFVN) được thành lập nhằm hỗ trợ thế hệ trẻ Việt Nam thông qua giáo dục thực hành, khởi nghiệp sáng tạo, và các sáng kiến cộng đồng thiết thực.”
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-earth mb-4">Sứ mệnh</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                FFVN tạo điều kiện cho học sinh - sinh viên được giáo dục thực hành, hỗ trợ khởi nghiệp, và 
                thúc đẩy các hoạt động xã hội ý nghĩa nhằm phát triển toàn diện thế hệ trẻ Việt Nam.
              </p>
              <div className="text-hope font-semibold">
                 “Những bước đi nhỏ hôm nay tạo nền tảng cho thành công ngày mai.”
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-earth mb-4">Tầm nhìn</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Hỗ trợ sinh viên, học sinh thông qua các chương trình học tập thực tiễn.


              Đầu tư vào dự án khởi nghiệp có yếu tố giáo dục, công nghệ, văn hóa.


              Tổ chức các hoạt động thể thao – cộng đồng, nổi bật là Vietnam Student Marathon (VSM).


              Truyền cảm hứng học để làm, học để phát triển, học để thay đổi.

              </p>
              <div className="text-hope font-semibold">
                “ Nâng bước sinh viên Việt vươn xa.”
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