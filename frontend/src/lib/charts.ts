export type ProfitChartItem = {
  itemCode: string;
  profit: number;
};

export type StockChartItem = {
  itemCode: string;
  stock: number;
};

export async function fetchProfitChart(): Promise<ProfitChartItem[]> {
  const res = await fetch("http://localhost:4000/api/dashboard/items");
  if (!res.ok) throw new Error("Failed to fetch profit chart");
  const data = await res.json();
  return data.map((i: any) => ({
    itemCode: i.itemCode,
    profit: i.profit,
  }));
}

export async function fetchStockChart(): Promise<StockChartItem[]> {
  const res = await fetch("http://localhost:4000/api/dashboard/stock");
  if (!res.ok) throw new Error("Failed to fetch stock chart");
  return res.json();
}
