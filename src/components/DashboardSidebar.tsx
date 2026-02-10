import {
  Layers,
  LayoutDashboard,
  Box,
  Users,
  ChevronDown,
  ChevronRight,
  Activity,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "@/data/products";

export function DashboardSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Auto-expand product nav if on a product or team route
  const isOnProduct = location.pathname.startsWith("/product");
  const [productsOpen, setProductsOpen] = useState(isOnProduct);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(() => {
    const match = location.pathname.match(/^\/product\/([^/]+)/);
    return match ? match[1] : null;
  });

  const isExecActive = location.pathname === "/";
  const isPortfolioActive = location.pathname.startsWith("/portfolio");

  return (
    <aside
      className={`flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200 ${
        collapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary/20 border border-sidebar-primary/30">
          <Activity className="h-4 w-4 text-sidebar-primary" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-sidebar-accent-foreground font-serif truncate">
              DevMetrics
            </h1>
            <p className="text-[10px] text-sidebar-foreground tracking-wide">
              KPI Dashboard
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {!collapsed && (
          <p className="text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/60 mb-3 px-3">
            Dashboard Levels
          </p>
        )}

        {/* L1 — Executive */}
        <NavLink
          to="/"
          end
          className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
            isExecActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          }`}
          activeClassName=""
        >
          <LayoutDashboard className="h-4 w-4 shrink-0" />
          {!collapsed && (
            <div className="overflow-hidden">
              <span className="block truncate font-medium">L1 — Executive</span>
              <span className="block truncate text-[10px] opacity-60">Strategic overview</span>
            </div>
          )}
        </NavLink>

        {/* L2 — Portfolio */}
        <NavLink
          to="/portfolio"
          className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
            isPortfolioActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          }`}
          activeClassName=""
        >
          <Layers className="h-4 w-4 shrink-0" />
          {!collapsed && (
            <div className="overflow-hidden">
              <span className="block truncate font-medium">L2 — Portfolio</span>
              <span className="block truncate text-[10px] opacity-60">Cross-product metrics</span>
            </div>
          )}
        </NavLink>

        {/* L3 — Products (expandable) */}
        {!collapsed ? (
          <div>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                isOnProduct
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              }`}
            >
              <Box className="h-4 w-4 shrink-0" />
              <div className="flex-1 overflow-hidden text-left">
                <span className="block truncate font-medium">L3 — Products</span>
                <span className="block truncate text-[10px] opacity-60">10 product dashboards</span>
              </div>
              <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform ${productsOpen ? "" : "-rotate-90"}`} />
            </button>

            {productsOpen && (
              <div className="ml-4 mt-1 space-y-0.5 border-l border-sidebar-border pl-3">
                {products.map((product) => {
                  const productPath = `/product/${product.id}`;
                  const isProductActive = location.pathname === productPath || location.pathname.startsWith(`${productPath}/`);
                  const isExpanded = expandedProduct === product.id;

                  return (
                    <div key={product.id}>
                      <div className="flex items-center">
                        <Link
                          to={productPath}
                          className={`flex-1 block rounded-md px-2.5 py-1.5 text-xs transition-colors truncate ${
                            isProductActive
                              ? "text-sidebar-accent-foreground font-medium"
                              : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
                          }`}
                        >
                          {product.name}
                        </Link>
                        {product.teams.length > 0 && (
                          <button
                            onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                            className="p-1 text-sidebar-foreground/50 hover:text-sidebar-accent-foreground"
                          >
                            <ChevronRight className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                          </button>
                        )}
                      </div>

                      {isExpanded && (
                        <div className="ml-3 mt-0.5 space-y-0.5 border-l border-sidebar-border/50 pl-2.5">
                          {product.teams.map((team) => {
                            const teamPath = `/product/${product.id}/team/${team.id}`;
                            const isTeamActive = location.pathname === teamPath;

                            return (
                              <Link
                                key={team.id}
                                to={teamPath}
                                className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] transition-colors ${
                                  isTeamActive
                                    ? "text-sidebar-accent-foreground font-medium"
                                    : "text-sidebar-foreground/70 hover:text-sidebar-accent-foreground"
                                }`}
                              >
                                <Users className="h-3 w-3 shrink-0 opacity-60" />
                                <span className="truncate">{team.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to={`/product/${products[0].id}`}
            className={`flex items-center justify-center rounded-md px-3 py-2.5 text-sm transition-colors ${
              isOnProduct
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
            }`}
            activeClassName=""
          >
            <Box className="h-4 w-4" />
          </NavLink>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-xs text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-colors"
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
