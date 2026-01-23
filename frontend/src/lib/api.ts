const BASE_URL = "http://localhost:4000/api";

export async function fetchDashboardSummary() {
  const res = await fetch(`${BASE_URL}/dashboard/summary`);
  if (!res.ok) throw new Error("Failed to fetch dashboard summary");
  return res.json();
}

export async function fetchItemProfit() {
  const res = await fetch(`${BASE_URL}/dashboard/items`);
  if (!res.ok) throw new Error("Failed to fetch item profit");
  return res.json();
}
