import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: number; label: string };
  icon?: ReactNode;
  status?: "success" | "warning" | "destructive" | "info" | "neutral";
}

const statusBorder = {
  success: "border-l-success",
  warning: "border-l-warning",
  destructive: "border-l-destructive",
  info: "border-l-info",
  neutral: "border-l-muted-foreground",
};

const MetricCard = ({ title, value, subtitle, trend, icon, status = "neutral" }: MetricCardProps) => {
  const TrendIcon = trend && trend.value > 0 ? TrendingUp : trend && trend.value < 0 ? TrendingDown : Minus;
  const trendColor = trend && trend.value > 0 ? "text-success" : trend && trend.value < 0 ? "text-destructive" : "text-muted-foreground";

  return (
    <div className={`glass-card card-hover border-l-2 ${statusBorder[status]} p-3`}>
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.15em]">
            {title}
          </p>
          <p className="text-2xl font-mono font-bold metric-glow tracking-tight">
            {value}
          </p>
          {subtitle && <p className="text-[9px] font-mono text-muted-foreground">{subtitle}</p>}
        </div>
        {icon && (
          <div className="p-1.5 text-primary/40">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className={`mt-2 flex items-center gap-1 text-[10px] font-mono ${trendColor}`}>
          <TrendIcon className="h-2.5 w-2.5" />
          <span>{trend.value > 0 ? "+" : ""}{trend.value}%</span>
          <span className="text-muted-foreground">{trend.label}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
