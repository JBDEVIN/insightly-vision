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
              <Radar name="Score" dataKey="score" stroke="hsl(18, 65%, 48%)" fill="hsl(18, 65%, 48%, 0.12)" strokeWidth={2} />
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
              <Bar dataKey="capacity" fill="hsl(30, 15%, 82%)" radius={[0, 3, 3, 0]} />
              <Bar dataKey="utilization" fill="hsl(18, 65%, 48%)" radius={[0, 3, 3, 0]} />
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
            <div key={i} className="flex items-center justify-between rounded-md bg-accent/30 border border-border px-4 py-3">
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
