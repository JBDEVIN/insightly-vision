import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import ChartPanel from "@/components/ChartPanel";
import { Bug, Clock, GitBranch, Rocket, Users } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, ComposedChart,
} from "recharts";
import { getProduct } from "@/data/products";

const sprintData = [
  { sprint: "S21", committed: 34, completed: 32, carryover: 2 },
  { sprint: "S22", committed: 36, completed: 35, carryover: 1 },
  { sprint: "S23", committed: 38, completed: 34, carryover: 4 },
  { sprint: "S24", committed: 35, completed: 35, carryover: 0 },
  { sprint: "S25", committed: 40, completed: 37, carryover: 3 },
  { sprint: "S26", committed: 38, completed: 36, carryover: 2 },
];

const burndownData = [
  { day: "D1", remaining: 38, ideal: 38 },
  { day: "D2", remaining: 35, ideal: 34.2 },
  { day: "D3", remaining: 30, ideal: 30.4 },
  { day: "D4", remaining: 28, ideal: 26.6 },
  { day: "D5", remaining: 22, ideal: 22.8 },
  { day: "D6", remaining: 18, ideal: 19 },
  { day: "D7", remaining: 14, ideal: 15.2 },
  { day: "D8", remaining: 10, ideal: 11.4 },
  { day: "D9", remaining: 6, ideal: 7.6 },
  { day: "D10", remaining: 2, ideal: 3.8 },
];

const tt = {
  contentStyle: {
    background: "hsl(0, 0%, 100%)",
    border: "1px solid hsl(220, 14%, 85%)",
    borderRadius: "2px",
    fontSize: "14px",
    fontFamily: "'JetBrains Mono', monospace",
    color: "hsl(220, 20%, 15%)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  labelStyle: { color: "hsl(210, 85%, 45%)", fontWeight: 600 },
};

const ax = { fill: "hsl(220, 10%, 40%)", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" };
const gc = "hsl(220, 14%, 90%)";

const ProductDashboard = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = getProduct(productId || "");

  if (!product) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="font-mono text-muted-foreground">Product not found.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader level="Level 3" title={product.name} description={`Engineering metrics — ${product.teams.length} team${product.teams.length !== 1 ? "s" : ""}`} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <MetricCard title="Sprint Velocity" value="36 pts" subtitle="Sprint 26" trend={{ value: 5.8, label: "vs avg" }} icon={<Rocket className="h-4 w-4" />} status="success" />
        <MetricCard title="Cycle Time" value="2.8d" subtitle="PR to merge" trend={{ value: -8, label: "improving" }} icon={<Clock className="h-4 w-4" />} status="success" />
        <MetricCard title="Open Defects" value="7" subtitle="2 P1, 5 P2" icon={<Bug className="h-4 w-4" />} status="warning" />
        <MetricCard title="Deploy Freq" value="4.2/wk" subtitle="Failure: 2.1%" icon={<GitBranch className="h-4 w-4" />} status="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <ChartPanel title="Sprint Burndown" subtitle="Progress vs ideal">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={burndownData}>
              <CartesianGrid stroke={gc} strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={ax} />
              <YAxis tick={ax} />
              <Tooltip {...tt} />
              <Line type="monotone" dataKey="ideal" stroke="hsl(220, 14%, 75%)" strokeDasharray="4 4" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="remaining" stroke="hsl(210, 85%, 45%)" strokeWidth={2} dot={{ fill: "hsl(210, 85%, 45%)", r: 2.5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Sprint History" subtitle="Committed vs completed (6 sprints)">
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={sprintData}>
              <CartesianGrid stroke={gc} strokeDasharray="3 3" />
              <XAxis dataKey="sprint" tick={ax} />
              <YAxis tick={ax} />
              <Tooltip {...tt} />
              <Bar dataKey="completed" fill="hsl(210, 85%, 45%)" fillOpacity={0.8} />
              <Bar dataKey="carryover" fill="hsl(42, 90%, 45%)" fillOpacity={0.7} />
              <Line type="monotone" dataKey="committed" stroke="hsl(160, 60%, 38%)" strokeWidth={1.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <ChartPanel title="Teams" subtitle={`${product.teams.length} teams`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {product.teams.map((team) => (
            <Link key={team.id} to={`/product/${product.id}/team/${team.id}`} className="flex items-center gap-2.5 border border-border p-2.5 hover:border-primary/40 transition-all group">
              <div className="p-1.5 text-primary/50 group-hover:text-primary transition-colors">
                <Users className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono text-card-foreground truncate">{team.name}</p>
                <p className="text-[10px] font-mono text-muted-foreground">VIEW →</p>
              </div>
            </Link>
          ))}
        </div>
      </ChartPanel>

      <div className="mt-3">
        <ChartPanel title="Backlog" subtitle="Work items">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[
              { label: "STORIES", count: 24, color: "border-primary/40" },
              { label: "BUGS", count: 7, color: "border-destructive/40" },
              { label: "DEBT", count: 5, color: "border-warning/40" },
              { label: "SPIKES", count: 3, color: "border-info/40" },
              { label: "BLOCKED", count: 2, color: "border-destructive/60" },
            ].map((item) => (
              <div key={item.label} className={`border ${item.color} p-2.5 text-center bg-secondary/30`}>
                <p className="text-2xl font-mono font-bold text-primary">{item.count}</p>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5 tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </ChartPanel>
      </div>
    </DashboardLayout>
  );
};

export default ProductDashboard;
