import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Lightbulb, Users, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import educationProject from "@/assets/pic.png";
import environmentProject from "@/assets/pic1.png";
import healthcareProject from "@/assets/pic3.png";

const iconMap: Record<string, any> = { BookOpen, Lightbulb, Users };

const defaultProjects = [
  {
    id: "1",
    title: "Học Kỳ Doanh Nghiệp",
    slug: "hoc-ky-doanh-nghiep",
    description: "Chương trình giáo dục thực hành giúp sinh viên trải nghiệm môi trường doanh nghiệp thực tế, phát triển kỹ năng nghề nghiệp và tư duy khởi nghiệp.",
    image_url: educationProject,
    icon: "BookOpen",
    stats: "500+ Sinh viên • 20+ Doanh nghiệp",
    category: "Giáo dục thực hành",
  },
  {
    id: "2",
    title: "Vườn ươm Khởi nghiệp Sinh viên",
    slug: "vuon-uom-khoi-nghiep",
    description: "Hỗ trợ các nhóm sinh viên phát triển ý tưởng thành sản phẩm thực tế, kết nối mentor và nguồn lực từ doanh nghiệp, tổ chức.",
    image_url: environmentProject,
    icon: "Lightbulb",
    stats: "30+ Dự án • 10+ Mentor",
    category: "Khởi nghiệp sáng tạo",
  },
  {
    id: "3",
    title: "Sáng kiến Cộng đồng",
    slug: "sang-kien-cong-dong",
    description: "Tổ chức các hoạt động cộng đồng thiết thực, giúp sinh viên rèn luyện kỹ năng lãnh đạo, làm việc nhóm và trách nhiệm xã hội.",
    image_url: healthcareProject,
    icon: "Users",
    stats: "8,500+ Sinh viên • 15 Tỉnh thành",
    category: "Cộng đồng",
  },
];

const ProjectsSection = () => {
  const [projects, setProjects] = useState(defaultProjects);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false })
        .limit(6);
      if (data && data.length > 0) {
        setProjects(data as any);
      }
    };
    load();
  }, []);

  return (
    <section id="projects" className="py-20 bg-background" ref={ref}>
      <div className={`container mx-auto px-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6 animate-fade-in">Dự án nổi bật</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in [animation-delay:0.2s]">
            Những chương trình tiêu biểu mà FFVN đã triển khai nhằm hỗ trợ giáo dục, khởi nghiệp và phát triển cộng đồng.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => {
            const IconComp = iconMap[project.icon || "BookOpen"] || BookOpen;
            return (
              <Link key={project.id} to={`/du-an/${project.slug}`} className="group">
                <Card className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-hope text-white px-3 py-1 rounded-full text-sm font-medium">{project.category}</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 p-2 rounded-full group-hover:rotate-12 transition-transform duration-300">
                        <IconComp className="w-5 h-5 text-hope" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-earth mb-3 group-hover:text-hope transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">{project.description}</p>
                    <div className="flex items-center text-sm text-hope font-medium mb-4">
                      <div className="w-2 h-2 bg-hope rounded-full mr-2"></div>
                      {project.stats}
                    </div>
                    <div className="flex items-center justify-between text-hope font-medium">
                      Tìm hiểu thêm
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
