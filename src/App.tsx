import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import PortfolioDashboard from "./pages/PortfolioDashboard";
import ProductDashboard from "./pages/ProductDashboard";
import TeamDashboard from "./pages/TeamDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExecutiveDashboard />} />
          <Route path="/portfolio" element={<PortfolioDashboard />} />
          <Route path="/product" element={<Navigate to="/product/platform-core" replace />} />
          <Route path="/product/:productId" element={<ProductDashboard />} />
          <Route path="/product/:productId/team/:teamId" element={<TeamDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
