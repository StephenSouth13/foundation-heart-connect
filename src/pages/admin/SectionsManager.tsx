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
  { key: "footer", label: "Chân trang (Footer)" },
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
// Thêm interface này phía trên SectionContentFields nếu chưa có
interface HeroAction {
  label: string;
  primary: boolean;
  link_type: "internal" | "external";
  url: string;
}

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

// Permissive shape — content JSON can have arbitrary section-specific fields
type SectionContentFields = Record<string, any>;

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

  // TÌM VÀ THAY THẾ KHỐI LỆNH CŨ TỪ DÒNG 41 ĐẾN 64 THÀNH ĐOẠN NÀY:

useEffect(() => {
  const loadSections = async () => {
    const { data } = await supabase.from("section_contents").select("*");
    if (data) {
      const map: Record<string, SectionData> = {};
      data.forEach((d) => {
        map[d.section_key] = {
          section_key: d.section_key,
          title: d.title || "",
          subtitle: d.subtitle || "",
          content: (d.content as SectionContentFields) || null,
          image_url: d.image_url || "",
          visible: d.visible ?? true,
        };
      });

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
    }
  };

  loadSections();
}, []); // 👈 Không còn lỗi cảnh báo thiếu dependency nữa

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

                  {/* ==================================================================== */}
{/* GIAO DIỆN MỞ RỘNG DÀNH RIÊNG CHO HERO SECTION (FULL DYNAMIC)         */}
{/* ==================================================================== */}
{section.key === "hero" && (
  <div className="space-y-6 border-t border-border pt-4 mt-4">
    
    {/* 1. Nhập thêm Tagline & Description vào trường Content JSONB */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label>Tagline (Nhãn nhỏ phía trên tiêu đề)</Label>
        <Input
          value={currentData.content?.tagline || ""}
          onChange={(e) => updateContentNestedField(section.key, "tagline", e.target.value)}
          placeholder="Ví dụ: CHIẾN DỊCH HÀNH ĐỘNG 2026"
        />
      </div>
      <div>
        <Label>Mô tả chi tiết diện rộng</Label>
        <Input
          value={currentData.content?.description || ""}
          onChange={(e) => updateContentNestedField(section.key, "description", e.target.value)}
          placeholder="Nhập đoạn mô tả ngắn gọn về mục tiêu của quỹ..."
        />
      </div>
    </div>

    {/* 2. QUẢN LÝ CÁC NÚT BẤM ĐIỀU HƯỚNG (ACTIONS CTA) */}
    <div className="p-4 border border-border rounded-lg bg-muted/10 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-semibold text-earth">Nút bấm hành động (Call to Action)</Label>
          <p className="text-xs text-muted-foreground">Cấu hình tối đa 2 nút bấm dẫn hướng người dùng ở trang chủ.</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={(currentData.content?.actions || []).length >= 2}
          onClick={() => {
  const currentActions = currentData.content?.actions || [];
  const newActions = [
    ...currentActions, 
    { label: "Nút mới", primary: false, link_type: "internal" as "internal" | "external", url: "/" } // 👈 Hoặc ép hẳn Type như thế này
  ];
  updateContentNestedField(section.key, "actions", newActions);
}}

        >
          <Plus className="w-4 h-4 mr-1" /> Thêm nút bấm
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(currentData.content?.actions || []).map((action, aIdx) => (
          <div key={aIdx} className="p-4 border border-border rounded bg-card relative space-y-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-destructive w-6 h-6"
              onClick={() => {
                const newActions = (currentData.content?.actions || []).filter((_, idx) => idx !== aIdx);
                updateContentNestedField(section.key, "actions", newActions);
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Tên nút (Label)</Label>
                <Input
                  value={action.label}
                  onChange={(e) => {
                    const newActions = [...(currentData.content?.actions || [])];
                    newActions[aIdx] = { ...newActions[aIdx], label: e.target.value };
                    updateContentNestedField(section.key, "actions", newActions);
                  }}
                  placeholder="Quyên góp ngay"
                />
              </div>
              <div>
                <Label className="text-xs">Loại liên kết</Label>
                <select
                  className="w-full h-10 border border-input rounded-md px-3 text-sm bg-background"
                  value={action.link_type}
                  onChange={(e) => {
                    const newActions = [...(currentData.content?.actions || [])];
                    newActions[aIdx] = { ...newActions[aIdx], link_type: e.target.value as "internal" | "external" };
                    updateContentNestedField(section.key, "actions", newActions);
                  }}
                >
                  <option value="internal">Trang trong (Internal)</option>
                  <option value="external">Link ngoài (External)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 items-end">
              <div className="col-span-2">
                <Label className="text-xs">Đường dẫn URL / Route</Label>
                <Input
                  value={action.url}
                  onChange={(e) => {
                    const newActions = [...(currentData.content?.actions || [])];
                    newActions[aIdx] = { ...newActions[aIdx], url: e.target.value };
                    updateContentNestedField(section.key, "actions", newActions);
                  }}
                  placeholder={action.link_type === "external" ? "https://" : "/about"}
                />
              </div>
              <div className="flex items-center gap-2 h-10 border border-border p-2 rounded bg-muted/20">
                <Switch
                  checked={action.primary}
                  onCheckedChange={(checked) => {
                    const newActions = [...(currentData.content?.actions || [])];
                    newActions[aIdx] = { ...newActions[aIdx], primary: checked };
                    updateContentNestedField(section.key, "actions", newActions);
                  }}
                />
                <Label className="text-xs cursor-pointer">Nút Chính</Label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 3. QUẢN LÝ SỐ LIỆU THỐNG KÊ (STATS METRICS) */}
    <div className="p-4 border border-border rounded-lg bg-muted/10 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-semibold text-earth">Quản lý số liệu thống kê</Label>
          <p className="text-xs text-muted-foreground">Các số liệu thực tế hiển thị dạng Grid dưới chân màn hình Hero.</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const newStats = [...sectionStats, { label: "Tiêu đề mới", value: "0" }];
            updateContentNestedField(section.key, "stats", newStats);
          }}
        >
          <Plus className="w-4 h-4 mr-1" /> Thêm số liệu
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sectionStats.map((stat, sIdx) => (
          <div key={sIdx} className="p-3 border border-border rounded bg-card relative space-y-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-destructive w-6 h-6 hover:bg-destructive/10"
              onClick={() => {
                const newStats = sectionStats.filter((_, idx) => idx !== sIdx);
                updateContentNestedField(section.key, "stats", newStats);
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
            <div>
              <Label className="text-xs">Số lượng / Giá trị</Label>
              <Input
                value={stat.value}
                onChange={(e) => {
                  const newStats = [...sectionStats];
                  newStats[sIdx] = { ...newStats[sIdx], value: e.target.value };
                  updateContentNestedField(section.key, "stats", newStats);
                }}
                placeholder="Ví dụ: 20.000+"
              />
            </div>
            <div>
              <Label className="text-xs">Nhãn hiển thị</Label>
              <Input
                value={stat.label}
                onChange={(e) => {
                  const newStats = [...sectionStats];
                  newStats[sIdx] = { ...newStats[sIdx], label: e.target.value };
                  updateContentNestedField(section.key, "stats", newStats);
                }}
                placeholder="Ví dụ: Sinh viên thụ hưởng"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
{/* ==================================================================== */}
{/* GIAO DIỆN MỞ RỘNG DÀNH RIÊNG CHO ABOUT SECTION (100% DYNAMIC CMS)    */}
{/* ==================================================================== */}
{section.key === "about" && (
  <div className="space-y-6 border-t border-border pt-4 mt-4">
    
    {/* 1. KHỐI CẤU HÌNH SỨ MỆNH (MISSION CONFIG) */}
    <div className="p-4 border border-border rounded-lg bg-muted/10 space-y-4">
      <Label className="text-base font-semibold text-earth flex items-center gap-2">
        <span className="w-1.5 h-4 bg-hope rounded-full"></span> Khối nội dung: Sứ mệnh
      </Label>
      <div className="space-y-3">
        <div>
          <Label className="text-xs">Nội dung Sứ mệnh chính</Label>
          <textarea
            className="w-full h-24 border border-input rounded-md px-3 py-2 text-sm bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={currentData.content?.mission_text || ""}
            onChange={(e) => updateContentNestedField(section.key, "mission_text", e.target.value)}
            placeholder="Nhập nội dung sứ mệnh..."
          />
        </div>
        <div>
          <Label className="text-xs">Câu trích dẫn nghiêng (Mission Quote)</Label>
          <Input
            value={currentData.content?.mission_italic || ""}
            onChange={(e) => updateContentNestedField(section.key, "mission_italic", e.target.value)}
            placeholder='Ví dụ: "Những bước đi nhỏ hôm nay tạo nền tảng cho thành công ngày mai."'
          />
        </div>
      </div>
    </div>

    {/* 2. KHỐI CẤU HÌNH TẦM NHÌN ĐỘNG (VISION ITEMS CONFIG) */}
    <div className="p-4 border border-border rounded-lg bg-muted/10 space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold text-earth flex items-center gap-2">
          <span className="w-1.5 h-4 bg-hope rounded-full"></span> Khối nội dung: Tầm nhìn & Mục tiêu động
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const currentVisionItems = currentData.content?.vision_items || [];
            const newVisionItems = [...currentVisionItems, "Mục tiêu tầm nhìn mới"];
            updateContentNestedField(section.key, "vision_items", newVisionItems);
          }}
        >
          <Plus className="w-4 h-4 mr-1" /> Thêm gạch đầu dòng
        </Button>
      </div>

      <div className="space-y-3">
        {/* Render danh sách các input tương ứng với từng dòng gạch đầu dòng */}
        {(currentData.content?.vision_items || []).map((vItem, vIdx) => (
          <div key={vIdx} className="flex items-center gap-2 bg-card p-2 border border-border rounded">
            <span className="text-xs font-bold text-muted-foreground min-w-[24px] text-center">
              #{vIdx + 1}
            </span>
            <Input
              value={vItem}
              onChange={(e) => {
                const newVisionItems = [...(currentData.content?.vision_items || [])];
                newVisionItems[vIdx] = e.target.value;
                updateContentNestedField(section.key, "vision_items", newVisionItems);
              }}
              placeholder="Nhập dòng mục tiêu tầm nhìn..."
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive hover:bg-destructive/10 shrink-0"
              onClick={() => {
                const newVisionItems = (currentData.content?.vision_items || []).filter((_, idx) => idx !== vIdx);
                updateContentNestedField(section.key, "vision_items", newVisionItems);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <div className="pt-2">
          <Label className="text-xs">Câu trích dẫn nghiêng (Vision Quote)</Label>
          <Input
            value={currentData.content?.vision_italic || ""}
            onChange={(e) => updateContentNestedField(section.key, "vision_italic", e.target.value)}
            placeholder='Ví dụ: "Nâng bước sinh viên Việt vươn xa."'
          />
        </div>
      </div>
    </div>

    {/* 3. KHỐI CẤU HÌNH ĐỘNG 4 GIÁ TRỊ CỐT LÕI (CORE VALUES CONFIG) */}
    <div className="p-4 border border-border rounded-lg bg-muted/10 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-semibold text-earth flex items-center gap-2">
            <span className="w-1.5 h-4 bg-hope rounded-full"></span> Khối nội dung: Giá trị cốt lõi
          </Label>
          <p className="text-xs text-muted-foreground">Tùy biến nhãn hiển thị, nội dung và gán định danh Icon cho hệ thống Grid.</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const currentValues = currentData.content?.values || [];
            const newValues = [...currentValues, { title: "Giá trị mới", description: "Mô tả giá trị", icon: "Heart" }];
            updateContentNestedField(section.key, "values", newValues);
          }}
        >
          <Plus className="w-4 h-4 mr-1" /> Thêm ô giá trị
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(currentData.content?.values || []).map((vCard, vcIdx) => (
          <div key={vcIdx} className="p-4 border border-border rounded bg-card relative space-y-3 shadow-sm">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-destructive w-6 h-6 hover:bg-destructive/10"
              onClick={() => {
                const newValues = (currentData.content?.values || []).filter((_, idx) => idx !== vcIdx);
                updateContentNestedField(section.key, "values", newValues);
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Label className="text-xs font-medium">Tiêu đề giá trị</Label>
                <Input
                  value={vCard.title}
                  onChange={(e) => {
                    const newValues = [...(currentData.content?.values || [])];
                    newValues[vcIdx] = { ...newValues[vcIdx], title: e.target.value };
                    updateContentNestedField(section.key, "values", newValues);
                  }}
                  placeholder="Ví dụ: Sáng tạo"
                />
              </div>
              <div>
                <Label className="text-xs font-medium">Mã Icon Lucide</Label>
                <Input
                  value={vCard.icon || ""}
                  onChange={(e) => {
                    const newValues = [...(currentData.content?.values || [])];
                    newValues[vcIdx] = { ...newValues[vcIdx], icon: e.target.value };
                    updateContentNestedField(section.key, "values", newValues);
                  }}
                  placeholder="Heart, Target,..."
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium">Mô tả chi tiết ngắn</Label>
              <textarea
                className="w-full h-16 border border-input rounded-md px-3 py-1.5 text-sm bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={vCard.description}
                onChange={(e) => {
                  const newValues = [...(currentData.content?.values || [])];
                  newValues[vcIdx] = { ...newValues[vcIdx], description: e.target.value };
                  updateContentNestedField(section.key, "values", newValues);
                }}
                placeholder="Nhập đoạn giải thích ngắn gọn..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
)}

{/* ==================================================================== */}
{/* TESTIMONIALS EDITOR                                                   */}
{/* ==================================================================== */}
{section.key === "testimonials" && (
  <div className="space-y-6 border-t border-border pt-4 mt-4">
    <div className="p-4 border border-border rounded-lg bg-muted/10 space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold text-earth">Danh sách lời chứng thực</Label>
        <Button type="button" variant="outline" size="sm"
          onClick={() => {
            const items = currentData.content?.items || [];
            updateContentNestedField(section.key, "items", [...items, { name: "Tên người", role: "Vai trò", location: "", content: "", avatar: "🌟", rating: 5 }]);
          }}>
          <Plus className="w-4 h-4 mr-1" /> Thêm chứng thực
        </Button>
      </div>
      {(currentData.content?.items || []).map((it: any, idx: number) => (
        <div key={idx} className="p-3 border rounded bg-card space-y-2 relative">
          <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive w-6 h-6"
            onClick={() => {
              const next = (currentData.content?.items || []).filter((_: any, i: number) => i !== idx);
              updateContentNestedField(section.key, "items", next);
            }}><Trash2 className="w-3 h-3" /></Button>
          <div className="grid grid-cols-2 gap-2">
            <Input value={it.name || ""} placeholder="Họ tên"
              onChange={(e) => { const a = [...(currentData.content?.items || [])]; a[idx] = { ...a[idx], name: e.target.value }; updateContentNestedField(section.key, "items", a); }} />
            <Input value={it.role || ""} placeholder="Vai trò"
              onChange={(e) => { const a = [...(currentData.content?.items || [])]; a[idx] = { ...a[idx], role: e.target.value }; updateContentNestedField(section.key, "items", a); }} />
            <Input value={it.location || ""} placeholder="Địa điểm"
              onChange={(e) => { const a = [...(currentData.content?.items || [])]; a[idx] = { ...a[idx], location: e.target.value }; updateContentNestedField(section.key, "items", a); }} />
            <Input value={it.avatar || ""} placeholder="Avatar emoji"
              onChange={(e) => { const a = [...(currentData.content?.items || [])]; a[idx] = { ...a[idx], avatar: e.target.value }; updateContentNestedField(section.key, "items", a); }} />
          </div>
          <textarea className="w-full h-20 border rounded p-2 text-sm bg-background" value={it.content || ""} placeholder="Nội dung chứng thực"
            onChange={(e) => { const a = [...(currentData.content?.items || [])]; a[idx] = { ...a[idx], content: e.target.value }; updateContentNestedField(section.key, "items", a); }} />
        </div>
      ))}
    </div>

    <div className="p-4 border border-border rounded-lg bg-muted/10 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-semibold text-earth">Khối "Tác động" — số liệu</Label>
          <p className="text-xs text-muted-foreground">Hiển thị dưới khối chứng thực.</p>
        </div>
        <Button type="button" variant="outline" size="sm"
          onClick={() => {
            const arr = currentData.content?.impact_stats || [];
            updateContentNestedField(section.key, "impact_stats", [...arr, { value: "0", label: "Nhãn" }]);
          }}><Plus className="w-4 h-4 mr-1" /> Thêm số liệu</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Input value={currentData.content?.impact_title || ""} placeholder="Tiêu đề khối tác động"
          onChange={(e) => updateContentNestedField(section.key, "impact_title", e.target.value)} />
        <Input value={currentData.content?.impact_subtitle || ""} placeholder="Mô tả khối tác động"
          onChange={(e) => updateContentNestedField(section.key, "impact_subtitle", e.target.value)} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {(currentData.content?.impact_stats || []).map((s: any, idx: number) => (
          <div key={idx} className="p-2 border rounded bg-card relative space-y-2">
            <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1 text-destructive w-6 h-6"
              onClick={() => { const arr = (currentData.content?.impact_stats || []).filter((_: any, i: number) => i !== idx); updateContentNestedField(section.key, "impact_stats", arr); }}>
              <Trash2 className="w-3 h-3" />
            </Button>
            <Input value={s.value || ""} placeholder="Giá trị"
              onChange={(e) => { const arr = [...(currentData.content?.impact_stats || [])]; arr[idx] = { ...arr[idx], value: e.target.value }; updateContentNestedField(section.key, "impact_stats", arr); }} />
            <Input value={s.label || ""} placeholder="Nhãn"
              onChange={(e) => { const arr = [...(currentData.content?.impact_stats || [])]; arr[idx] = { ...arr[idx], label: e.target.value }; updateContentNestedField(section.key, "impact_stats", arr); }} />
          </div>
        ))}
      </div>
    </div>
  </div>
)}

{/* ==================================================================== */}
{/* HELP EDITOR                                                            */}
{/* ==================================================================== */}
{section.key === "help" && (
  <div className="space-y-6 border-t border-border pt-4 mt-4">
    <div className="p-4 border border-border rounded-lg bg-muted/10 space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold text-earth">Các phương thức đồng hành</Label>
        <Button type="button" variant="outline" size="sm"
          onClick={() => {
            const m = currentData.content?.methods || [];
            updateContentNestedField(section.key, "methods", [...m, { icon: "Heart", title: "Tiêu đề", description: "Mô tả", features: [], buttonText: "Tham gia", buttonVariant: "hope", bgGradient: "from-hope/10 to-hope-light/20", url: "#contact" }]);
          }}><Plus className="w-4 h-4 mr-1" /> Thêm phương thức</Button>
      </div>
      {(currentData.content?.methods || []).map((m: any, idx: number) => (
        <div key={idx} className="p-3 border rounded bg-card space-y-2 relative">
          <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive w-6 h-6"
            onClick={() => { const arr = (currentData.content?.methods || []).filter((_: any, i: number) => i !== idx); updateContentNestedField(section.key, "methods", arr); }}>
            <Trash2 className="w-3 h-3" /></Button>
          <div className="grid grid-cols-2 gap-2">
            <Input value={m.title || ""} placeholder="Tiêu đề"
              onChange={(e) => { const a = [...(currentData.content?.methods || [])]; a[idx] = { ...a[idx], title: e.target.value }; updateContentNestedField(section.key, "methods", a); }} />
            <Input value={m.icon || ""} placeholder="Icon Lucide (Heart, Clock,...)"
              onChange={(e) => { const a = [...(currentData.content?.methods || [])]; a[idx] = { ...a[idx], icon: e.target.value }; updateContentNestedField(section.key, "methods", a); }} />
          </div>
          <textarea className="w-full h-16 border rounded p-2 text-sm bg-background" value={m.description || ""} placeholder="Mô tả"
            onChange={(e) => { const a = [...(currentData.content?.methods || [])]; a[idx] = { ...a[idx], description: e.target.value }; updateContentNestedField(section.key, "methods", a); }} />
          <textarea className="w-full h-20 border rounded p-2 text-sm bg-background"
            value={(m.features || []).join("\n")} placeholder="Mỗi dòng là 1 tính năng"
            onChange={(e) => { const a = [...(currentData.content?.methods || [])]; a[idx] = { ...a[idx], features: e.target.value.split("\n").filter(Boolean) }; updateContentNestedField(section.key, "methods", a); }} />
          <div className="grid grid-cols-3 gap-2">
            <Input value={m.buttonText || ""} placeholder="Tên nút"
              onChange={(e) => { const a = [...(currentData.content?.methods || [])]; a[idx] = { ...a[idx], buttonText: e.target.value }; updateContentNestedField(section.key, "methods", a); }} />
            <Input value={m.url || ""} placeholder="URL nút"
              onChange={(e) => { const a = [...(currentData.content?.methods || [])]; a[idx] = { ...a[idx], url: e.target.value }; updateContentNestedField(section.key, "methods", a); }} />
            <select className="h-10 border rounded px-2 text-sm bg-background" value={m.buttonVariant || "hope"}
              onChange={(e) => { const a = [...(currentData.content?.methods || [])]; a[idx] = { ...a[idx], buttonVariant: e.target.value }; updateContentNestedField(section.key, "methods", a); }}>
              <option value="hope">hope</option><option value="warm">warm</option><option value="outline">outline</option><option value="default">default</option>
            </select>
          </div>
        </div>
      ))}
    </div>

    <div className="p-4 border border-border rounded-lg bg-muted/10 space-y-2">
      <Label className="text-base font-semibold text-earth">Khối kêu gọi (CTA) cuối section</Label>
      <Input value={currentData.content?.cta?.title || ""} placeholder="Tiêu đề CTA"
        onChange={(e) => updateContentNestedField(section.key, "cta", { ...(currentData.content?.cta || {}), title: e.target.value })} />
      <textarea className="w-full h-20 border rounded p-2 text-sm bg-background" value={currentData.content?.cta?.description || ""} placeholder="Mô tả CTA"
        onChange={(e) => updateContentNestedField(section.key, "cta", { ...(currentData.content?.cta || {}), description: e.target.value })} />
      <div className="grid grid-cols-2 gap-2">
        <Input value={currentData.content?.cta?.primary_label || ""} placeholder="Nhãn nút chính"
          onChange={(e) => updateContentNestedField(section.key, "cta", { ...(currentData.content?.cta || {}), primary_label: e.target.value })} />
        <Input value={currentData.content?.cta?.primary_url || ""} placeholder="URL nút chính"
          onChange={(e) => updateContentNestedField(section.key, "cta", { ...(currentData.content?.cta || {}), primary_url: e.target.value })} />
        <Input value={currentData.content?.cta?.secondary_label || ""} placeholder="Nhãn nút phụ"
          onChange={(e) => updateContentNestedField(section.key, "cta", { ...(currentData.content?.cta || {}), secondary_label: e.target.value })} />
        <Input value={currentData.content?.cta?.secondary_url || ""} placeholder="URL nút phụ"
          onChange={(e) => updateContentNestedField(section.key, "cta", { ...(currentData.content?.cta || {}), secondary_url: e.target.value })} />
      </div>
    </div>
  </div>
)}

{/* ==================================================================== */}
{/* PARTNERS EDITOR                                                        */}
{/* ==================================================================== */}
{section.key === "partners" && (
  <div className="space-y-4 border-t border-border pt-4 mt-4">
    <div className="flex items-center justify-between">
      <Label className="text-base font-semibold text-earth">Danh sách đối tác / logo</Label>
      <Button type="button" variant="outline" size="sm"
        onClick={() => {
          const arr = currentData.content?.logos || [];
          updateContentNestedField(section.key, "logos", [...arr, { name: "Đối tác mới", logo_url: "", link: "#" }]);
        }}><Plus className="w-4 h-4 mr-1" /> Thêm đối tác</Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {(currentData.content?.logos || []).map((p: any, idx: number) => (
        <div key={idx} className="p-3 border rounded bg-card space-y-2 relative">
          <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive w-6 h-6"
            onClick={() => { const arr = (currentData.content?.logos || []).filter((_: any, i: number) => i !== idx); updateContentNestedField(section.key, "logos", arr); }}>
            <Trash2 className="w-3 h-3" /></Button>
          <Input value={p.name || ""} placeholder="Tên đối tác"
            onChange={(e) => { const a = [...(currentData.content?.logos || [])]; a[idx] = { ...a[idx], name: e.target.value }; updateContentNestedField(section.key, "logos", a); }} />
          <Input value={p.link || ""} placeholder="Website (https://...)"
            onChange={(e) => { const a = [...(currentData.content?.logos || [])]; a[idx] = { ...a[idx], link: e.target.value }; updateContentNestedField(section.key, "logos", a); }} />
          <div>
            <Label className="text-xs">Logo</Label>
            <ImageUpload value={p.logo_url || ""} folder={`partners`}
              onChange={(url) => { const a = [...(currentData.content?.logos || [])]; a[idx] = { ...a[idx], logo_url: url }; updateContentNestedField(section.key, "logos", a); }} />
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{/* ==================================================================== */}
{/* NEWSLETTER EDITOR                                                      */}
{/* ==================================================================== */}
{section.key === "newsletter" && (
  <div className="space-y-4 border-t border-border pt-4 mt-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <Input value={currentData.content?.benefits_title || ""} placeholder="Tiêu đề khối lợi ích"
        onChange={(e) => updateContentNestedField(section.key, "benefits_title", e.target.value)} />
      <Input value={currentData.content?.form_title || ""} placeholder="Tiêu đề form đăng ký"
        onChange={(e) => updateContentNestedField(section.key, "form_title", e.target.value)} />
      <Input value={currentData.content?.counter_text || ""} placeholder="Dòng đếm (vd: Hơn 5,000 người...)"
        onChange={(e) => updateContentNestedField(section.key, "counter_text", e.target.value)} />
      <Input value={currentData.content?.counter_subtext || ""} placeholder="Mô tả phụ dòng đếm"
        onChange={(e) => updateContentNestedField(section.key, "counter_subtext", e.target.value)} />
      <Input value={currentData.content?.submit_label || ""} placeholder="Nhãn nút submit"
        onChange={(e) => updateContentNestedField(section.key, "submit_label", e.target.value)} />
      <Input value={currentData.content?.privacy_note || ""} placeholder="Ghi chú bảo mật"
        onChange={(e) => updateContentNestedField(section.key, "privacy_note", e.target.value)} />
    </div>

    <div className="p-4 border rounded-lg bg-muted/10 space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold text-earth">Danh sách lợi ích</Label>
        <Button type="button" variant="outline" size="sm"
          onClick={() => {
            const arr = currentData.content?.benefits || [];
            updateContentNestedField(section.key, "benefits", [...arr, { icon: "Heart", title: "Tiêu đề", description: "Mô tả" }]);
          }}><Plus className="w-4 h-4 mr-1" /> Thêm lợi ích</Button>
      </div>
      {(currentData.content?.benefits || []).map((b: any, idx: number) => (
        <div key={idx} className="p-2 border rounded bg-card space-y-2 relative">
          <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1 text-destructive w-6 h-6"
            onClick={() => { const arr = (currentData.content?.benefits || []).filter((_: any, i: number) => i !== idx); updateContentNestedField(section.key, "benefits", arr); }}>
            <Trash2 className="w-3 h-3" /></Button>
          <div className="grid grid-cols-2 gap-2">
            <Input value={b.title || ""} placeholder="Tiêu đề"
              onChange={(e) => { const a = [...(currentData.content?.benefits || [])]; a[idx] = { ...a[idx], title: e.target.value }; updateContentNestedField(section.key, "benefits", a); }} />
            <Input value={b.icon || ""} placeholder="Icon Lucide"
              onChange={(e) => { const a = [...(currentData.content?.benefits || [])]; a[idx] = { ...a[idx], icon: e.target.value }; updateContentNestedField(section.key, "benefits", a); }} />
          </div>
          <Input value={b.description || ""} placeholder="Mô tả"
            onChange={(e) => { const a = [...(currentData.content?.benefits || [])]; a[idx] = { ...a[idx], description: e.target.value }; updateContentNestedField(section.key, "benefits", a); }} />
        </div>
      ))}
    </div>
  </div>
)}

{/* ==================================================================== */}
{/* FOOTER EDITOR                                                          */}
{/* ==================================================================== */}
{section.key === "footer" && (
  <div className="space-y-4 border-t border-border pt-4 mt-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <Input value={currentData.content?.brand_name || ""} placeholder="Tên thương hiệu"
        onChange={(e) => updateContentNestedField(section.key, "brand_name", e.target.value)} />
      <Input value={currentData.content?.copyright || ""} placeholder="Dòng copyright"
        onChange={(e) => updateContentNestedField(section.key, "copyright", e.target.value)} />
    </div>
    <textarea className="w-full h-20 border rounded p-2 text-sm bg-background"
      value={currentData.content?.description || ""} placeholder="Giới thiệu ngắn"
      onChange={(e) => updateContentNestedField(section.key, "description", e.target.value)} />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <Input value={currentData.content?.phone || ""} placeholder="Điện thoại"
        onChange={(e) => updateContentNestedField(section.key, "phone", e.target.value)} />
      <Input value={currentData.content?.email || ""} placeholder="Email"
        onChange={(e) => updateContentNestedField(section.key, "email", e.target.value)} />
    </div>
    <textarea className="w-full h-16 border rounded p-2 text-sm bg-background"
      value={currentData.content?.address || ""} placeholder="Địa chỉ (xuống dòng để ngắt)"
      onChange={(e) => updateContentNestedField(section.key, "address", e.target.value)} />
    <textarea className="w-full h-16 border rounded p-2 text-sm bg-background"
      value={currentData.content?.hours || ""} placeholder="Giờ làm việc"
      onChange={(e) => updateContentNestedField(section.key, "hours", e.target.value)} />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <Input value={currentData.content?.facebook || ""} placeholder="Facebook URL"
        onChange={(e) => updateContentNestedField(section.key, "facebook", e.target.value)} />
      <Input value={currentData.content?.instagram || ""} placeholder="Instagram URL"
        onChange={(e) => updateContentNestedField(section.key, "instagram", e.target.value)} />
      <Input value={currentData.content?.youtube || ""} placeholder="Youtube URL"
        onChange={(e) => updateContentNestedField(section.key, "youtube", e.target.value)} />
    </div>

    {(["quick_links", "support_links"] as const).map((field) => (
      <div key={field} className="p-3 border rounded bg-muted/10 space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold text-earth">
            {field === "quick_links" ? "Liên kết nhanh" : "Liên kết hỗ trợ"}
          </Label>
          <Button type="button" variant="outline" size="sm"
            onClick={() => {
              const arr = currentData.content?.[field] || [];
              updateContentNestedField(section.key, field, [...arr, { title: "Nhãn", href: "#" }]);
            }}><Plus className="w-4 h-4 mr-1" /> Thêm</Button>
        </div>
        {(currentData.content?.[field] || []).map((l: any, idx: number) => (
          <div key={idx} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
            <Input value={l.title || ""} placeholder="Nhãn"
              onChange={(e) => { const a = [...(currentData.content?.[field] || [])]; a[idx] = { ...a[idx], title: e.target.value }; updateContentNestedField(section.key, field, a); }} />
            <Input value={l.href || ""} placeholder="Đường dẫn"
              onChange={(e) => { const a = [...(currentData.content?.[field] || [])]; a[idx] = { ...a[idx], href: e.target.value }; updateContentNestedField(section.key, field, a); }} />
            <Button type="button" variant="ghost" size="icon" className="text-destructive"
              onClick={() => { const a = (currentData.content?.[field] || []).filter((_: any, i: number) => i !== idx); updateContentNestedField(section.key, field, a); }}>
              <Trash2 className="w-4 h-4" /></Button>
          </div>
        ))}
      </div>
    ))}
  </div>
)}

                  {/* DESCRIPTION */}

                  {!["newsletter", "footer", "partners", "testimonials", "help"].includes(section.key) && (
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