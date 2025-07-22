import { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, DollarSign, TrendingUp, Users, RefreshCw } from 'lucide-react';
import { StatCard } from './StatCard';
import { OrderFilters } from './OrderFilters';
import { OrderTable } from './OrderTable';
import { Button } from '@/components/ui/button';
import { Order, Region, OrderStatus, generateMockOrders, getOrderStats } from '@/services/orderService';

export function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Generate initial data
  useEffect(() => {
    setOrders(generateMockOrders(150));
  }, []);

  // Filter orders based on search and filters
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = selectedRegion === 'all' || order.region === selectedRegion;
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      
      return matchesSearch && matchesRegion && matchesStatus;
    });
  }, [orders, searchTerm, selectedRegion, selectedStatus]);

  const stats = useMemo(() => getOrderStats(filteredOrders), [filteredOrders]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      setOrders(generateMockOrders(150));
      setIsRefreshing(false);
    }, 1000);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedRegion('all');
    setSelectedStatus('all');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Commerce Dashboard</h1>
            <p className="text-muted-foreground">
              Global orders across APAC, UK, and US regions
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-primary hover:bg-primary/90"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            icon={ShoppingCart}
            change="Last 30 days"
          />
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={DollarSign}
            variant="success"
            change="Last 30 days"
          />
          <StatCard
            title="Delivered Orders"
            value={stats.statusCounts.Delivered.toLocaleString()}
            icon={TrendingUp}
            variant="success"
            change={`${Math.round((stats.statusCounts.Delivered / stats.totalOrders) * 100)}% of total`}
          />
          <StatCard
            title="Active Customers"
            value={stats.totalOrders.toLocaleString()}
            icon={Users}
            change="Unique customers"
          />
        </div>

        {/* Regional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <StatCard
            title="APAC Region"
            value={`${stats.regionCounts.APAC} orders`}
            icon={DollarSign}
            change={formatCurrency(stats.regionRevenue.APAC)}
          />
          <StatCard
            title="UK Region"
            value={`${stats.regionCounts.UK} orders`}
            icon={DollarSign}
            change={formatCurrency(stats.regionRevenue.UK)}
          />
          <StatCard
            title="US Region"
            value={`${stats.regionCounts.US} orders`}
            icon={DollarSign}
            change={formatCurrency(stats.regionRevenue.US)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <OrderFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            onReset={handleResetFilters}
          />
          <div className="text-sm text-muted-foreground">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </div>

        {/* Orders Table */}
        <OrderTable orders={filteredOrders} />
      </div>
    </div>
  );
}