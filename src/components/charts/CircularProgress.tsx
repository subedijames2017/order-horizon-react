import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useOrders } from '@/contexts/OrderContext';

interface CircularProgressProps {
  title: string;
  subtitle?: string;
  color: string;
  size?: 'sm' | 'lg';
}

export function CircularProgress({
  title,
  subtitle,
  color,
  size = 'lg',
}: CircularProgressProps) {
  const { stats } = useOrders();
  const delivered = stats.statusCounts.Delivered ?? 0;
  const percentage = Math.round((delivered / stats.totalOrders) * 100);

  const data = [
    { name: 'completed', value: percentage },
    { name: 'remaining', value: 100 - percentage },
  ];

  const chartSize = size === 'lg' ? 120 : 80;
  const innerRadius = size === 'lg' ? 40 : 30;
  const outerRadius = size === 'lg' ? 60 : 40;

  return (
    <div className="flex flex-col items-center w-full sm:w-auto">
      <div
        className="relative"
        style={{ width: chartSize, height: chartSize }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              <Cell fill={color} />
              <Cell fill="#e2e8f0" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl sm:text-2xl font-bold text-slate-800">
            {percentage}%
          </span>
        </div>
      </div>

      <div className="text-center mt-2">
        <div className="text-sm font-medium text-slate-800">{title}</div>
        {subtitle && <div className="text-xs text-slate-500">{subtitle}</div>}
      </div>
    </div>
  );
}
