import { useState, useMemo } from 'react';
import { useOrders } from '@/contexts/OrderContext';
import { DashboardOrder  as Order} from '@/types/order';

type SortKey = keyof Pick<Order, 'customer' | 'region' | 'timeRaw' | 'amountValue' | 'status' | 'orderNumber'>;
type SortDirection = 'asc' | 'desc';

const PAGE_SIZE = 50;

export default function OrdersTable() {
  const { orders } = useOrders();
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>('timeRaw');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');

  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...orders];

    if (statusFilter !== 'All') {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }

    return filtered.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [orders, sortKey, sortDir, statusFilter]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginatedOrders = filteredAndSortedOrders.slice(start, start + PAGE_SIZE);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-4 sm:px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">Unified Orders (APAC • UK • US)</h2>
        <p className="text-sm text-slate-500">
          Page {page} of {totalPages} — Showing {paginatedOrders.length} of {filteredAndSortedOrders.length} filtered orders (out of {orders.length})
        </p>

        <div className="flex flex-wrap gap-4 mt-3">
          <div>
            <label className="text-sm font-medium text-slate-600 mr-2">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="border border-slate-300 rounded-md px-4 py-2 text-sm text-slate-700 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
            >
              <option value="All">All</option>
              {[...new Set(orders.map(o => o.status))].map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <HeaderCell onClick={() => handleSort('customer')} label="Customer" sortKey={sortKey} currentKey="customer" sortDir={sortDir} />
              <HeaderCell onClick={() => handleSort('orderNumber')} label="Order#" sortKey={sortKey} currentKey="orderNumber" sortDir={sortDir} />
              <HeaderCell onClick={() => handleSort('region')} label="Region" sortKey={sortKey} currentKey="region" sortDir={sortDir} />
              <HeaderCell onClick={() => handleSort('timeRaw')} label="Time" sortKey={sortKey} currentKey="timeRaw" sortDir={sortDir} />
              <HeaderCell onClick={() => handleSort('amountValue')} label="Amount" sortKey={sortKey} currentKey="amountValue" sortDir={sortDir} />
              <HeaderCell onClick={() => handleSort('status')} label="Status" sortKey={sortKey} currentKey="status" sortDir={sortDir} />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-500">{order.customer}</td>
                <td className="px-4 py-3 text-slate-500">{order.orderNumber}</td>
                <td className="px-4 py-3 text-slate-500">{order.region}</td>
                <td className="px-4 py-3 text-slate-500">{order.time}</td>
                <td className="px-4 py-3 font-medium text-slate-900">{order.amount}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden px-4 divide-y divide-slate-200">
        {paginatedOrders.map((order) => (
          <div key={order.id} className="py-4">
            <div className="text-slate-900 font-medium">{order.customer}</div>
            <div className="text-slate-500 text-sm">Order #: {order.orderNumber}</div>
            <div className="text-slate-500 text-sm">Region: {order.region}</div>
            <div className="text-slate-500 text-sm">Time: {order.time}</div>
            <div className="text-slate-900 font-semibold mt-1">{order.amount}</div>
            <div className="mt-1">
              <StatusBadge status={order.status} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 px-4 py-4 border-t bg-slate-50 text-sm">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 bg-white border rounded text-slate-700 hover:bg-slate-100 disabled:opacity-50 w-full sm:w-auto"
        >
          Previous
        </button>
        <span className="text-slate-600">Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 py-1 bg-white border rounded text-slate-700 hover:bg-slate-100 disabled:opacity-50 w-full sm:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function HeaderCell({ label, onClick, sortKey, currentKey, sortDir }: {
  label: string;
  onClick?: () => void;
  sortKey?: SortKey;
  currentKey?: SortKey;
  sortDir?: SortDirection;
}) {
  const isActive = sortKey === currentKey;
  const arrow = isActive ? (sortDir === 'asc' ? '▲' : '▼') : '';
  return (
    <th
      onClick={onClick}
      className={`px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider ${
        onClick ? 'cursor-pointer hover:text-slate-700' : ''
      }`}
    >
      {label} {arrow}
    </th>
  );
}

function StatusBadge({ status }: { status: Order['status'] }) {
  const colorMap: Record<Order['status'], string> = {
    Processing: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-sky-100 text-sky-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
    Returned: 'bg-yellow-100 text-yellow-800',
    'Pending Payment': 'bg-purple-100 text-purple-800'
  };

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${colorMap[status]}`}>
      {status}
    </span>
  );
}
