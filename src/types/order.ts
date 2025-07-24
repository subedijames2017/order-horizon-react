export type Region = 'APAC' | 'UK' | 'US';

export type DashboardStatus =
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned'
  | 'Pending Payment';

export interface DashboardOrder {
  id: string;
  region: Region;
  customer: string;
  orderNumber: string;
  time: string;
  timeRaw: Date;
  amount: string;
  amountValue: number;
  status: DashboardStatus;
}
