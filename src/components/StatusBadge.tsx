interface StatusBadgeProps {
  status: "healthy" | "at-risk" | "critical" | "on-track";
  label?: string;
}

const styles = {
  healthy: "bg-success/10 text-success border-success/30",
  "on-track": "bg-success/10 text-success border-success/30",
  "at-risk": "bg-warning/10 text-warning border-warning/30",
  critical: "bg-destructive/10 text-destructive border-destructive/30",
};

const defaultLabels = {
  healthy: "ONLINE",
  "on-track": "ON TRACK",
  "at-risk": "ALERT",
  critical: "CRITICAL",
};

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-[9px] font-mono font-semibold tracking-wider uppercase ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-glow" />
      {label || defaultLabels[status]}
    </span>
  );
};

export default StatusBadge;
