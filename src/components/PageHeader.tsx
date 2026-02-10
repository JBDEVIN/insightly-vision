interface PageHeaderProps {
  level: string;
  title: string;
  description: string;
}

const PageHeader = ({ level, title, description }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-foreground bg-foreground/5 border-2 border-foreground px-2 py-0.5">
          {level}
        </span>
      </div>
      <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1 font-mono">{description}</p>
    </div>
  );
};

export default PageHeader;
