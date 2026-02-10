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

const PortfolioDashboard = () => {
  return (
    <DashboardLayout>
      <PageHeader level="Level 2" title="Portfolio Overview" description="Cross-product engineering metrics and resource allocation" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Portfolio Velocity" value="91%" trend={{ value: 3.1, label: "vs target" }} icon={<TrendingUp className="h-4 w-4" />} status="success" />
        <MetricCard title="Cross-team Dependencies" value="14" subtitle="7 resolved this sprint" icon={<Layers className="h-4 w-4" />} status="warning" />
        <MetricCard title="Open PRs" value="38" subtitle="Avg age: 1.4 days" icon={<GitPullRequest className="h-4 w-4" />} status="info" />
        <MetricCard title="Resource Utilization" value="86%" subtitle="Across all teams" icon={<BarChart3 className="h-4 w-4" />} status="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartPanel title="Engineering Health Radar" subtitle="Composite scores across 6 dimensions">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={gridColor} />
              <PolarAngleAxis dataKey="metric" tick={{ ...axisStyle, fontSize: 11 }} />
              <PolarRadiusAxis tick={{ ...axisStyle, fontSize: 10 }} domain={[0, 100]} />
              <Radar name="Score" dataKey="score" stroke="hsl(260, 80%, 65%)" fill="hsl(260, 80%, 65%, 0.15)" strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Team Capacity vs Utilization" subtitle="Current sprint allocation">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={teamCapacity} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis type="number" domain={[0, 100]} tick={axisStyle} />
              <YAxis dataKey="team" type="category" tick={axisStyle} width={60} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="capacity" fill="hsl(220, 15%, 30%)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="utilization" fill="hsl(260, 80%, 65%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <ChartPanel title="Cross-Product Dependencies" subtitle="Active inter-team blockers and dependencies">
        <div className="space-y-3">
          {[
            { from: "Mobile App", to: "API Gateway", type: "Blocker", status: "critical" as const, desc: "Auth endpoint v2 migration" },
            { from: "Analytics Engine", to: "Data Pipeline", type: "Dependency", status: "at-risk" as const, desc: "Event schema alignment" },
            { from: "Search Platform", to: "Platform Core", type: "Dependency", status: "at-risk" as const, desc: "Index rebuild API" },
            { from: "Admin Portal", to: "Auth Service", type: "Blocker", status: "on-track" as const, desc: "SSO integration" },
          ].map((dep, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-secondary/40 backdrop-blur-sm border border-border/40 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-primary">{dep.from}</span>
                <span className="text-muted-foreground text-xs">→</span>
                <span className="font-mono text-xs text-foreground">{dep.to}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{dep.desc}</span>
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
