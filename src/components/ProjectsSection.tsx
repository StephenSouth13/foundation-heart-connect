import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Lightbulb, Users, ArrowRight } from "lucide-react";
import educationProject from "@/assets/pic.png";
import environmentProject from "@/assets/pic1.png";
import healthcareProject from "@/assets/pic3.png";

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "Học Kỳ Doanh Nghiệp",
      description: "Chương trình giáo dục thực hành giúp sinh viên trải nghiệm môi trường doanh nghiệp thực tế, phát triển kỹ năng nghề nghiệp và tư duy khởi nghiệp.",
      image: educationProject,
      icon: BookOpen,
      stats: "500+ Sinh viên • 20+ Doanh nghiệp",
      category: "Giáo dục thực hành",
    },
    {
      id: 2,
      title: "Vườn ươm Khởi nghiệp Sinh viên",
      description: "Hỗ trợ các nhóm sinh viên phát triển ý tưởng thành sản phẩm thực tế, kết nối mentor và nguồn lực từ doanh nghiệp, tổ chức.",
      image: environmentProject,
      icon: Lightbulb,
      stats: "30+ Dự án • 10+ Mentor",
      category: "Khởi nghiệp sáng tạo",
    },
    {
      id: 3,
      title: "Sáng kiến Cộng đồng",
      description: "Tổ chức các hoạt động cộng đồng thiết thực, giúp sinh viên rèn luyện kỹ năng lãnh đạo, làm việc nhóm và trách nhiệm xã hội.",
      image: healthcareProject,
      icon: Users,
      stats: "8,500+ Sinh viên • 15 Tỉnh thành",
      category: "Cộng đồng",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6 animate-fade-in">Dự án nổi bật</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in [animation-delay:0.2s]">
            Những chương trình tiêu biểu mà FFVN đã triển khai nhằm hỗ trợ giáo dục, khởi nghiệp và phát triển cộng đồng.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <Card key={project.id} className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 hover:scale-105 hover:-translate-y-2 group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="bg-hope text-white px-3 py-1 rounded-full text-sm font-medium">{project.category}</span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 p-2 rounded-full group-hover:rotate-12 transition-transform duration-300">
                    <project.icon className="w-5 h-5 text-hope" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-earth mb-3 group-hover:text-hope transition-colors">{project.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex items-center text-sm text-hope font-medium mb-4">
                  <div className="w-2 h-2 bg-hope rounded-full mr-2"></div>
                  {project.stats}
                </div>
                <Button variant="ghost" className="w-full justify-between text-hope hover:text-hope hover:bg-hope/10 p-0 h-auto">
                  Tìm hiểu thêm
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hope" size="lg" className="px-8 hover:scale-105 transition-transform">
            Xem tất cả dự án
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
