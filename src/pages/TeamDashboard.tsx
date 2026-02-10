import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import ChartPanel from "@/components/ChartPanel";
import StatusBadge from "@/components/StatusBadge";
import { GitPullRequest, MessageSquare, Timer, User, ArrowLeft } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getTeam } from "@/data/products";

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

const tt = {
  contentStyle: {
    background: "hsl(0, 0%, 100%)",
    border: "1px solid hsl(220, 14%, 85%)",
    borderRadius: "2px",
    fontSize: "14px",
    fontFamily: "'JetBrains Mono', monospace",
    color: "hsl(220, 20%, 15%)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  labelStyle: { color: "hsl(210, 85%, 45%)", fontWeight: 600 },
};

const ax = { fill: "hsl(220, 10%, 40%)", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" };
const gc = "hsl(220, 14%, 90%)";

const TeamDashboard = () => {
  const { productId, teamId } = useParams<{ productId: string; teamId: string }>();
  const result = getTeam(productId || "", teamId || "");

  if (!result) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="font-mono text-muted-foreground">Team not found.</p>
        </div>
      </DashboardLayout>
    );
  }

  const { product, team } = result;

  return (
    <DashboardLayout>
      <div className="mb-1">
        <Link to={`/product/${product.id}`} className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-3 w-3" />
          {product.name}
        </Link>
      </div>
      <PageHeader level="Level 3" title={team.name} description={`Team metrics — ${product.name}`} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <MetricCard title="Team Size" value="5" subtitle="All active" icon={<User className="h-4 w-4" />} status="success" />
        <MetricCard title="Avg PR Size" value="148 LOC" subtitle="Target: < 200" trend={{ value: -15, label: "improving" }} icon={<GitPullRequest className="h-4 w-4" />} status="success" />
        <MetricCard title="Review Time" value="3.2h" subtitle="First review" trend={{ value: -22, label: "vs last sprint" }} icon={<Timer className="h-4 w-4" />} status="success" />
        <MetricCard title="Standup" value="92%" subtitle="Async participation" icon={<MessageSquare className="h-4 w-4" />} status="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <ChartPanel title="PR Age" subtitle="Open to merge">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={prAgeData}>
              <CartesianGrid stroke={gc} strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={ax} />
              <YAxis tick={ax} />
              <Tooltip {...tt} />
              <Bar dataKey="count" fill="hsl(210, 85%, 45%)" fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Daily Flow" subtitle="State transitions this week">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyFlow}>
              <CartesianGrid stroke={gc} strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={ax} />
              <YAxis tick={ax} />
              <Tooltip {...tt} />
              <Bar dataKey="inProgress" stackId="a" fill="hsl(210, 85%, 45%)" fillOpacity={0.8} />
              <Bar dataKey="inReview" stackId="a" fill="hsl(42, 90%, 45%)" fillOpacity={0.7} />
              <Bar dataKey="done" stackId="a" fill="hsl(160, 60%, 38%)" fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <ChartPanel title="Contributions" subtitle="Sprint activity per member">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 px-2 text-[10px] text-muted-foreground uppercase tracking-wider">Member</th>
                <th className="py-2 px-2 text-[10px] text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="py-2 px-2 text-[10px] text-muted-foreground uppercase tracking-wider text-right">PRs</th>
                <th className="py-2 px-2 text-[10px] text-muted-foreground uppercase tracking-wider text-right">Reviews</th>
                <th className="py-2 px-2 text-[10px] text-muted-foreground uppercase tracking-wider text-right">Commits</th>
                <th className="py-2 px-2 text-[10px] text-muted-foreground uppercase tracking-wider">Activity</th>
              </tr>
            </thead>
            <tbody>
              {memberData.map((member) => (
                <tr key={member.name} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                  <td className="py-1.5 px-2">
                    <div className="flex items-center gap-1.5">
                      <div className="h-6 w-6 bg-secondary flex items-center justify-center text-[11px] font-bold text-primary">
                        {member.name[0]}
                      </div>
                      <span className="text-card-foreground">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-1.5 px-2"><StatusBadge status={member.status} /></td>
                  <td className="py-1.5 px-2 text-right text-primary">{member.prs}</td>
                  <td className="py-1.5 px-2 text-right">{member.reviews}</td>
                  <td className="py-1.5 px-2 text-right">{member.commits}</td>
                  <td className="py-1.5 px-2">
                    <div className="flex gap-px">
                      {Array.from({ length: 10 }).map((_, j) => (
                        <div key={j} className={`h-2.5 w-2.5 ${j < Math.floor(member.commits / 4) ? "bg-primary/70" : "bg-secondary"}`} />
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
