import { faker } from '@faker-js/faker';

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
export type Region = 'APAC' | 'UK' | 'US';

export interface Order {
  orderId: string;
  customerName: string;
  region: Region;
  orderAmount: number;
  status: OrderStatus;
  createdAt: Date;
}

const regions: Region[] = ['APAC', 'UK', 'US'];
const statuses: OrderStatus[] = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

// Weight distribution for more realistic status distribution
const statusWeights = {
  'Delivered': 0.6,
  'Shipped': 0.2,
  'Pending': 0.15,
  'Cancelled': 0.05
};

function getWeightedStatus(): OrderStatus {
  const random = Math.random();
  let cumulative = 0;
  
  for (const [status, weight] of Object.entries(statusWeights)) {
    cumulative += weight;
    if (random <= cumulative) {
      return status as OrderStatus;
    }
  }
  return 'Delivered';
}

function generateOrder(region: Region): Order {
  return {
    orderId: faker.string.alphanumeric({ length: 8, casing: 'upper' }),
    customerName: faker.person.fullName(),
    region,
    orderAmount: parseFloat(faker.commerce.price({ min: 10, max: 5000, dec: 2 })),
    status: getWeightedStatus(),
    createdAt: faker.date.recent({ days: 30 })
  };
}

export function generateMockOrders(count: number = 100): Order[] {
  const orders: Order[] = [];
  
  // Generate orders distributed across regions
  for (let i = 0; i < count; i++) {
    const region = faker.helpers.arrayElement(regions);
    orders.push(generateOrder(region));
  }
  
  // Sort by creation date (newest first)
  return orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getOrderStats(orders: Order[]) {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.orderAmount, 0);
  
  const statusCounts = statuses.reduce((acc, status) => {
    acc[status] = orders.filter(order => order.status === status).length;
    return acc;
  }, {} as Record<OrderStatus, number>);
  
  const regionCounts = regions.reduce((acc, region) => {
    acc[region] = orders.filter(order => order.region === region).length;
    return acc;
  }, {} as Record<Region, number>);
  
  const regionRevenue = regions.reduce((acc, region) => {
    acc[region] = orders
      .filter(order => order.region === region)
      .reduce((sum, order) => sum + order.orderAmount, 0);
    return acc;
  }, {} as Record<Region, number>);
  
  return {
    totalOrders,
    totalRevenue,
    statusCounts,
    regionCounts,
    regionRevenue
  };
}