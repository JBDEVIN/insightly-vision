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
      className={`flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-150 ${
        collapsed ? "w-14" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-sidebar-border px-3 py-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-sidebar-primary">
          <Activity className="h-4 w-4 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-lg font-bold text-sidebar-primary tracking-wider truncate">
              edBLICK
            </h1>
            <p className="text-sm text-sidebar-foreground tracking-wider font-mono">
              TERMINAL v2.1
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {!collapsed && (
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-sidebar-foreground/60 mb-2 px-2">
            ── NAVIGATION ──
          </p>
        )}

        <NavLink to="/" end className={`flex items-center gap-2.5 px-2.5 py-2 text-base font-mono tracking-wide transition-colors ${isExecActive ? "bg-sidebar-primary/15 text-sidebar-primary border-l-2 border-sidebar-primary" : "text-sidebar-foreground hover:text-sidebar-primary border-l-2 border-transparent"}`} activeClassName="">
          <LayoutDashboard className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="truncate">L1 EXEC</span>}
        </NavLink>

        <NavLink to="/portfolio" className={`flex items-center gap-2.5 px-2.5 py-2 text-base font-mono tracking-wide transition-colors ${isPortfolioActive ? "bg-sidebar-primary/15 text-sidebar-primary border-l-2 border-sidebar-primary" : "text-sidebar-foreground hover:text-sidebar-primary border-l-2 border-transparent"}`} activeClassName="">
          <Layers className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="truncate">L2 PORTFOLIO</span>}
        </NavLink>

        {!collapsed ? (
          <div>
            <button onClick={() => setProductsOpen(!productsOpen)} className={`flex w-full items-center gap-2.5 px-2.5 py-2 text-base font-mono tracking-wide transition-colors ${isOnProduct ? "bg-sidebar-primary/15 text-sidebar-primary border-l-2 border-sidebar-primary" : "text-sidebar-foreground hover:text-sidebar-primary border-l-2 border-transparent"}`}>
              <Box className="h-5 w-5 shrink-0" />
              <span className="flex-1 text-left truncate">L3 PRODUCTS</span>
              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${productsOpen ? "" : "-rotate-90"}`} />
            </button>

            {productsOpen && (
              <div className="ml-3 mt-0.5 space-y-0 border-l border-sidebar-border pl-2">
                {products.map((product) => {
                  const productPath = `/product/${product.id}`;
                  const isProductActive = location.pathname === productPath || location.pathname.startsWith(`${productPath}/`);
                  const isExpanded = expandedProduct === product.id;

                  return (
                    <div key={product.id}>
                      <div className="flex items-center">
                        <Link to={productPath} className={`flex-1 block px-2 py-1 text-sm font-mono tracking-wide transition-colors truncate ${isProductActive ? "text-sidebar-primary" : "text-sidebar-foreground/70 hover:text-sidebar-primary"}`}>
                          {product.name}
                        </Link>
                        {product.teams.length > 0 && (
                          <button onClick={() => setExpandedProduct(isExpanded ? null : product.id)} className="p-0.5 text-sidebar-foreground/40 hover:text-sidebar-primary">
                            <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                          </button>
                        )}
                      </div>
                      {isExpanded && (
                        <div className="ml-2 space-y-0 border-l border-sidebar-border/50 pl-2">
                          {product.teams.map((team) => {
                            const teamPath = `/product/${product.id}/team/${team.id}`;
                            const isTeamActive = location.pathname === teamPath;
                            return (
                              <Link key={team.id} to={teamPath} className={`flex items-center gap-1.5 px-1.5 py-1 text-xs font-mono tracking-wide transition-colors ${isTeamActive ? "text-sidebar-primary" : "text-sidebar-foreground/60 hover:text-sidebar-primary"}`}>
                                <Users className="h-3.5 w-3.5 shrink-0" />
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
          <NavLink to={`/product/${products[0].id}`} className={`flex items-center justify-center px-2.5 py-1.5 text-[11px] transition-colors ${isOnProduct ? "text-sidebar-primary" : "text-sidebar-foreground hover:text-sidebar-primary"}`} activeClassName="">
            <Box className="h-3.5 w-3.5" />
          </NavLink>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-2">
        <button onClick={() => setCollapsed(!collapsed)} className="flex w-full items-center justify-center gap-1.5 px-2 py-1.5 text-sm font-mono tracking-wider text-sidebar-foreground/50 hover:text-sidebar-primary transition-colors">
          <ChevronDown className={`h-3 w-3 transition-transform ${collapsed ? "rotate-[-90deg]" : "rotate-90"}`} />
          {!collapsed && <span>COLLAPSE</span>}
        </button>
      </div>
    </aside>
  );
}
