// D:\FF Foundation\foundation-heart-connect\src\pages\admin\SectionsManager.tsx

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import TipTapEditor from "@/components/admin/TipTapEditor";
import ImageUpload from "@/components/admin/ImageUpload";

import { useToast } from "@/hooks/use-toast";

import {
  Save,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from "lucide-react";

const SECTIONS = [
  { key: "hero", label: "Hero Section" },
  { key: "about", label: "Giới thiệu" },
  { key: "projects", label: "Dự án nổi bật" },
  { key: "testimonials", label: "Lời chứng thực" },
  { key: "help", label: "Cách giúp đỡ" },
  { key: "partners", label: "Đối tác" },
  { key: "newsletter", label: "Đăng ký nhận tin" },
];

// ======================================================
// TYPES
// ======================================================

interface StatItem {
  label: string;
  value: string;
}

interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

interface PartnerItem {
  name: string;
  logo_url: string;
  link?: string;
}

// JSON compatible object
interface SectionContentFields {
  description?: string;
  stats?: StatItem[];
  items?: TestimonialItem[];
  logos?: PartnerItem[];
}
interface SectionContentFields {
  description?: string;
  stats?: StatItem[];
  items?: TestimonialItem[];
  logos?: PartnerItem[];
}

interface SectionData {
  section_key: string;
  title: string;
  subtitle: string;
  content: SectionContentFields | null;
  image_url: string;
  visible: boolean;
}

// ======================================================
// COMPONENT
// ======================================================

const SectionsManager = () => {
  const [sections, setSections] = useState<Record<string, SectionData>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    loadSections();
  }, []);

  // ======================================================
  // LOAD
  // ======================================================

  const loadSections = async () => {
    const { data, error } = await supabase
      .from("section_contents")
      .select("*");

    if (error) {
      toast({
        title: "Lỗi tải dữ liệu",
        description: error.message,
        variant: "destructive",
      });

      return;
    }

    const map: Record<string, SectionData> = {};

    data?.forEach((d) => {
      map[d.section_key] = {
        section_key: d.section_key,
        title: d.title || "",
        subtitle: d.subtitle || "",
        content: d.content as unknown as SectionContentFields,
        image_url: d.image_url || "",
        visible: d.visible ?? true,
      };
    });

    // tạo mặc định nếu chưa có
    SECTIONS.forEach((s) => {
      if (!map[s.key]) {
        map[s.key] = {
          section_key: s.key,
          title: "",
          subtitle: "",
          content: null,
          image_url: "",
          visible: true,
        };
      }
    });

    setSections(map);
  };

  // ======================================================
  // UPDATE FIELD
  // ======================================================

  const updateField = (
    key: string,
    field: keyof SectionData,
    value: SectionData[keyof SectionData]
  ) => {
    setSections((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  // ======================================================
  // UPDATE NESTED JSON CONTENT
  // ======================================================

  const updateContentNestedField = (
    key: string,
    subField: keyof SectionContentFields,
    value: SectionContentFields[keyof SectionContentFields]
  ) => {
    setSections((prev) => {
      const currentContent = prev[key]?.content || {};

      return {
        ...prev,
        [key]: {
          ...prev[key],
          content: {
            ...currentContent,
            [subField]: value,
          },
        },
      };
    });
  };

  // ======================================================
  // SAVE
  // ======================================================

  const saveSection = async (key: string) => {
    setSaving(key);

    const data = sections[key];

    const { error } = await supabase
      .from("section_contents")
      .upsert(
        {
          section_key: data.section_key,
          title: data.title,
          subtitle: data.subtitle,
          content: data.content as Json,
          image_url: data.image_url,
          visible: data.visible,
        },
        {
          onConflict: "section_key",
        }
      );

    if (error) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Đã lưu thành công!",
      });
    }

    setSaving(null);
  };

  // ======================================================
  // TOGGLE VISIBILITY
  // ======================================================

  const toggleVisibility = async (key: string) => {
    const currentSection = sections[key];

    if (!currentSection) return;

    const newVisible = !currentSection.visible;

    // optimistic update
    setSections((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        visible: newVisible,
      },
    }));

    const { error } = await supabase
      .from("section_contents")
      .upsert(
        {
          section_key: key,
          title: currentSection.title,
          subtitle: currentSection.subtitle,
          content: currentSection.content as Json,
          image_url: currentSection.image_url,
          visible: newVisible,
        },
        {
          onConflict: "section_key",
        }
      );

    if (error) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });

      // rollback
      setSections((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          visible: !newVisible,
        },
      }));

      return;
    }

    toast({
      title: newVisible
        ? "Đã hiện section"
        : "Đã ẩn section",
    });
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-earth mb-8">
        Quản lý nội dung Sections
      </h1>

      <Accordion
        type="single"
        collapsible
        className="space-y-4"
      >
        {SECTIONS.map((section) => {
          const currentData = sections[section.key];

          if (!currentData) return null;

          const sectionStats =
            currentData.content?.stats || [];

          const sectionTestimonials =
            currentData.content?.items || [];

          const sectionPartners =
            currentData.content?.logos || [];

          return (
            <AccordionItem
              key={section.key}
              value={section.key}
              className="border rounded-lg overflow-hidden bg-card"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3 w-full">
                  <span className="text-lg font-semibold text-earth">
                    {section.label}
                  </span>

                  <div className="ml-auto mr-4">
                    {currentData.visible ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Hiện
                      </span>
                    ) : (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                        <EyeOff className="w-3 h-3" />
                        Ẩn
                      </span>
                    )}
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">

                  {/* VISIBILITY */}

                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                    <Switch
                      checked={currentData.visible}
                      onCheckedChange={() =>
                        toggleVisibility(section.key)
                      }
                    />

                    <div>
                      <Label className="text-sm font-medium">
                        Hiển thị trên trang chủ
                      </Label>

                      <p className="text-xs text-muted-foreground">
                        {currentData.visible
                          ? "Section đang hiển thị công khai."
                          : "Section đang bị ẩn khỏi trang chủ."}
                      </p>
                    </div>
                  </div>

                  {/* BASIC FIELDS */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Tiêu đề chính</Label>

                      <Input
                        value={currentData.title}
                        onChange={(e) =>
                          updateField(
                            section.key,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Nhập tiêu đề lớn"
                      />
                    </div>

                    <div>
                      <Label>Phụ đề / slogan</Label>

                      <Input
                        value={currentData.subtitle}
                        onChange={(e) =>
                          updateField(
                            section.key,
                            "subtitle",
                            e.target.value
                          )
                        }
                        placeholder="Nhập slogan"
                      />
                    </div>
                  </div>

                  {/* IMAGE */}

                  <div>
                    <Label>Hình ảnh đại diện</Label>

                    <ImageUpload
                      value={currentData.image_url}
                      onChange={(url) =>
                        updateField(
                          section.key,
                          "image_url",
                          url
                        )
                      }
                      folder={`sections/${section.key}`}
                    />
                  </div>

                  {/* HERO STATS */}

                  {section.key === "hero" && (
                    <div className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">
                          Quản lý số liệu
                        </Label>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newStats = [
                              ...sectionStats,
                              {
                                label: "",
                                value: "",
                              },
                            ];

                            updateContentNestedField(
                              section.key,
                              "stats",
                              newStats
                            );
                          }}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Thêm số liệu
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {sectionStats.map((stat, sIdx) => (
                          <div
                            key={sIdx}
                            className="border rounded-lg p-3 relative space-y-2"
                          >
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 w-6 h-6"
                              onClick={() => {
                                const newStats =
                                  sectionStats.filter(
                                    (_, idx) =>
                                      idx !== sIdx
                                  );

                                updateContentNestedField(
                                  section.key,
                                  "stats",
                                  newStats
                                );
                              }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>

                            <div>
                              <Label className="text-xs">
                                Value
                              </Label>

                              <Input
                                value={stat.value}
                                onChange={(e) => {
                                  const newStats = [
                                    ...sectionStats,
                                  ];

                                  newStats[sIdx] = {
                                    ...newStats[sIdx],
                                    value: e.target.value,
                                  };

                                  updateContentNestedField(
                                    section.key,
                                    "stats",
                                    newStats
                                  );
                                }}
                              />
                            </div>

                            <div>
                              <Label className="text-xs">
                                Label
                              </Label>

                              <Input
                                value={stat.label}
                                onChange={(e) => {
                                  const newStats = [
                                    ...sectionStats,
                                  ];

                                  newStats[sIdx] = {
                                    ...newStats[sIdx],
                                    label: e.target.value,
                                  };

                                  updateContentNestedField(
                                    section.key,
                                    "stats",
                                    newStats
                                  );
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* DESCRIPTION */}

                  {section.key !== "newsletter" && (
                    <div>
                      <Label>
                        Nội dung chi tiết
                      </Label>

                      <TipTapEditor
                        content={
                          currentData.content?.description || ""
                        }
                        onChange={(c) =>
                          updateContentNestedField(
                            section.key,
                            "description",
                            c
                          )
                        }
                      />
                    </div>
                  )}

                  {/* SAVE */}

                  <Button
                    onClick={() =>
                      saveSection(section.key)
                    }
                    disabled={saving === section.key}
                    className="w-full md:w-auto"
                  >
                    <Save className="w-4 h-4 mr-2" />

                    {saving === section.key
                      ? "Đang lưu..."
                      : "Lưu cấu hình"}
                  </Button>

                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default SectionsManager;