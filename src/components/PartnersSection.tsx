import { Card, CardContent } from "@/components/ui/card";

const PartnersSection = () => {
  const partners = [
    { name: "Tập đoàn Vingroup", logo: "🏢", category: "Doanh nghiệp" },
    { name: "Ngân hàng BIDV", logo: "🏦", category: "Tài chính" },
    { name: "Unilever Việt Nam", logo: "🧴", category: "Tiêu dùng" },
    { name: "Microsoft Vietnam", logo: "💻", category: "Công nghệ" },
    { name: "Bộ Giáo dục & Đào tạo", logo: "🎓", category: "Chính phủ" },
    { name: "UNICEF", logo: "🌍", category: "Quốc tế" }
  ];

  const achievements = [
    {
      title: "Giải thưởng Tổ chức Từ thiện Xuất sắc",
      year: "2023",
      organization: "Bộ Nội vụ",
      icon: "🏆"
    },
    {
      title: "Chứng nhận Minh bạch Tài chính",
      year: "2022-2023",
      organization: "Kiểm toán Nhà nước",
      icon: "✅"
    },
    {
      title: "Giải thưởng Dự án Xã hội Tốt nhất",
      year: "2022",
      organization: "Vietnam CSR Awards",
      icon: "🌟"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-warmth-soft to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6">
            Đối tác đồng hành
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Chúng tôi tự hào được đồng hành cùng các tổ chức uy tín trong và ngoài nước
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {partners.map((partner, index) => (
            <Card 
              key={index}
              className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {partner.logo}
                </div>
                <h4 className="font-bold text-earth text-sm mb-1 group-hover:text-hope transition-colors">
                  {partner.name}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {partner.category}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-hope/5 to-warmth/10 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-earth mb-2">
              Sự tin tưởng từ cộng đồng
            </h3>
            <p className="text-muted-foreground">
              Chúng tôi cam kết hoạt động minh bạch và có trách nhiệm
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-hope mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Minh bạch tài chính</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-hope mb-2">8 năm</div>
              <div className="text-sm text-muted-foreground">Hoạt động liên tục</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-hope mb-2">50M+</div>
              <div className="text-sm text-muted-foreground">VNĐ quyên góp</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-hope mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Hiệu quả sử dụng</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-earth mb-6">
            Thành tựu & Công nhận
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Những ghi nhận từ các tổ chức uy tín về hoạt động của chúng tôi
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <Card 
              key={index}
              className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 hover:scale-105 group"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <h4 className="font-bold text-earth mb-2 group-hover:text-hope transition-colors">
                  {achievement.title}
                </h4>
                <div className="text-sm text-muted-foreground mb-1">
                  {achievement.organization}
                </div>
                <div className="text-sm text-hope font-medium">
                  {achievement.year}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;