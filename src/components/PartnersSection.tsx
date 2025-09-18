// src/components/PartnersSection.tsx
import React from "react";

type Partner = {
  name: string;
  logo: string;      // đường dẫn ảnh logo trong public/
  website?: string;  // link đối tác (nếu có)
};

const partners: Partner[] = [
  {
    name: "MSC",
    logo: "/MSC.png",
    website: "https://msc.edu.vn",
  },
  {
    name: "Smentor",
    logo: "/Smentor.png",
    website: "#",
  },
  {
    name: "VSM – Vietnam Student Marathon",
    logo: "/logovsm.png",
    website: "https://vsm.org.vn",
  },
  {
    name: "Smar",
    logo: "/Smar.png",
    website: "https://smar.vn",
  },
];

export default function PartnersSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 text-center">
        {/* Tiêu đề */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
          Đối Tác Chạy Bộ Cộng Đồng
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14 leading-relaxed">
          Chúng tôi tự hào đồng hành cùng các câu lạc bộ và tổ chức chạy bộ để
          lan tỏa tinh thần rèn luyện sức khỏe, kết nối cộng đồng và truyền cảm
          hứng vận động tích cực.
        </p>

        {/* Lưới logo */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center"
            >
              <div className="w-40 h-24 flex items-center justify-center bg-white shadow-md rounded-xl p-4 transition duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-20 object-contain"
                />
              </div>
              <span className="mt-4 text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">
                {p.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
