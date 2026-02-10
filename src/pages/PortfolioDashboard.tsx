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

const tt = {
  contentStyle: {
    background: "hsl(220, 18%, 10%)",
    border: "1px solid hsl(220, 15%, 22%)",
    borderRadius: "2px",
    fontSize: "12px",
    fontFamily: "'JetBrains Mono', monospace",
    color: "hsl(40, 15%, 80%)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  },
  labelStyle: { color: "hsl(200, 80%, 62%)", fontWeight: 600 },
};

const ax = { fill: "hsl(220, 10%, 50%)", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" };
const gc = "hsl(220, 15%, 16%)";

const PortfolioDashboard = () => {
  return (
    <DashboardLayout>
      <PageHeader level="Level 2" title="Portfolio Overview" description="Cross-product engineering metrics and resource allocation" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <MetricCard title="Portfolio Velocity" value="91%" trend={{ value: 3.1, label: "vs target" }} icon={<TrendingUp className="h-4 w-4" />} status="success" />
        <MetricCard title="Dependencies" value="14" subtitle="7 resolved this sprint" icon={<Layers className="h-4 w-4" />} status="warning" />
        <MetricCard title="Open PRs" value="38" subtitle="Avg age: 1.4 days" icon={<GitPullRequest className="h-4 w-4" />} status="info" />
        <MetricCard title="Utilization" value="86%" subtitle="Across all teams" icon={<BarChart3 className="h-4 w-4" />} status="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <ChartPanel title="Health Radar" subtitle="6 dimensions">
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={gc} />
              <PolarAngleAxis dataKey="metric" tick={{ ...ax, fontSize: 11 }} />
              <PolarRadiusAxis tick={{ ...ax, fontSize: 10 }} domain={[0, 100]} />
              <Radar name="Score" dataKey="score" stroke="hsl(200, 80%, 62%)" fill="hsl(200, 80%, 62%)" fillOpacity={0.12} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Capacity vs Utilization" subtitle="Current sprint">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={teamCapacity} layout="vertical">
              <CartesianGrid stroke={gc} strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} tick={ax} />
              <YAxis dataKey="team" type="category" tick={ax} width={55} />
              <Tooltip {...tt} />
              <Bar dataKey="capacity" fill="hsl(220, 15%, 22%)" />
              <Bar dataKey="utilization" fill="hsl(200, 80%, 62%)" fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <ChartPanel title="Cross-Product Dependencies" subtitle="Active blockers">
        <div className="space-y-1">
          {[
            { from: "Mobile App", to: "API Gateway", type: "Blocker", status: "critical" as const, desc: "Auth endpoint v2 migration" },
            { from: "Analytics Engine", to: "Data Pipeline", type: "Dependency", status: "at-risk" as const, desc: "Event schema alignment" },
            { from: "Search Platform", to: "Platform Core", type: "Dependency", status: "at-risk" as const, desc: "Index rebuild API" },
            { from: "Admin Portal", to: "Auth Service", type: "Blocker", status: "on-track" as const, desc: "SSO integration" },
          ].map((dep, i) => (
            <div key={i} className="flex items-center justify-between border border-border px-3 py-2 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-card-foreground">{dep.from}</span>
                <span className="text-primary text-xs">→</span>
                <span className="font-mono text-xs text-card-foreground">{dep.to}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-muted-foreground">{dep.desc}</span>
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
