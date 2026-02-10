import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import ChartPanel from "@/components/ChartPanel";
import StatusBadge from "@/components/StatusBadge";
import { BarChart3, Clock, GitBranch, Shield, Target, Zap } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
} from "recharts";

const velocityData = [
  { month: "Aug", planned: 42, delivered: 38 },
  { month: "Sep", planned: 45, delivered: 44 },
  { month: "Oct", planned: 48, delivered: 46 },
  { month: "Nov", planned: 50, delivered: 52 },
  { month: "Dec", planned: 47, delivered: 45 },
  { month: "Jan", planned: 52, delivered: 50 },
];

const qualityData = [
  { month: "Aug", bugs: 24, resolved: 22 },
  { month: "Sep", bugs: 18, resolved: 20 },
  { month: "Oct", bugs: 15, resolved: 17 },
  { month: "Nov", bugs: 12, resolved: 14 },
  { month: "Dec", bugs: 20, resolved: 18 },
  { month: "Jan", bugs: 10, resolved: 12 },
];

const deploymentData = [
  { week: "W1", deploys: 12, failures: 1 },
  { week: "W2", deploys: 15, failures: 0 },
  { week: "W3", deploys: 18, failures: 2 },
  { week: "W4", deploys: 14, failures: 1 },
];

const healthDistribution = [
  { name: "Healthy", value: 6, color: "hsl(120, 50%, 30%)" },
  { name: "At Risk", value: 3, color: "hsl(45, 100%, 45%)" },
  { name: "Critical", value: 1, color: "hsl(0, 85%, 50%)" },
];

const tooltipStyle = {
  contentStyle: {
    background: "#fff",
    border: "2px solid #0d0d0d",
    borderRadius: "0",
    fontSize: "11px",
    fontFamily: "'Space Mono', monospace",
    boxShadow: "3px 3px 0 #0d0d0d",
    color: "#0d0d0d",
  },
  labelStyle: { color: "#0d0d0d", fontWeight: 700 },
};

const axisStyle = { fill: "#666", fontSize: 10, fontFamily: "'Space Mono', monospace" };
const gridColor = "#e0e0e0";

const ExecutiveDashboard = () => {
  return (
    <DashboardLayout>
      <PageHeader level="Level 1" title="Executive Overview" description="High-level engineering health across all products and teams" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Delivery Velocity" value="96%" subtitle="Sprint commitment ratio" trend={{ value: 4.2, label: "vs last quarter" }} icon={<Zap className="h-4 w-4" />} status="success" />
        <MetricCard title="Lead Time" value="3.2d" subtitle="Commit to production" trend={{ value: -12, label: "improving" }} icon={<Clock className="h-4 w-4" />} status="success" />
        <MetricCard title="Quality Score" value="94.1" subtitle="Composite quality index" trend={{ value: 2.1, label: "vs last month" }} icon={<Shield className="h-4 w-4" />} status="success" />
        <MetricCard title="Active Projects" value="10" subtitle="3 at-risk, 1 critical" icon={<Target className="h-4 w-4" />} status="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <ChartPanel title="Delivery Velocity" subtitle="Planned vs delivered (6mo)" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={velocityData}>
              <CartesianGrid stroke={gridColor} />
              <XAxis dataKey="month" tick={axisStyle} />
              <YAxis tick={axisStyle} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="planned" stroke="#999" fill="#eee" strokeWidth={1.5} />
              <Area type="monotone" dataKey="delivered" stroke="#0d0d0d" fill="rgba(13,13,13,0.08)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Project Health" subtitle="10 projects">
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={healthDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" strokeWidth={2} stroke="#0d0d0d">
                  {healthDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {healthDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-muted-foreground uppercase">
                <span className="h-3 w-3 border-2 border-foreground" style={{ background: item.color }} />
                {item.name} ({item.value})
              </div>
            ))}
          </div>
        </ChartPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartPanel title="Quality Trend" subtitle="Bugs vs resolved (6mo)">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={qualityData}>
              <CartesianGrid stroke={gridColor} />
              <XAxis dataKey="month" tick={axisStyle} />
              <YAxis tick={axisStyle} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="bugs" stroke="hsl(0, 85%, 50%)" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="resolved" stroke="hsl(120, 50%, 30%)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Deploy Frequency" subtitle="Weekly deploys & failures">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deploymentData}>
              <CartesianGrid stroke={gridColor} />
              <XAxis dataKey="week" tick={axisStyle} />
              <YAxis tick={axisStyle} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="deploys" fill="#0d0d0d" />
              <Bar dataKey="failures" fill="hsl(0, 85%, 50%)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <ChartPanel title="Project Status" subtitle="All 10 active projects">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="border-b-2 border-foreground text-left">
                <th className="py-2.5 px-3 text-[9px] font-bold text-foreground uppercase tracking-wider">Project</th>
                <th className="py-2.5 px-3 text-[9px] font-bold text-foreground uppercase tracking-wider">Status</th>
                <th className="py-2.5 px-3 text-[9px] font-bold text-foreground uppercase tracking-wider text-right">Vel.</th>
                <th className="py-2.5 px-3 text-[9px] font-bold text-foreground uppercase tracking-wider text-right">Lead</th>
                <th className="py-2.5 px-3 text-[9px] font-bold text-foreground uppercase tracking-wider text-right">Qual.</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Platform Core", status: "healthy" as const, velocity: "98%", lead: "2.1d", quality: "97" },
                { name: "Mobile App", status: "at-risk" as const, velocity: "82%", lead: "4.5d", quality: "89" },
                { name: "Data Pipeline", status: "healthy" as const, velocity: "95%", lead: "3.0d", quality: "94" },
                { name: "Auth Service", status: "healthy" as const, velocity: "100%", lead: "1.8d", quality: "99" },
                { name: "Analytics Engine", status: "critical" as const, velocity: "68%", lead: "6.2d", quality: "78" },
                { name: "API Gateway", status: "healthy" as const, velocity: "96%", lead: "2.4d", quality: "96" },
                { name: "Admin Portal", status: "at-risk" as const, velocity: "85%", lead: "4.1d", quality: "88" },
                { name: "Notification Svc", status: "healthy" as const, velocity: "94%", lead: "2.8d", quality: "93" },
                { name: "Search Platform", status: "at-risk" as const, velocity: "80%", lead: "5.0d", quality: "85" },
                { name: "Billing System", status: "healthy" as const, velocity: "97%", lead: "2.2d", quality: "95" },
              ].map((project) => (
                <tr key={project.name} className="border-b border-foreground/20 hover:bg-foreground/5 transition-colors">
                  <td className="py-2.5 px-3 text-xs font-bold uppercase">{project.name}</td>
                  <td className="py-2.5 px-3"><StatusBadge status={project.status} /></td>
                  <td className="py-2.5 px-3 text-right text-xs">{project.velocity}</td>
                  <td className="py-2.5 px-3 text-right text-xs">{project.lead}</td>
                  <td className="py-2.5 px-3 text-right text-xs">{project.quality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartPanel>
    </DashboardLayout>
  );
};

export default ExecutiveDashboard;
