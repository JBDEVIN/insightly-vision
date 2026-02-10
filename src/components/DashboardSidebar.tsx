import {
  BarChart3,
  Layers,
  LayoutDashboard,
  Box,
  Users,
  ChevronDown,
  Activity,
  Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const navLevels = [
  {
    label: "L1 — Executive",
    icon: LayoutDashboard,
    path: "/",
    description: "Strategic overview",
  },
  {
    label: "L2 — Portfolio",
    icon: Layers,
    path: "/portfolio",
    description: "Cross-product metrics",
  },
  {
    label: "L3 — Product",
    icon: Box,
    path: "/product",
    description: "10 product dashboards",
  },
  {
    label: "L4 — Team",
    icon: Users,
    path: "/team",
    description: "Team-level detail",
  },
];

export function DashboardSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary">
          <Activity className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-semibold text-sidebar-accent-foreground truncate">
              DevMetrics
            </h1>
            <p className="text-[10px] text-sidebar-foreground uppercase tracking-wide">
              KPI Dashboard
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <p className={`text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3 ${collapsed ? "text-center" : "px-3"}`}>
          {collapsed ? "—" : "Dashboard Levels"}
        </p>
        {navLevels.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              activeClassName=""
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && (
                <div className="overflow-hidden">
                  <span className="block truncate font-medium">{item.label}</span>
                  <span className="block truncate text-[10px] text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${collapsed ? "rotate-[-90deg]" : "rotate-90"}`}
          />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
