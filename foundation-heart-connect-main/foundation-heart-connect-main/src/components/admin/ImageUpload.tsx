import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const POSITION_OPTIONS = [
  { value: "center", label: "Giữa" },
  { value: "top", label: "Trên" },
  { value: "bottom", label: "Dưới" },
  { value: "left", label: "Trái" },
  { value: "right", label: "Phải" },
];

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  position?: string;
  onPositionChange?: (position: string) => void;
  showPosition?: boolean;
}

const ImageUpload = ({ value, onChange, folder = "uploads", position = "center", onPositionChange, showPosition = false }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("images").upload(fileName, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(fileName);
      onChange(publicUrl);
      toast({ title: "Upload thành công!" });
    } catch (error: any) {
      toast({ title: "Upload thất bại", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-border">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48"
            style={{ objectFit: "cover", objectPosition: position }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => fileInputRef.current?.click()}>
              Đổi ảnh
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onChange("")}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-hope/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Click để upload ảnh</p>
        </div>
      )}

      {showPosition && value && onPositionChange && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Vị trí ảnh:</span>
          <Select value={position} onValueChange={onPositionChange}>
            <SelectTrigger className="w-32 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {POSITION_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      {uploading && <p className="text-sm text-hope">Đang upload...</p>}
    </div>
  );
};

export default ImageUpload;
