import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Ongoing', value: 45, color: '#06b6d4' },
  { name: 'Dispatched', value: 28, color: '#1e293b' },
  { name: 'Return', value: 15, color: '#94a3b8' },
  { name: 'Delivered', value: 12, color: '#0ea5e9' }
];

export function OrderStatusChart() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-600">234 orders</div>
      </div>
      
      <div className="relative">
        <ResponsiveContainer width="100%" height={120}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={50}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl font-bold text-slate-800">73%</div>
            <div className="text-xs text-slate-500">Ongoing</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
        {data.map((item, index) => (
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