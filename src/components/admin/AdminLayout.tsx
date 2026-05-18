import { useEffect, useState } from "react";
import { useNavigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, FileText, FolderOpen, LogOut, ChevronLeft, Menu, X, Sparkles,
} from "lucide-react";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Tổng quan", end: true },
  { to: "/admin/sections", icon: FileText, label: "Nội dung Sections" },
  { to: "/admin/projects", icon: FolderOpen, label: "Quản lý Dự án" },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warmth-soft via-background to-warmth-soft">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-hope/20 border-t-hope" />
          <p className="text-sm text-muted-foreground">Đang tải bảng điều khiển...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const currentPage = navItems.find((n) => n.end ? location.pathname === n.to : location.pathname.startsWith(n.to));
  const initial = (user.email || "A").charAt(0).toUpperCase();

  const Sidebar = (
    <aside className="w-72 h-full bg-card/95 backdrop-blur-xl border-r border-border/60 flex flex-col shrink-0 relative">
      {/* Decorative glow */}
      <div className="absolute -top-24 -left-10 w-48 h-48 rounded-full bg-hope/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-10 w-40 h-40 rounded-full bg-warmth/20 blur-3xl pointer-events-none" />

      {/* Brand */}
      <div className="relative p-6 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-hope to-hope-light flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-black text-earth tracking-tight">FFVN Studio</h1>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="relative flex-1 p-4 space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70 px-3 mb-2">
          Quản lý
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-hope to-hope-light text-white shadow-glow translate-x-0.5"
                  : "text-muted-foreground hover:bg-hope/5 hover:text-earth hover:translate-x-0.5"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
                    isActive ? "bg-white/20" : "bg-muted group-hover:bg-hope/10"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                </span>
                <span className="flex-1">{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User card */}
      <div className="relative p-4 border-t border-border/60 space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-warmth-soft/60 to-warmth-soft/30 border border-border/40">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-earth to-earth-dark flex items-center justify-center text-white text-sm font-bold shadow-soft">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-earth truncate">{user.email}</p>
            <p className="text-[10px] text-hope font-medium">● Administrator</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="w-3.5 h-3.5 mr-1" />
            Trang chủ
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive px-3"
            onClick={signOut}
            title="Đăng xuất"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-warmth-soft/40 via-background to-warmth-soft/30">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">{Sidebar}</div>

      {/* Mobile Sidebar Drawer */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${mobileOpen ? "visible" : "invisible pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-earth-dark/60 backdrop-blur-sm transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />
        <div className={`absolute top-0 left-0 h-full transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          {Sidebar}
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/60">
          <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 h-16">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>FFVN Studio</span>
                <span>/</span>
                <span className="text-earth font-semibold">{currentPage?.label || "Admin"}</span>
              </div>
              <h2 className="text-sm font-bold text-earth hidden sm:block">
                {currentPage?.label || "Bảng điều khiển"}
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-hope/10 text-hope font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-hope animate-pulse" />
                Live
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
