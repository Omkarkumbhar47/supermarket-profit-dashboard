export type ImportFile = {
  id: string;
  fileName: string;
  type: "PURCHASE" | "SALE";
  uploadedAt: string;
  status: "ACTIVE" | "DELETED";
};

export const mockImports: ImportFile[] = [
  {
    id: "1",
    fileName: "purchase_jan.xlsx",
    type: "PURCHASE",
    uploadedAt: "2026-01-10",
    status: "ACTIVE",
  },
  {
    id: "2",
    fileName: "sales_jan.xlsx",
    type: "SALE",
    uploadedAt: "2026-01-11",
    status: "ACTIVE",
  },
];
