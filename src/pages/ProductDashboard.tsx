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
    background: "hsl(220, 18%, 10%)",
    border: "1px solid hsl(140, 20%, 18%)",
    borderRadius: "4px",
    fontSize: "11px",
    fontFamily: "'JetBrains Mono', monospace",
    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
    color: "hsl(140, 60%, 80%)",
  },
  labelStyle: { color: "hsl(140, 60%, 80%)" },
};

const axisStyle = { fill: "hsl(200, 10%, 48%)", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" };
const gridColor = "hsl(140, 15%, 14%)";

const ProductDashboard = () => {
  const [selected, setSelected] = useState(0);

  return (
    <DashboardLayout>
      <PageHeader
        level="Level 3"
        title="Product Dashboard"
        description="Individual product engineering metrics and sprint health"
      />

      {/* Project Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {projects.map((p, i) => (
          <button
            key={p}
            onClick={() => setSelected(i)}
            className={`rounded px-3 py-1.5 text-[10px] font-mono font-medium transition-colors border ${
              i === selected
                ? "bg-primary/15 text-primary border-primary/30"
                : "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80"
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
              <Line type="monotone" dataKey="ideal" stroke="hsl(200, 10%, 35%)" strokeDasharray="5 5" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="remaining" stroke="hsl(140, 70%, 45%)" strokeWidth={2} dot={{ fill: "hsl(140, 70%, 45%)", r: 3 }} />
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
              <Bar dataKey="completed" fill="hsl(140, 70%, 45%)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="carryover" fill="hsl(38, 90%, 50%)" radius={[2, 2, 0, 0]} />
              <Line type="monotone" dataKey="committed" stroke="hsl(200, 80%, 55%)" strokeWidth={1.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      {/* Backlog Health */}
      <ChartPanel title="Backlog Composition" subtitle="Current work item breakdown">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Stories", count: 24, color: "bg-primary/15 text-primary border-primary/20" },
            { label: "Bugs", count: 7, color: "bg-destructive/15 text-destructive border-destructive/20" },
            { label: "Tech Debt", count: 5, color: "bg-warning/15 text-warning border-warning/20" },
            { label: "Spikes", count: 3, color: "bg-info/15 text-info border-info/20" },
            { label: "Blocked", count: 2, color: "bg-destructive/15 text-destructive border-destructive/20" },
          ].map((item) => (
            <div key={item.label} className={`rounded border p-3 text-center ${item.color}`}>
              <p className="text-2xl font-bold font-mono">{item.count}</p>
              <p className="text-[9px] font-mono font-medium mt-1 uppercase tracking-wider">{item.label}</p>
            </div>
          ))}
        </div>
      </ChartPanel>
    </DashboardLayout>
  );
};

export default ProductDashboard;
