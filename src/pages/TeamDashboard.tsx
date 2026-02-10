import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import ChartPanel from "@/components/ChartPanel";
import StatusBadge from "@/components/StatusBadge";
import { GitCommit, GitPullRequest, MessageSquare, Timer, User } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, ScatterChart, Scatter, ZAxis,
} from "recharts";

const memberData = [
  { name: "Alice", prs: 8, reviews: 12, commits: 34, status: "healthy" as const },
  { name: "Bob", prs: 6, reviews: 9, commits: 28, status: "healthy" as const },
  { name: "Carol", prs: 4, reviews: 15, commits: 22, status: "healthy" as const },
  { name: "Dan", prs: 7, reviews: 5, commits: 31, status: "at-risk" as const },
  { name: "Eve", prs: 3, reviews: 8, commits: 18, status: "healthy" as const },
];

const prAgeData = [
  { name: "< 4h", count: 12 },
  { name: "4-8h", count: 8 },
  { name: "8-24h", count: 5 },
  { name: "1-2d", count: 3 },
  { name: "2d+", count: 1 },
];

const dailyFlow = [
  { day: "Mon", inProgress: 8, inReview: 4, done: 6 },
  { day: "Tue", inProgress: 7, inReview: 5, done: 8 },
  { day: "Wed", inProgress: 9, inReview: 3, done: 7 },
  { day: "Thu", inProgress: 6, inReview: 6, done: 9 },
  { day: "Fri", inProgress: 5, inReview: 4, done: 10 },
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

const TeamDashboard = () => {
  return (
    <DashboardLayout>
      <PageHeader
        level="Level 4"
        title="Team Dashboard"
        description="Detailed team-level metrics, individual contributions, and workflow health"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Team Size" value="5" subtitle="All active" icon={<User className="h-4 w-4" />} status="success" />
        <MetricCard title="Avg PR Size" value="148 LOC" subtitle="Target: < 200" trend={{ value: -15, label: "improving" }} icon={<GitPullRequest className="h-4 w-4" />} status="success" />
        <MetricCard title="Review Time" value="3.2h" subtitle="First review latency" trend={{ value: -22, label: "vs last sprint" }} icon={<Timer className="h-4 w-4" />} status="success" />
        <MetricCard title="Standup Score" value="92%" subtitle="Async participation" icon={<MessageSquare className="h-4 w-4" />} status="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartPanel title="PR Age Distribution" subtitle="Time from open to merge">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={prAgeData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" tick={axisStyle} />
              <YAxis tick={axisStyle} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="count" fill="hsl(140, 70%, 45%)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Daily Flow Metrics" subtitle="Work item state transitions this week">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dailyFlow}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="day" tick={axisStyle} />
              <YAxis tick={axisStyle} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="inProgress" stackId="a" fill="hsl(200, 80%, 55%)" />
              <Bar dataKey="inReview" stackId="a" fill="hsl(38, 90%, 50%)" />
              <Bar dataKey="done" stackId="a" fill="hsl(140, 70%, 45%)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      {/* Team Members Detail */}
      <ChartPanel title="Individual Contributions" subtitle="Current sprint activity per team member">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2.5 px-3 text-[9px] font-medium text-muted-foreground uppercase tracking-wider">Member</th>
                <th className="py-2.5 px-3 text-[9px] font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="py-2.5 px-3 text-[9px] font-medium text-muted-foreground uppercase tracking-wider text-right">PRs Merged</th>
                <th className="py-2.5 px-3 text-[9px] font-medium text-muted-foreground uppercase tracking-wider text-right">Reviews</th>
                <th className="py-2.5 px-3 text-[9px] font-medium text-muted-foreground uppercase tracking-wider text-right">Commits</th>
                <th className="py-2.5 px-3 text-[9px] font-medium text-muted-foreground uppercase tracking-wider">Activity</th>
              </tr>
            </thead>
            <tbody>
              {memberData.map((member) => (
                <tr key={member.name} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-mono text-primary">
                        {member.name[0]}
                      </div>
                      <span className="font-medium text-xs text-foreground">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3"><StatusBadge status={member.status} /></td>
                  <td className="py-2.5 px-3 text-right text-xs">{member.prs}</td>
                  <td className="py-2.5 px-3 text-right text-xs">{member.reviews}</td>
                  <td className="py-2.5 px-3 text-right text-xs">{member.commits}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 10 }).map((_, j) => (
                        <div
                          key={j}
                          className={`h-3 w-3 rounded-sm ${
                            j < Math.floor(member.commits / 4)
                              ? "bg-primary/60"
                              : "bg-secondary"
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartPanel>
    </DashboardLayout>
  );
};

export default TeamDashboard;
