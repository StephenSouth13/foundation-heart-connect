import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, TreePine, Heart, ArrowRight } from "lucide-react";
import educationProject from "@/assets/pic.png";
import environmentProject from "@/assets/pic1.png";
import healthcareProject from "@/assets/pic3.png";

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "Hành trình ý chí",
      description: "Mỗi mùa giải VSM đều mang đến cơ hội cho sinh viên thử thách bản thân qua từng cự ly, rèn luyện ý chí và tinh thần kỷ luật.",
      image: educationProject,
      icon: BookOpen,
      stats: "3 Mùa giải • 1,200 Sinh viên",
      category: "Giáo dục,Thể Thao",
      completed: 100
    },
    {
      id: 2,
      title: "Cộng đồng GenZ bứt phá",
      description: "Không chỉ là một giải chạy, VSM đã hình thành một cộng đồng năng động – nơi các bạn trẻ cùng nhau kết nối, chia sẻ đam mê và truyền cảm hứng sống tích cực.",
      image: environmentProject,
      icon: TreePine,
      stats: "10,000 cây xanh • 5 tỉnh",
      category: "Môi trường",
      completed: 60
    },
    {
      id: 3,
      title: "Tương lai rộng mở",
      description: "VSM hướng đến mở rộng quy mô, lan tỏa tinh thần thể thao và rèn luyện ý chí đến nhiều bạn trẻ hơn trên khắp Việt Nam.",
      image: healthcareProject,
      icon: Heart,
      stats: "8,500 Sinh viên • 5 xã",
      category: "Sức khỏe,Cộng đồng",
      completed: 80
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth mb-6">
            Dự án nổi bật
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Những thành tựu đáng tự hào mà VSM đã đạt được nhờ sự đồng hành của hàng ngàn sinh viên, tình nguyện viên và các trường đại học.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card 
              key={project.id}
              className="bg-card shadow-soft border-0 hover:shadow-warm transition-all duration-500 hover:scale-105 group overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-hope text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 p-2 rounded-full">
                    <project.icon className="w-5 h-5 text-hope" />
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Project Title */}
                <h3 className="text-xl font-bold text-earth mb-3 group-hover:text-hope transition-colors">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="flex items-center text-sm text-hope font-medium mb-4">
                  <div className="w-2 h-2 bg-hope rounded-full mr-2"></div>
                  {project.stats}
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Tiến độ</span>
                    <span className="text-hope font-medium">{project.completed}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-hope to-hope-light h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${project.completed}%` }}
                    ></div>
                  </div>
                </div>

                {/* Learn More Link */}
                <Button 
                  variant="ghost" 
                  className="w-full justify-between text-hope hover:text-hope hover:bg-hope/10 p-0 h-auto"
                >
                  Tìm hiểu thêm
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button variant="hope" size="lg" className="px-8">
            Xem tất cả dự án
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;