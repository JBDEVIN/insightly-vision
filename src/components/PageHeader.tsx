interface PageHeaderProps {
  level: string;
  title: string;
  description: string;
}

const PageHeader = ({ level, title, description }: PageHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-primary-foreground bg-primary px-1.5 py-0.5">
          {level}
        </span>
      </div>
      <h1 className="text-xl font-mono font-bold text-card-foreground uppercase tracking-wide">{title}</h1>
      <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">{description}</p>
    </div>
  );
};

export default PageHeader;
