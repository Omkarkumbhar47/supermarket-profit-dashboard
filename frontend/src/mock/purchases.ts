export type PurchaseRow = {
  itemCode: string;
  itemName: string;
  quantity: number;
  buyingPrice: number;
  date: string;
};

export const mockPurchases: PurchaseRow[] = [
  {
    itemCode: "ITEM001",
    itemName: "Rice 1kg",
    quantity: 50,
    buyingPrice: 40,
    date: "2026-01-05",
  },
  {
    itemCode: "ITEM002",
    itemName: "Wheat 1kg",
    quantity: 30,
    buyingPrice: 35,
    date: "2026-01-06",
  },
];
