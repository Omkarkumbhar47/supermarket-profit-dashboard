export type SaleRow = {
  itemCode: string;
  quantitySold: number;
  sellingPrice: number;
  date: string;
};

export const mockSales: SaleRow[] = [
  {
    itemCode: "ITEM001",
    quantitySold: 20,
    sellingPrice: 55,
    date: "2026-01-10",
  },
  {
    itemCode: "ITEM002",
    quantitySold: 10,
    sellingPrice: 50,
    date: "2026-01-11",
  },
];
