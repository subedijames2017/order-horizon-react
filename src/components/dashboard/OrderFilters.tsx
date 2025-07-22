import { Search, Filter, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Region, OrderStatus } from '@/services/orderService';

interface OrderFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRegion: Region | 'all';
  onRegionChange: (value: Region | 'all') => void;
  selectedStatus: OrderStatus | 'all';
  onStatusChange: (value: OrderStatus | 'all') => void;
  onReset: () => void;
}

export function OrderFilters({
  searchTerm,
  onSearchChange,
  selectedRegion,
  onRegionChange,
  selectedStatus,
  onStatusChange,
  onReset
}: OrderFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-card/50 border-border/50 focus:bg-card"
        />
      </div>
      
      <div className="flex gap-2 items-center">
        <Filter className="h-4 w-4 text-muted-foreground" />
        
        <Select value={selectedRegion} onValueChange={onRegionChange}>
          <SelectTrigger className="w-[120px] bg-card/50 border-border/50">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="APAC">APAC</SelectItem>
            <SelectItem value="UK">UK</SelectItem>
            <SelectItem value="US">US</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[130px] bg-card/50 border-border/50">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="bg-card/50 border-border/50 hover:bg-card"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}