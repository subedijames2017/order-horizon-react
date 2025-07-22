import { useState } from 'react';
import { MoreHorizontal, Eye } from 'lucide-react';

interface Order {
  id: string;
  company: string;
  orderNumber: string;
  time: string;
  amount: string;
  status: 'All' | 'Low Stock';
  logo: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    company: 'Stainless clothes',
    orderNumber: '#212234',
    time: 'Just now',
    amount: 'Rs 21,000',
    status: 'All',
    logo: '🔧'
  },
  {
    id: '2',
    company: 'Stainless clothes',
    orderNumber: '#212234',
    time: '2 min ago',
    amount: 'Rs 21,000',
    status: 'Low Stock',
    logo: '⚡'
  },
  {
    id: '3',
    company: 'Stainless clothes',
    orderNumber: '#212234',
    time: '2 min ago',
    amount: 'Rs 21,000',
    status: 'All',
    logo: '🎯'
  },
  {
    id: '4',
    company: 'Stainless clothes',
    orderNumber: '#212234',
    time: '10 min ago',
    amount: 'Rs 21,000',
    status: 'All',
    logo: '💎'
  },
  {
    id: '5',
    company: 'Stainless clothes',
    orderNumber: '#212234',
    time: '10 min ago',
    amount: 'Rs 21,000',
    status: 'All',
    logo: '⚡'
  }
];

export function OrdersTable() {
  const [activeTab, setActiveTab] = useState<'orders' | 'payments'>('orders');

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'orders'
                ? 'border-slate-800 text-slate-800'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Recent Orders
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'payments'
                ? 'border-slate-800 text-slate-800'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Recent Payments
          </button>
        </nav>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Corporates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Order Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                In Stocks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-lg">{order.logo}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-900">
                      {order.company}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {order.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {order.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.status === 'All' ? (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                      All
                    </span>
                  ) : (
                    <div className="text-xs">
                      <span className="text-red-600 font-medium">2 Items</span>
                      <br />
                      <span className="text-red-500">low in stock</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-xs font-medium text-sky-600 bg-sky-50 border border-sky-200 rounded hover:bg-sky-100">
                      View order
                    </button>
                    <button className="px-3 py-1 text-xs font-medium text-white bg-slate-800 rounded hover:bg-slate-700">
                      Accept
                    </button>
                    <button className="p-1 text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}