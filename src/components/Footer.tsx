import { useEffect, useState } from "react";
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface LinkItem { title: string; href: string }

const defaults = {
  brand_name: "FFVN",
  description: "Quỹ Tương Lai Việt Nam – Hỗ trợ thế hệ trẻ thông qua giáo dục thực hành, khởi nghiệp sáng tạo và các sáng kiến cộng đồng.",
  quick_links: [
    { title: "Về chúng tôi", href: "#about" },
    { title: "Dự án", href: "#projects" },
    { title: "Câu chuyện", href: "#testimonials" },
    { title: "Liên hệ", href: "#contact" },
  ] as LinkItem[],
  support_links: [
    { title: "Ủng hộ", href: "#help" },
    { title: "Tình nguyện", href: "#help" },
    { title: "Đối tác", href: "#partners" },
    { title: "FAQ", href: "#faq" },
  ] as LinkItem[],
  address: "279 Nguyễn Tri Phương, Quận 10,\nTP. Hồ Chí Minh, Việt Nam",
  phone: "+0979 137 018",
  email: "ffundvn@gmail.com",
  hours: "Thứ 2 - Thứ 6: 8:00 - 17:00\nThứ 7: 8:00 - 12:00",
  facebook: "#",
  instagram: "#",
  youtube: "#",
  copyright: "© 2025 Quỹ Tương Lai Việt Nam (FFVN). Tất cả quyền được bảo lưu.",
};

const Footer = () => {
  const [d, setD] = useState<any>(defaults);
  const [logo, setLogo] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data: row } = await supabase
        .from("section_contents")
        .select("content, image_url")
        .eq("section_key", "footer")
        .maybeSingle();
      const c: any = row?.content || {};
      setLogo(row?.image_url || "");
      setD({
        ...defaults,
        ...c,
        quick_links: Array.isArray(c.quick_links) && c.quick_links.length ? c.quick_links : defaults.quick_links,
        support_links: Array.isArray(c.support_links) && c.support_links.length ? c.support_links : defaults.support_links,
      });
    })();
  }, []);

  return (
    <footer className="bg-earth text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-hope to-hope-light rounded-full flex items-center justify-center mr-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">{d.brand_name}</h3>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed whitespace-pre-line">{d.description}</p>
            <div className="flex space-x-4">
              {d.facebook && <a href={d.facebook} target="_blank" rel="noreferrer"><Button size="sm" variant="ghost" className="text-white hover:text-warmth hover:bg-white/10 p-2"><Facebook className="w-5 h-5" /></Button></a>}
              {d.instagram && <a href={d.instagram} target="_blank" rel="noreferrer"><Button size="sm" variant="ghost" className="text-white hover:text-warmth hover:bg-white/10 p-2"><Instagram className="w-5 h-5" /></Button></a>}
              {d.youtube && <a href={d.youtube} target="_blank" rel="noreferrer"><Button size="sm" variant="ghost" className="text-white hover:text-warmth hover:bg-white/10 p-2"><Youtube className="w-5 h-5" /></Button></a>}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3">
              {d.quick_links.map((l: LinkItem, i: number) => (
                <li key={i}><a href={l.href} className="text-white/80 hover:text-warmth transition-colors duration-300">{l.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Hỗ trợ</h4>
            <ul className="space-y-3">
              {d.support_links.map((l: LinkItem, i: number) => (
                <li key={i}><a href={l.href} className="text-white/80 hover:text-warmth transition-colors duration-300">{l.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Liên hệ</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-hope flex-shrink-0 mt-1" />
                <p className="text-white/80 whitespace-pre-line">{d.address}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-hope flex-shrink-0" />
                <p className="text-white/80">{d.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-hope flex-shrink-0" />
                <p className="text-white/80">{d.email}</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <h5 className="font-medium text-warmth mb-2">Giờ làm việc</h5>
              <p className="text-sm text-white/80 whitespace-pre-line">{d.hours}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mb-8"></div>
        <div className="text-center text-white/80 text-sm">{d.copyright}</div>
      </div>
    </footer>
  );
};

export default Footer;
