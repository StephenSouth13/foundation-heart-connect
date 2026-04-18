import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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

const sectionComponents: Record<string, React.FC> = {
  hero: HeroSection,
  about: AboutSection,
  projects: ProjectsSection,
  testimonials: TestimonialsSection,
  help: HelpSection,
  partners: PartnersSection,
  newsletter: NewsletterSection,
};

const SECTION_ORDER = ["hero", "about", "projects", "testimonials", "help", "partners", "newsletter"];

const Index = () => {
  const [hiddenSections, setHiddenSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadVisibility = async () => {
      const { data } = await supabase
        .from("section_contents")
        .select("section_key, visible");
      if (data) {
        const hidden = new Set<string>();
        data.forEach((d: any) => {
          if (d.visible === false) hidden.add(d.section_key);
        });
        setHiddenSections(hidden);
      }
    };
    loadVisibility();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      {SECTION_ORDER.map((key) => {
        if (hiddenSections.has(key)) return null;
        const Component = sectionComponents[key];
        return Component ? <Component key={key} /> : null;
      })}
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
