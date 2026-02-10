import { ReactNode } from "react";

interface ChartPanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

const ChartPanel = ({ title, subtitle, children, actions, className = "" }: ChartPanelProps) => {
  return (
    <div className={`glass-card card-hover p-4 ${className}`}>
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-mono font-bold text-primary uppercase tracking-wider">{title}</h3>
          {subtitle && <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ChartPanel;
