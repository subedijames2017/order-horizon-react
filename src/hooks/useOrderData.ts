// src/hooks/useOrderData.ts
import { useEffect, useState } from 'react';
import { getOrders } from '../services/orderService'; // Adjust the path as necessary
import { DashboardOrder, DashboardStatus } from '../types/order'; // Adjusted to relative path

/**
 * Aggregated metrics calculated from the current (possibly filtered) order set.
 *
 * Note: `statusCounts` is keyed by DashboardStatus. Using a typed Record makes it
 * easier to consume in charts/components without defensive casting.
 */
export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  statusCounts: Partial<Record<DashboardStatus, number>>; // Some statuses may be absent in filtered views
  uniqueCustomers: number;
}

/**
 * useOrderData
 * -------------
 * Fetches mock orders, applies an optional region filter, and derives dashboard stats.
 * Automatically refreshes every 30 seconds to simulate live data updates.
 *
 * @param regionFilter - "All" or a specific region code (APAC | UK | US)
 * @returns { orders, stats } state derived from the current filter
 */
export function useOrderData(regionFilter: string) {
  const [allOrders, setAllOrders] = useState<DashboardOrder[]>([]);
  const [orders, setOrders] = useState<DashboardOrder[]>([]);
  const [stats, setStats] = useState<OrderStats>({
    totalOrders: 0,
    totalRevenue: 0,
    statusCounts: {},
    uniqueCustomers: 0,
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    /**
     * Fetch + transform
     * -----------------
     * 1. Get a fresh batch of mock orders.
     * 2. Apply region filter (or show all).
     * 3. Recompute roll-up stats for the filtered dataset.
     */
    const fetchData = async () => {
      const fetchedOrders = await getOrders();
      setAllOrders(fetchedOrders);
    };

    // Initial fetch on mount only
    fetchData();

    // Poll every 30s to simulate live updates
    intervalId = setInterval(fetchData, 30000);

    // Cleanup interval on unmount or when region filter changes
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Only run on mount (not on regionFilter change)

  useEffect(() => {
    const filteredOrders =
      regionFilter === 'All'
        ? allOrders
        : allOrders.filter((o) => o.region === regionFilter);

    setOrders(filteredOrders);

    // --- Derive stats ------------------------------------------------------

    const totalOrders = filteredOrders.length;

    // Sum numeric amount field
    const totalRevenue = filteredOrders.reduce(
      (sum: number, o: DashboardOrder) => sum + o.amountValue,
      0
    );

    // Count distinct customers
    const uniqueCustomers = new Set(filteredOrders.map((o: DashboardOrder) => o.customer)).size;

    // Count by status (typed for downstream safety)
    const statusCounts = filteredOrders.reduce((acc: Partial<Record<DashboardStatus, number>>, o: DashboardOrder) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {} as Partial<Record<DashboardStatus, number>>);

    // Push derived stats into state
    setStats({
      totalOrders,
      totalRevenue,
      statusCounts,
      uniqueCustomers,
    });
  }, [regionFilter, allOrders]); // Recompute only when filter or fetched data changes

  return { orders, stats };
}
