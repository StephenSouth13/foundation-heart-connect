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