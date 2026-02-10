import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import ChartPanel from "@/components/ChartPanel";
import StatusBadge from "@/components/StatusBadge";
import { Bug, Clock, GitBranch, Rocket } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, ComposedChart,
} from "recharts";

const projects = [
  "Platform Core", "Mobile App", "Data Pipeline", "Auth Service", "Analytics Engine",
  "API Gateway", "Admin Portal", "Notification Svc", "Search Platform", "Billing System",
];

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
    background: "hsl(230, 20%, 16%)",
    border: "1px solid hsl(230, 15%, 25%)",
    borderRadius: "8px",
    fontSize: "12px",
    fontFamily: "'DM Mono', monospace",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    color: "hsl(220, 20%, 92%)",
  },
  labelStyle: { color: "hsl(220, 20%, 92%)" },
};

const axisStyle = { fill: "hsl(220, 10%, 55%)", fontSize: 11 };
const gridColor = "hsl(230, 15%, 22%)";

const ProductDashboard = () => {
  const [selected, setSelected] = useState(0);

  return (
    <DashboardLayout>
      <PageHeader level="Level 3" title="Product Dashboard" description="Individual product engineering metrics and sprint health" />

      <div className="flex flex-wrap gap-2 mb-6">
        {projects.map((p, i) => (
          <button
            key={p}
            onClick={() => setSelected(i)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 border backdrop-blur-sm ${
              i === selected
                ? "bg-primary/15 text-primary border-primary/25 shadow-sm shadow-primary/10"
                : "bg-secondary/40 text-secondary-foreground border-border/40 hover:bg-secondary/60"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

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
              <Line type="monotone" dataKey="ideal" stroke="hsl(220, 15%, 40%)" strokeDasharray="5 5" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="remaining" stroke="hsl(260, 80%, 65%)" strokeWidth={2} dot={{ fill: "hsl(260, 80%, 65%)", r: 3 }} />
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
              <Bar dataKey="completed" fill="hsl(260, 80%, 65%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="carryover" fill="hsl(40, 85%, 55%)" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="committed" stroke="hsl(200, 75%, 55%)" strokeWidth={1.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <ChartPanel title="Backlog Composition" subtitle="Current work item breakdown">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Stories", count: 24, color: "bg-primary/15 text-primary border-primary/20" },
            { label: "Bugs", count: 7, color: "bg-destructive/15 text-destructive border-destructive/20" },
            { label: "Tech Debt", count: 5, color: "bg-warning/15 text-warning border-warning/20" },
            { label: "Spikes", count: 3, color: "bg-info/15 text-info border-info/20" },
            { label: "Blocked", count: 2, color: "bg-destructive/15 text-destructive border-destructive/20" },
          ].map((item) => (
            <div key={item.label} className={`rounded-lg border backdrop-blur-sm p-3 text-center ${item.color}`}>
              <p className="text-2xl font-bold font-mono">{item.count}</p>
              <p className="text-[11px] font-medium mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </ChartPanel>
    </DashboardLayout>
  );
};

export default ProductDashboard;
