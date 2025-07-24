import { DashboardStatus, Region } from '../types/order';

export const STATUS_OPTIONS: DashboardStatus[] = [
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
  'Returned',
  'Pending Payment'
];

export const REGION_COUNTS: Record<Region, number> = {
  APAC: 50,
  UK: 50,
  US: 50
};
