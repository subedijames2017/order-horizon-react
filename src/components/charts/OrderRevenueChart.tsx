import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useOrders } from '@/contexts/OrderContext';

const WEEKDAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

export function OrderRevenueChart() {
  const { orders } = useOrders();

  // Group by weekday
  const dailyData = WEEKDAYS.map((day) => ({
    name: day,
    orders: 0,
    revenue: 0,
  }));

  orders.forEach((order) => {
    const dayName = WEEKDAYS[order.timeRaw.getDay()];
    const entry = dailyData.find((d) => d.name === dayName);
    if (entry) {
      entry.orders += 1;
      entry.revenue += order.amountValue;
    }
  });

  const totalOrders = dailyData.reduce((sum, d) => sum + d.orders, 0);
  const totalRevenue = dailyData.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-slate-800">Order / Revenue</h3>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-slate-600 rounded-full" />
            <span className="text-slate-600">RECEIVED ORDERS</span>
            <span className="font-semibold">{totalOrders.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-sky-500 rounded-full" />
            <span className="text-slate-600">RECEIVED PAYMENT</span>
            <span className="font-semibold">Rs {totalRevenue.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="h-[20rem] sm:h-[23rem] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
