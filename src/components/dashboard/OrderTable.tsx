import { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Order, OrderStatus, Region } from '@/services/orderService';
import { format } from 'date-fns';

type SortField = 'orderId' | 'customerName' | 'region' | 'orderAmount' | 'status' | 'createdAt';
type SortDirection = 'asc' | 'desc';

interface OrderTableProps {
  orders: Order[];
}

export function OrderTable({ orders }: OrderTableProps) {
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (sortField === 'createdAt') {
      aValue = aValue.getTime();
      bValue = bValue.getTime();
    } else if (sortField === 'orderAmount') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    } else {
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === 'asc' ? 
      <ArrowUp className="h-4 w-4" /> : 
      <ArrowDown className="h-4 w-4" />;
  };

  const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'default';
      case 'Shipped':
        return 'secondary';
      case 'Pending':
        return 'outline';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getRegionColor = (region: Region) => {
    switch (region) {
      case 'APAC':
        return 'text-region-apac bg-region-apac/10 border-region-apac/20';
      case 'UK':
        return 'text-region-uk bg-region-uk/10 border-region-uk/20';
      case 'US':
        return 'text-region-us bg-region-us/10 border-region-us/20';
      default:
        return 'text-foreground bg-muted border-border';
    }
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(field)}
      className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground justify-start"
    >
      {children}
      {getSortIcon(field)}
    </Button>
  );

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-6 gap-4 p-4 border-b border-border/50 text-sm font-medium">
            <div>
              <SortableHeader field="orderId">Order ID</SortableHeader>
            </div>
            <div>
              <SortableHeader field="customerName">Customer</SortableHeader>
            </div>
            <div>
              <SortableHeader field="region">Region</SortableHeader>
            </div>
            <div>
              <SortableHeader field="orderAmount">Amount</SortableHeader>
            </div>
            <div>
              <SortableHeader field="status">Status</SortableHeader>
            </div>
            <div>
              <SortableHeader field="createdAt">Date</SortableHeader>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border/50">
            {sortedOrders.map((order) => (
              <div key={order.orderId} className="grid grid-cols-6 gap-4 p-4 hover:bg-muted/50 transition-colors">
                <div className="text-sm font-mono text-foreground">
                  #{order.orderId}
                </div>
                <div className="text-sm text-foreground truncate">
                  {order.customerName}
                </div>
                <div>
                  <Badge variant="outline" className={`text-xs ${getRegionColor(order.region)}`}>
                    {order.region}
                  </Badge>
                </div>
                <div className="text-sm font-medium text-foreground">
                  ${order.orderAmount.toFixed(2)}
                </div>
                <div>
                  <Badge variant={getStatusVariant(order.status)} className="text-xs">
                    {order.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(order.createdAt, 'MMM dd, HH:mm')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {orders.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          No orders found matching your criteria.
        </div>
      )}
    </Card>
  );
}