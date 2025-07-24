import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useOrders } from '@/contexts/OrderContext';

const STATUS_COLOR_MAP: Record<string, string> = {
  Processing: '#06b6d4',
  Shipped: '#1e293b',
  Returned: '#94a3b8',
  Delivered: '#0ea5e9',
  Cancelled: '#f87171',
  'Pending Payment': '#c084fc',
};

const DISPLAY_NAME_MAP: Record<string, string> = {
  Processing: 'Processing',
  Shipped: 'Dispatched',
  Returned: 'Returned',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled',
  'Pending Payment': 'Pending',
};

export function OrderStatusChart() {
  const { stats } = useOrders();
  const { statusCounts, totalOrders } = stats;

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: DISPLAY_NAME_MAP[status] || status,
    value: count,
    color: STATUS_COLOR_MAP[status] || '#94a3b8',
  }));

  const topStatus = chartData.reduce(
    (max, item) => (item.value > max.value ? item : max),
    { name: '', value: 0, color: '' }
  );

  const topPercentage = Math.round((topStatus.value / totalOrders) * 100);

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-slate-600">
          {totalOrders.toLocaleString()} orders
        </div>
      </div>

      <div className="relative h-[10rem] sm:h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={65}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-slate-800">{topPercentage}%</div>
            <div className="text-xs text-slate-500">{topStatus.name}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-xs">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-600 truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
