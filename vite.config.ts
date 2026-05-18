import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Tăng giới hạn cảnh báo kích thước chunk lên 1000kB cho các hệ thống CMS lớn
    chunkSizeWarningLimit: 1000,
    
    // Tách nhỏ các thư viện lớn để tối ưu hóa tốc độ tải trang chủ (Code-Splitting)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Tách riêng icon của lucide
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }
            // Tách riêng lõi kết nối Supabase database
            if (id.includes("@supabase")) {
              return "vendor-supabase";
            }
            // Tách riêng trình soạn thảo văn bản TipTap ở trang Admin
            if (id.includes("@tiptap")) {
              return "vendor-editor";
            }
            // Gom các thư viện phụ trợ còn lại (React, Radix UI, TanStack Query...) vào một chunk core
            return "vendor-core";
          }
        },
      },
    },
  },
}));