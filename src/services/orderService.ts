import { faker } from '@faker-js/faker';
import { DashboardOrder, DashboardStatus, Region } from '../types/order'; // Adjusted path
import { STATUS_OPTIONS, REGION_COUNTS } from '../constants/orderConstants'; // Adjust the path as necessary

/**
 * Generate mock orders for each region with realistic data
 */
export function getOrders(): DashboardOrder[] {
  const orders: DashboardOrder[] = [];

  (Object.keys(REGION_COUNTS) as Region[]).forEach((region) => {
    const orderCount = faker.number.int({ min: 0, max: 50 });

    for (let i = 0; i < orderCount; i++) {
      const timeRaw = faker.date.recent({ days: 14 });
      const amountValue = faker.number.int({ min: 5000, max: 50000 });

      orders.push({
        id: faker.string.uuid(),
        region,
        customer: faker.person.fullName(),
        orderNumber: `${faker.number.int({ min: 100000, max: 999999 })}`,
        time: formatFullTimeWithAgo(timeRaw),
        timeRaw,
        amount: `$ ${amountValue}`,
        amountValue,
        status: faker.helpers.arrayElement(STATUS_OPTIONS),
      });
    }
  });

  return faker.helpers.shuffle(orders);
}

/**
 * Format a date with relative "time ago" string
 */
function formatFullTimeWithAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 1000 / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  let ago = '';
  if (diffHr < 1) {
    ago = `${diffMin} min ago`;
  } else if (diffHr < 24) {
    ago = `${diffHr} hr ago`;
  } else {
    ago = `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  }

  const formatted = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return `${formatted} (${ago})`;
}

/**
 * Calculate statistics from a list of orders
 */
export function getOrderStats(orders: DashboardOrder[]) {
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce((sum, order) => sum + order.amountValue, 0);

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<DashboardStatus, number>);

  const uniqueCustomers = new Set(orders.map(o => o.customer)).size;

  return {
    totalOrders,
    totalRevenue,
    statusCounts,
    uniqueCustomers
  };
}
