export type PurchasePreview = {
  itemCode: string;
  itemName?: string;
  quantity: number;
  buyingPrice: number;
  date: string;
  fileName: string;
};

export type SalesPreview = {
  itemCode: string;
  quantitySold: number;
  sellingPrice: number;
  date: string;
  fileName: string;
};

export async function fetchPurchasePreview(): Promise<PurchasePreview[]> {
  const res = await fetch("http://localhost:4000/api/preview/purchases");
  if (!res.ok) throw new Error("Failed to fetch purchase preview");
  return res.json();
}

export async function fetchSalesPreview(): Promise<SalesPreview[]> {
  const res = await fetch("http://localhost:4000/api/preview/sales");
  if (!res.ok) throw new Error("Failed to fetch sales preview");
  return res.json();
}
