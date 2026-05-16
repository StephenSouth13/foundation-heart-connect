// D:\FF Foundation\foundation-heart-connect\src\contexts\AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Hàm helper đọc role từ app_metadata của JWT thay vì query Database
  const extractAdminStatus = (currentSession: Session | null): boolean => {
    if (!currentSession?.user) return false;
    
    // Đọc trường custom claim 'user_role' mà trigger DB đã ghi vào JWT mã hóa
    const role = currentSession.user.app_metadata?.user_role;
    return role === "admin";
  };

  useEffect(() => {
    let mounted = true;

    // 1. Thiết lập Listener lắng nghe trạng thái thay đổi Auth thực thời
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!mounted) return;
        
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setIsAdmin(extractAdminStatus(newSession));
        setLoading(false);
      }
    );

    // 2. Khôi phục session từ LocalStorage khi khởi chạy ứng dụng (F5 trang)
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (!mounted) return;
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsAdmin(extractAdminStatus(currentSession));
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};