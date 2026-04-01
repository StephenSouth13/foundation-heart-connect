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

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProjects(data as any);
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
        category: project.category,
        stats: project.stats,
        icon: project.icon,
        published: project.published,
      };

      if (project.id) {
        const { error } = await supabase.from("projects").update(payload).eq("id", project.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
      }
      toast({ title: "Đã lưu dự án!" });
      setEditing(null);
      loadProjects();
    } catch (error: any) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
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
    />
  );
};

export default ProjectsManager;
