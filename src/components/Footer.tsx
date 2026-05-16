import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const quickLinks = [
    { title: "Về chúng tôi", href: "#about" },
    { title: "Dự án", href: "#projects" },
    { title: "Câu chuyện", href: "#testimonials" },
    { title: "Liên hệ", href: "#contact" },
  ];
  const supportLinks = [
    { title: "Ủng hộ", href: "#help" },
    { title: "Tình nguyện", href: "#help" },
    { title: "Đối tác", href: "#partners" },
    { title: "FAQ", href: "#faq" },
  ];

  return (
    <footer className="bg-earth text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-hope to-hope-light rounded-full flex items-center justify-center mr-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">FFVN</h3>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Quỹ Tương Lai Việt Nam – Hỗ trợ thế hệ trẻ thông qua giáo dục thực hành, khởi nghiệp sáng tạo và các sáng kiến cộng đồng.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-white hover:text-warmth hover:bg-white/10 p-2"><Facebook className="w-5 h-5" /></Button>
              <Button size="sm" variant="ghost" className="text-white hover:text-warmth hover:bg-white/10 p-2"><Instagram className="w-5 h-5" /></Button>
              <Button size="sm" variant="ghost" className="text-white hover:text-warmth hover:bg-white/10 p-2"><Youtube className="w-5 h-5" /></Button>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3">
              {quickLinks.map((l, i) => (
                <li key={i}><a href={l.href} className="text-white/80 hover:text-warmth transition-colors duration-300">{l.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Hỗ trợ</h4>
            <ul className="space-y-3">
              {supportLinks.map((l, i) => (
                <li key={i}><a href={l.href} className="text-white/80 hover:text-warmth transition-colors duration-300">{l.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Liên hệ</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-hope flex-shrink-0 mt-1" />
                <p className="text-white/80">279 Nguyễn Tri Phương, Quận 10,<br />TP. Hồ Chí Minh, Việt Nam</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-hope flex-shrink-0" />
                <p className="text-white/80">+0979 137 018</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-hope flex-shrink-0" />
                <p className="text-white/80">ffundvn@gmail.com</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <h5 className="font-medium text-warmth mb-2">Giờ làm việc</h5>
              <p className="text-sm text-white/80">Thứ 2 - Thứ 6: 8:00 - 17:00<br />Thứ 7: 8:00 - 12:00</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mb-8"></div>
        <div className="text-center text-white/80 text-sm">
          © 2025 Quỹ Tương Lai Việt Nam (FFVN). Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
