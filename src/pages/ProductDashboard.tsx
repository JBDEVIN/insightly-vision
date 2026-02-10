import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import ChartPanel from "@/components/ChartPanel";
import StatusBadge from "@/components/StatusBadge";
import { Bug, Clock, GitBranch, Rocket, Users } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, ComposedChart,
} from "recharts";
import { getProduct, products } from "@/data/products";

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

const tooltipStyle = {
  contentStyle: {
    background: "hsl(38, 35%, 97%)",
    border: "1px solid hsl(30, 18%, 82%)",
    borderRadius: "6px",
    fontSize: "12px",
    fontFamily: "'IBM Plex Mono', monospace",
    boxShadow: "0 4px 12px rgba(40,30,20,0.08)",
    color: "hsl(20, 20%, 18%)",
  },
  labelStyle: { color: "hsl(20, 20%, 18%)" },
};

const axisStyle = { fill: "hsl(20, 10%, 50%)", fontSize: 11 };
const gridColor = "hsl(30, 15%, 86%)";

const ProductDashboard = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = getProduct(productId || "");

  if (!product) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Product not found.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        level="Level 3"
        title={product.name}
        description={`Engineering metrics and sprint health — ${product.teams.length} team${product.teams.length !== 1 ? "s" : ""}`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Sprint Velocity" value="36 pts" subtitle="Sprint 26 current" trend={{ value: 5.8, label: "vs avg" }} icon={<Rocket className="h-4 w-4" />} status="success" />
        <MetricCard title="Cycle Time" value="2.8d" subtitle="PR open to merge" trend={{ value: -8, label: "improving" }} icon={<Clock className="h-4 w-4" />} status="success" />
        <MetricCard title="Open Defects" value="7" subtitle="2 P1, 5 P2" icon={<Bug className="h-4 w-4" />} status="warning" />
        <MetricCard title="Deploy Freq" value="4.2/wk" subtitle="Change failure: 2.1%" icon={<GitBranch className="h-4 w-4" />} status="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartPanel title="Sprint Burndown" subtitle="Current sprint progress vs ideal">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={burndownData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="day" tick={axisStyle} />
              <YAxis tick={axisStyle} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="ideal" stroke="hsl(30, 15%, 72%)" strokeDasharray="5 5" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="remaining" stroke="hsl(18, 65%, 48%)" strokeWidth={2} dot={{ fill: "hsl(18, 65%, 48%)", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Sprint History" subtitle="Committed vs completed (6 sprints)">
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={sprintData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="sprint" tick={axisStyle} />
              <YAxis tick={axisStyle} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="completed" fill="hsl(18, 65%, 48%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="carryover" fill="hsl(38, 75%, 50%)" radius={[3, 3, 0, 0]} />
              <Line type="monotone" dataKey="committed" stroke="hsl(200, 45%, 45%)" strokeWidth={1.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      {/* Teams Overview */}
      <ChartPanel title="Teams" subtitle={`${product.teams.length} teams in ${product.name}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {product.teams.map((team) => (
            <Link
              key={team.id}
              to={`/product/${product.id}/team/${team.id}`}
              className="flex items-center gap-3 rounded-md border border-border p-3 hover:bg-accent/30 transition-colors group"
            >
              <div className="rounded-md bg-primary/10 border border-primary/15 p-2 text-primary">
                <Users className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{team.name}</p>
                <p className="text-[11px] text-muted-foreground">View team dashboard →</p>
              </div>
            </Link>
          ))}
        </div>
      </ChartPanel>

      {/* Backlog */}
      <div className="mt-4">
        <ChartPanel title="Backlog Composition" subtitle="Current work item breakdown">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: "Stories", count: 24, color: "bg-primary/10 text-primary" },
              { label: "Bugs", count: 7, color: "bg-destructive/10 text-destructive" },
              { label: "Tech Debt", count: 5, color: "bg-warning/10 text-warning" },
              { label: "Spikes", count: 3, color: "bg-info/10 text-info" },
              { label: "Blocked", count: 2, color: "bg-destructive/10 text-destructive" },
            ].map((item) => (
              <div key={item.label} className={`rounded-md border border-border p-3 text-center ${item.color}`}>
                <p className="text-2xl font-bold font-serif">{item.count}</p>
                <p className="text-[11px] font-medium mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </ChartPanel>
      </div>
    </DashboardLayout>
  );
};

export default ProductDashboard;
