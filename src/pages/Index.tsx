import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import HelpSection from "@/components/HelpSection";
import PartnersSection from "@/components/PartnersSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TestimonialsSection />
      <HelpSection />
      <PartnersSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
