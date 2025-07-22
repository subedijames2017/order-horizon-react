import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Mon', orders: 45, revenue: 45000 },
  { name: 'Tues', orders: 52, revenue: 52000 },
  { name: 'Wed', orders: 48, revenue: 48000 },
  { name: 'Thur', orders: 61, revenue: 82347 },
  { name: 'Fri', orders: 55, revenue: 55000 },
  { name: 'Sat', orders: 67, revenue: 67000 },
  { name: 'Sun', orders: 43, revenue: 43000 },
];

export function OrderRevenueChart() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Order/Revenue</h3>
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
            <span className="text-slate-600">RECEIVED ORDERS</span>
            <span className="font-semibold">845</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
            <span className="text-slate-600">RECEIVED PAYMENT</span>
            <span className="font-semibold">Rs 2,39,600</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              yAxisId="orders"
              orientation="left"
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              yAxisId="revenue"
              orientation="right"
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            
            <Area
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              fill="#0ea5e9"
              fillOpacity={0.1}
              stroke="none"
            />
            
            <Line
              yAxisId="orders"
              type="monotone"
              dataKey="orders"
              stroke="#1e293b"
              strokeWidth={2}
              dot={false}
            />
            
            <Line
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={{ r: 4, fill: '#0ea5e9' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}