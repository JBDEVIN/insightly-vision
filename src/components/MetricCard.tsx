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
  const TrendIcon = trend && trend.value > 0 ? TrendingUp : trend && trend.value < 0 ? TrendingDown : Minus;
  const trendColor = trend && trend.value > 0 ? "text-success" : trend && trend.value < 0 ? "text-destructive" : "text-muted-foreground";

  return (
    <div className={`glass-card card-hover border-l-4 ${statusStyles[status]} p-4`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[0.15em]">
            {title}
          </p>
          <p className="text-3xl font-black font-mono metric-glow tracking-tighter">
            {value}
          </p>
          {subtitle && <p className="text-[10px] font-mono text-muted-foreground">{subtitle}</p>}
        </div>
        {icon && (
          <div className="border-2 border-foreground p-2 text-foreground">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className={`mt-3 flex items-center gap-1.5 text-xs font-mono font-bold ${trendColor}`}>
          <TrendIcon className="h-3 w-3" />
          <span>{trend.value > 0 ? "+" : ""}{trend.value}%</span>
          <span className="text-muted-foreground font-normal">{trend.label}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
