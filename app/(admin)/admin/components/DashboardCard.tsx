interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  content: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  content,
}) => {
  return (
    <div className="w-full rounded-lg border-2 border-foreground/30 p-8 text-foreground shadow-sm">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">{title}</h2>
          {icon}
        </div>
        <div className="mt-5 text-2xl font-bold">{content}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
