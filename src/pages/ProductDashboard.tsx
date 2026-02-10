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

const tooltipStyle = {
  contentStyle: { background: "#fff", border: "2px solid #0d0d0d", borderRadius: "0", fontSize: "11px", fontFamily: "'Space Mono', monospace", boxShadow: "3px 3px 0 #0d0d0d", color: "#0d0d0d" },
  labelStyle: { color: "#0d0d0d", fontWeight: 700 },
};

const axisStyle = { fill: "#666", fontSize: 10, fontFamily: "'Space Mono', monospace" };
const gridColor = "#e0e0e0";

const ProductDashboard = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = getProduct(productId || "");

  if (!product) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="font-mono text-muted-foreground uppercase">Product not found.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader level="Level 3" title={product.name} description={`Engineering metrics — ${product.teams.length} team${product.teams.length !== 1 ? "s" : ""}`} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Sprint Velocity" value="36 pts" subtitle="Sprint 26" trend={{ value: 5.8, label: "vs avg" }} icon={<Rocket className="h-4 w-4" />} status="success" />
        <MetricCard title="Cycle Time" value="2.8d" subtitle="PR to merge" trend={{ value: -8, label: "improving" }} icon={<Clock className="h-4 w-4" />} status="success" />
        <MetricCard title="Open Defects" value="7" subtitle="2 P1, 5 P2" icon={<Bug className="h-4 w-4" />} status="warning" />
        <MetricCard title="Deploy Freq" value="4.2/wk" subtitle="Failure: 2.1%" icon={<GitBranch className="h-4 w-4" />} status="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartPanel title="Sprint Burndown" subtitle="Progress vs ideal">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={burndownData}>
              <CartesianGrid stroke={gridColor} />
              <XAxis dataKey="day" tick={axisStyle} />
              <YAxis tick={axisStyle} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="ideal" stroke="#ccc" strokeDasharray="5 5" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="remaining" stroke="#0d0d0d" strokeWidth={2.5} dot={{ fill: "#0d0d0d", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Sprint History" subtitle="Committed vs completed (6 sprints)">
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={sprintData}>
              <CartesianGrid stroke={gridColor} />
              <XAxis dataKey="sprint" tick={axisStyle} />
              <YAxis tick={axisStyle} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="completed" fill="#0d0d0d" />
              <Bar dataKey="carryover" fill="hsl(45, 100%, 45%)" />
              <Line type="monotone" dataKey="committed" stroke="hsl(0, 85%, 50%)" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <ChartPanel title="Teams" subtitle={`${product.teams.length} teams`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {product.teams.map((team) => (
            <Link key={team.id} to={`/product/${product.id}/team/${team.id}`} className="flex items-center gap-3 border-2 border-foreground/20 p-3 hover:border-foreground hover:shadow-[3px_3px_0_#0d0d0d] transition-all group">
              <div className="border-2 border-foreground p-2 text-foreground">
                <Users className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold uppercase truncate">{team.name}</p>
                <p className="text-[10px] font-mono text-muted-foreground uppercase">VIEW TEAM →</p>
              </div>
            </Link>
          ))}
        </div>
      </ChartPanel>

      <div className="mt-4">
        <ChartPanel title="Backlog" subtitle="Work items">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: "STORIES", count: 24, color: "border-foreground" },
              { label: "BUGS", count: 7, color: "border-destructive" },
              { label: "DEBT", count: 5, color: "border-warning" },
              { label: "SPIKES", count: 3, color: "border-info" },
              { label: "BLOCKED", count: 2, color: "border-destructive" },
            ].map((item) => (
              <div key={item.label} className={`border-2 ${item.color} p-3 text-center`}>
                <p className="text-3xl font-black font-mono">{item.count}</p>
                <p className="text-[9px] font-mono font-bold mt-1 tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </ChartPanel>
      </div>
    </DashboardLayout>
  );
};

export default ProductDashboard;
