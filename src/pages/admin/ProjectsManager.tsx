import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import TipTapEditor from "@/components/admin/TipTapEditor";
import ImageUpload from "@/components/admin/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, Trash2, Eye, EyeOff, ArrowLeft } from "lucide-react";

interface Project {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content: any;
  image_url: string;
  category: string;
  stats: string;
  icon: string;
  published: boolean;
}

const emptyProject: Project = {
  title: "", slug: "", description: "", content: null, image_url: "",
  category: "", stats: "", icon: "BookOpen", published: false,
};

const slugify = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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

  const handleTitleChange = (title: string) => {
    if (!editing) return;
    const isNew = !editing.id;
    setEditing({
      ...editing,
      title,
      ...(isNew ? { slug: slugify(title) } : {}),
    });
  };

  const saveProject = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        const { error } = await supabase
          .from("projects")
          .update({
            title: editing.title,
            slug: editing.slug,
            description: editing.description,
            content: editing.content,
            image_url: editing.image_url,
            category: editing.category,
            stats: editing.stats,
            icon: editing.icon,
            published: editing.published,
          })
          .eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert({
          title: editing.title,
          slug: editing.slug,
          description: editing.description,
          content: editing.content,
          image_url: editing.image_url,
          category: editing.category,
          stats: editing.stats,
          icon: editing.icon,
          published: editing.published,
        });
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
      <div>
        <Button variant="ghost" onClick={() => setEditing(null)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách
        </Button>
        <h1 className="text-3xl font-bold text-earth mb-8">
          {editing.id ? "Chỉnh sửa dự án" : "Tạo dự án mới"}
        </h1>

        <div className="space-y-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Tiêu đề dự án</Label>
              <Input value={editing.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Tên dự án" />
            </div>
            <div>
              <Label>Slug (URL)</Label>
              <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="ten-du-an" />
              <p className="text-xs text-muted-foreground mt-1">/du-an/{editing.slug || "..."}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Danh mục</Label>
              <Input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} placeholder="Giáo dục, Khởi nghiệp..." />
            </div>
            <div>
              <Label>Thống kê</Label>
              <Input value={editing.stats} onChange={(e) => setEditing({ ...editing, stats: e.target.value })} placeholder="500+ Sinh viên • 20+ Doanh nghiệp" />
            </div>
          </div>

          <div>
            <Label>Mô tả ngắn</Label>
            <Input value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Mô tả ngắn gọn về dự án" />
          </div>

          <div>
            <Label>Ảnh đại diện</Label>
            <ImageUpload
              value={editing.image_url}
              onChange={(url) => setEditing({ ...editing, image_url: url })}
              folder="projects"
            />
          </div>

          <div>
            <Label>Nội dung chi tiết (Rich Text)</Label>
            <TipTapEditor
              content={editing.content}
              onChange={(c) => setEditing({ ...editing, content: c })}
              placeholder="Viết nội dung chi tiết cho dự án..."
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              checked={editing.published}
              onCheckedChange={(v) => setEditing({ ...editing, published: v })}
            />
            <Label>Xuất bản (hiển thị công khai)</Label>
          </div>

          <div className="flex gap-3">
            <Button onClick={saveProject} disabled={saving} className="bg-hope hover:bg-hope/90 text-white">
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Đang lưu..." : "Lưu dự án"}
            </Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Huỷ</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-earth">Quản lý dự án</h1>
        <Button onClick={() => setEditing({ ...emptyProject })} className="bg-hope hover:bg-hope/90 text-white">
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
                  {p.category && <span className="text-xs bg-hope/10 text-hope px-2 py-0.5 rounded-full">{p.category}</span>}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => setEditing(p)}>Sửa</Button>
                <Button variant="destructive" size="sm" onClick={() => deleteProject(p.id!)}>
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

export default ProjectsManager;
