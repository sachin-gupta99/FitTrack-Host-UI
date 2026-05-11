import { lazy, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { removeToken } from "@/utils";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";

// ──────────────────────────────────────────────────────
// Register remote micro-frontends here.
// Use lazy() with a STATIC import string so the
// federation plugin can rewrite it at build time.
//
// Example:
//   const WorkoutApp = lazy(() => import("workoutApp/App"));
// ──────────────────────────────────────────────────────
const ContentApp = lazy(() => import("ContentMF/ContentMF"));

// Menu items handled by the ContentMF remote
const contentMFRoutes = new Set(["activities", "dashboard", "nutrition", "analytics", "goals", "profile", "fitoai"]);

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const { menuItem } = useParams<{ menuItem?: string }>();
  const activeItem = menuItem || "dashboard";
  const {userData} = useUserStore();
  const navigate = useNavigate();

  const handleMenuSelect = (id: string) => {
    navigate(`/${id}`, { replace: true });
  };

  const handleLogout = () => {
    removeToken();
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-screen bg-zinc-950">
      {/* Main content area — renders remote if registered, else placeholder */}
      <MainContent
        activeMenu={activeItem}
        remoteComponent={contentMFRoutes.has(activeItem) ? ContentApp : undefined}
        userId={userData?.userId || 0}
      />

      {/* Right-side sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        activeItem={activeItem}
        onSelect={handleMenuSelect}
        onLogout={handleLogout}
      />
    </div>
  );
}
