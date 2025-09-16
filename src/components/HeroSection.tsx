import { Button } from "@/components/ui/button";
import { Heart, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="F Foundation Community" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-earth/70 to-earth/20"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        {/* Logo & Brand */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-hope to-hope-light rounded-full mb-6 shadow-glow">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            F Foundation
          </h1>
        </div>
        
        {/* Slogan */}
        <div className="mb-12 animate-fade-in [animation-delay:0.3s]">
          <p className="text-xl md:text-2xl mb-4 text-warmth">
            "Chúng tôi gieo hạt yêu thương"
          </p>
          <p className="text-lg md:text-xl opacity-90">
            “Mỗi sự đóng góp của bạn là giọt nước mát lành, tưới cho tương lai tươi sáng của trẻ em và cộng đồng.”

          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in [animation-delay:0.6s]">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4">
            <Heart className="w-5 h-5 mr-2" />
            Ủng hộ ngay
          </Button>
          <Button variant="warm" size="lg" className="text-lg px-8 py-4">
            <Users className="w-5 h-5 mr-2" />
            Tham gia cùng chúng tôi
          </Button>
        </div>
        
        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in [animation-delay:0.9s]">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-warmth mb-2">1 500+</div>
            <div className="text-white/90">Sinh viên tham gia </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-warmth mb-2">3</div>
            <div className="text-white/90">Giải chạy bộ </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-warmth mb-2">3</div>
            <div className="text-white/90">Năm đồng hành</div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;