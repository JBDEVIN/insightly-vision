import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import ChartPanel from "@/components/ChartPanel";
import StatusBadge from "@/components/StatusBadge";
import { BarChart3, GitPullRequest, Layers, TrendingUp } from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

const radarData = [
  { metric: "Velocity", score: 92 },
  { metric: "Quality", score: 88 },
  { metric: "Reliability", score: 95 },
  { metric: "Throughput", score: 85 },
  { metric: "Efficiency", score: 90 },
  { metric: "Predictability", score: 78 },
];

const teamCapacity = [
  { team: "Core", capacity: 95, utilization: 88 },
  { team: "Mobile", capacity: 80, utilization: 92 },
  { team: "Data", capacity: 90, utilization: 78 },
  { team: "Auth", capacity: 85, utilization: 82 },
  { team: "Analytics", capacity: 70, utilization: 95 },
];

const tooltipStyle = {
  contentStyle: { background: "#fff", border: "2px solid #0d0d0d", borderRadius: "0", fontSize: "11px", fontFamily: "'Space Mono', monospace", boxShadow: "3px 3px 0 #0d0d0d", color: "#0d0d0d" },
  labelStyle: { color: "#0d0d0d", fontWeight: 700 },
};

const axisStyle = { fill: "#666", fontSize: 10, fontFamily: "'Space Mono', monospace" };
const gridColor = "#e0e0e0";

const PortfolioDashboard = () => {
  return (
    <DashboardLayout>
      <PageHeader level="Level 2" title="Portfolio Overview" description="Cross-product engineering metrics and resource allocation" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Portfolio Velocity" value="91%" trend={{ value: 3.1, label: "vs target" }} icon={<TrendingUp className="h-4 w-4" />} status="success" />
        <MetricCard title="Dependencies" value="14" subtitle="7 resolved this sprint" icon={<Layers className="h-4 w-4" />} status="warning" />
        <MetricCard title="Open PRs" value="38" subtitle="Avg age: 1.4 days" icon={<GitPullRequest className="h-4 w-4" />} status="info" />
        <MetricCard title="Utilization" value="86%" subtitle="Across all teams" icon={<BarChart3 className="h-4 w-4" />} status="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartPanel title="Health Radar" subtitle="6 dimensions">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={gridColor} />
              <PolarAngleAxis dataKey="metric" tick={{ ...axisStyle, fontSize: 10 }} />
              <PolarRadiusAxis tick={{ ...axisStyle, fontSize: 9 }} domain={[0, 100]} />
              <Radar name="Score" dataKey="score" stroke="#0d0d0d" fill="rgba(13,13,13,0.08)" strokeWidth={2.5} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Capacity vs Utilization" subtitle="Current sprint">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={teamCapacity} layout="vertical">
              <CartesianGrid stroke={gridColor} />
              <XAxis type="number" domain={[0, 100]} tick={axisStyle} />
              <YAxis dataKey="team" type="category" tick={axisStyle} width={60} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="capacity" fill="#ddd" />
              <Bar dataKey="utilization" fill="#0d0d0d" />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <ChartPanel title="Cross-Product Dependencies" subtitle="Active blockers">
        <div className="space-y-2">
          {[
            { from: "Mobile App", to: "API Gateway", type: "Blocker", status: "critical" as const, desc: "Auth endpoint v2 migration" },
            { from: "Analytics Engine", to: "Data Pipeline", type: "Dependency", status: "at-risk" as const, desc: "Event schema alignment" },
            { from: "Search Platform", to: "Platform Core", type: "Dependency", status: "at-risk" as const, desc: "Index rebuild API" },
            { from: "Admin Portal", to: "Auth Service", type: "Blocker", status: "on-track" as const, desc: "SSO integration" },
          ].map((dep, i) => (
            <div key={i} className="flex items-center justify-between border-2 border-foreground/20 px-4 py-3 hover:border-foreground transition-colors">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase">{dep.from}</span>
                <span className="text-foreground text-xs font-bold">→</span>
                <span className="font-mono text-xs font-bold uppercase">{dep.to}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-muted-foreground">{dep.desc}</span>
                <StatusBadge status={dep.status} label={dep.type} />
              </div>
            </div>
          ))}
        </div>
      </ChartPanel>
    </DashboardLayout>
  );
};

export default PortfolioDashboard;
