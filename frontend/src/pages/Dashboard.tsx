import { useEffect, useState } from "react";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { IndianRupee, ShoppingCart, TrendingUp, Package } from "lucide-react";
import { fetchDashboardSummary } from "@/lib/api";
import { ProfitChart } from "@/components/charts/ProfitChart";
import { StockChart } from "@/components/charts/StockChart";

type DashboardSummary = {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  itemsSold: number;
};

export function Dashboard() {
  const [data, setData] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    fetchDashboardSummary().then(setData);
  }, []);

  if (!data) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Revenue"
          value={`₹${data.totalRevenue.toLocaleString()}`}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <SummaryCard
          title="Total Cost"
          value={`₹${data.totalCost.toLocaleString()}`}
          icon={<Package className="h-6 w-6" />}
        />
        <SummaryCard
          title="Total Profit"
          value={`₹${data.totalProfit.toLocaleString()}`}
          icon={<IndianRupee className="h-6 w-6" />}
        />
        <SummaryCard
          title="Items Sold"
          value={data.itemsSold.toString()}
          icon={<ShoppingCart className="h-6 w-6" />}
        />
      </div>

      {/* 🔥 CHARTS SECTION */}
      <div className="grid gap-6 md:grid-cols-2">
        <ProfitChart />
        <StockChart />
      </div>
    </div>
  );
}
