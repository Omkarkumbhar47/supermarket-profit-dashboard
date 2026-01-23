import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchStockChart } from "@/lib/charts";
import type { StockChartItem } from "@/lib/charts";

export function StockChart() {
  const [data, setData] = useState<StockChartItem[]>([]);

  useEffect(() => {
    fetchStockChart().then(setData);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Remaining Stock</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="itemCode" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
