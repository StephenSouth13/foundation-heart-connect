import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import LinkExt from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

const extensions = [
  StarterKit, Image, LinkExt, Underline, Highlight,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Table, TableRow, TableCell, TableHeader,
];

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: any;
  image_url: string;
  category: string;
  stats: string;
  created_at: string;
}

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      setProject(data as any);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hope" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold text-earth mb-4">Không tìm thấy dự án</h1>
          <p className="text-muted-foreground mb-8">Dự án bạn tìm kiếm không tồn tại hoặc chưa được xuất bản.</p>
          <Link to="/#projects">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const htmlContent = project.content ? generateHTML(project.content, extensions) : "";

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero banner */}
      {project.image_url && (
        <div className="relative h-[50vh] min-h-[400px]">
          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="container mx-auto">
              {project.category && (
                <span className="inline-flex items-center gap-1.5 bg-hope text-white px-3 py-1 rounded-full text-sm mb-4">
                  <Tag className="w-3.5 h-3.5" />
                  {project.category}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{project.title}</h1>
              {project.stats && (
                <p className="text-white/80 text-lg">{project.stats}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <article className="container mx-auto px-6 py-12 max-w-4xl">
        {!project.image_url && (
          <>
            <Link to="/#projects" className="inline-flex items-center text-hope hover:underline mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại dự án
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-earth mb-4">{project.title}</h1>
          </>
        )}

        {project.image_url && (
          <Link to="/#projects" className="inline-flex items-center text-hope hover:underline mb-8">
            <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại dự án
          </Link>
        )}

        {project.description && (
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{project.description}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(project.created_at).toLocaleDateString("vi-VN", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </span>
        </div>

        {htmlContent && (
          <div
            className="prose prose-lg max-w-none prose-headings:text-earth prose-a:text-hope prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}
      </article>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default ProjectDetail;
