import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
import type { Project } from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
}

const ProjectList = ({ projects, onEdit, onCreate, onDelete }: ProjectListProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-earth">Quản lý dự án</h1>
        <Button onClick={onCreate} className="bg-hope hover:bg-hope/90 text-white">
          <Plus className="w-4 h-4 mr-2" /> Tạo dự án mới
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((p) => (
          <Card key={p.id} className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-center gap-4 p-4">
              {p.image_url ? (
                <img src={p.image_url} alt={p.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <span className="text-2xl">📁</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-earth truncate">{p.title}</h3>
                <p className="text-sm text-muted-foreground truncate">/du-an/{p.slug}</p>
                <div className="flex items-center gap-2 mt-1">
                  {p.published ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Đã xuất bản
                    </span>
                  ) : (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                      <EyeOff className="w-3 h-3" /> Bản nháp
                    </span>
                  )}
                  {p.category && (
                    <span className="text-xs bg-hope/10 text-hope px-2 py-0.5 rounded-full">{p.category}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                {p.published && (
                  <a href={`/du-an/${p.slug}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" title="Xem trang">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                )}
                <Button variant="outline" size="sm" onClick={() => onEdit(p)}>Sửa</Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(p.id!)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Chưa có dự án nào. Hãy tạo dự án đầu tiên!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
