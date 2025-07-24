import { useState } from 'react';
import { ShoppingCart, DollarSign, TrendingUp, Users, Bell, User } from 'lucide-react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { OrderRevenueChart } from '@/components/charts/OrderRevenueChart';
import { CircularProgress } from '@/components/charts/CircularProgress';
import { OrderStatusChart } from '@/components/charts/OrderStatusChart';
import OrdersTable from '@/components/dashboard/OrdersTable';
import { OrderProvider, useOrders } from '@/contexts/OrderContext';

const DashboardContent = () => {
  const { regionFilter, setRegionFilter, stats } = useOrders();

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Dashboard</h1>
            {/* 🌍 Region Filter Dropdown */}
            <span className="text-sm ml-10 font-medium text-slate-800 hidden sm:inline">Region: </span>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value as any)}
              className="border border-slate-300 text-sm px-3 py-1 rounded-md bg-white shadow-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-500"
            >
              <option value="All">All</option>
              <option value="US">US</option>
              <option value="UK">UK</option>
              <option value="APAC">APAC</option>
            </select>
          </div>

          <div className="flex items-center flex-wrap gap-2 sm:gap-4 justify-between sm:justify-end">
            <button className="p-2 text-slate-400 hover:text-slate-600">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-800 hidden sm:inline">Jyotindra</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* You can optionally filter stats here if you like based on region */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            icon={ShoppingCart}
            change="Last 30 days"
          />
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue}
            icon={DollarSign}
            change="Last 30 days"
          />
          <StatCard
            title="Delivered Orders"
            value={stats.statusCounts.Delivered?.toLocaleString() ?? '0'}
            icon={TrendingUp}
            change={`${Math.round((stats.statusCounts.Delivered / stats.totalOrders) * 100)}% of total`}
          />
          <StatCard
            title="Active Customers"
            value={stats.uniqueCustomers.toLocaleString()}
            icon={Users}
            change="Unique customers"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrderRevenueChart />
          </div>
          <div className="space-y-6">
            <CircularProgress
              title="Active Orders"
              subtitle="Completed"
              color="#06b6d4"
            />
            <OrderStatusChart />
          </div>
        </div>

        {/* 📦 Filtered OrdersTable based on region */}
        <OrdersTable />
      </main>
    </div>
  );
};

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <OrderProvider>
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <DashboardContent />
      </div>
    </OrderProvider>
  );
};

export default Index;
