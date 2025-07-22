import { useState } from 'react';
import { ShoppingCart, DollarSign, TrendingUp, Users, Bell, User } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { StatCard } from '@/components/StatCard';
import { OrderRevenueChart } from '@/components/charts/OrderRevenueChart';
import { CircularProgress } from '@/components/charts/CircularProgress';
import { OrderStatusChart } from '@/components/charts/OrderStatusChart';
import { OrdersTable } from '@/components/OrdersTable';


const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-600">Today Orders</div>
              <button className="p-2 text-slate-400 hover:text-slate-600">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-800">Urvashi Singh</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Total Orders"
              value="756"
              change="4.07%"
              changeType="positive"
              icon={ShoppingCart}
            />
            <StatCard
              title="Total Sales"
              value="1476"
              change="4.07%"
              changeType="positive"
              icon={DollarSign}
              currency
            />
            <StatCard
              title="Total Outstanding"
              value="376"
              change="1.64%"
              changeType="negative"
              icon={TrendingUp}
              currency
            />
            <StatCard
              title="Total Cooperates"
              value="210"
              change="4.07%"
              changeType="positive"
              icon={Users}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart */}
            <div className="lg:col-span-2">
              <OrderRevenueChart />
            </div>
            
            {/* Side Charts */}
            <div className="space-y-6">
              <CircularProgress
                percentage={76}
                title="Active Orders"
                subtitle="Completed"
                color="#06b6d4"
              />
              <OrderStatusChart />
            </div>
          </div>

          {/* Orders Table */}
          <OrdersTable />
        </main>
      </div>
    </div>
  );
};

export default Index;