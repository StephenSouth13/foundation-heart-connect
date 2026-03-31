import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import HelpSection from "@/components/HelpSection";
import PartnersSection from "@/components/PartnersSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TestimonialsSection />
      <HelpSection />
      <PartnersSection />
      <NewsletterSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
