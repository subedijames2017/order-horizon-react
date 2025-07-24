import { createContext, useContext, useState } from 'react';
import { DashboardOrder } from '@/types/order';
import { useOrderData, OrderStats } from '@/hooks/useOrderData';

/**
 * Defines the shape of the context used throughout the dashboard.
 */
interface OrderContextType {
  orders: DashboardOrder[];            // Filtered list of orders based on region
  stats: OrderStats;                   // Aggregated statistics
  regionFilter: string;                // Current region filter (e.g. 'All', 'APAC')
  setRegionFilter: (region: string) => void; // Function to update region filter
}

// Create a context for order-related data; initially undefined
const OrderContext = createContext<OrderContextType | undefined>(undefined);

/**
 * OrderProvider
 * ----------------
 * Wraps parts of the app that need access to order data.
 * It manages the region filter state and provides orders + stats
 * via the useOrderData hook.
 */
export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [regionFilter, setRegionFilter] = useState<string>('All'); // Default to 'All' regions

  // Fetch filtered orders and stats based on current region filter
  const { orders, stats } = useOrderData(regionFilter);

  return (
    <OrderContext.Provider value={{ orders, stats, regionFilter, setRegionFilter }}>
      {children}
    </OrderContext.Provider>
  );
};

/**
 * useOrders
 * ---------------
 * Custom hook to consume the OrderContext.
 * Ensures the hook is only used inside a <OrderProvider>.
 */
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
