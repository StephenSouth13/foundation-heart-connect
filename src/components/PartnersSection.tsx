// src/components/PartnersSection.tsx
import React from "react";

type Partner = {
  name: string;
  logo: string;      // đường dẫn ảnh logo trong public/images
  website?: string;  // link trang web đối tác (nếu có)
};

const partners: Partner[] = [
  {
    name: "MSC",
    logo: "/MSC.png", // lưu trong thư mục public/MSC.png
    website: "https://msc.edu.vn",
  },
  {
    name: "UEH",
    logo: "/UEH.png", // thêm dấu / đầu để Vite load từ public
    website: "https://ueh.edu.vn",
  },
  {
    name: "VSM - Vietnam Student Marathon",
    logo: "/logovsm.png",
    website: "https://vsm.org.vn",
  },
];

export default function PartnersSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Đối Tác Chạy Bộ Cộng Đồng
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Chúng tôi tự hào đồng hành cùng các câu lạc bộ và tổ chức chạy bộ
          để lan tỏa tinh thần rèn luyện sức khỏe, kết nối mọi người
          và truyền cảm hứng vận động.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-40 h-20 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="mt-3 text-gray-700 font-medium">
                {partner.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
