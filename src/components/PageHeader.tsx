interface PageHeaderProps {
  level: string;
  title: string;
  description: string;
}

const PageHeader = ({ level, title, description }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
          {level}
        </span>
      </div>
      <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
};

export default PageHeader;
