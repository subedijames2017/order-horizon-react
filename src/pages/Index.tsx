import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { ShoppingCart, DollarSign, TrendingUp, Users } from 'lucide-react';

type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
type Region = 'APAC' | 'UK' | 'US';

interface Order {
  orderId: string;
  customerName: string;
  region: Region;
  orderAmount: number;
  status: OrderStatus;
  createdAt: string;
}

const Index = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const generateOrders = () => {
      const regions: Region[] = ['APAC', 'UK', 'US'];
      const statuses: OrderStatus[] = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
      const mockOrders: Order[] = [];

      for (let i = 0; i < 50; i++) {
        mockOrders.push({
          orderId: faker.string.alphanumeric({ length: 8, casing: 'upper' }),
          customerName: faker.person.fullName(),
          region: faker.helpers.arrayElement(regions),
          orderAmount: parseFloat(faker.commerce.price({ min: 10, max: 5000, dec: 2 })),
          status: faker.helpers.arrayElement(statuses),
          createdAt: faker.date.recent({ days: 30 }).toLocaleDateString()
        });
      }
      
      setOrders(mockOrders);
    };

    generateOrders();
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.orderAmount, 0);
  const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
    }
  };

  const getRegionColor = (region: Region) => {
    switch (region) {
      case 'APAC': return 'text-purple-600 bg-purple-100';
      case 'UK': return 'text-red-600 bg-red-100';
      case 'US': return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Commerce Dashboard</h1>
          <p className="text-muted-foreground">Global orders across APAC, UK, and US regions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">{totalOrders}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">${totalRevenue.toFixed(0)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delivered Orders</p>
                <p className="text-2xl font-bold text-foreground">{deliveredOrders}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Customers</p>
                <p className="text-2xl font-bold text-foreground">{totalOrders}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Recent Orders</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Region</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.slice(0, 10).map((order) => (
                  <tr key={order.orderId} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-foreground">
                      #{order.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRegionColor(order.region)}`}>
                        {order.region}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      ${order.orderAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {order.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;