import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Chị Nguyễn Thị Hoa",
      role: "Phụ huynh học sinh",
      location: "Lào Cai",
      content: "Nhờ có đèn năng lượng mặt trời, con tôi có thể học bài vào buổi tối. Điểm số của con đã cải thiện rất nhiều. Cảm ơn F Foundation đã mang ánh sáng đến cho gia đình chúng tôi.",
      avatar: "👩‍🦱",
      rating: 5
    },
    {
      id: 2,
      name: "Anh Vũ Minh Tâm",
      role: "Tình nguyện viên",
      location: "Hà Nội",
      content: "Tham gia hoạt động tình nguyện với F Foundation là trải nghiệm tuyệt vời nhất trong đời tôi. Được góp sức mình để giúp đỡ các em nhỏ vùng cao thật ý nghĩa.",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      id: 3,
      name: "Cô Lê Thu Hương",
      role: "Giáo viên",
      location: "Điện Biên",
      content: "Các dự án của F Foundation không chỉ hỗ trợ cơ sở vật chất mà còn mang đến hy vọng cho cả cộng đồng. Các em học sinh rất háo hức đến trường mỗi ngày.",
      avatar: "👩‍🏫",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-warmth-soft to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6">
            Câu chuyện thật
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Những chia sẻ chân thành từ người hưởng lợi, tình nguyện viên và đối tác
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 hover:scale-105 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-12 h-12 text-hope" />
              </div>

              <CardContent className="p-8">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warmth fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                  "{testimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center">
                  <div className="text-3xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-earth">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-hope">
                      📍 {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="mt-16 bg-gradient-to-r from-hope/10 to-warmth/20 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-earth mb-2">
              Tác động tích cực
            </h3>
            <p className="text-muted-foreground">
              Những con số nói lên hiệu quả hoạt động của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-hope mb-2">
                98%
              </div>
              <div className="text-sm text-muted-foreground">
                Hài lòng với dự án
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-hope mb-2">
                500+
              </div>
              <div className="text-sm text-muted-foreground">
                Tình nguyện viên
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-hope mb-2">
                15
              </div>
              <div className="text-sm text-muted-foreground">
                Tỉnh/Thành phố
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-hope mb-2">
                100%
              </div>
              <div className="text-sm text-muted-foreground">
                Minh bạch tài chính
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;