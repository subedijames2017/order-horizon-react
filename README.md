
# 🧾 Order Horizon React Dashboard

A professional, modular React + TypeScript dashboard that simulates unified order data from global commerce regions using realistic mock data. Built with AI-assisted development using Lovable and ChatGPT.

---

## 🤖 AI Prompts Used

### 📌 Initial Prompt (via Lovable)
Build a professional React-based dashboard that simulates unified order data from three commerce regions: APAC, UK, and US.

✅ Requirements:
- Use `@faker-js/faker` to generate 150+ realistic mock orders per region.
- Each order should include:
  - `id` (UUID)
  - `customer` (full name)
  - `region` (APAC, UK, US)
  - `orderNumber`
  - `amount` (formatted currency + raw value)
  - `status` (Processing, Shipped, Delivered, Cancelled, Returned, Pending Payment)
  - `createdAt` (timestamp + formatted with “X min/hr/day ago”)

✅ Functionality:
- Combine all region orders into a single view.
- Responsive dashboard layout optimized for large screens (e.g. office displays).
- Stat cards for total orders, revenue, delivered count, and active customers.
- Charts for revenue and status breakdown (e.g., Recharts or equivalent).
- Sortable/filterable Orders Table with optional region/status filters.
- Collapsible sidebar, interactive header with user profile and notification icons.

🔧 Technical Stack:
- React + TypeScript
- `@faker-js/faker` for mock data
- Tailwind CSS for styling
- Context API for shared state
- Recharts for data visualization
- Optional: `date-fns` for date formatting

📦 Output:
- Components:
  - `OrdersTable.tsx` with sorting, search, and filtering
  - `StatCard.tsx` for KPI widgets
  - `OrderRevenueChart.tsx` & `OrderStatusChart.tsx`
  - `CircularProgress.tsx` for active order visuals
  - `Sidebar.tsx`, `Header`, and contextual layout components
  - `orderService.ts` to generate & return fake data
  - `OrderContext.tsx` for managing filters and stats

🎯 Goal:
Create a modular, visually engaging, and data-rich commerce dashboard that emulates a real-time admin experience using mock data — perfect for product demos and BI-style displays.

---

### 🧠 Additional ChatGPT Prompts

#### `orderService.ts`
> “Generate a TypeScript service module for a React dashboard that mocks order data using Faker.js. Each order should include a unique ID, customer name, region (US, UK, APAC), order number, order amount, status (e.g. Processing, Shipped, Delivered, Cancelled, Returned, Pending Payment), and a timestamp formatted with a ‘time ago’ label. Include a helper to get overall stats like total revenue, total orders, and delivered count.”

#### `Index.tsx`
> “Generate a responsive React + TypeScript dashboard page using Tailwind CSS. It should include:
> - A sidebar
> - Header with user info and region filter dropdown
> - Stat cards showing total orders, revenue, active customers, and delivered orders
> - A revenue chart, circular progress, and order status chart
> - An OrdersTable component filtered by region
> Wrap the content in a context provider and support toggling the sidebar.”

---

## 🧠 State & Context Architecture

### 🪝 `useOrderData` Hook

A custom React hook that:
- Fetches mock order data using `getOrders()`
- Filters it by selected region
- Calculates aggregated stats: total orders, total revenue, unique customers, and per-status counts
- Polls the service every 30 seconds to simulate real-time updates

Returned state:
```ts
{
  orders: DashboardOrder[], // filtered by region
  stats: {
    totalOrders: number;
    totalRevenue: number;
    uniqueCustomers: number;
    statusCounts: Partial<Record<DashboardStatus, number>>;
  }
}
```

### 🌐 `OrderContext`

A global context provider that:
- Manages the `regionFilter` state
- Provides the current list of filtered orders and stats (via `useOrderData`)
- Ensures shared state is available throughout the dashboard (charts, cards, filters, etc.)

Hook signature:
```ts
export const useOrders = (): {
  orders: DashboardOrder[];
  stats: OrderStats;
  regionFilter: string;
  setRegionFilter: (region: string) => void;
};
```

Wrap your app with `<OrderProvider>` to enable access.

---

## 🚀 Setup Instructions

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd order-horizon-react-main
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Run the app:
   ```bash
   bun run dev
   # or if using npm
   npm run dev
   ```

4. Navigate to `http://localhost:3000`

---

## 📌 Assumptions

- No backend or API integration; all data is client-side and mocked using Faker.js.
- Chart components like `OrderRevenueChart`, `CircularProgress`, etc., are either stubbed or simplified for POC.
- Project uses Bun as the package manager, but it is also compatible with npm/yarn if needed.

---

## 💡 Reflection on AI Usage

Using AI accelerated initial development by:
- Generating clean, consistent mock data logic (e.g., `getOrders`, `getOrderStats`)
- Bootstrapping the layout for the dashboard with semantic structure and Tailwind styling
- Ensuring modular architecture through proper code separation and reusable components

**Limitations**:
- Some manual refactoring was required to align types and formatting
- Chart data and performance optimizations were hand-tuned after AI generation


---

## 🧠 AI Development Workflow Overview

This project was built collaboratively with AI using two tools — **Lovable** and **ChatGPT**:

### 🖼️ Step 1: UI Concept via Lovable
- I provided **a sample dashboard image** to Lovable to use as visual reference.
- Lovable generated a professional dashboard layout based on the design style and requirements.

### 🔧 Step 2: Functional Development via ChatGPT
After receiving the UI structure from Lovable, I used **ChatGPT** to build and refine core functionality:
- Added business logic with `orderService.ts`
- Created **hooks** (`useOrderData`) to fetch, filter, and compute stats
- Built the **OrderContext** and `useOrders` hook to manage global state
- Generated **filter dropdowns** and wired them to the dashboard
- Made the entire layout **fully responsive**
- Refactored and structured `Index.tsx` and the **OrdersTable**
- Generated this comprehensive **README** via ChatGPT assistance

### 🧠 Summary:
This POC demonstrates how to use AI as a **coding pair** to:
- Go from design inspiration (image-based prompt)
- To full-featured React dashboard
- With real-time-feel mock data, filters, and visuals

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd order-horizon-react-main
```

### 2. Install dependencies
```bash
bun install
# or
npm install
```

### 3. Run the development server
```bash
bun run dev
# or
npm run dev
```

### 4. Open in your browser
```
http://localhost:3000
```

---



---

## ⚙️ How It Works

The dashboard provides a real-time simulation of global order data with the following key components:

### 🧾 Dashboard Overview:
- **Stat Cards**:
  - Total Orders
  - Total Revenue
  - Delivered Orders
  - Active Customers

- **Charts**:
  - Order & Revenue Line Chart
  - Circular Progress for Active Orders
  - Order Status Breakdown

- **Order List**:
  - Filtered table displaying recent orders
  - Columns: Customer, Region, Status, Date, Amount

### 🌍 Filtering & Refresh:
- Region-based filter available at the top (`All`, `APAC`, `UK`, `US`)
- Automatically **refreshes every 30 seconds** to simulate live updates

---

## 🚀 Deployed with Lovable

The app is deployed using [Lovable](https://lovable.app) deployment service.

🌍 Live URL:  
**[https://order-horizon-react.lovable.app](https://order-horizon-react.lovable.app)**

## 🚀 Future Improvements & Possibilities

While this POC uses Faker.js for mock data, there are many ways to improve and extend the project:

### 🧩 Functional Improvements:
- Replace Faker with **real API integration** (e.g., REST/GraphQL)
- Add **search bar** and column sorting on the Orders table
- Show **order details on row click** or expandable rows
- Introduce **action buttons** (e.g., Edit, Cancel, Ship)

### 💻 UX Enhancements:
- Implement **pagination** or infinite scroll for large datasets
- Add **loading states** and animations for smoother UX
- Support **multi-region comparisons** side-by-side
- Enable **dark/light mode toggle**

This project is a great foundation for real-world dashboards, and AI tools proved incredibly effective for bootstrapping both the design and logic.

