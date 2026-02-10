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

const statusStyles = {
  success: "border-l-success",
  warning: "border-l-warning",
  destructive: "border-l-destructive",
  info: "border-l-info",
  neutral: "border-l-muted-foreground",
};

const MetricCard = ({ title, value, subtitle, trend, icon, status = "neutral" }: MetricCardProps) => {
  const TrendIcon =
    trend && trend.value > 0 ? TrendingUp : trend && trend.value < 0 ? TrendingDown : Minus;

  const trendColor =
    trend && trend.value > 0 ? "text-success" : trend && trend.value < 0 ? "text-destructive" : "text-muted-foreground";

  return (
    <div className={`glass-card card-hover border-l-2 ${statusStyles[status]} p-4`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
          <p className="text-2xl font-bold font-serif metric-glow tracking-tight">
            {value}
          </p>
          {subtitle && (
            <p className="text-[11px] text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="rounded-md bg-primary/8 border border-primary/15 p-2 text-primary">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className={`mt-3 flex items-center gap-1.5 text-xs ${trendColor}`}>
          <TrendIcon className="h-3 w-3" />
          <span className="font-mono font-medium">
            {trend.value > 0 ? "+" : ""}{trend.value}%
          </span>
          <span className="text-muted-foreground">{trend.label}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
