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

const tooltipStyle = {
  contentStyle: { background: "#fff", border: "2px solid #0d0d0d", borderRadius: "0", fontSize: "11px", fontFamily: "'Space Mono', monospace", boxShadow: "3px 3px 0 #0d0d0d", color: "#0d0d0d" },
  labelStyle: { color: "#0d0d0d", fontWeight: 700 },
};

const axisStyle = { fill: "#666", fontSize: 10, fontFamily: "'Space Mono', monospace" };
const gridColor = "#e0e0e0";

const TeamDashboard = () => {
  const { productId, teamId } = useParams<{ productId: string; teamId: string }>();
  const result = getTeam(productId || "", teamId || "");

  if (!result) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="font-mono text-muted-foreground uppercase">Team not found.</p>
        </div>
      </DashboardLayout>
    );
  }

  const { product, team } = result;

  return (
    <DashboardLayout>
      <div className="mb-2">
        <Link to={`/product/${product.id}`} className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3 w-3" />
          {product.name}
        </Link>
      </div>
      <PageHeader level="Level 4" title={team.name} description={`Team metrics — ${product.name}`} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Team Size" value="5" subtitle="All active" icon={<User className="h-4 w-4" />} status="success" />
        <MetricCard title="Avg PR Size" value="148 LOC" subtitle="Target: < 200" trend={{ value: -15, label: "improving" }} icon={<GitPullRequest className="h-4 w-4" />} status="success" />
        <MetricCard title="Review Time" value="3.2h" subtitle="First review" trend={{ value: -22, label: "vs last sprint" }} icon={<Timer className="h-4 w-4" />} status="success" />
        <MetricCard title="Standup" value="92%" subtitle="Async participation" icon={<MessageSquare className="h-4 w-4" />} status="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartPanel title="PR Age" subtitle="Open to merge">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={prAgeData}>
              <CartesianGrid stroke={gridColor} />
              <XAxis dataKey="name" tick={axisStyle} />
              <YAxis tick={axisStyle} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="count" fill="#0d0d0d" />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="Daily Flow" subtitle="State transitions this week">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dailyFlow}>
              <CartesianGrid stroke={gridColor} />
              <XAxis dataKey="day" tick={axisStyle} />
              <YAxis tick={axisStyle} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="inProgress" stackId="a" fill="hsl(220, 70%, 45%)" />
              <Bar dataKey="inReview" stackId="a" fill="hsl(45, 100%, 45%)" />
              <Bar dataKey="done" stackId="a" fill="hsl(120, 50%, 30%)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <ChartPanel title="Contributions" subtitle="Sprint activity per member">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="border-b-2 border-foreground text-left">
                <th className="py-2.5 px-3 text-[9px] font-bold uppercase tracking-wider">Member</th>
                <th className="py-2.5 px-3 text-[9px] font-bold uppercase tracking-wider">Status</th>
                <th className="py-2.5 px-3 text-[9px] font-bold uppercase tracking-wider text-right">PRs</th>
                <th className="py-2.5 px-3 text-[9px] font-bold uppercase tracking-wider text-right">Reviews</th>
                <th className="py-2.5 px-3 text-[9px] font-bold uppercase tracking-wider text-right">Commits</th>
                <th className="py-2.5 px-3 text-[9px] font-bold uppercase tracking-wider">Activity</th>
              </tr>
            </thead>
            <tbody>
              {memberData.map((member) => (
                <tr key={member.name} className="border-b border-foreground/20 hover:bg-foreground/5 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 border-2 border-foreground flex items-center justify-center text-[10px] font-bold">
                        {member.name[0]}
                      </div>
                      <span className="font-bold text-xs uppercase">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3"><StatusBadge status={member.status} /></td>
                  <td className="py-2.5 px-3 text-right text-xs">{member.prs}</td>
                  <td className="py-2.5 px-3 text-right text-xs">{member.reviews}</td>
                  <td className="py-2.5 px-3 text-right text-xs">{member.commits}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 10 }).map((_, j) => (
                        <div key={j} className={`h-3 w-3 ${j < Math.floor(member.commits / 4) ? "bg-foreground" : "bg-secondary border border-foreground/20"}`} />
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
