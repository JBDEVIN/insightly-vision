interface StatusBadgeProps {
  status: "healthy" | "at-risk" | "critical" | "on-track";
  label?: string;
}

const styles = {
  healthy: "bg-success text-success-foreground border-success",
  "on-track": "bg-success text-success-foreground border-success",
  "at-risk": "bg-warning text-warning-foreground border-warning",
  critical: "bg-destructive text-destructive-foreground border-destructive",
};

const defaultLabels = {
  healthy: "OK",
  "on-track": "OK",
  "at-risk": "WARN",
  critical: "CRIT",
};

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  return (
    <span className={`inline-flex items-center gap-1 border-2 px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase ${styles[status]}`}>
      {label || defaultLabels[status]}
    </span>
  );
};

export default StatusBadge;
