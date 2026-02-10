interface StatusBadgeProps {
  status: "healthy" | "at-risk" | "critical" | "on-track";
  label?: string;
}

const styles = {
  healthy: "bg-success/12 text-success border-success/25",
  "on-track": "bg-success/12 text-success border-success/25",
  "at-risk": "bg-warning/12 text-warning border-warning/25",
  critical: "bg-destructive/12 text-destructive border-destructive/25",
};

const defaultLabels = {
  healthy: "Healthy",
  "on-track": "On Track",
  "at-risk": "At Risk",
  critical: "Critical",
};

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-0.5 text-[11px] font-medium ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-glow" />
      {label || defaultLabels[status]}
    </span>
  );
};

export default StatusBadge;
