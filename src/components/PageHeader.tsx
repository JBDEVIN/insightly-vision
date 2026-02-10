interface PageHeaderProps {
  level: string;
  title: string;
  description: string;
}

const PageHeader = ({ level, title, description }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-primary bg-primary/8 border border-primary/15 px-2 py-0.5 rounded">
          {level}
        </span>
      </div>
      <h1 className="text-2xl font-bold text-foreground tracking-tight font-serif">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
};

export default PageHeader;
