// src/components/TestimonialsSection.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Thị Mai",
      role: "Runner",
      location: "Hà Nội",
      content:
        "Tham gia Vietnam Student Marathon giúp mình có thêm động lực tập luyện hàng ngày và kết nối với rất nhiều bạn bè cùng đam mê.",
      avatar: "🏃‍♀️",
      rating: 5,
    },
    {
      id: 2,
      name: "Trần Hoàng Nam",
      role: "Thành viên CLB chạy bộ UEH",
      location: "TP. HCM",
      content:
        "Không khí sôi động và tinh thần đồng đội của giải chạy khiến mình vô cùng hào hứng. Đây thực sự là ngày hội thể thao tuyệt vời!",
      avatar: "🏃‍♂️",
      rating: 5,
    },
    {
      id: 3,
      name: "Phạm Quỳnh Anh",
      role: "Tình nguyện viên",
      location: "Đà Nẵng",
      content:
        "Hỗ trợ sự kiện Vietnam Student Marathon giúp mình học hỏi nhiều kỹ năng tổ chức và lan tỏa tinh thần rèn luyện sức khỏe đến cộng đồng.",
      avatar: "🤝",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6">
        {/* Tiêu đề */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
            Câu Chuyện Từ Người Tham Gia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chia sẻ cảm nhận từ các runner, tình nguyện viên và câu lạc bộ đồng hành
          </p>
        </div>

        {/* Lời chia sẻ */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white shadow-md border-0 hover:shadow-lg transition-all duration-500 hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-12 h-12 text-blue-500" />
              </div>

              <CardContent className="p-8">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>

                {/* Nội dung */}
                <blockquote className="text-gray-700 leading-relaxed mb-6 relative z-10">
                  “{testimonial.content}”
                </blockquote>

                {/* Thông tin người chia sẻ */}
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-blue-700">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-blue-500">
                      📍 {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Số liệu ấn tượng */}
        <div className="mt-16 bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-blue-700 mb-2">
              Thống Kê Ấn Tượng
            </h3>
            <p className="text-gray-600">
              Những con số nổi bật từ giải chạy cộng đồng
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                5,000+
              </div>
              <div className="text-sm text-gray-600">Runner tham gia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                200+
              </div>
              <div className="text-sm text-gray-600">CLB chạy bộ đồng hành</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                15
              </div>
              <div className="text-sm text-gray-600">Tỉnh/Thành phố tổ chức</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                100%
              </div>
              <div className="text-sm text-gray-600">Tinh thần thể thao</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
