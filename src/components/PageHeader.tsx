interface PageHeaderProps {
  level: string;
  title: string;
  description: string;
}

const PageHeader = ({ level, title, description }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
          {level}
        </span>
      </div>
      <h1 className="text-2xl font-bold text-foreground tracking-tight font-mono">{title}</h1>
      <p className="text-xs text-muted-foreground mt-1 font-mono">{description}</p>
    </div>
  );
};

export default PageHeader;
