// D:\FF Foundation\foundation-heart-connect\src\pages\admin\ProjectsManager.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ProjectForm, { type Project, emptyProject } from "@/components/admin/ProjectForm";
import ProjectList from "@/components/admin/ProjectList";

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
      
    if (data) {
      // Ép kiểu dữ liệu an toàn từ kết quả truy vấn sang mảng cấu trúc Project
      const mappedProjects: Project[] = (data as unknown as Project[]).map((d) => ({
        ...d,
        image_position: d.image_position || "center",
      }));
      setProjects(mappedProjects);
    }
  };

  const saveProject = async (project: Project) => {
    setSaving(true);
    try {
      const payload = {
        title: project.title,
        slug: project.slug,
        description: project.description,
        content: project.content,
        image_url: project.image_url,
        image_position: project.image_position,
        category: project.category,
        stats: project.stats,
        icon: project.icon,
        published: project.published,
      };

      if (project.id) {
        const { error } = await supabase.from("projects").update(payload).eq("id", project.id);
        if (error) throw error;
      } else {
        const maxOrder = projects.length > 0
          ? Math.max(...projects.map((p) => p.display_order ?? 0))
          : 0;
        const { error } = await supabase.from("projects").insert({ ...payload, display_order: maxOrder + 1 });
        if (error) throw error;
      }
      toast({ title: "Đã lưu dự án!" });
      setEditing(null);
      loadProjects();
    } catch (error) {
      // Khắc phục lỗi 'Unexpected any' ở catch block bằng cách kiểm tra kiểu dữ liệu chuẩn
      const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định";
      toast({ title: "Lỗi", description: errorMessage, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = async (reordered: Project[]) => {
    setProjects(reordered);
    try {
      // Cách tối ưu hóa: Sử dụng mảng đối tượng truyền vào upsert() 
      // Supabase sẽ gộp toàn bộ vào DUY NHẤT 1 HTTP request để xử lý bulk update dưới database
      const upsertPayload = reordered.map((p, index) => ({
        id: p.id,
        display_order: index,
        title: p.title, // Giữ lại các trường bắt buộc nếu schema yêu cầu NOT NULL lúc upsert
        slug: p.slug
      }));

      const { error } = await supabase
        .from("projects")
        .upsert(upsertPayload, { onConflict: "id" });

      if (error) throw error;
      toast({ title: "Đã cập nhật thứ tự!" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi";
      toast({ title: "Lỗi cập nhật thứ tự", description: errorMessage, variant: "destructive" });
      loadProjects(); // Rollback dữ liệu cũ từ database nếu update lỗi
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xoá dự án này?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Đã xoá!" });
      loadProjects();
    }
  };

  if (editing) {
    return (
      <ProjectForm
        project={editing}
        saving={saving}
        onSave={saveProject}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <ProjectList
      projects={projects}
      onEdit={setEditing}
      onCreate={() => setEditing({ ...emptyProject })}
      onDelete={deleteProject}
      onReorder={handleReorder}
    />
  );
};

export default ProjectsManager;