import {
  LayoutDashboard,
  Sparkles,
  Users,
  Building2,
  Target,
  MapPin,
  ListChecks,
  Workflow,
  BarChart3,
  BookOpen,
  Bot,
  Plug,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "BOOST", to: "/boost", icon: Sparkles },
  { label: "Clients", to: "/clients", icon: Users },
  { label: "Businesses", to: "/businesses", icon: Building2 },
  { label: "Leads", to: "/leads", icon: Target },
  { label: "GBP", to: "/gbp", icon: MapPin },
  { label: "Tasks", to: "/tasks", icon: ListChecks },
  { label: "Workflows", to: "/workflows", icon: Workflow },
  { label: "Reports", to: "/reports", icon: BarChart3 },
  { label: "Knowledge", to: "/knowledge", icon: BookOpen },
  { label: "Agents", to: "/agents", icon: Bot },
  { label: "Integrations", to: "/integrations", icon: Plug },
  { label: "Settings", to: "/settings", icon: Settings },
];
