interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: 'primary' | 'accent' | 'red';
}

export default function StatCard({
  title,
  value,
  icon,
  color = 'primary',
}: StatCardProps) {
  const bgColors = {
    primary: 'bg-primary-50 border-primary-200',
    accent: 'bg-accent-50 border-accent-200',
    red: 'bg-red-50 border-red-200',
  };

  const textColors = {
    primary: 'text-primary-600',
    accent: 'text-accent-600',
    red: 'text-red-600',
  };

  return (
    <div
      className={`${bgColors[color]} border rounded-lg p-6 shadow-md hover:shadow-lg transition`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${textColors[color]}`}>
            {value}
          </p>
        </div>
        <div className={`text-4xl ${textColors[color]}`}>{icon}</div>
      </div>
    </div>
  );
}
