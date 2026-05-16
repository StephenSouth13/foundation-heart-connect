import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, FileText, Users } from "lucide-react";

const Dashboard = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [sectionCount, setSectionCount] = useState(0);

  useEffect(() => {
    supabase.from("projects").select("id", { count: "exact", head: true }).then(({ count }) => setProjectCount(count ?? 0));
    supabase.from("section_contents").select("id", { count: "exact", head: true }).then(({ count }) => setSectionCount(count ?? 0));
  }, []);

  const stats = [
    { label: "Dự án", value: projectCount, icon: FolderOpen, color: "text-hope" },
    { label: "Sections", value: sectionCount, icon: FileText, color: "text-green-600" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-earth mb-8">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-earth">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
