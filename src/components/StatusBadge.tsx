interface StatusBadgeProps {
  status: "healthy" | "at-risk" | "critical" | "on-track";
  label?: string;
}

const styles = {
  healthy: "bg-success/20 text-success border-success/40",
  "on-track": "bg-success/20 text-success border-success/40",
  "at-risk": "bg-warning/20 text-warning border-warning/40",
  critical: "bg-destructive/20 text-destructive border-destructive/40",
};

const defaultLabels = {
  healthy: "OK",
  "on-track": "OK",
  "at-risk": "WARN",
  critical: "CRIT",
};

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  return (
    <span className={`inline-flex items-center gap-1 border px-1.5 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase ${styles[status]}`}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current animate-pulse-glow" />
      {label || defaultLabels[status]}
    </span>
  );
};

export default StatusBadge;
