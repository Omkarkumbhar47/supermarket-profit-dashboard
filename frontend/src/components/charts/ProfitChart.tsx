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
import { fetchProfitChart } from "@/lib/charts";
import type { ProfitChartItem } from "@/lib/charts";

export function ProfitChart() {
  const [data, setData] = useState<ProfitChartItem[]>([]);

  useEffect(() => {
    fetchProfitChart().then(setData);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit per Item</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="itemCode" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="profit" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
