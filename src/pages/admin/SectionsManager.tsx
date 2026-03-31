import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import TipTapEditor from "@/components/admin/TipTapEditor";
import ImageUpload from "@/components/admin/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const SECTIONS = [
  { key: "hero", label: "Hero Section" },
  { key: "about", label: "Giới thiệu" },
  { key: "testimonials", label: "Lời chứng thực" },
  { key: "help", label: "Cách giúp đỡ" },
  { key: "partners", label: "Đối tác" },
  { key: "newsletter", label: "Đăng ký nhận tin" },
];

interface SectionData {
  section_key: string;
  title: string;
  subtitle: string;
  content: any;
  image_url: string;
}

const SectionsManager = () => {
  const [sections, setSections] = useState<Record<string, SectionData>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    const { data } = await supabase.from("section_contents").select("*");
    if (data) {
      const map: Record<string, SectionData> = {};
      data.forEach((d: any) => { map[d.section_key] = d; });
      // Fill defaults for missing sections
      SECTIONS.forEach((s) => {
        if (!map[s.key]) {
          map[s.key] = { section_key: s.key, title: "", subtitle: "", content: null, image_url: "" };
        }
      });
      setSections(map);
    }
  };

  const updateField = (key: string, field: string, value: any) => {
    setSections((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const saveSection = async (key: string) => {
    setSaving(key);
    const data = sections[key];
    const { error } = await supabase
      .from("section_contents")
      .upsert({
        section_key: data.section_key,
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
        image_url: data.image_url,
      }, { onConflict: "section_key" });

    if (error) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Đã lưu thành công!" });
    }
    setSaving(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-earth mb-8">Quản lý nội dung Sections</h1>

      <Accordion type="single" collapsible className="space-y-4">
        {SECTIONS.map((section) => (
          <AccordionItem key={section.key} value={section.key} className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <span className="text-lg font-semibold text-earth">{section.label}</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4">
                <div>
                  <Label>Tiêu đề</Label>
                  <Input
                    value={sections[section.key]?.title || ""}
                    onChange={(e) => updateField(section.key, "title", e.target.value)}
                    placeholder="Tiêu đề section"
                  />
                </div>
                <div>
                  <Label>Phụ đề</Label>
                  <Input
                    value={sections[section.key]?.subtitle || ""}
                    onChange={(e) => updateField(section.key, "subtitle", e.target.value)}
                    placeholder="Phụ đề / mô tả ngắn"
                  />
                </div>
                <div>
                  <Label>Ảnh</Label>
                  <ImageUpload
                    value={sections[section.key]?.image_url || ""}
                    onChange={(url) => updateField(section.key, "image_url", url)}
                    folder={`sections/${section.key}`}
                  />
                </div>
                <div>
                  <Label>Nội dung chi tiết</Label>
                  <TipTapEditor
                    content={sections[section.key]?.content}
                    onChange={(c) => updateField(section.key, "content", c)}
                  />
                </div>
                <Button
                  onClick={() => saveSection(section.key)}
                  disabled={saving === section.key}
                  className="bg-hope hover:bg-hope/90 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving === section.key ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SectionsManager;
