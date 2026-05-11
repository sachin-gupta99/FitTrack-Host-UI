import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  BarChart3,
  Target,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { id: "activities", label: "Activities", icon: <Dumbbell className="h-5 w-5" /> },
  { id: "nutrition", label: "Nutrition", icon: <Utensils className="h-5 w-5" /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-5 w-5" /> },
  { id: "goals", label: "Goals", icon: <Target className="h-5 w-5" /> },
  { id: "fitoai", label: "FitoAI", icon: <MessageCircle className="h-5 w-5" /> },
  { id: "profile", label: "Profile", icon: <User className="h-5 w-5" /> },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeItem: string;
  onSelect: (id: string) => void;
  onLogout: () => void;
}

export default function Sidebar({
  collapsed,
  onToggle,
  activeItem,
  onSelect,
  onLogout,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-l border-zinc-700/50 bg-zinc-900/95 backdrop-blur-sm transition-all duration-300",
        collapsed ? "w-16" : "w-[20vw] min-w-55"
      )}
    >
      {/* Toggle button */}
      <div className="flex items-center justify-between border-b border-zinc-700/50 px-3 py-4">
        {!collapsed && (
          <span className="text-sm font-semibold tracking-wide text-zinc-300 uppercase">
            Menu
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="ml-auto h-8 w-8 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          {collapsed ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-1 px-2 py-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              activeItem === item.id
                ? "bg-emerald-500/15 text-emerald-400"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            )}
          >
            <span className="shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-zinc-700/50 px-2 py-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
