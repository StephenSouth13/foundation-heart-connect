import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Eye, EyeOff, ExternalLink, GripVertical } from "lucide-react";
import type { Project } from "./ProjectForm";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  onReorder: (projects: Project[]) => void;
}

const SortableProjectCard = ({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project.id!,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 0,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="flex items-center gap-4 p-4">
          <button
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground shrink-0 touch-none"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-5 h-5" />
          </button>
          {project.image_url ? (
            <img src={project.image_url} alt={project.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <span className="text-2xl">📁</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-earth truncate">{project.title}</h3>
            <p className="text-sm text-muted-foreground truncate">/du-an/{project.slug}</p>
            <div className="flex items-center gap-2 mt-1">
              {project.published ? (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Đã xuất bản
                </span>
              ) : (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                  <EyeOff className="w-3 h-3" /> Bản nháp
                </span>
              )}
              {project.category && (
                <span className="text-xs bg-hope/10 text-hope px-2 py-0.5 rounded-full">{project.category}</span>
              )}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            {project.published && (
              <a href={`/du-an/${project.slug}`} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" title="Xem trang">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            )}
            <Button variant="outline" size="sm" onClick={() => onEdit(project)}>Sửa</Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(project.id!)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProjectList = ({ projects, onEdit, onCreate, onDelete, onReorder }: ProjectListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p.id === active.id);
    const newIndex = projects.findIndex((p) => p.id === over.id);
    const reordered = arrayMove(projects, oldIndex, newIndex);
    onReorder(reordered);
  };

  const projectIds = projects.map((p) => p.id!);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-earth">Quản lý dự án</h1>
          <p className="text-sm text-muted-foreground mt-1">Kéo thả để sắp xếp thứ tự hiển thị trên trang chủ</p>
        </div>
        <Button onClick={onCreate} className="bg-hope hover:bg-hope/90 text-white">
          <Plus className="w-4 h-4 mr-2" /> Tạo dự án mới
        </Button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={projectIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {projects.map((p) => (
              <SortableProjectCard key={p.id} project={p} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {projects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Chưa có dự án nào. Hãy tạo dự án đầu tiên!</p>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
