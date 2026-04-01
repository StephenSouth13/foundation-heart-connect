import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import TipTapEditor from "@/components/admin/TipTapEditor";
import ImageUpload from "@/components/admin/ImageUpload";
import { Save, ArrowLeft, ExternalLink } from "lucide-react";

export interface Project {
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

export const emptyProject: Project = {
  title: "", slug: "", description: "", content: null, image_url: "",
  category: "", stats: "", icon: "BookOpen", published: false,
};

export const slugify = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

interface ProjectFormProps {
  project: Project;
  saving: boolean;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, saving, onSave, onCancel }: ProjectFormProps) => {
  const [editing, setEditing] = useState<Project>(project);
  const [slugManual, setSlugManual] = useState(!!project.id);

  const handleTitleChange = (title: string) => {
    setEditing({
      ...editing,
      title,
      ...(!slugManual ? { slug: slugify(title) } : {}),
    });
  };

  const handleSlugChange = (slug: string) => {
    setSlugManual(true);
    setEditing({ ...editing, slug: slugify(slug) || slug });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách
        </Button>
        {editing.id && editing.published && (
          <a href={`/du-an/${editing.slug}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" /> Xem trang dự án
            </Button>
          </a>
        )}
      </div>

      <h1 className="text-3xl font-bold text-earth mb-8">
        {editing.id ? "Chỉnh sửa dự án" : "Tạo dự án mới"}
      </h1>

      <div className="space-y-6 max-w-4xl">
        {/* Title & Slug */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Tiêu đề dự án</Label>
            <Input
              value={editing.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Tên dự án"
            />
          </div>
          <div>
            <Label>Slug (URL)</Label>
            <Input
              value={editing.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="ten-du-an"
            />
            <p className="text-xs text-muted-foreground mt-1">
              /du-an/{editing.slug || "..."}
            </p>
            {!slugManual && (
              <p className="text-xs text-hope mt-1">
                Tự động tạo từ tiêu đề. Nhập thủ công để tuỳ chỉnh.
              </p>
            )}
          </div>
        </div>

        {/* Category & Stats */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Danh mục</Label>
            <Input
              value={editing.category}
              onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              placeholder="Giáo dục, Khởi nghiệp..."
            />
          </div>
          <div>
            <Label>Thống kê</Label>
            <Input
              value={editing.stats}
              onChange={(e) => setEditing({ ...editing, stats: e.target.value })}
              placeholder="500+ Sinh viên • 20+ Doanh nghiệp"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label>Mô tả ngắn</Label>
          <Textarea
            value={editing.description}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            placeholder="Mô tả ngắn gọn về dự án (hiển thị ở trang danh sách và phần giới thiệu)"
            rows={3}
          />
        </div>

        {/* Cover Image */}
        <div>
          <Label>Ảnh bìa dự án</Label>
          <p className="text-xs text-muted-foreground mb-2">
            Ảnh hiển thị ở banner đầu trang chi tiết dự án và danh sách dự án.
          </p>
          <ImageUpload
            value={editing.image_url}
            onChange={(url) => setEditing({ ...editing, image_url: url })}
            folder="projects"
          />
        </div>

        {/* Rich Text Content */}
        <div>
          <Label>Nội dung chi tiết (Rich Text)</Label>
          <p className="text-xs text-muted-foreground mb-2">
            Sử dụng toolbar để định dạng văn bản, chèn ảnh, bảng, link...
          </p>
          <TipTapEditor
            content={editing.content}
            onChange={(c) => setEditing({ ...editing, content: c })}
            placeholder="Viết nội dung chi tiết cho dự án..."
          />
        </div>

        {/* Publish toggle */}
        <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-muted/30">
          <Switch
            checked={editing.published}
            onCheckedChange={(v) => setEditing({ ...editing, published: v })}
          />
          <div>
            <Label className="text-base">Xuất bản</Label>
            <p className="text-xs text-muted-foreground">
              {editing.published
                ? "Dự án đang hiển thị công khai trên website."
                : "Dự án đang ở chế độ nháp, chỉ admin mới xem được."}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button
            onClick={() => onSave(editing)}
            disabled={saving || !editing.title || !editing.slug}
            className="bg-hope hover:bg-hope/90 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Đang lưu..." : "Lưu dự án"}
          </Button>
          <Button variant="outline" onClick={onCancel}>Huỷ</Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
