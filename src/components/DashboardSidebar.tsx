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
      className={`flex flex-col border-r-2 border-sidebar-border bg-sidebar transition-all duration-100 ${
        collapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b-2 border-sidebar-border px-4 py-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-sidebar-primary bg-sidebar-primary">
          <Activity className="h-4 w-4 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-black text-sidebar-primary uppercase tracking-widest truncate">
              DEVMETRICS
            </h1>
            <p className="text-[10px] text-sidebar-foreground uppercase tracking-wider font-mono">
              KPI DASHBOARD
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {!collapsed && (
          <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-sidebar-foreground mb-3 px-3">
            NAV
          </p>
        )}

        {/* L1 */}
        <NavLink to="/" end className={`flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors border-2 ${isExecActive ? "bg-sidebar-primary text-sidebar-primary-foreground border-sidebar-primary" : "text-sidebar-foreground border-transparent hover:border-sidebar-foreground/30"}`} activeClassName="">
          <LayoutDashboard className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="truncate">L1 — EXEC</span>}
        </NavLink>

        {/* L2 */}
        <NavLink to="/portfolio" className={`flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors border-2 ${isPortfolioActive ? "bg-sidebar-primary text-sidebar-primary-foreground border-sidebar-primary" : "text-sidebar-foreground border-transparent hover:border-sidebar-foreground/30"}`} activeClassName="">
          <Layers className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="truncate">L2 — PORTFOLIO</span>}
        </NavLink>

        {/* L3 — Products */}
        {!collapsed ? (
          <div>
            <button onClick={() => setProductsOpen(!productsOpen)} className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors border-2 ${isOnProduct ? "bg-sidebar-primary text-sidebar-primary-foreground border-sidebar-primary" : "text-sidebar-foreground border-transparent hover:border-sidebar-foreground/30"}`}>
              <Box className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left truncate">L3 — PRODUCTS</span>
              <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform ${productsOpen ? "" : "-rotate-90"}`} />
            </button>

            {productsOpen && (
              <div className="ml-4 mt-1 space-y-0 border-l-2 border-sidebar-border pl-3">
                {products.map((product) => {
                  const productPath = `/product/${product.id}`;
                  const isProductActive = location.pathname === productPath || location.pathname.startsWith(`${productPath}/`);
                  const isExpanded = expandedProduct === product.id;

                  return (
                    <div key={product.id}>
                      <div className="flex items-center">
                        <Link to={productPath} className={`flex-1 block px-2.5 py-1.5 text-xs font-mono uppercase tracking-wide transition-colors truncate ${isProductActive ? "text-sidebar-primary font-bold" : "text-sidebar-foreground hover:text-sidebar-primary"}`}>
                          {product.name}
                        </Link>
                        {product.teams.length > 0 && (
                          <button onClick={() => setExpandedProduct(isExpanded ? null : product.id)} className="p-1 text-sidebar-foreground/50 hover:text-sidebar-primary">
                            <ChevronRight className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                          </button>
                        )}
                      </div>
                      {isExpanded && (
                        <div className="ml-3 mt-0 space-y-0 border-l-2 border-sidebar-border/50 pl-2.5">
                          {product.teams.map((team) => {
                            const teamPath = `/product/${product.id}/team/${team.id}`;
                            const isTeamActive = location.pathname === teamPath;
                            return (
                              <Link key={team.id} to={teamPath} className={`flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono uppercase tracking-wide transition-colors ${isTeamActive ? "text-sidebar-primary font-bold" : "text-sidebar-foreground/60 hover:text-sidebar-primary"}`}>
                                <Users className="h-3 w-3 shrink-0" />
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
          <NavLink to={`/product/${products[0].id}`} className={`flex items-center justify-center px-3 py-2.5 text-sm transition-colors border-2 ${isOnProduct ? "bg-sidebar-primary text-sidebar-primary-foreground border-sidebar-primary" : "text-sidebar-foreground border-transparent hover:border-sidebar-foreground/30"}`} activeClassName="">
            <Box className="h-4 w-4" />
          </NavLink>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t-2 border-sidebar-border p-3">
        <button onClick={() => setCollapsed(!collapsed)} className="flex w-full items-center justify-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider text-sidebar-foreground hover:text-sidebar-primary transition-colors">
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${collapsed ? "rotate-[-90deg]" : "rotate-90"}`} />
          {!collapsed && <span>COLLAPSE</span>}
        </button>
      </div>
    </aside>
  );
}
